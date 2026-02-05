# MuCMS Deployment Guide - Windows Server

## Overview
MuCMS (MuOnline Season 19.2 CMS) can be deployed on both **Windows Server** and **Linux**. The architecture is platform-agnostic as long as the environment is properly configured.

---

## Windows Server Deployment Steps

### Prerequisites
- Windows Server 2019/2022
- Node.js 20+ ([Download](https://nodejs.org))
- MySQL 8 (on port 3310 for MuOnline database)
- Redis 7+ (can be external, like Coolify)
- Git

### Step 1: Clone Repository
```powershell
cd C:\Users\Administrator\Documents
git clone <repository-url> MuCMS
cd MuCMS
```

### Step 2: Install Dependencies
```powershell
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ..\client
npm install
```

### Step 3: Configure Environment Variables

**Server** ([server/.env](server/.env)):
```env
# MuOnline CMS Server Environment Variables - Production
APP_PORT=3000
NODE_ENV=production
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
CORS_ORIGIN=https://muonline.kachersoft.io.vn

# Database (MuOnline MySQL on port 3310)
DB_HOST=<db-host-or-ip>
DB_PORT=3310
DB_USER=root
DB_PASSWORD=<db-password>
DB_NAME=muonline

# Redis (Coolify external Redis OR local)
REDIS_HOST=<redis-host-or-ip>
REDIS_PORT=6379
REDIS_PASSWORD=<redis-password>

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
LOG_LEVEL=info
```

**Client** ([client/.env](client/.env)):
```env
VITE_API_URL=/api
VITE_SOCKET_URL=/
```

### Step 4: Build Application
```powershell
# Build backend (TypeScript)
cd server
npm run build

# Build frontend (React)
cd ..\client
npm run build
```

### Step 5: Run Database Migrations
```powershell
cd server
npm run db:migrate
```

### Step 6: Install IIS (Optional - for reverse proxy)
```powershell
Install-WindowsFeature -name Web-Server -IncludeManagementTools
```

### Step 7: Install IIS Modules (URL Rewrite + ARR)
```powershell
# Install Chocolatey first
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install URL Rewrite Module
choco install urlrewrite -y

# Install Application Request Routing
choco install iis-arr -y
```

### Step 8: Configure IIS Reverse Proxy
```powershell
Import-Module WebAdministration

# Enable ARR proxy
Set-WebConfigurationProperty -Filter 'system.webServer/proxy' -PSPath 'MACHINE/WEBROOT/APPHOST' -Name 'enabled' -Value 'true' -Force

# Create website
New-Website -Name 'MuOnlineCMS' -PhysicalPath 'C:\Users\Administrator\Documents\MuCMS\client\dist' -Port 80
```

**web.config** ([client/dist/web.config](client/dist/web.config)):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Reverse Proxy to Node.js" stopProcessing="true">
                    <match url=".*" />
                    <action type="Rewrite" url="http://localhost:3000/{R:0}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

### Step 9: Start Backend Server
```powershell
cd C:\Users\Administrator\Documents\MuCMS\server
npm start
```

### Step 10: Configure Windows Firewall
```powershell
New-NetFirewallRule -DisplayName 'MuOnline CMS - HTTP' -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow -Profile Any
```

### Step 11: Configure Cloudflare (for SSL)
1. Add domain to Cloudflare
2. Point A record to VPS IP
3. Enable proxy (orange cloud)
4. SSL/TLS: Full (strict)

---

## Linux Deployment (Ubuntu/Debian)

### Prerequisites
```bash
sudo apt update
sudo apt install -y nodejs npm git nginx
```

### Environment Variables (same as Windows)
Just copy the `.env` files with proper values.

### Build & Start
```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Build
cd server && npm run build
cd ../client && npm run build

# Run migrations
cd server && npm run db:migrate

# Start with PM2 (recommended)
npm install -g pm2
pm2 start "npm start" --name mucms
pm2 save
pm2 startup
```

### Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name muonline.kachersoft.io.vn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Remote Database Connection

**YES**, you can connect to a database on another server. Configure in [server/.env](server/.env):

```env
# Remote MySQL example
DB_HOST=192.168.1.100
DB_PORT=3310
DB_USER=remote_user
DB_PASSWORD=remote_password
DB_NAME=muonline

# Remote Redis example
REDIS_HOST=148.230.97.237
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

**Requirements:**
- Firewall must allow MySQL port (3310) from web server IP
- MySQL user must have remote access privileges
- Redis port (6379) must be accessible

---

## Architecture Diagram

```
┌─────────────────┐
│  Internet       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Cloudflare     │─────▶│  Windows Server  │
│  (SSL/Proxy)    │      │  ┌────────────┐  │
└─────────────────┘      │  │ IIS (Port  │  │
                          │  │  80)       │  │
                          │  └─────┬──────┘  │
                          │        │         │
                          │        ▼         │
                          │  ┌────────────┐  │
                          │  │ Node.js    │  │
                          │  │ (Port 3000)│  │
                          │  └─────┬──────┘  │
                          │        │         │
                          │        ├────────▶│ Local MySQL
                          │        │         │ (Port 3310)
                          │        │         └──────────────────┘
                          │        │
                          │        └────────▶│ External Redis
                          │                  │ (Coolify)
                          └──────────────────┴──────────────────┘
```

---

## Quick Reference Files

| File | Purpose |
|------|---------|
| [server/.env](server/.env) | Backend environment variables |
| [client/.env](client/.env) | Frontend environment variables |
| [server/package.json](server/package.json) | Backend dependencies & scripts |
| [client/dist/web.config](client/dist/web.config) | IIS reverse proxy config |

---

## Troubleshooting

**Port 3000 already in use:**
```powershell
netstat -ano | findstr :3000
taskkill /F /PID <pid>
```

**Check if backend is running:**
```powershell
curl http://localhost:3000/health
```

**Check IIS logs:** `C:\inetpub\logs\LogFiles\`

**Check application logs:** `server/logs/`
