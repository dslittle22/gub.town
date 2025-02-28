# Build stage for frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
# Copy frontend package files
COPY frontend/package*.json ./
# Install frontend dependencies
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Expose the port your app runs on
EXPOSE 80

# Start the application
CMD ["nginx", "-g", "daemon off;"]
