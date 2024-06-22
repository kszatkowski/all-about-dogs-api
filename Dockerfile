FROM node:22.2.0-bookworm-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN chmod +x ./wait-for-it.sh
