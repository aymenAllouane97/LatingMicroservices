FROM node:17-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3002

CMD ["npm", "run","start","prod"]
