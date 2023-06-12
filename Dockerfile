from node:18

RUN mkdir /app
WORKDIR /app

COPY src /app/src
COPY package.json /package.json

RUN npm install --production

CMD ["node", "src/index.js"]
