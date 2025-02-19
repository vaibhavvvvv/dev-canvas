import * as SimpleIcons from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

export const getTechnologyLogo = (technology: string): string => {
  // Normalize the technology name to match simple-icons format
  const normalizedName = technology.toLowerCase()
    .replace('.', '')
    .replace(/\s+/g, '')

  // Try to find the icon
  const iconKey = Object.keys(SimpleIcons).find(
    key => key.toLowerCase() === `si${normalizedName}`
  )

  if (iconKey) {
    const icon = SimpleIcons[iconKey as keyof typeof SimpleIcons] as SimpleIcon
    // Create white SVG
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
      <path d="${icon.path}"/>
    </svg>`
    const encodedSvg = encodeURIComponent(svg)
    return `data:image/svg+xml,${encodedSvg}`
  }

  // Return a default white icon if not found
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z"/></svg>`
}