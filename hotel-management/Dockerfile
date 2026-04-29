# Stage 1: Build
FROM node:20-bullseye-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci                    
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
RUN npm ci --omit=dev     

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]