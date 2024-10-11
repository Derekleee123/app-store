# Stage 1: Build the project using a lightweight Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using npm run do_ci to ensure consistency and remove unnecessary packages
RUN npm run do_ci

# Copy the rest of the project files
COPY . .

# Run tests in the builder stage to ensure code correctness and generate coverage
RUN npm run test -- --coverage --watchAll=false

# Build the Next.js project in standalone mode to optimize production files
RUN npm run build

# Stage 2: Create the runtime image using an even smaller Node.js image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["node", "server.js"]
