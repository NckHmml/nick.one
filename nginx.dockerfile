FROM nginx:1.15-alpine

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/