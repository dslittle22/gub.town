# Build stage for frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
# Copy frontend package files
COPY frontend/package*.json ./
# Install frontend dependencies
RUN npm install
# Copy frontend source code
COPY frontend/ ./
# Build frontend
RUN npm run build

# Build stage for backend
FROM node:20-alpine AS backend-build
WORKDIR /app/backend
# Copy backend package files
COPY backend/package*.json ./
# Install backend dependencies
RUN npm install
# Copy backend source code
COPY backend/ ./
# Build backend (if needed)
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Install sqlite dependencies
RUN apk add --no-cache python3 make g++ sqlite sqlite-dev

RUN mkdir /app/db

# Copy built frontend assets
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist
# Copy backend files
COPY --from=backend-build /app/backend /app/backend

# Set working directory to backend
WORKDIR /app/backend

# Expose the port your app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
