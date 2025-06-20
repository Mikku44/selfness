# Step 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY . .  
# This copies .env if it's in your Docker build context
RUN npm install
RUN npm run build

# Step 2: Run
FROM node:20 AS runner
WORKDIR /app
COPY --from=builder /app ./
 # This copies the .env from the builder stage
ENV NODE_ENV=production
CMD ["npm", "start"]