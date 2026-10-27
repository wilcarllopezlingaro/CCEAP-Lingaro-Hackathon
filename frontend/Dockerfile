# Project Status Assistant - Multi-stage Docker Build
# Stage 1: Build the React application

ARG PLATFORM
FROM  --platform=${PLATFORM} node:lts-alpine AS builder

ARG VITE_APP_NAME
ARG VITE_SHELL_APP_API_URL

WORKDIR /app

# Copy only package.json first for better caching
COPY package.json ./

# Generate package-lock.json by installing dependencies
RUN npm install && npm cache clean --force

# Accept build arguments and set as environment variables

ENV VITE_SHELL_APP_API_URL=$VITE_SHELL_APP_API_URL
ENV VITE_APP_NAME=$VITE_APP_NAME

# Copy source code (after npm install for better layer caching)
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM docker.io/library/nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

# Install curl for debugging
RUN apk add --no-cache curl

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built application from builder stage
COPY --from=builder /app/dist .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
