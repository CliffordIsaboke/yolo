FROM node:alpine
WORKDIR /app
ENV CI=true
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run","start" ]

