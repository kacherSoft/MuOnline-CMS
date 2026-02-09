# MuCMS Deployment Guide

## Prerequisites

- Docker & Docker Compose installed
- MySQL/MariaDB database (MuOnline database)
- Domain name configured (for production)
- SSL certificate (for production HTTPS)
- At least 2GB RAM, 1 CPU core

---

## Quick Start (Docker Compose)

### 1. Prepare Environment

```bash
cp .env.production.example .env.production
```

Edit `.env.production`:

```bash
# Database (External MySQL)
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=muuser
DB_PASSWORD=secure_password
DB_NAME=MuOnline

# Redis (Optional, for Socket.io scaling)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_admin_password

# URLs
VITE_API_URL=/api
VITE_SOCKET_URL=/

# Ports
APP_PORT=3000
```

### 2. Start Services

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Check Status

```bash
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs app
```

### 4. Access Application

- Application: `http://localhost:3000`
- API: `http://localhost:3000/api`

---

## Deployment Methods

### Method 1: Docker Compose (Recommended)

**Best for:** Single server, VPS, small deployments

```bash
# Clone repository
git clone https://github.com/yourusername/MuOnline-CMS.git
cd MuOnline-CMS

# Configure environment
cp .env.production.example .env.production
nano .env.production

# Build & start
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f app
```

**With Nginx (SSL/Load Balancing):**

```bash
docker-compose -f docker-compose.prod.yml --profile with-nginx up -d
```

Configure Nginx: `./nginx/nginx.conf`

---

### Method 2: Coolify (PaaS)

**Best for:** Easy deployment, auto-SSL, git-based deployments

1. Create new project in Coolify
2. Connect GitHub repository
3. Configure environment variables
4. Deploy

**Coolify Env Variables:**
```bash
# From coolify-env.example
NODE_ENV=production
DB_HOST=your-db-host
DB_USER=muuser
DB_PASSWORD=your_password
DB_NAME=MuOnline
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password
VITE_API_URL=/api
VITE_SOCKET_URL=/
```

---

### Method 3: Kubernetes

**Best for:** Large scale, high availability, auto-scaling

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mucms-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mucms
  template:
    metadata:
      labels:
        app: mucms
    spec:
      containers:
      - name: mucms
        image: ghcr.io/yourusername/mucms:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: mucms-secrets
              key: db-host
```

Deploy:
```bash
kubectl apply -f k8s/
```

---

### Method 4: Traditional VPS (Node.js)

**Best for:** Full control, custom setup

#### Prerequisites

- Node.js 20+
- PM2 process manager

#### Steps

1. **Install Dependencies:**

```bash
cd server
npm install --production
cd ../client
npm install
npm run build
```

2. **Setup PM2:**

```bash
npm install -g pm2
```

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'mucms',
    script: './server/src/server-entry.ts',
    interpreter: 'tsx',
    instances: 2,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

3. **Start with PM2:**

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Post-Deployment Checklist

- [ ] Application loads at configured URL
- [ ] Database connection successful (check logs)
- [ ] Admin login works
- [ ] Chat messages send/receive
- [ ] Rankings display correctly
- [ ] SSL certificate valid (if HTTPS)
- [ ] Redis connected (if using)
- [ ] Health check returns 200

---

## SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal (cron)
sudo crontab -e
# Add: 0 0 * * * certbot renew --quiet
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

---

## Scaling

### Horizontal Scaling (Multiple Instances)

```yaml
# docker-compose.prod.yml
services:
  app:
    deploy:
      replicas: 3
```

### Redis for Socket.io Scaling

Required for multiple instances to sync Socket.io connections:

```bash
REDIS_HOST=redis-master
REDIS_PASSWORD=your_redis_pass
```

### Database Optimization

For complete database configuration and optimization, see [**Database Documentation**](DATABASE.md).

- Add indexes: `AccountID`, `Name` on Character table
- Connection pooling: Set `DB_POOL_SIZE` env var
- Read replicas: Configure separate read DB host

---

## Monitoring

### Health Check Endpoint

```bash
curl http://localhost:3000/health
```

Response:
```json
{ "status": "ok", "timestamp": "2026-02-06T12:00:00Z" }
```

### Log Monitoring

```bash
# Docker logs
docker-compose -f docker-compose.prod.yml logs -f app

# PM2 logs
pm2 logs mucms
```

### Metrics to Monitor

- Response time (API)
- Chat message latency
- Online players count
- Database query time
- Memory/CPU usage

---

## Backup Strategy

### Database Backup

For detailed database backup and restore procedures, see [**Database Documentation**](DATABASE.md#backup--restore).

Quick backup:
```bash
# Automated daily backup
0 2 * * * mysqldump -u user -p'password' muonline > /backups/muonline_$(date +\%Y\%m\%d).sql
```

### Application Backup

```bash
# Backup uploads
tar -czf uploads_$(date +%Y%m%d).tar.gz ./uploads

# Backup env files
cp .env.production .env.production.backup
```

---

## Troubleshooting

See [**TROUBLESHOOTING.md**](TROUBLESHOOTING.md) for common issues.

**Database Issues:** See [**DATABASE.md**](DATABASE.md#troubleshooting) for:
- Connection problems
- Access denied errors
- Slow queries
- Missing data issues

---

## Security Best Practices

1. **Never commit `.env` files** to git
2. **Use strong passwords** for DB and admin
3. **Enable SSL/TLS** in production
4. **Keep dependencies updated**
5. **Use firewall** (ufw) to restrict ports
6. **Regular backups** of database
7. **Monitor logs** for suspicious activity
8. **Rate limiting** configured on API endpoints

---

## Production Environment Variables

Complete list in `.env.production.example`

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Default: 3000 |
| `DB_HOST` | Yes | Database host |
| `DB_PORT` | No | Default: 3306 |
| `DB_USER` | Yes | Database user |
| `DB_PASSWORD` | Yes | Database password |
| `DB_NAME` | Yes | Database name |
| `REDIS_HOST` | No | Redis host (for scaling) |
| `REDIS_PORT` | No | Default: 6379 |
| `REDIS_PASSWORD` | No | Redis password |
| `JWT_SECRET` | Yes | JWT signing key |
| `JWT_EXPIRES_IN` | No | Default: 7d |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `VITE_API_URL` | No | Default: /api |
| `VITE_SOCKET_URL` | No | Default: / |
| `SOCKET_IO_CORS_ORIGIN` | No | Default: * |
