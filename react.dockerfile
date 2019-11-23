FROM node:10.7-alpine AS build
WORKDIR /usr/app

# Prepare for build
COPY webpack.config.js .
COPY tsconfig.webpack.json .
COPY ./templates ./templates
COPY ./src ./src

# NPM Install
COPY package.json .
COPY package-lock.json .
RUN npm ci --quiet

# Build through webpack
RUN npm run prod

# Prepare run env
FROM node:10.7-alpine AS run
WORKDIR /usr/app

COPY --from=build /usr/app/dist ./dist
COPY tsconfig.json .

COPY package.json .
COPY package-lock.json .
RUN npm ci --quiet --only=production

COPY ./src ./src
