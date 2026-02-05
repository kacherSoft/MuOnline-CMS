# MuCMS - MuOnline Season 19.2 CMS

A modern Content Management System for MuOnline Season 19.2, built with React 18, Node.js 20, and TypeScript.

## Features

- **Chat-First Architecture** - Real-time WebSocket communication
- **JWT Authentication** - Secure token-based auth with refresh tokens
- **Modern UI** - React 18 + Vite + Tailwind CSS
- **Type-Safe** - Full TypeScript coverage
- **RESTful API** - Express.js with proper middleware
- **Database Support** - MySQL 8 with migrations
- **Caching** - Redis for session and data caching
- **Responsive Design** - Mobile-friendly interface

## Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Socket.io Client

### Backend
- Node.js 20+
- Express.js
- TypeScript
- Socket.io
- MySQL 8
- Redis 7+
- JWT (jsonwebtoken)

## Project Structure

```
MuCMS/
├── client/                 # React frontend
│   ├── src/               # Source files
│   ├── dist/              # Built files
│   ├── .env.example       # Environment template
│   └── package.json
├── server/                # Node.js backend
│   ├── src/               # Source files
│   │   ├── config/        # Configuration
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utilities
│   ├── logs/              # Application logs
│   ├── uploads/           # User uploads
│   ├── .env.example       # Environment template
│   └── package.json
├── docs/                  # Documentation
│   └── deployment-guide-windows.md
└── plans/                 # Implementation plans
```

## Quick Start

### Prerequisites

- Node.js 20+
- MySQL 8
- Redis 7+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url> MuCMS
cd MuCMS
```

2. **Install dependencies**
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

3. **Configure environment**

Copy `.env.example` to `.env` in both `server/` and `client/` directories and configure:

**Server `.env`:**
```env
# Server
APP_PORT=3000
NODE_ENV=development
JWT_SECRET=your-jwt-secret-here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=3310
DB_USER=root
DB_PASSWORD=your-db-password
DB_NAME=muonline

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
LOG_LEVEL=debug
```

**Client `.env`:**
```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

4. **Run database migrations**
```bash
cd server
npm run db:migrate
```

5. **Start development servers**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

## Production Deployment

### Linux (Recommended - Coolify/VPS)

#### Using Coolify (Recommended)

1. **Create new project in Coolify**
2. **Select Docker Compose or Nixpacks**
3. **Configure environment variables**
4. **Deploy**

#### Manual Linux Deployment

1. **Install dependencies**
```bash
sudo apt update
sudo apt install -y nodejs npm nginx git
```

2. **Clone and setup**
```bash
cd /var/www
git clone <repository-url> mucms
cd mucms

# Install dependencies
cd server && npm install
cd ../client && npm install

# Build
cd server && npm run build
cd ../client && npm run build

# Run migrations
cd server && npm run db:migrate
```

3. **Setup PM2 (Process Manager)**
```bash
npm install -g pm2

# Start server
cd /var/www/mucms/server
pm2 start "npm start" --name mucms

# Save PM2 config
pm2 save
pm2 startup
```

4. **Configure Nginx reverse proxy**

Create `/etc/nginx/sites-available/mucms`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/ssl/certs/your-cert.pem;
    ssl_certificate_key /etc/ssl/private/your-key.pem;

    # Reverse proxy to Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    # Static files caching
    location /assets {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/mucms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Windows Server

See [docs/deployment-guide-windows.md](docs/deployment-guide-windows.md) for detailed Windows deployment instructions.

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `APP_PORT` | Server port | 3000 | No |
| `NODE_ENV` | Environment | development | No |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `JWT_EXPIRES_IN` | Access token expiry | 15m | No |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh token expiry | 7d | No |
| `CORS_ORIGIN` | Allowed CORS origin | * | Yes |
| `DB_HOST` | MySQL host | localhost | Yes |
| `DB_PORT` | MySQL port | 3306 | No |
| `DB_USER` | MySQL user | root | Yes |
| `DB_PASSWORD` | MySQL password | - | Yes |
| `DB_NAME` | Database name | muonline | Yes |
| `REDIS_HOST` | Redis host | localhost | Yes |
| `REDIS_PORT` | Redis port | 6379 | No |
| `REDIS_PASSWORD` | Redis password | - | No |
| `UPLOAD_DIR` | Upload directory | ./uploads | No |
| `MAX_FILE_SIZE` | Max upload size (bytes) | 5242880 | No |
| `LOG_LEVEL` | Logging level | info | No |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)

### Server Settings
- `GET /api/server-settings` - Get settings
- `PUT /api/server-settings` - Update settings (admin)

### Health
- `GET /health` - Health check endpoint

## Development Scripts

### Server
```bash
npm run dev        # Start development server with tsx
npm run build      # Compile TypeScript
npm start          # Start production server
npm run db:migrate # Run database migrations
npm run db:reset   # Reset database
```

### Client
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Database Schema

The application uses MySQL 8 with the following main tables:

- `users` - User accounts
- `news` - News articles
- `server_settings` - Server configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For issues and questions, please contact the development team.

---

**Version:** 1.0.0
**Season:** 19.2
**Last Updated:** February 2026
