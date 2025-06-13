# Step 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Run
FROM node:20 AS runner
WORKDIR /app
COPY --from=builder /app ./
# Fix for the "LegacyKeyValueFormat" warning:
# Changed 'ENV NODE_ENV production' to 'ENV NODE_ENV=production'
ENV NODE_ENV=production
CMD ["npm", "start"]
