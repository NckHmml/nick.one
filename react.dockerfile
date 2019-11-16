FROM node:10.7-alpine

WORKDIR /usr/app

# NPM Install
COPY package.json .
COPY package-lock.json .
RUN npm ci --quiet

# Prepare for build
COPY tsconfig.json .
COPY webpack.config.js .
COPY tsconfig.webpack.json .
COPY ./src ./src
COPY ./templates ./templates
# Build through webpack
RUN npm run prod