version: '3.9'

services:
  # # MongoDB service
  # mongo_db:
  #   container_name: db_container
  #   image: mongo:latest
  #   restart: always
  #   volumes:
  #     - mongo_db:/data/db

  # Backend service
  backend:
    build:
      context: ./backend
    ports:
      - "8081:8081"
    volumes:
      - mongo_data:/data/db
    #depends_on:
     # - mongo_db

  # Frontend service
  web:
    build:
      context: ./client
    #stdin_open: true
    ports:
      - "4000:3000"
    environment:
      PORT: 3000
      MONGODB_URI: MongoDB://MongoDB:27017 
      DB_NAME: yolomy
    
    #depends_on:
      #- mongo_db

#volumes:
  #mongo_db: {}

