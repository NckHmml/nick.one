FROM node:10.7 AS build
WORKDIR /usr/app

# Prepare for build
COPY tsconfig.json .
COPY ./src ./src
COPY ./static ./static

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
COPY tsconfig.server.json .

COPY package.json .
COPY package-lock.json .
RUN npm ci --quiet --only=production

COPY ./src ./src
