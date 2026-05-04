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

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]