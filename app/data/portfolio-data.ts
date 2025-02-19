export const portfolioData = {
    settings: {
      defaultTemplate: 'modern', // 'modern', 'creative', etc.
      availableTemplates: [
        {
          id: 'modern',
          name: 'Modern',
          description: 'Clean and professional design',
          thumbnail: '/images/templates/modern.jpg' // Add template preview images
        },
        {
          id: 'creative',
          name: 'Creative',
          description: 'Artistic and dynamic layout',
          thumbnail: '/images/templates/creative.jpg'
        }
        // Easy to add more templates in the future
      ]
    },
    personal: {
      name: "Vaibhav Gadhave",
      title: "Software Development Engineer",
      location: "Pune, India",
      email: "vaibhavng7@gmail.com",
      phone: "+91 8855910016",
      summary: "A passionate full-stack developer specializing in Web3, Cloud technologies, and automation solutions.",
      bio: "I'm a dedicated software engineer with expertise in building decentralized applications, automation tools, and full-stack web solutions. Currently working on innovative projects at Lazarus Network while pursuing my B.E. in Computer Engineering.",
      avatar: "/images/avatar.jpg",
      social: {
        github: "https://github.com/vaibhavvvvv",
        twitter: "https://twitter.com/vaibhavng7",
        linkedin: "https://linkedin.com/in/vaibhav-gadhave-0053871b7"
      },
      images: {
        profile: "/images/profile.jpg",
        background: "/images/background.jpg",
        contact: "/images/contact.jpg"
      }
    },
    
    experience: [
      {
        title: "Software Development Engineer",
        company: "Lazarus Network",
        location: "Remote",
        period: "August 2023 - Present",
        type: "Full-time",
        images: {
          company_logo: "/images/experience/1.jpg",
        },
        projects: [
          {
            name: "Autochase",
            description: "Full-stack Auto Parts aggregator web app",
            highlights: [
              "Developed automation system using Golang, Chromedp, React, and Electron",
              "Built admin dashboard for subscription management and analytics",
              "Implemented email authentication and customizable UI features"
            ],
            tech: ["Golang", "React", "JavaScript", "Ant Design", "Supabase", "Docker", "Electron"],
            images: {
              thumbnail: "/images/projects/autochase/thumbnail.jpg",
              screenshots: [
                "/images/projects/autochase/screen1.jpg",
                "/images/projects/autochase/screen2.jpg"
              ]
            }
          },
          {
            name: "NetSepio",
            description: "Multi-platform bot development and AI integration",
            highlights: [
              "Developed bots for Telegram, Discord, and Twitter",
              "Integrated Adguard home into organization's ecosystem",
              "Created AI-powered website data usage summarizer"
            ],
            tech: ["Golang", "Python", "AI/ML", "Bot Development"],
            images: {
              thumbnail: "/images/projects/netsepio/thumbnail.jpg",
              screenshots: [
                "/images/projects/netsepio/telegram.jpg",
                "/images/projects/netsepio/discord.jpg",
                "/images/projects/netsepio/twitter.jpg"
              ]
            }
          },
          {
            name: "Erebrus",
            description: "Decentralized Wi-Fi Rental System",
            highlights: [
              "Developed smart contract integration for automated payments",
              "Created device connection tracking system",
              "Managed cloud infrastructure on AWS and GCP"
            ],
            tech: ["Solidity", "Web3", "Cloud Services", "API Development"],
            images: {
              thumbnail: "/images/projects/erebrus/thumbnail.jpg",
              screenshots: [
                "/images/projects/erebrus/dashboard.jpg",
                "/images/projects/erebrus/payments.jpg",
                "/images/projects/erebrus/devices.jpg"
              ]
            }
          }
        ]
      },
      {
        title: "SDE Intern",
        company: "Bitsmith Technologies Pvt. Ltd.",
        location: "Pune, India",
        period: "April 2023 - June 2023",
        type: "Internship",
        projects: [
          {
            name: "Bitsmith Classrooms",
            description: "Educational platform development",
            highlights: [
              "Developed new features and UI improvements",
              "Managed WordPress website content",
              "Fixed bugs and improved user experience"
            ],
            tech: ["JavaScript", "React", "Ant Design", "WordPress", "Git"]
          }
        ]
      }
    ],
    
    projects: [
      {
        title: "BlogChain",
        description: "BlogChain Is A Decentralized Blogging Application That Allows You To Read, Write And Share Blogs Along With Markdown Capabilities. It Is Made Using, NextJs, TypeScript, Tailwind CSS, Viem, Wagmi, Solidity And Deployed On Polygon Amoy Testnet. It also has text-to-speech capabilities",
        tech: ["nextdotjs", "React", "Typescript", "Solidity","Viem", "Wagmi"],
        github: 'https://github.com/vaibhavvvvv/blogchain',
        live: 'https://blogchain-rho.vercel.app/',
        featured: true,
        images: {
          screenshots: [
            {
              src: "/images/projects/blogchain/1.jpg",
            },
            {
              src: "/images/projects/blogchain/2.jpg",
            },
            {
              src: "/images/projects/blogchain/3.jpg",
            }
          ]
        }
      },
      {
        title: "Machu Piccu: Wonderful Life",
        description: "Wonderful Life is a sub-project of Machu Picchu, an open-source collaborative humnitarian project. Wonderful Life simulates how persons in need of similar profiles can mutually help.",
        tech: ["nextdotjs", "React", "Typescript", "Solidity","ethers.js", "OpenAI", "Eliza", "Privy", "bot","Telegram", "X"],
        github: 'https://github.com/vaibhavvvvv/Project-Wonderful_Life-Machu_Picchu',
        live: 'https://project-wonderful-life-mac-git-70700e-rushikeshnimkars-projects.vercel.app/',
        featured: true,
        images: {
          screenshots: [
            {
              src: "/images/projects/wonderfulLife/1.jpg",
            },
            {
              src: "/images/projects/wonderfulLife/2.jpg",
            },
            {
              src: "/images/projects/wonderfulLife/3.jpg",
            },
            {
              src: "/images/projects/wonderfulLife/4.jpg",
            },
          ]
        }
      }
    ],
    
    skills: {
      "Programming Languages": [
        "Go",
        "JavaScript",
        "Java",
        "Solidity",
        "HTML",
        "CSS",
        "Python"
      ],
      "Libraries & Frameworks": [
        "React",
        "GinGonic",
        "Tailwind CSS",
        "Ant Design",
        "ethers.js",
        "Viem",
        "Hardhat"
      ],
      "Tools & Platforms": [
        "Git",
        "GitHub",
        "Docker",
        "Supabase",
        "Linux",
        "WordPress",
        "Zapier"
      ],
      "Databases": [
        "MongoDB",
        "PostgreSQL",
        "Supabase"
      ]
    },
    
    education: [
      {
        degree: "B.E. Computer Engineering",
        institution: "Sinhgad College of Engineering",
        location: "Pune, India",
        period: "January 2021 - May 2024",
        score: "CGPA: 8.66"
      },
      {
        degree: "HSC - Computer Science",
        institution: "Ferguson College",
        location: "Pune, India",
        period: "2018 - 2020",
        score: "Percentage: 78.63%"
      },
      {
        degree: "SSC",
        institution: "Abhinav Education Society's English Medium School And Jr. College",
        location: "Pune, India",
        period: "2009 - 2018",
        score: "Percentage: 96.00%"
      }
    ],
    
    hackathons: [
      {
        name: "Hackathon Name",
        project: "Project Name",
        position: "Winner/Runner-up",
        description: "Description",
      },
      // Add more hackathons
    ],
  }