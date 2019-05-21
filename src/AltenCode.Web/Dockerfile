# base image
FROM node:11.0.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install -g @angular/cli@7.2.3

RUN npm uninstall --save node-sass

RUN npm install --save node-sass

RUN npm rebuild node-sass --force

# add app
COPY . /app

RUN npm run build

# start app
# CMD ng serve --host 0.0.0.0 --port 4200
