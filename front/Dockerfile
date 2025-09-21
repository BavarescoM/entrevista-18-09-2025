# front/Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./    # isto copia os package.json do contexto atual (ou seja, precisa rodar docker build dentro de front)
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .       # copia todo o conteúdo do front
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js
EXPOSE 3000
CMD ["npm", "start"]
