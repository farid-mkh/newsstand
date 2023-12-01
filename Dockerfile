FROM node:20.10.0-alpine3.17

WORKDIR /usr/app
COPY . /usr/app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/next-app/
RUN npm install -g npm@10.2.4
RUN npm install
RUN npm run build

EXPOSE 3000
