# 1.CREATE K8's FOLDER:

The first step was to create the K8's folder to host the manifest files.
The manifest files created include the following:
-deployment.yml:To perform backend and front deployments.It was also used to deploy
the backend service that is use to create connection between the
frontend and the backend.It is also used to create the Load balancer
for the client to connect through 34.121.159.237:80
-mongo-app.yml:To deploy the mongoDB database and the service.
-secret.yml:This is used to store secret information including credentials to log onto
the database.
-mongo-congo.yml:The mongo-config.yml file is used to specify the configuration of the
replica set, including the MongoDB instances that are part of the set, their roles within
the set (e.g. primary, secondary, or arbiter), and other configuration details such as
the replica set name, authentication settings, and SSL options.

# 2.CREATION OF A CLUSTER:

Got into gcloud account and created a cluster. Copied the link from the connect tab and
run it into command line after installation of the gcloud SDK.

# 3.DEPLOYMENT

Deployed the above files to cloud using the kubctl create -f <manifets_name.yml>
From my last docker-compose exercise I was not able to view the the page due to the error
below.
At this point I was able to implement the functionality of volumes and labels as per the code

> yolo_app@0.1.0 start /app
> react-scripts start

ℹ ｢wds｣: Project is running at http://10.244.0.37/
ℹ ｢wds｣: webpack output is served from
ℹ ｢wds｣: Content not from webpack is served from /app/public
ℹ ｢wds｣: 404s will fallback to /
Starting the development server...

I did review the error logs using this command:

kubectl logs frontend-deployment-8494949d96-5kgdh -c frontend

From the review i realized that the error was the same as the images used were from
the images created from the last exercise

# backend-deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
name: backend-deployment
spec:
replicas: 1
selector:
matchLabels:
app: backend
template:
metadata:
labels:
app: backend
spec:
containers: - name: backend
image: isaboke/yolobackend.v1.0
resources:
limits:
cpu: "1"
memory: "512Mi"
requests:
cpu: "0.5"
memory: "256Mi"
ports: - containerPort: 3000
env: - name: MONGO_URL
valueFrom:
configMapKeyRef:
name: mongo-config
key: mongo-url - name: MONGO_USER
valueFrom:
secretKeyRef:
name: mongo-secret
key: mongo-user - name: MONGO_PASSWORD
valueFrom:
secretKeyRef:
name: mongo-secret
key: mongo-password

---

# backend-service.yaml

apiVersion: v1
kind: Service
metadata:
name: backend-service
spec:
selector:
app: backend
ports: - protocol: TCP
port: 3000
targetPort: 3000

---

# frontend-deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
name: frontend-deployment
spec:
replicas: 1
selector:
matchLabels:
app: frontend
template:
metadata:
labels:
app: frontend
spec:
containers: - name: frontend
image: isaboke/yolofrontend.v1.0
resources:
limits:
cpu: "1"
memory: "512Mi"
requests:
cpu: "0.5"
memory: "256Mi"
ports: - containerPort: 80
env: - name: BACKEND_URL
value: "http://backend-service:3000"
volumeMounts: - name: www-persistent-storage
mountPath: /home/isaboke/storage
volumes: - name: www-persistent-storage
persistentVolumeClaim:
claimName: isaboke-demo-pv

---

# frontend-service.yaml

apiVersion: v1
kind: Service
metadata:
name: frontend-service
spec:
selector:
app: frontend
ports: - protocol: TCP
port: 80
targetPort: 80
type: LoadBalancer
