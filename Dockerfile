# ============================================================
# MuCMS - MuOnline Season 19.2 CMS - Production Dockerfile
# Multi-stage build for Coolify deployment
# ============================================================

# ------------------------------------------------------------
# Stage 1: Build Client (React + Vite)
# ------------------------------------------------------------
FROM node:20-alpine AS client-builder

# Build arguments for client-side environment variables
ARG VITE_API_URL=/api
ARG VITE_SOCKET_URL=/

WORKDIR /app/client

# Copy package.json first for better layer caching
COPY client/package.json ./

# Install dependencies
RUN npm install

# Copy rest of client source
COPY client/ ./

# Set environment variables for build
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}

# Fix permissions and build (tsc needs execute permission on Alpine)
RUN chmod -R +x node_modules/.bin && \
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

# Copy package.json first for better layer caching
COPY server/package.json ./

# Install production dependencies only
RUN npm install --omit=dev && \
    npm cache clean --force

# Install tsx globally for TypeScript execution (needed at runtime)
RUN npm install -g tsx

# Copy server source
COPY server/ ./

# Copy built client from client-builder stage
COPY --from=client-builder /app/client/dist ./client/dist

# Create necessary directories
RUN mkdir -p uploads logs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })"

# Set default environment
ENV NODE_ENV=production

# Start with dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["tsx", "src/server-entry.ts"]
