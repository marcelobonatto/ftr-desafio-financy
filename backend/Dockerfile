# Estágio 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

# Instala dependências necessárias para compilar pacotes nativos (como better-sqlite3)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# Estágio 2: Execução
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

# Copia os arquivos gerados e compilados do estágio anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN mkdir -p /app/data && chmod 777 /app/data

# Geramos o Prisma Client direto no ambiente de produção
RUN npx prisma generate

EXPOSE 4000

# Executa as migrations antes de subir o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]