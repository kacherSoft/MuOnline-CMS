# ============================================================
# MuCMS - MuOnline Season 19.2 CMS - Production Dockerfile
# Multi-stage build for Coolify deployment
# ============================================================

# Build arguments for client-side environment variables
ARG VITE_API_URL=/api
ARG VITE_SOCKET_URL=/

# ------------------------------------------------------------
# Stage 1: Build Client (React + Vite)
# ------------------------------------------------------------
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Copy all client source first
COPY client/ ./

# Build client for production with environment variables
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}
RUN npm install && \
    chmod -R +x node_modules/.bin && \
    npm run build

# ------------------------------------------------------------
# Stage 2: Production Image
# ------------------------------------------------------------
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy all server source
COPY server/ ./

# Install all dependencies (including tsx for TypeScript execution)
RUN npm install && \
    npm cache clean --force

# Copy built client from client-builder stage
COPY --from=client-builder /app/client/dist ./client/dist

# Create necessary directories
RUN mkdir -p uploads logs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

WORKDIR /app

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })"

# Set default environment
ENV NODE_ENV=production

# Start with dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["npx", "tsx", "src/server-entry.ts"]
