# AyanBridge Deployment Guide

This guide explains how to deploy AyanBridge with environment variable configuration for easy management across different environments.

## Environment Variables

### Frontend (.env)

The frontend uses Vite environment variables (prefixed with `VITE_`):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=30000

# Supabase Configuration (if needed for frontend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Environment
VITE_NODE_ENV=development
```

### Backend (server/.env) - Traditional Server

The traditional server uses standard environment variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Supabase Storage Configuration
SUPABASE_S3_ENDPOINT=https://your-project.storage.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=us-east-1
SUPABASE_S3_ACCESS_KEY_ID=your_access_key_here
SUPABASE_S3_SECRET_ACCESS_KEY=your_secret_key_here
SUPABASE_S3_BUCKET=pdfs

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Serverless API (Vercel Environment Variables)

For the serverless API deployed on Vercel, set these environment variables in your Vercel project:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# PDF Storage Configuration
PDF_BUCKET_NAME=pdfs

# Environment
NODE_ENV=production
```

## Deployment Scenarios

### 1. Development (Local)

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_NODE_ENV=development
```

**Backend (server/.env):**
```env
PORT=3001
NODE_ENV=development
```

### 2. Staging

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://staging-api.ayanbridge.com/api
VITE_NODE_ENV=staging
```

**Backend (server/.env):**
```env
PORT=3001
NODE_ENV=staging
```

### 3. Production

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://api.ayanbridge.com/api
VITE_NODE_ENV=production
```

**Backend (server/.env):**
```env
PORT=3001
NODE_ENV=production
```

## Architecture Overview

### Serverless Architecture (Recommended)

The project now supports a serverless architecture using Vercel's serverless functions:

- **Frontend**: React/Vite application deployed to Vercel
- **API**: Serverless functions in `/api` folder deployed to Vercel
- **Database**: Supabase for data storage
- **File Storage**: Supabase Storage for PDF files

### Traditional Server Architecture (Alternative)

For development or if you prefer a traditional server setup:

- **Frontend**: React/Vite application
- **Backend**: Express.js server in `/server` folder
- **Database**: Supabase for data storage
- **File Storage**: Supabase Storage for PDF files

## Platform-Specific Deployment

### Vercel (Frontend + Serverless API)

1. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:

   ```
   # Frontend Variables
   VITE_API_BASE_URL = https://your-domain.vercel.app/api
   VITE_NODE_ENV = production
   
   # Serverless API Variables
   SUPABASE_URL = https://your-project.supabase.co
   SUPABASE_ANON_KEY = your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY = your_service_role_key_here
   PDF_BUCKET_NAME = pdfs
   NODE_ENV = production
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

   The serverless API will be automatically deployed to `/api/*` routes.

### Railway/Render (Backend)

1. **Set Environment Variables:**
   - Add all backend environment variables in your platform's dashboard
   - Make sure to use production Supabase credentials

2. **Deploy:**
   ```bash
   # Railway
   railway deploy
   
   # Render
   # Connect your GitHub repo and it will auto-deploy
   ```

### Docker Deployment

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_BASE_URL=http://backend:3001/api
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    env_file:
      - ./server/.env
```

## Environment Variable Management

### Using .env Files

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   ```

2. **Update with your values:**
   - Replace placeholder values with actual credentials
   - Update URLs for your deployment environment

### Using Platform Environment Variables

Most deployment platforms allow you to set environment variables directly:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Railway**: Project → Variables
- **Render**: Environment → Environment Variables

## Security Best Practices

1. **Never commit .env files:**
   ```gitignore
   .env
   .env.local
   .env.production
   server/.env
   ```

2. **Use different credentials for different environments:**
   - Development: Local Supabase project
   - Staging: Staging Supabase project
   - Production: Production Supabase project

3. **Rotate keys regularly:**
   - Update Supabase keys periodically
   - Use service role keys only on backend
   - Use anon keys for frontend when needed

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure backend CORS is configured for your frontend domain
   - Check that API_BASE_URL is correct

2. **Environment Variables Not Loading:**
   - Restart your development server after changing .env
   - Ensure variables are prefixed with `VITE_` for frontend
   - Check that .env files are in the correct directories

3. **API Connection Issues:**
   - Verify API_BASE_URL is accessible
   - Check that backend is running on the specified port
   - Ensure firewall/network allows connections

### Debugging

1. **Check environment variables:**
   ```javascript
   console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
   ```

2. **Test API connectivity:**
   ```bash
   curl http://localhost:3001/api/health
   ```

3. **Check browser network tab:**
   - Look for failed requests
   - Verify request URLs are correct
