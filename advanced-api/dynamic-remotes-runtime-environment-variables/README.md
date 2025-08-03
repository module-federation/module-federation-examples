# Module Federation Dynamic Remotes with Runtime Environment Variables

A comprehensive example demonstrating how to implement **runtime environment variables** in Module Federation applications with containerized deployment. This example showcases modern micro-frontend architecture with dynamic remote loading, enhanced error handling, and production-ready Docker configurations.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Docker Deployment](#docker-deployment)
- [Environment Configuration](#environment-configuration)
- [Production Deployment](#production-deployment)
- [Monitoring & Health Checks](#monitoring--health-checks)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## 🎯 Overview

This example demonstrates the power of **runtime environment variables** in micro-frontend architectures. Unlike traditional build-time configuration, runtime configuration allows you to:

- Deploy the same container image across different environments (dev, staging, production)
- Change configuration without rebuilding applications
- Implement environment-specific remote URLs and API endpoints
- Enable true CI/CD with immutable artifacts

### What are Runtime Environment Variables?

Runtime environment variables are configuration values that are:
- **Injected at container startup** rather than build time
- **Environment-specific** without requiring separate builds
- **Dynamically loaded** by the client application
- **Cached appropriately** to balance performance and freshness

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   Host App      │ ────────────────► │   Remote App    │
│   (Port 3000)   │    Module Fed.   │   (Port 3001)   │
└─────────────────┘                  └─────────────────┘
         │                                     │
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│  env-config.json│                  │  env-config.json│
│  Runtime Config │                  │  Runtime Config │
└─────────────────┘                  └─────────────────┘
```

### Applications

- **Host Application**: Main micro-frontend that dynamically loads remotes
- **Remote Application**: Standalone micro-frontend exposing a Widget component

Both applications support:
- ✅ React 18 with concurrent features
- ✅ Enhanced error boundaries and retry mechanisms  
- ✅ Runtime environment configuration
- ✅ Docker containerization with multi-stage builds
- ✅ Health checks and monitoring
- ✅ Security hardened nginx configurations

## ✨ Key Features

### 🚀 Modern Module Federation
- **@module-federation/enhanced** with latest patterns
- **Dynamic remote loading** with runtime URLs
- **Advanced error handling** with retry mechanisms
- **Component caching** with TTL (Time To Live)
- **Preloading capabilities** for performance optimization

### 🔧 Environment Management
- **Runtime configuration** via `env-config.json`
- **Environment variable validation** with fallbacks
- **Multi-environment support** (dev, staging, prod)
- **Hot configuration reloading** (development)

### 🐳 Production-Ready Containers
- **Multi-stage Docker builds** for optimization
- **Security hardening** with non-root users
- **Health checks** for container orchestration
- **Nginx optimizations** with caching and compression

### 🛡️ Security & Performance
- **Content Security Policy** headers
- **CORS configuration** for cross-origin requests
- **Gzip compression** for static assets
- **Asset caching strategies** for optimal performance

## 📋 Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Docker** (for containerized deployment)
- **Docker Compose** (optional, for orchestration)

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd dynamic-remotes-runtime-environment-variables

# Install dependencies
pnpm install

# Start both applications
pnpm start

# Applications will be available at:
# Host: http://localhost:3000
# Remote: http://localhost:3001
```

## 💻 Development Setup

### 1. Install Dependencies
```bash
# Install root dependencies
pnpm install

# Install dependencies for both apps
pnpm --filter dynamic-remotes-runtime-environment-variables_* install
```

### 2. Environment Configuration
Create `.env` files in both `host/` and `remote/` directories:

**host/.env**
```bash
API_URL=https://host.api.com
REMOTE_URL=http://localhost:3001/remoteEntry.js
NODE_ENV=development
```

**remote/.env**
```bash
API_URL=https://remote.api.com
NODE_ENV=development
```

### 3. Development Commands

```bash
# Start both applications (Rspack - recommended)
pnpm start

# Start with Webpack (legacy)
pnpm legacy:start

# Build for production
pnpm build

# Clean build artifacts
pnpm clean

# Run tests
pnpm e2e:ci
```

## 🐳 Docker Deployment

### Building Images

```bash
# Build both Docker images
pnpm docker:build

# Or build individually
cd host && docker build -t mf-host:latest .
cd remote && docker build -t mf-remote:latest .
```

### Running Containers

```bash
# Run with runtime environment variables
docker run -d \
  --name mf-host \
  -p 3000:80 \
  -e API_URL=https://prod-host.api.com \
  -e REMOTE_URL=https://prod-remote.example.com/remoteEntry.js \
  mf-host:latest

docker run -d \
  --name mf-remote \
  -p 3001:80 \
  -e API_URL=https://prod-remote.api.com \
  mf-remote:latest
```

### Docker Compose Example

```yaml
version: '3.8'
services:
  host:
    build: ./host
    ports:
      - "3000:80"
    environment:
      - API_URL=https://host.api.com
      - REMOTE_URL=http://remote/remoteEntry.js
    depends_on:
      - remote
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  remote:
    build: ./remote
    ports:
      - "3001:80"
    environment:
      - API_URL=https://remote.api.com
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## ⚙️ Environment Configuration

### Configuration Flow

1. **Build Time**: Default values in `env-config.json`
2. **Container Start**: `env.sh` reads environment variables
3. **Runtime**: Applications fetch `/env-config.json`
4. **Hot Reload**: Configuration updates without restart (development)

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `API_URL` | Backend API endpoint | `https://host.api.com` | Yes |
| `REMOTE_URL` | Remote entry point URL | `http://localhost:3001/remoteEntry.js` | Host only |
| `NODE_ENV` | Environment mode | `development` | No |
| `VERSION` | Application version | `1.0.0` | No |

### Advanced Configuration

```javascript
// Custom validation in useFetchJson
const { data, loading, error } = useFetchJson('/env-config.json', {
  validateData: (config) => {
    return config.API_URL && config.API_URL.startsWith('https://');
  },
  fallbackData: {
    API_URL: 'https://fallback.api.com',
    REMOTE_URL: 'http://localhost:3001/remoteEntry.js'
  },
  maxRetries: 3,
  timeout: 5000
});
```

## 🏭 Production Deployment

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mf-host
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mf-host
  template:
    metadata:
      labels:
        app: mf-host
    spec:
      containers:
      - name: mf-host
        image: mf-host:latest
        ports:
        - containerPort: 80
        env:
        - name: API_URL
          value: "https://prod-api.example.com"
        - name: REMOTE_URL
          value: "https://remote.example.com/remoteEntry.js"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
```

### CDN and Load Balancer Configuration

For production deployments, consider:

1. **CDN Distribution**: Serve static assets from CDN
2. **Load Balancing**: Distribute traffic across multiple instances
3. **SSL Termination**: Handle HTTPS at load balancer level
4. **Health Check Integration**: Use `/health` endpoint for monitoring

## 📊 Monitoring & Health Checks

### Health Check Endpoints

Both applications expose health check endpoints:

```bash
# Check application health
curl http://localhost:3000/health  # Host app
curl http://localhost:3001/health  # Remote app

# Check configuration
curl http://localhost:3000/env-config.json
curl http://localhost:3001/env-config.json
```

### Container Health Checks

Docker containers include built-in health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1
```

### Monitoring Integration

The applications log performance metrics and errors:

```javascript
// Performance monitoring
console.log('Host App Performance:', {
  loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
  domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
  totalTime: Math.round(perfData.loadEventEnd - perfData.fetchStart)
});
```

## 🛡️ Security Considerations

### Security Headers

Both applications include comprehensive security headers:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3001; ..." always;
```

### Container Security

- **Non-root user**: Containers run as unprivileged user
- **Multi-stage builds**: Minimize attack surface
- **Security updates**: Base images kept current
- **File permissions**: Restricted access to sensitive files

### CORS Configuration

Development uses permissive CORS. For production:

```nginx
# Restrict CORS to specific origins
add_header 'Access-Control-Allow-Origin' 'https://trusted-domain.com' always;
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Remote Loading Failures

**Symptoms**: "Failed to load remote" errors in console

**Solutions**:
```javascript
// Check remote URL accessibility
curl http://localhost:3001/remoteEntry.js

// Verify CORS configuration
// Check network connectivity
// Validate environment variables
```

#### 2. Configuration Loading Issues

**Symptoms**: Application shows fallback values

**Solutions**:
```bash
# Verify env-config.json is accessible
curl http://localhost:3000/env-config.json

# Check environment variable injection
docker exec -it container-name cat /usr/share/nginx/html/env-config.json

# Validate JSON syntax
cat env-config.json | jq .
```

#### 3. Build Failures

**Symptoms**: Docker build or npm build errors

**Solutions**:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Docker build cache
docker system prune -a

# Check Node.js version compatibility
node --version  # Should be 18+
```

### Debug Mode

Enable debug logging:

```bash
# Development
DEBUG=mf:* npm start

# Docker
docker run -e DEBUG=mf:* mf-host:latest
```

### Performance Issues

Monitor bundle sizes and loading times:

```bash
# Analyze bundle
npx webpack-bundle-analyzer dist/

# Check loading performance
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/
```

## 📚 Best Practices

### 1. Environment Configuration
- ✅ Use runtime configuration for multi-environment deployments
- ✅ Implement proper fallback values
- ✅ Validate configuration at startup
- ✅ Never cache configuration responses

### 2. Error Handling
- ✅ Implement retry mechanisms for remote loading
- ✅ Use error boundaries for graceful degradation
- ✅ Provide meaningful error messages to users
- ✅ Log errors for monitoring and debugging

### 3. Performance Optimization
- ✅ Implement component caching with appropriate TTL
- ✅ Use preloading for critical remotes
- ✅ Optimize bundle splitting and chunk loading
- ✅ Implement proper asset caching strategies

### 4. Security
- ✅ Use HTTPS in production
- ✅ Implement proper CORS policies
- ✅ Apply security headers
- ✅ Run containers as non-root users

### 5. Monitoring
- ✅ Implement health checks
- ✅ Monitor remote loading success rates
- ✅ Track performance metrics
- ✅ Set up alerting for failures

## 🔌 API Reference

### useFederatedComponent Hook

```typescript
const {
  Component,
  loading,
  error,
  retry,
  retryCount,
  clearCache
} = useFederatedComponent(remoteUrl, scope, module, options);
```

**Parameters**:
- `remoteUrl`: URL to remote entry point
- `scope`: Remote application scope name
- `module`: Exposed module path
- `options`: Configuration object

**Options**:
```typescript
{
  maxRetries?: number;     // Default: 3
  retryDelay?: number;     // Default: 1000ms
  enableCache?: boolean;   // Default: true
  timeout?: number;        // Default: 10000ms
}
```

### useFetchJson Hook

```typescript
const {
  data,
  loading,
  error,
  retry,
  retryCount
} = useFetchJson(path, options);
```

**Parameters**:
- `path`: URL to JSON resource
- `options`: Configuration object

**Options**:
```typescript
{
  maxRetries?: number;                    // Default: 3
  retryDelay?: number;                    // Default: 1000ms
  timeout?: number;                       // Default: 5000ms
  validateData?: (data: any) => boolean;  // Data validator
  fallbackData?: any;                     // Fallback on failure
}
```

### preloadRemote Function

```typescript
await preloadRemote(remoteUrl, scope, module, options);
```

Preloads a remote component for improved performance.

## 📝 Changelog

### v2.0.0 (Enhanced)
- ✅ Upgraded to React 18 with concurrent features
- ✅ Enhanced error handling and retry mechanisms
- ✅ Improved Docker configurations with security hardening
- ✅ Added comprehensive monitoring and health checks
- ✅ Modernized webpack configurations
- ✅ Added comprehensive documentation

### v1.0.0 (Original)
- ✅ Basic Module Federation setup
- ✅ Runtime environment variables
- ✅ Docker containerization
- ✅ CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📄 License

This project is part of the Module Federation examples repository.

---

**Need help?** Check the [troubleshooting section](#troubleshooting) or open an issue in the repository.