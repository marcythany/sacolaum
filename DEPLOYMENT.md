# 🚀 Koyeb Deployment Guide

This guide provides step-by-step instructions for deploying your Node.js + Express + Prisma + PostgreSQL application to Koyeb.

## 📋 Prerequisites

1. **Koyeb Account**: Sign up at [koyeb.com](https://koyeb.com)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)
3. **PostgreSQL Database**: Set up a PostgreSQL database (see options below)

## 🗄️ Database Setup

### Option 1: Koyeb Managed PostgreSQL (Recommended)

1. In your Koyeb dashboard, go to **Databases**
2. Click **Create Database**
3. Choose **PostgreSQL**
4. Select your plan (Free tier available)
5. Note the connection string: `postgresql://username:password@host:port/database`

### Option 2: External PostgreSQL

You can use any PostgreSQL provider:

- **Supabase** (Free tier available)
- **ElephantSQL** (Free tier available)
- **AWS RDS**
- **Google Cloud SQL**
- **DigitalOcean Managed Databases**

## 🔧 Pre-Deployment Configuration

### 1. Environment Variables

Create a `.env` file in your project root:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Server
PORT=8080
NODE_ENV=production
```

### 2. Update Koyeb Configuration

Edit `koyeb.yaml` and update:

- Repository URL
- Branch name (if not `main`)
- Any custom domains

### 3. Test Locally

Before deploying, test your application:

```bash
# Install dependencies
npm run install-backend
npm run install-frontend

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build frontend
npm run build-frontend

# Start application
npm start
```

## 🚀 Deployment Steps

### Method 1: Using Koyeb Web Interface

1. **Connect Repository**

   - Go to [app.koyeb.com](https://app.koyeb.com)
   - Click **Create App**
   - Choose **GitHub** or **GitLab**
   - Select your repository

2. **Configure Build Settings**

   - **Build Type**: Docker
   - **Dockerfile path**: `./Dockerfile`
   - **Working directory**: `/` (leave empty)

3. **Environment Variables**

   - Add the following environment variables:
     ```
     DATABASE_URL=postgresql://username:password@host:port/database
     NODE_ENV=production
     PORT=8080
     ```

4. **Deploy**
   - Click **Deploy**
   - Monitor the build logs
   - Your app will be available at `https://your-app.koyeb.app`

### Method 2: Using Koyeb CLI

1. **Install Koyeb CLI**

   ```bash
   # macOS
   brew install koyeb/tap/koyeb

   # Linux/Windows
   curl -fsSL https://github.com/koyeb/koyeb-cli/releases/latest/download/install.sh | sh
   ```

2. **Login to Koyeb**

   ```bash
   koyeb auth login
   ```

3. **Deploy Application**
   ```bash
   koyeb apps create your-app-name \
     --git github.com/yourusername/your-repo \
     --git-branch main \
     --ports 8080:http \
     --env NODE_ENV=production \
     --env PORT=8080 \
     --env DATABASE_URL=postgresql://username:password@host:port/database
   ```

## 🔍 Troubleshooting

### Build Issues

**Problem**: Prisma client generation fails

```bash
# Solution: Ensure DATABASE_URL is set during build
npx prisma generate --schema=./prisma/schema.prisma
```

**Problem**: Frontend build fails

```bash
# Check if all frontend dependencies are installed
cd frontend && npm install
npm run build
```

### Runtime Issues

**Problem**: Database connection fails

- Verify `DATABASE_URL` format
- Ensure database is accessible from Koyeb
- Check firewall settings

**Problem**: Port binding issues

- Koyeb uses port 8080 by default
- Update your server.js to use `process.env.PORT || 8080`

**Problem**: Health check fails

- Ensure `/api/products` endpoint is working
- Check server logs in Koyeb dashboard

## 📊 Monitoring & Logs

### View Application Logs

```bash
# Using Koyeb CLI
koyeb apps logs your-app-name

# Or via Web Dashboard
# Go to your app → Logs tab
```

### Health Checks

- Koyeb automatically monitors `/api/products` endpoint
- Configure custom health checks in `koyeb.yaml`

## 🔄 Updates & Rollbacks

### Deploy Updates

```bash
# Push changes to your repository
git add .
git commit -m "Update application"
git push origin main

# Koyeb will automatically redeploy
```

### Rollback

- Go to Koyeb dashboard
- Select your app
- Go to **Deployments** tab
- Click **Rollback** on a previous deployment

## 🌐 Custom Domains

1. Go to your app in Koyeb dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Configure DNS records as instructed

## 💰 Cost Optimization

### Free Tier Limits

- 1GB RAM
- 2GB storage
- 100GB outbound traffic/month

### Scaling

- Configure auto-scaling in `koyeb.yaml`
- Monitor usage in dashboard
- Upgrade plan if needed

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit secrets to code
2. **Database Security**: Use strong passwords, enable SSL
3. **Network Security**: Configure proper firewall rules
4. **Updates**: Keep dependencies updated regularly

## 📞 Support

- **Koyeb Documentation**: https://docs.koyeb.com
- **Community**: https://community.koyeb.com
- **Status Page**: https://status.koyeb.com

## 🎯 Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Database operations
npx prisma generate
npx prisma db push
npx prisma studio

# Koyeb CLI
koyeb apps list
koyeb apps logs your-app-name
koyeb apps redeploy your-app-name
```

---

**Happy Deploying! 🚀**
