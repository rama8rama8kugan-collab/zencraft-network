# ZenCraft Network

A premium, production-quality full-stack website for **ZenCraft Network**, a Tamil Minecraft server.

## 🎮 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Premium Design**: Minecraft-inspired dark theme with glassmorphism
- **Game Integration**: Minecraft login via Mojang API, player profiles
- **E-Commerce**: Complete store with ranks, cosmetics, keys, and more
- **Payment Gateway**: Razorpay integration for UPI, cards, and more
- **User Dashboard**: Profile management, purchase history, inventory
- **Admin Panel**: Comprehensive management system with role-based access
- **Discord Integration**: Live member count, server stats
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Responsive**: Mobile-first design, works on all devices
- **Dark Mode**: Modern dark theme with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL (via Supabase recommended)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/rama8rama8kugan-collab/zencraft-network.git
cd zencraft-network

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Setup Prisma
npm run prisma:generate
npm run prisma:migrate

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
zencraft-network/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable React components
│   ├── lib/             # Utilities and helpers
│   ├── types/           # TypeScript type definitions
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state management
│   └── styles/          # Global styles
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── scripts/             # Utility scripts
└── docs/                # Documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 🎨 Design System

### Colors
- **Dark**: `#0a0e27`
- **Dark Secondary**: `#1a1f3a`
- **Purple**: `#9d4edd`
- **Cyan**: `#00d9ff`
- **Emerald**: `#00d084`

### Features
- Glassmorphism effects
- Smooth animations with Framer Motion
- Responsive layouts
- Professional typography

## 🔐 Security

- Helmet.js for security headers
- Rate limiting on API routes
- Input validation with Zod
- XSS and CSRF protection
- SQL injection prevention via Prisma
- Secure cookie handling
- JWT authentication for admin panel

## 📦 Deployment

The project is configured for deployment on:
- **Render** (recommended)
- **Vercel**
- **Railway**
- **Any Node.js hosting provider**

### Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

## 📚 Documentation

See [docs/](./docs) for detailed documentation on:
- Setup and configuration
- API routes
- Database schema
- Admin panel usage
- Payment integration

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and create feature branches.

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For support, visit:
- Discord: [ZenCraft Network Discord]
- Email: support@zencraft.in
- Website: https://zencraft.in

---

**Made with ❤️ by ZenCraft Network Team**
