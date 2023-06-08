# Use a imagem do Node.js como base
FROM node:latest

# Defina a pasta /app como diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Instale o Expo CLI globalmente
RUN npm install -g expo-cli

RUN npm install react-native-web

# Copie todos os arquivos do diretório local para o diretório de trabalho do contêiner
COPY . .

# Expõe a porta 19000 do contêiner (expo-cli) e 19001 (expo dev tools)
EXPOSE 19000 19001

# Inicie a aplicação
CMD [ "expo", "start"]
