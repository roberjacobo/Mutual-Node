FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g nodemon

COPY . ./

CMD [ "npm", "run", "dev" ]
