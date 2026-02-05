# Coolify Deployment Guide

This guide covers deploying MuCMS to Coolify using Docker Compose with external MySQL and Redis.

## Prerequisites

- Coolify instance running (v4+)
- Git repository with MuCMS code
- External MySQL 8 database
- External Redis 7+ instance
- Domain name configured (optional but recommended)

## Quick Start

### 1. Prepare Your Repository

Ensure your repository has:
- [x] `Dockerfile` in root
- [x] `docker-compose.yml` in root (configured for external services)
- [x] `.dockerignore` in root
- [x] `coolify-env.example` as environment reference

### 2. Create Project in Coolify

1. **Create New Project**
   - Click "New Project" in Coolify
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Choose repository

2. **Select Deployment Type**
   - Choose "Docker Compose"
   - Coolify will detect `docker-compose.yml`

3. **Configure Environment Variables**

Copy all variables from [coolify-env.example](../coolify-env.example) to Coolify's environment variables:

```bash
# ============================================================
# REQUIRED - Set these values
# ============================================================
JWT_SECRET=generate-secure-random-string
DB_HOST=your-mysql-host
DB_PORT=3310
DB_USER=root
DB_PASSWORD=your-mysql-password
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
CORS_ORIGIN=https://your-domain.coolify.com

# ============================================================
# CLIENT BUILD VARIABLES (baked into bundle)
# ============================================================
VITE_API_URL=/api
VITE_SOCKET_URL=/

# ============================================================
# OPTIONAL - These have defaults
# ============================================================
NODE_ENV=production
APP_PORT=3000
DB_NAME=muonline
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
LOG_LEVEL=info
```

### 3. Deploy

1. Click "Deploy" in Coolify
2. Wait for build to complete (2-5 minutes)
3. Access your application

## Configuration

### Domain Configuration

1. Go to your service in Coolify
2. Click "Domains"
3. Add your custom domain (e.g., `muonline.example.com`)
4. Coolify will auto-configure SSL (Let's Encrypt)

### Vite Client Environment Variables

The following variables are baked into the client bundle at **build time**:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | API endpoint path |
| `VITE_SOCKET_URL` | `/` | WebSocket endpoint path |

**Important:** These must be set as **build args** in Coolify if using custom values. The docker-compose.yml already includes them as build arguments.

### Database Connection

The docker-compose.yml is configured for **external MySQL**. Ensure:

- MySQL is accessible from Coolify server
- Firewall allows connection on specified port
- User has proper permissions

### Redis Connection

The docker-compose.yml is configured for **external Redis**. Ensure:

- Redis is accessible from Coolify server
- If password protected, set `REDIS_PASSWORD`
- Test connectivity before deploying

### Resource Limits

Add to `docker-compose.yml` if needed:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Post-Deployment

### 1. Run Database Migrations

Via Coolify terminal:
```bash
cd /app
npx tsx server/database/run-migrations.ts
```

### 2. Verify Health

Check health endpoint:
```bash
curl https://your-domain.coolify.com/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": 1234567890,
  "uptime": 123.45,
  "environment": "production"
}
```

### 3. Verify WebSocket

Open browser console and test Socket.IO connection.

## Troubleshooting

### Build Failures

```bash
# Test build locally
docker build -t mucms-test .

# Check build logs in Coolify
# Services → Your Service → Logs
```

### Database Connection Issues

```bash
# Test MySQL connection from Coolify server
mysql -h YOUR_DB_HOST -P 3310 -u root -p

# Check if port is accessible
telnet YOUR_DB_HOST 3310
```

### Redis Connection Issues

```bash
# Test Redis connection from Coolify server
redis-cli -h YOUR_REDIS_HOST -p 6379 -a YOUR_PASSWORD ping

# Check if port is accessible
telnet YOUR_REDIS_HOST 6379
```

### WebSocket Issues

If Socket.IO fails:
1. Verify `CORS_ORIGIN` matches your exact domain
2. Check Coolify proxy settings support WebSocket
3. Ensure `VITE_SOCKET_URL` is correct (`/` for same domain)

### Health Check Failing

```bash
# Check app logs in Coolify
# Services → Your Service → Logs

# Manual health check from inside container
docker exec -it mucms-app sh
wget -qO- http://localhost:3000/health
```

## Security Best Practices

### Secrets Management
- Never commit `.env` files to git
- Use Coolify's environment variables only
- Generate strong JWT secret: `openssl rand -hex 32`
- Rotate secrets periodically

### Network Security
- Use HTTPS (Coolify auto-configures)
- Restrict database access to Coolify IP only
- Enable Redis password protection
- Use firewall to limit access

### Updates
- Keep base images updated (`node:20-alpine`)
- Update dependencies regularly
- Monitor security advisories

## Monitoring

### Logs

View logs in Coolify UI:
```
Services → Your Service → Logs
```

### Metrics

Coolify provides built-in metrics:
- CPU usage
- Memory usage
- Disk usage
- Network traffic

## Backup Strategy

### Database Backup

Since MySQL is external, use your existing backup solution or:

```bash
# From a server with MySQL access
mysqldump -h YOUR_DB_HOST -P 3310 -u root -p muonline > mucms-backup-$(date +%Y%m%d).sql
```

### Application Data Backup

```bash
# Backup uploads volume
docker run --rm -v mucms_uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads-backup.tar.gz -C /data .
```

## Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Coolify       │     │  External MySQL │
│                 │────▶│  Port 3310      │
│  ┌───────────┐  │     └─────────────────┘
│  │   App     │  │
│  │ Container │  │     ┌─────────────────┐
│  │           │  │────▶│  External Redis │
│  └───────────┘  │     │  Port 6379      │
│                 │     └─────────────────┘
└─────────────────┘
         │
         ▼
    User Browser
```

## Additional Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [MuCMS README](../README.md)
- [Environment Reference](../coolify-env.example)
