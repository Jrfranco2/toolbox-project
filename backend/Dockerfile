FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3002

ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
