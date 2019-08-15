FROM node:alpine

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

# install app dependencies
COPY --chown=node:node package.json package-lock.json /home/node/app/
RUN npm install

# Copy rest of the app
COPY --chown=node:node . /home/node/app/

CMD [ "npm", "start" ]

EXPOSE 8011