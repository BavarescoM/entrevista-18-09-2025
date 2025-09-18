# build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# production stage
FROM node:20-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --production
COPY --from=build /usr/src/app/dist ./dist
COPY .env .env
EXPOSE 4000
CMD ["node","dist/index.js"]
