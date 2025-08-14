FROM node:20-slim

WORKDIR ./app-monitoring

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 50052

CMD ["npm", "run", "start"]