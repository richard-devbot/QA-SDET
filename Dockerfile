# Use a multi-stage build
# Stage 1: Backend (Flask)
FROM python:3.10.0-slim AS backend-build

# Set working directory
WORKDIR /app/backend

# Copy requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Stage 2: Frontend (Next.js)
FROM node:18-alpine AS frontend-build

# Set working directory
WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Install Prisma CLI
RUN npm install prisma --save-dev

# Copy frontend source code
COPY frontend/ .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Stage 3: Final image
FROM python:3.9-slim

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend from backend-build stage
COPY --from=backend-build /app/backend /app/backend
# Copy frontend from frontend-build stage
COPY --from=frontend-build /app/frontend /app/frontend

# Create a startup script
RUN echo '#!/bin/bash\n\
# Start Flask backend\n\
cd /app/backend\n\
python run.py &\n\
\n\
# Start Next.js frontend\n\
cd /app/frontend\n\
npm start\n\
' > /start.sh && chmod +x /start.sh

# Expose ports
EXPOSE 5000 3000

# Set the entrypoint
ENTRYPOINT ["/start.sh"]

# docker build -t waigenie .
# docker run -p 5000:5000 -p 3000:3000 waigenie