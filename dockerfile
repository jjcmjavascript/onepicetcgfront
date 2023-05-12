FROM node:18-alpine3.16

WORKDIR /app

COPY . .

## env needed for: node path error prevention
ENV PATH=/app/node_modules/.bin:$PATH

RUN npm install -g vite

## fix wsl node_modules permission denied
RUN chmod -R 777 /app/node_modules
RUN chown node:node /app/node_modules

RUN mkdir -p /app/node_modules/.vite/deps
RUN chmod -R 777 /app/node_modules/.vite/deps

<<<<<<< HEAD
##RUN yarn --no-lockfile --network-timeout 100000
USER "1000:1000"
RUN chmod -R 777 /app
RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "start"]
=======
USER node

EXPOSE 3000

CMD [ "npm", "start"]
>>>>>>> 15c8a658331758a1e9c9c4565359229b4321d608
