FROM node:20-slim

WORKDIR ./app-ping

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 50051

CMD ["npx", "tsx", "watch", "src/index.ts"]