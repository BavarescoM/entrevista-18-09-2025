# Imagem base
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia tsconfig.json (necessário para TypeScript)
COPY tsconfig.json ./

# Copia todo o código (opcional se você mapear volume no compose)
COPY src ./src

COPY .env ./.env

# Expõe porta 4000 para acessar API fora do container
EXPOSE 4000

# Comando para rodar a API (usando ts-node)
CMD ["npx", "ts-node", "src/index.ts"]
