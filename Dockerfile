FROM nodesource/trusty:4.1.0

EXPOSE 8080

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV dev

RUN npm install -g npm@3.3.4
ADD package.json package.json
ADD npm-shrinkwrap.json npm-shrinkwrap.json
RUN npm install

ADD . .

CMD ["gulp","dev"]
