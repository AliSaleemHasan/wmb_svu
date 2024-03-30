FROM node:20-alpine3.18

WORKDIR /app

COPY package*.json  /app

RUN npm install --loglevel verbose

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
