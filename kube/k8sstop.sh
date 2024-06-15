#!/bin/bash

# 모든 Deployment 삭제
echo "Deleting all Deployments..."
kubectl delete deployment --all

# 모든 Service 삭제
echo "Deleting all Services..."
kubectl delete service --all

# 모든 PersistentVolumeClaim 삭제
echo "Deleting all PersistentVolumeClaims..."
kubectl delete pvc --all

# 모든 PersistentVolume 삭제
echo "Deleting all PersistentVolumes..."
kubectl delete pv --all

echo "Cleanup completed successfully."
