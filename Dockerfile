FROM mhart/alpine-node:latest

MAINTAINER Crazy Factory dev@crazy-factory.com

WORKDIR /app
ADD . .

RUN npm install

EXPOSE 8889

CMD ["npm", "run", "start:prod"]
