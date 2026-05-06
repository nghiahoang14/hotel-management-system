# Stage 1: Build
FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG ENV_FILE
COPY ${ENV_FILE} .env.production

RUN npm run build

# Stage 2: Production 
FROM node:20-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# chỉ copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]