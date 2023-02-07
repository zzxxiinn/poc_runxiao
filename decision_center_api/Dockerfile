FROM node:16.19.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# add npm package
COPY package.json /usr/src/app/package.json

RUN npm i

# copy code
COPY . /usr/src/app

EXPOSE 7001

CMD ["npm", "run", "start"]
