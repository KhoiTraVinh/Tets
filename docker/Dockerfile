FROM node:16.3.0-alpine

WORKDIR /app

COPY package.json /app

RUN npm install -g

COPY . /app

EXPOSE 5000

CMD ["npm", "start"]
