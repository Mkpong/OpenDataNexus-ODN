#!/bin/bash

FILENAMES=(
    "nginx-deployment.yaml"
    "nginx-service.yaml"
    "react-app-deployment.yaml"
    "react-app-service.yaml"
    "persistentVolume.yaml"
    "persistentVolumeClaim.yaml"
    "mysql-db-deployment.yaml"
    "mysql-db-service.yaml"
    "minio-db-deployment.yaml"
    "minio-db-service.yaml"
    "flask-server-deployment.yaml"
    "flask-server-service.yaml"
)

for FILENAME in "${FILENAMES[@]}"
do
    echo "Applying configuration from $FILENAME"
    kubectl apply -f "$FILENAME"

    sleep 1
done

echo "Running All Deployment and Service"
