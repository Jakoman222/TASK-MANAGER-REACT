FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build && find dist -type f

EXPOSE 3000

CMD ["node", "dist/index.js"]