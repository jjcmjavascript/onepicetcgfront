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

USER node

EXPOSE 3000

CMD [ "npm", "start"]
