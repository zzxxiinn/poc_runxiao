FROM node:16.19.0-alpine

RUN npm config set unsafe-perm true
RUN npm install -g serve
RUN apk add --no-cache bash

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173

ENTRYPOINT ["bash", "./build_serve.sh"]
