## nuclio 安装命令


```
kubectl create namespace nuclio

read -s mypassword
<enter your password>
kubectl create secret docker-registry registry-credentials \
    --namespace nuclio \
    --docker-username <username> \
    --docker-password $mypassword \
    --docker-server <URL> \
--docker-email ignored@nuclio.io
unset mypassword

helm repo add nuclio https://nuclio.github.io/nuclio/charts
helm install nuclio --namespace nuclio \
    --set registry.secretName=registry-credentials \
    --set registry.pushPullUrl=<your registry URL> \
    nuclio/nuclio

helm install  nuclio --namespace nuclio \
    --set registry.secretName=registry-credentials \
    --set registry.pushPullUrl=docker.io/dockerhub用户名 \
    nuclio/nuclio
    
kubectl get pod -n nuclio

kubectl get svc  -n nuclio
kubectl edit  svc nuclio-dashboard -n nuclio   
kubectl get svc  -n nuclio

```

### Kaniko构建

```
helm install nuclio --namespace nuclio \
--set registry.secretName=registry-credentials \
--set registry.pushPullUrl=docker.io/dockerhub用户名\
--set dashboard.containerBuilderKind=kaniko \
nuclio/nuclio
```




