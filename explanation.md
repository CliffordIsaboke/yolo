1. Choice of the base image on which to build each container.

    Security: The base image was from a reputable source and have a good security record. 

    Size: small as possible to reduce the container's overall size and improve performance.

    Compatibility:  compatible with the software and dependencies required by the application running in the container.

    Support: Good support and documentation available from the provider or community.

    Licensing: The images are licensed appropriately for the intended use.

    Familiarity: Chose a base image that I was familiar with

    Performance: Considered the performance of the base image and how it will affect the performance of the container.

    Maintenance: Considered the maintenance requirements of the base image, including the frequency of updates and the level of support provided.

    Community: Considered the size and activity level of the community around the base image.


2. Dockerfile directives used in the creation and running of each container.

    FROM node:alpine: This line sets the base image to be used for the Docker image. In this case, it uses the Node.js Alpine base image, which is a lightweight version of Node.js.

    WORKDIR /app: This line sets the working directory inside the container to /app, which is where the application code will be placed.

    COPY package*.json ./: This line copies the package.json and package-lock.json files from the current directory on the host machine to the working directory inside the container.

    RUN npm install --production: This line runs the npm install command inside the container to install the production dependencies for the application. This command uses the package*.json files that were copied in the previous step.

    COPY . .: This line copies all the files in the current directory on the host machine to the working directory inside the container. This includes the application code.

    EXPOSE 3000: Used to expose port 3000 on the container.

    CMD ["npm", "start"]: This line sets the default command to be run when a container is started from this image. In this case, it runs the npm start command to start the Node.js application.


3. Docker-compose Networking (Application port allocation and a bridge network implementation) where necessary.
    Each container in the application exposes its own ports, which are mapped to the host machine's ports using the ports configuration option in the docker-compose.yml file. This allows the containers to communicate with each other over the default Docker network, but also allows external access to the containers' services.

    
4. Docker-compose volume definition and usage (where necessary).
    Docker Compose provides a way to define and manage volumes for containers within a multi-container Docker application. Volumes are used to persist data between container restarts and allow containers to share data with each other.

Git workflow used to achieve the task.
Successful running of the applications and if not, debugging measures applied.
Good practices such as Docker image tag naming standards for ease of identification of images and containers. 