FROM node:18-alpine3.16

WORKDIR /app

COPY . .

ENV PATH=/app/node_modules/.bin:$PATH

RUN npm install -g vite

RUN chown -R node:node /app

RUN mkdir -p /app/node_modules/.vite/deps
RUN chmod -R 777 /app/node_modules/.vite/deps

USER node

RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "start"]
