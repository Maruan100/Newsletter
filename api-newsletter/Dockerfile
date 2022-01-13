FROM node:14-alpine3.12

WORKDIR /usr/src/app

COPY --chown=node:node package.json package.json

RUN npm install

COPY --chown=node:node . .

USER node
EXPOSE 8081

CMD [ "npm", "run", "start" ]