FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node","dist/main"]
