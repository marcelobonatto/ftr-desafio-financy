# Estágio 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Passa a URL do backend em tempo de build para o Vite injetar
ARG VITE_BACKEND_URL=http://localhost:4000/graphql
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

# Estágio 2: Servidor Web Nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração básica do Nginx para suportar as rotas do React Router Dom
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]