FROM node:17-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run","start","prod"]
