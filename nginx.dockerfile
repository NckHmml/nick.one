FROM nginx:1.15-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./nginx/nginx.conf /etc/nginx/
COPY ./nginx/static .