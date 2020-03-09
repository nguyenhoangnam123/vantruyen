FROM node:13.10-alpine

USER root
WORKDIR /src

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:1.17-alpine

COPY --from=0 /src/build/ /var/www/html

EXPOSE 80

COPY ./nginx/conf.d/dms.conf /etc/nginx/conf.d/dms.conf
