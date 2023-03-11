version: '3.9'

services:
  backend:
    build:
      context: ./backend
    image: yoloback:v1.0
    ports:
      - "8081:8081"
    restart: always

  # Frontend service
  web:
    build:
      context: ./client
    image: yolofront:v1.0
    ports:
      - "4000:3000"
    restart: always
    environment:
      PORT: 3000
      MONGODB_URI: MongoDB://MongoDB:27017 
      DB_NAME: yolomy
    

