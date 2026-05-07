# Stage 1: Build
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci


# Stage 2: Lấy production deps riêng 
FROM deps AS builder
WORKDIR /app
COPY . .
RUN npm run build 

# Stage 3: Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
# Copy compiled output từ builder
COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/src/main.js"]