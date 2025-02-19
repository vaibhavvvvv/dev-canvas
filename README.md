# DevCanvas

A customizable, multi-template portfolio website for developers - just fork, update your data file, and deploy. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Features

- Multiple template designs (Modern & Creative)
- Smooth animations and transitions
- Fully responsive
- GitHub stats integration
- Tech stack showcase
- Easy customization through a single file
- SEO optimized
- Fast page loads


## 🚀 Quick Start

1. Fork this repository
2. Clone your forked repository
```bash
git clonehttps://github.com/vaibhavvvvv/dev-canvas.git
cd dev-canvas
```
3. Install dependencies
```bash
npm install
# or
yarn install
```
4. Update your data
```typescript
// app/data/portfolio-data.ts
export const portfolioData = {
  personal: {
    name: "Your Name",
    role: "Your Role",
    bio: "Your Bio",
    // ... other personal details
  },
  social: {
    github: "your-github-username",
    linkedin: "your-linkedin-url",
    // ... other social links
  },
  // ... customize other sections
}
```
5. Run development server
```bash
npm run dev
# or
yarn dev
```
6. Deploy on Vercel
```bash
npm run deploy
```

## 📝 Customization Guide

### Choosing a Template
Switch between templates using the template switcher in the top right corner or set a default in your config:
```typescript
// app/config/site.ts
export const siteConfig = {
  defaultTemplate: 'modern' // or 'creative'
}
```

### Adding Your Projects
```typescript
// app/data/portfolio-data.ts
projects: [
  {
    title: "Project Name",
    description: "Project Description",
    image: "/path/to/image.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://project-url.com",
    github: "https://github.com/username/project"
  }
]
```

### Customizing Colors
Modify the theme colors in your Tailwind config:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        // ... add your colors
      }
    }
  }
}
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### What to Contribute

- 🎨 New templates
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎯 Performance optimizations

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.


## 💬 Support

If you have any questions or need help, feel free to:
- Open an issue
- Start a discussion
- Reach out on [Twitter](https://twitter.com/vaibhavng7) or [LinkedIn](https://www.linkedin.com/in/vaibhav-gadhave-0053871b7/)

---
⭐ Star this repo if you find it helpful!
