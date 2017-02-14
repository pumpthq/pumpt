FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Install pm2
RUN npm install -g pm2

# Copy app code
COPY . /usr/src/app

# Build project
RUN npm run build

# Run
EXPOSE 3011
CMD ["pm2", "start", "process.json", "--env", "staging", "--no-daemon"]