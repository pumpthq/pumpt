FROM node:carbon
# Ensure secrets directory is in the working directory
# docker build -t jkobyp/pumpt .
# docker run --name pumpt -p 4000:4000 -d jkobyp/pumpt
# docker exec -it pumpt /bin/bash

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 4000
ENV NODE_ENV docker

CMD ["node", "server.js"]
