# Multi-stage build for security and optimization
# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Add security patches and necessary packages
RUN apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Copy package files first for better caching
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies with security and performance optimizations
RUN yarn install --frozen-lockfile --production=false \
    && yarn cache clean

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:1.27.0-alpine AS production

# Install security updates and required packages
RUN apk upgrade --no-cache \
    && apk add --no-cache \
        dumb-init \
        bash \
        curl \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 -G nodejs

# Remove default nginx config and add security headers
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY conf /etc/nginx

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist /usr/share/nginx/html/

# Copy environment configuration files
COPY --chown=nextjs:nodejs env-config.json /usr/share/nginx/html/
COPY --chown=nextjs:nodejs env.sh /usr/share/nginx/html/
COPY --chown=nextjs:nodejs .env /usr/share/nginx/html/

# Make shell script executable
RUN chmod +x /usr/share/nginx/html/env.sh

# Create nginx run directory and set permissions
RUN mkdir -p /var/run/nginx \
    && chown -R nextjs:nodejs /var/run/nginx \
    && chown -R nextjs:nodejs /var/cache/nginx \
    && chown -R nextjs:nodejs /usr/share/nginx/html

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/remoteEntry.js || exit 1

# Use non-root user
USER nextjs

# Expose port
EXPOSE 80

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start command with environment setup
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"]