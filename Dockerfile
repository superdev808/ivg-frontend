# Stage 1: Building the code
FROM node:16-alpine AS builder

<<<<<<< HEAD

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Set environment variables from the build arguments
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL

=======
>>>>>>> f90b6fe4d958c6f9c4eec6adf510eb6ed4bad0da
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the code
FROM node:16-alpine

WORKDIR /app

# Copy the built assets from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]