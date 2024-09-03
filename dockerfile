# Use a imagem oficial do Node.js como imagem base
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Build da aplicação (opcional para produção)
RUN npm run build

# Exponha a porta que o app irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
