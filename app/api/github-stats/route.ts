import { NextResponse } from 'next/server'
import { portfolioData } from '@/app/data/portfolio-data'

export async function GET() {
  // Extract username from GitHub URL in portfolio data
  const githubUrl = portfolioData.personal.social.github
  const username = githubUrl.split('/').pop() || 'vaibhavvvvv' // Fallback to default if split fails

  try {
    // Fetch GitHub stats without token
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    ])
    console.log(userResponse)
    console.log(reposResponse)

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('Failed to fetch GitHub data')
    }

    const userData = await userResponse.json()
    const reposData = await reposResponse.json()

    // Check if reposData is an array before using reduce
    if (!Array.isArray(reposData)) {
      throw new Error('Invalid repository data received')
    }

    // Calculate total stars with type safety
    const totalStars = reposData.reduce((acc: number, repo: { stargazers_count?: number }) => {
      return acc + (repo.stargazers_count || 0)
    }, 0)

    return NextResponse.json({
      totalContributions: userData.public_repos * 50, // Approximation
      repositories: userData.public_repos || 0,
      stars: totalStars,
      followers: userData.followers || 0,
      streak: 30, // Static value
    })
  } catch (error) {
    console.error('GitHub API Error:', error)
    // Return fallback data in case of error
    return NextResponse.json({
      totalContributions: 500,
      repositories: 10,
      stars: 20,
      followers: 10,
      streak: 30
    })
  }
} 