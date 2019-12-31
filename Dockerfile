FROM node:13.5.0-alpine3.11

COPY . /app/
WORKDIR /app

RUN npm install --silent && npm run build

EXPOSE 80

CMD ["node", "dist/start.js"]