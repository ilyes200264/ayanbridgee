# 🚀 Quick Deployment Guide

## Prerequisites
- Vercel CLI installed ✅ (version 44.5.3)
- Built project ✅ (dist folder ready)

## Deploy Commands

### 1. First Time Setup
```bash
# Login to Vercel (one-time setup)
vercel login

# Link project to Vercel (one-time setup)
vercel link
```

### 2. Deploy to Preview
```bash
# Deploy to preview URL
vercel

# Or with specific environment
vercel --env preview
```

### 3. Deploy to Production
```bash
# Deploy directly to production
vercel --prod

# Or promote a preview to production
vercel --prod --prebuilt
```

### 4. Advanced Options
```bash
# Deploy with custom domain
vercel --prod --domains your-domain.com

# Deploy with environment variables
vercel --prod --env NODE_ENV=production

# Force new deployment
vercel --prod --force
```

## 📊 Expected Output
```
✅ Deployment ready
🔗 Preview: https://ayanbridge-xyz.vercel.app
🔗 Production: https://your-domain.vercel.app
```

## 🔧 Troubleshooting
- **Auth issues**: Run `vercel logout` then `vercel login`
- **Build issues**: Run `npm run build` first
- **Config issues**: Check `vercel.json` settings

## 📝 Post-Deployment
1. Test all features work correctly
2. Check performance metrics
3. Update DNS if using custom domain
4. Monitor deployment logs via Vercel dashboard