# MuCMS Troubleshooting Guide

## Common Issues & Solutions

---

## Database Issues

### Problem: "ECONNREFUSED" / Database Connection Failed

**Symptoms:**
- App starts but immediately crashes
- Logs show "ECONNREFUSED" or "Connection refused"

**Solutions:**

1. **Verify database is running:**
   ```bash
   # MySQL
   systemctl status mysql
   # Or check Docker
   docker ps | grep mysql
   ```

2. **Check connection details in `.env`:**
   ```bash
   DB_HOST=127.0.0.1  # Not "localhost" if using MySQL 8+ auth
   DB_PORT=3306
   DB_USER=muuser
   DB_PASSWORD=correct_password
   DB_NAME=MuOnline
   ```

3. **Test connection manually:**
   ```bash
   mysql -h 127.0.0.1 -u muuser -p MuOnline
   ```

4. **Check firewall:**
   ```bash
   sudo ufw allow 3306
   # Or for Docker
   sudo ufw allow from 172.16.0.0/12 to any port 3306
   ```

5. **MySQL 8+ auth issue:** Change user to use mysql_native_password:
   ```sql
   ALTER USER 'muuser'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
   FLUSH PRIVILEGES;
   ```

---

### Problem: "Table doesn't exist"

**Symptoms:**
- API returns error about missing table
- Query failed: "Table 'MuOnline.XXX' doesn't exist"

**Solutions:**

1. **Run database migrations:**
   ```bash
   cd server
   npm run migration
   ```

2. **Verify tables exist:**
   ```sql
   USE MuOnline;
   SHOW TABLES;
   ```

3. **Create missing tables manually** (see database/schema.sql)

---

### Problem: Slow Queries / Timeouts

**Symptoms:**
- Rankings take >5 seconds to load
- Chat messages delayed
- Database timeout errors

**Solutions:**

1. **Add indexes:**
   ```sql
   CREATE INDEX idx_character_resets ON Character(Resets DESC);
   CREATE INDEX idx_character_name ON Character(Name);
   CREATE INDEX idx_account_id ON Character(AccountID);
   ```

2. **Check query execution:**
   ```sql
   EXPLAIN SELECT * FROM Character ORDER BY Resets DESC LIMIT 20;
   ```

3. **Enable query caching:**
   ```bash
   # In my.cnf
   query_cache_type = 1
   query_cache_size = 16M
   ```

4. **Use Redis caching** (configure in .env):
   ```bash
   REDIS_HOST=redis
   REDIS_PORT=6379
   ```

---

## Chat / Socket.io Issues

### Problem: Chat messages not appearing

**Symptoms:**
- Messages sent but not received
- No error in console
- Socket shows "connected" status

**Solutions:**

1. **Check Socket.io connection:**
   - Open browser DevTools → Network → WS
   - Look for socket.io connection
   - Should show status: 101 Switching Protocols

2. **Verify server Socket.io is running:**
   ```bash
   # Check logs
   docker-compose -f docker-compose.prod.yml logs app | grep socket
   # Should see: "Socket.io server started"
   ```

3. **Check CORS settings:**
   ```bash
   # In .env
   SOCKET_IO_CORS_ORIGIN=https://yourdomain.com
   ```

4. **Test Socket.io manually:**
   ```javascript
   // In browser console
   const socket = io('http://localhost:3000');
   socket.on('connect', () => console.log('Connected'));
   socket.on('message', (msg) => console.log('Message:', msg));
   ```

---

### Problem: "Socket.io connection failed"

**Symptoms:**
- Socket shows "disconnected" status
- Error: "Connection failed" or "Transport error"

**Solutions:**

1. **Check if port is open:**
   ```bash
   sudo ufw allow 3000
   # Or for specific IP
   sudo ufw allow from YOUR_IP to any port 3000
   ```

2. **Verify Nginx WebSocket config:**
   ```nginx
   location /socket.io/ {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
   }
   ```

3. **Check if Redis is running (multi-instance):**
   ```bash
   docker-compose -f docker-compose.prod.yml ps redis
   ```

4. **Test with direct connection (bypass Nginx):**
   ```bash
   curl http://localhost:3000/socket.io/?EIO=4
   # Should return handshake response
   ```

---

## Authentication Issues

### Problem: "Invalid token" / 401 Unauthorized

**Symptoms:**
- Login works but API calls return 401
- Token stored but rejected

**Solutions:**

1. **Check JWT_SECRET matches:**
   ```bash
   # In .env on both client and server
   JWT_SECRET=same-secret-string
   ```

2. **Verify token format:**
   ```javascript
   // Should be "Bearer token"
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Check token expiration:**
   ```bash
   # In .env
   JWT_EXPIRES_IN=7d  # Increase if needed
   ```

4. **Decode token to verify:**
   ```javascript
   // In browser console
   const token = localStorage.getItem('token');
   const payload = JSON.parse(atob(token.split('.')[1]));
   console.log('Expires:', new Date(payload.exp * 1000));
   ```

---

### Problem: Admin login fails

**Symptoms:**
- Admin credentials rejected
- "User not found" or "Wrong password"

**Solutions:**

1. **Verify admin credentials:**
   ```bash
   # In .env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_admin_password
   ```

2. **Restart application after changing credentials:**
   ```bash
   docker-compose -f docker-compose.prod.yml restart app
   ```

3. **Check if admin user exists in database:**
   ```sql
   USE MuOnline;
   SELECT * FROM MEMB_INFO WHERE memb___id = 'admin';
   ```

4. **Reset admin password** (if using database auth):
   ```sql
   USE MuOnline;
   UPDATE MEMB_INFO SET memb__pwd = 'new_hash' WHERE memb___id = 'admin';
   ```

---

## Build & Deployment Issues

### Problem: Build fails with TypeScript errors

**Symptoms:**
- `npm run build` fails
- TypeScript compilation errors

**Solutions:**

1. **Run typecheck to see all errors:**
   ```bash
   cd server
   npm run typecheck
   cd ../client
   npm run typecheck
   ```

2. **Fix missing type definitions:**
   ```bash
   # Install missing @types packages
   npm install -D @types/package-name
   ```

3. **Update tsconfig.json** if needed (server/tsconfig.json, client/tsconfig.json)

4. **Clean and rebuild:**
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

---

### Problem: Docker build fails

**Symptoms:**
- `docker-compose build` fails
- "Module not found" errors

**Solutions:**

1. **Clear Docker cache:**
   ```bash
   docker system prune -a
   ```

2. **Build with no cache:**
   ```bash
   docker-compose build --no-cache
   ```

3. **Check Dockerfile syntax:**
   ```bash
   docker build -t test -f Dockerfile .
   ```

4. **Verify base image available:**
   ```bash
   docker pull node:20-alpine
   ```

---

## Performance Issues

### Problem: High memory usage

**Symptoms:**
- Container gets killed (OOM)
- Node process crashes

**Solutions:**

1. **Increase Node.js memory limit:**
   ```bash
   # In Dockerfile CMD
   CMD ["node", "--max-old-space-size=2048", "dist/server-entry.js"]
   ```

2. **Check for memory leaks:**
   ```bash
   # Install clinic.js
   npm install -g clinic
   clinic doctor -- node dist/server-entry.js
   ```

3. **Reduce instance count:**
   ```yaml
   # docker-compose.prod.yml
   deploy:
     replicas: 1  # Reduce if low memory
   ```

4. **Optimize database queries** (add indexes, use Redis cache)

---

### Problem: Slow page load

**Symptoms:**
- Initial load >5 seconds
- Browser shows "Waiting for..."

**Solutions:**

1. **Enable gzip compression** (Nginx):
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **Bundle size analysis:**
   ```bash
   cd client
   npm run build
   # Check output for bundle sizes
   # Should be <500KB gzipped
   ```

3. **Use CDN for static assets** (configure in Vite)

4. **Enable HTTP/2** (Nginx):
   ```nginx
   listen 443 ssl http2;
   ```

5. **Optimize images:**
   ```bash
   # Convert to WebP
   cwebp -q 80 input.png -o output.webp
   ```

---

## Log Locations

### Docker

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs app

# Follow logs
docker-compose -f docker-compose.prod.yml logs -f app

# Specific service
docker-compose -f docker-compose.prod.yml logs redis
```

### PM2

```bash
# View logs
pm2 logs mucms

# Clear logs
pm2 flush

# Log file location
~/.pm2/logs/
```

### Application Logs

Server logs: `server/logs/`
- `combined.log` - All logs
- `error.log` - Errors only

---

## Getting Help

### Information to Provide

When reporting issues, include:

1. **Environment:**
   - OS/Distribution
   - Node.js version (`node -v`)
   - Docker version (`docker -v`)

2. **Configuration:**
   - `.env` file (hide sensitive data)
   - Docker/PM2 config

3. **Logs:**
   - Application logs (last 100 lines)
   - Error messages

4. **Steps to reproduce:**
   - What you did
   - What you expected
   - What actually happened

### Emergency Procedures

**If application is completely down:**

1. Check database connectivity
2. Restart Docker containers
3. Restore from last backup
4. Contact hosting provider

**If chat is not working:**

1. Check Socket.io connection
2. Verify Redis is running
3. Check WebSocket proxy config (Nginx)
4. Review browser console for errors

**If admin dashboard is inaccessible:**

1. Verify admin credentials
2. Check JWT token in localStorage
3. Review server logs for auth errors
4. Reset admin password if needed
