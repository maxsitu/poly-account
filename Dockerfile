FROM node:13.5.0-alpine3.11

RUN mkdir -p /app
WORKDIR /app

RUN npm install --silent

COPY . /app
EXPOSE 80

CMD ["npm", "start"]