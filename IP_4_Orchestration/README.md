# 1.CREATE IP_4_Orchestration's FOLDER:

The first step was to create the IP_4_Orchestration's folder to host the manifest files.
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

Deployed the above files to cloud using the kubctl create -f <manifets_name.yml> command.
The images used to create the containers were the images from the second IP.
From my last docker-compose exercise I was not able to view the the web page due to the error
below. This was the same error that that i encountered after viewing the container logs by
using this command.
kubectl logs frontend-deployment-8494949d96-5kgdh -c frontend

---

> yolo_app@0.1.0 start /app
> react-scripts start

ℹ ｢wds｣: Project is running at http://10.244.0.37/
ℹ ｢wds｣: webpack output is served from
ℹ ｢wds｣: Content not from webpack is served from /app/public
ℹ ｢wds｣: 404s will fallback to /
Starting the development server...

---

At this point I was able to implement the functionality of volumes by use of pvc(persistent volume claims) and pv(persistent volume) files.
Labels were also implemented as well as use of k8s controllers to maintain service availability. The controllers used are stateful sets and replication controller. To facilitate provisioning of volume storage I used local storage class type

# 4.Correction

To resolve the issues above I had to rebuild the docker images again and seperated the frontend and the
backend codes for readability and ease of troubleshooting.
The website can be viewed on this URL http://34.173.206.200:3000/

# File execution steps:
>secret.yml
>mongo-config.yml
>pv_statefulset.yml
>pvc_statefulset.yml
>statefulset.yml
>backenddep.yml
>frontend.yml

