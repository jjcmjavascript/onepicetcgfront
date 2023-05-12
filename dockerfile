FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json ./
##RUN npm ci

## env needed for: node path error prevention
##ENV PATH=/usr/src/node_modules/.bin:$PATH

RUN npm install -g env-cmd

##COPY yarn.lock ./

COPY . .

RUN unset NODE_OPTIONS
RUN yarn config delete proxy
RUN npm config rm proxy
RUN npm config rm https-proxy

##RUN yarn --no-lockfile --network-timeout 100000
USER "1000:1000"
RUN chmod -R 777 /app
RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "start"]
