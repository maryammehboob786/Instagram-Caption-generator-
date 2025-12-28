# Kubernetes Deployment Guide - LinkedIn Caption Generator

Complete step-by-step guide to deploy the LinkedIn Caption Generator on AWS EC2 using minikube.

---

## 📋 Assignment Requirements Checklist

- ✅ Deploy web application on minikube cluster
- ✅ Use MongoDB Atlas (cloud database - no PVC needed)
- ✅ Create Deployment and Service YAML files for web server
- ✅ NodePort service for web server
- ✅ HorizontalPodAutoscaler for auto-scaling
- ✅ Docker image with bundled application code
- ✅ Deploy on AWS EC2 instance
- ✅ Expose via ngrok (2 tunnels: webapp + dashboard)

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### **STEP 1: Launch AWS EC2 Instance**

1. **Go to AWS Console** → EC2 → Launch Instance

2. **Configure Instance:**
   - **Name:** linkedin-caption-k8s
   - **AMI:** Ubuntu Server 22.04 LTS
   - **Instance Type:** `t3.medium` (2 vCPU, 4GB RAM minimum)
   - **Key Pair:** Create new or use existing
   - **Storage:** 30 GB gp3

3. **Configure Security Group:**
   - SSH (22) - Your IP
   - HTTP (80) - Anywhere
   - HTTPS (443) - Anywhere
   - Custom TCP (30080) - Anywhere (for NodePort)
   - Custom TCP (4040) - Anywhere (for ngrok dashboard)

4. **Launch Instance** and wait until status is "Running"

5. **Connect to Instance:**
   ```bash
   ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
   ```

---

### **STEP 2: Install Docker on EC2**

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add current user to docker group (to run docker without sudo)
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Verify Docker installation
docker --version
```

---

### **STEP 3: Install kubectl**

```bash
# Download latest kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Make it executable
chmod +x kubectl

# Move to system path
sudo mv kubectl /usr/local/bin/

# Verify installation
kubectl version --client
```

---

### **STEP 4: Install minikube**

```bash
# Download minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Install minikube
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Remove downloaded file
rm minikube-linux-amd64

# Verify installation
minikube version
```

---

### **STEP 5: Start minikube Cluster**

```bash
# Start minikube with docker driver
minikube start --driver=docker --cpus=2 --memory=3000mb

# Verify cluster is running
minikube status

# Check nodes
kubectl get nodes

# Enable metrics server (required for HPA)
minikube addons enable metrics-server

# Verify metrics server
kubectl get pods -n kube-system | grep metrics-server
```

Expected output:
```
✅ minikube
✅ type: Control Plane
✅ host: Running
✅ kubelet: Running
✅ apiserver: Running
✅ kubeconfig: Configured
```

---

### **STEP 6: Install ngrok**

```bash
# Add ngrok repository
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \
  sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
  echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \
  sudo tee /etc/apt/sources.list.d/ngrok.list

# Install ngrok
sudo apt update && sudo apt install ngrok

# Verify installation
ngrok version
```

**Sign up for ngrok:**
1. Go to https://ngrok.com/
2. Create free account
3. Get your auth token from dashboard

**Configure ngrok:**
```bash
ngrok config add-authtoken YOUR_NGROK_AUTH_TOKEN
```

---

### **STEP 7: Transfer Project to EC2**

**Option A: Using Git (Recommended)**

```bash
# Install git if not installed
sudo apt install git -y

# Clone your repository
git clone https://github.com/YOUR_USERNAME/linkedin-caption-generator.git
cd linkedin-caption-generator
```

**Option B: Using SCP from your local machine**

```bash
# From your local machine (not EC2)
scp -i your-key.pem -r d:\Web\linkedin-caption-generator ubuntu@YOUR_EC2_IP:~/
```

---

### **STEP 8: Update Environment Variables**

On EC2, edit the Kubernetes deployment file:

```bash
cd ~/linkedin-caption-generator
nano kubernetes/webapp-deployment.yaml
```

Replace the following values:

```yaml
env:
- name: MONGODB_URI
  value: "YOUR_ACTUAL_MONGODB_ATLAS_URI"

- name: NEXTAUTH_SECRET
  value: "YOUR_ACTUAL_NEXTAUTH_SECRET"

- name: NEXTAUTH_URL
  value: "http://localhost:3000"  # We'll update this with ngrok URL later

- name: GOOGLE_CLIENT_ID
  value: "YOUR_ACTUAL_GOOGLE_CLIENT_ID"

- name: GOOGLE_CLIENT_SECRET
  value: "YOUR_ACTUAL_GOOGLE_CLIENT_SECRET"

- name: GEMINI_API_KEY
  value: "YOUR_ACTUAL_GEMINI_API_KEY"
```

**Save:** Press `Ctrl+O`, `Enter`, then `Ctrl+X`

---

### **STEP 9: Build Docker Image**

```bash
# Make sure you're in the project directory
cd ~/linkedin-caption-generator

# Build the Docker image
docker build -t linkedin-caption-webapp:latest .

# Verify image was created
docker images | grep linkedin-caption-webapp
```

Expected output:
```
linkedin-caption-webapp   latest   abc123def456   2 minutes ago   200MB
```

---

### **STEP 10: Load Docker Image into minikube**

```bash
# Load the image into minikube's Docker environment
minikube image load linkedin-caption-webapp:latest

# Verify image is available in minikube
minikube image ls | grep linkedin-caption-webapp
```

---

### **STEP 11: Deploy to Kubernetes**

```bash
# Apply deployment (creates pods)
kubectl apply -f kubernetes/webapp-deployment.yaml

# Apply service (creates NodePort service)
kubectl apply -f kubernetes/webapp-service.yaml

# Apply HPA (creates autoscaler)
kubectl apply -f kubernetes/webapp-hpa.yaml

# Verify all resources
kubectl get all
```

Expected output:
```
NAME                                            READY   STATUS    RESTARTS   AGE
pod/linkedin-caption-webapp-xxxxxxxxx-xxxxx     1/1     Running   0          30s
pod/linkedin-caption-webapp-xxxxxxxxx-xxxxx     1/1     Running   0          30s

NAME                                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/linkedin-caption-webapp-service   NodePort    10.96.xxx.xxx   <none>        3000:30080/TCP   30s

NAME                                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/linkedin-caption-webapp   2/2     2            2           30s

NAME                                                REFERENCE                            TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/linkedin-caption-webapp-hpa   Deployment/linkedin-caption-webapp   5%/70%    2         10        2          30s
```

---

### **STEP 12: Enable Kubernetes Dashboard**

```bash
# Enable dashboard addon
minikube addons enable dashboard

# Verify dashboard is running
kubectl get pods -n kubernetes-dashboard

# Wait until all pods show Running
kubectl get svc -n kubernetes-dashboard
```

Expected output should show `kubernetes-dashboard` service.

---

### **STEP 13: Verify Deployment**

```bash
# Check pod status
kubectl get pods

# Check pod logs
kubectl logs -f POD_NAME

# Check HPA status
kubectl get hpa

# Get service details and verify exact name
kubectl get svc linkedin-caption-webapp-service

# Verify dashboard service exists
kubectl get svc -n kubernetes-dashboard

# Get the service URL
minikube service linkedin-caption-webapp-service --url
```

---

### **STEP 14: Expose Both App and Dashboard with Single ngrok URL**

**This approach uses kubectl proxy to expose both the webapp and dashboard on the same port, then uses a single ngrok tunnel.**

```bash
# Install screen for persistent sessions
sudo apt install screen -y

# Start kubectl proxy (exposes both app and dashboard)
kubectl proxy --address='0.0.0.0' --accept-hosts='.*' --port=8001 &

# Create screen session for ngrok tunnel
screen -S ngrok-tunnel

# Expose kubectl proxy via ngrok
ngrok http 8001
```

**IMPORTANT: Save the ngrok URL**
```
Example output:
Forwarding: https://abc123.ngrok-free.app -> http://localhost:8001
```

**Save this URL:** `https://abc123.ngrok-free.app`

**Your two submission URLs will be:**
- **Webapp:** `https://abc123.ngrok-free.app/api/v1/namespaces/default/services/http:linkedin-caption-webapp-service:3000/proxy/`
- **Dashboard:** `https://abc123.ngrok-free.app/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/`

**Note:** Use `http:` prefix before service name for proper routing.

**Detach from screen:** Press `Ctrl+A` then `D`

**Test URLs locally first:**
```bash
# Test webapp proxy
curl http://localhost:8001/api/v1/namespaces/default/services/http:linkedin-caption-webapp-service:3000/proxy/

# Test dashboard proxy
curl http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

If both return HTML/data, your ngrok URLs will work!

---

### **STEP 15: Update NEXTAUTH_URL with ngrok URL**

```bash
# Update with your webapp proxy path (use http: prefix)
kubectl set env deployment/linkedin-caption-webapp \
  NEXTAUTH_URL=https://abc123.ngrok-free.app/api/v1/namespaces/default/services/http:linkedin-caption-webapp-service:3000/proxy

# Verify pods are restarting with new env
kubectl get pods -w
```

Press `Ctrl+C` when both new pods show `Running`.

---

### **STEP 16: Test Both URLs**

**Access Web Application:**
```
https://abc123.ngrok-free.app/api/v1/namespaces/default/services/http:linkedin-caption-webapp-service:3000/proxy/
```

**Access Minikube Dashboard:**
```
https://abc123.ngrok-free.app/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

**Important:** Use `http:` prefix in the URL for proper service routing!

**Test Features:**
- ✅ Homepage loads
- ✅ Email/password login works
- ✅ Caption generation works
- ✅ Captions are saved to MongoDB Atlas
- ✅ Dashboard shows caption history
- ✅ Kubernetes dashboard shows pods, deployments, and HPA

**Note:** Both URLs use the **same ngrok domain** - only one tunnel needed!

---

### **STEP 16: Test HorizontalPodAutoscaler**

**Install Apache Bench for load testing:**

```bash
sudo apt install apache2-utils -y
```

**Generate load:**

```bash
# Generate load on the webapp proxy URL
ab -n 10000 -c 100 https://YOUR_NGROK_URL/api/v1/namespaces/default/services/linkedin-caption-webapp-service:3000/proxy/

# Watch HPA in real-time
kubectl get hpa -w
```

**In another terminal:**

```bash
# Watch pods scaling
kubectl get pods -w
```

**Expected behavior:**
- CPU usage increases
- HPA detects high CPU (>70%)
- New pods are created automatically
- Pods scale from 2 → 4 → 6 → up to 10
- After load stops, pods scale down after 5 minutes

**Verify scaling:**

```bash
# Check current pod count
kubectl get pods

# Check HPA status
kubectl get hpa

# Check events
kubectl get events --sort-by='.lastTimestamp'
```

---

## 📸 Screenshots to Take for Submission

1. **EC2 Instance Running:**
   - AWS Console showing running instance

2. **minikube Status:**
   ```bash
   minikube status
   ```

3. **All Kubernetes Resources:**
   ```bash
   kubectl get all
   ```

4. **HPA Status:**
   ```bash
   kubectl get hpa
   kubectl describe hpa linkedin-caption-webapp-hpa
   ```

5. **Web Application:**
   - Browser showing your app via ngrok URL
   - Login page
   - Caption generation working
   - Dashboard showing captions

6. **minikube Dashboard:**
   - Pods view
   - Deployments view
   - Services view
   - HPA view

7. **HPA Auto-scaling:**
   - Before load (2 pods)
   - During load (pods scaling up)
   - After load (pods scaling down)

8. **Both ngrok Tunnels Active:**
   - Screenshot showing both tunnel URLs

---

## 📝 Submission Checklist

- [ ] **Webapp URL:** `https://__________.ngrok-free.app/api/v1/namespaces/default/services/http:linkedin-caption-webapp-service:3000/proxy/`
- [ ] **Dashboard URL:** `https://__________.ngrok-free.app/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/`
- [ ] **Note:** Both URLs use the SAME ngrok domain (single tunnel)
- [ ] **Important:** Use `http:` prefix in service URLs
- [ ] All YAML files (`webapp-deployment.yaml`, `webapp-service.yaml`, `webapp-hpa.yaml`)
- [ ] Dockerfile
- [ ] Screenshots (8 items above)
- [ ] Both tunnels remain active during evaluation

---

## 🔧 Troubleshooting

### Pods not starting

```bash
# Check pod details
kubectl describe pod POD_NAME

# Check logs
kubectl logs POD_NAME

# Common issues:
# - Image not found: Reload image with `minikube image load`
# - Wrong env vars: Update deployment YAML
# - MongoDB connection: Check MONGODB_URI
```

### Service Not Found Error

If you get "services not found" error:

```bash
# 1. Enable dashboard if not enabled
minikube addons enable dashboard

# 2. Verify services exist
kubectl get svc -n default
kubectl get svc -n kubernetes-dashboard

# 3. Test proxy locally first
curl http://localhost:8001/api/v1/namespaces/default/services/http:linkedin-caption-webapp-service:3000/proxy/
curl http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/

# 4. Make sure to use http: prefix in URLs
# Correct: /services/http:service-name:port/proxy/
# Wrong: /services/service-name:port/proxy/
```

### HPA not working

```bash
# Check metrics server
kubectl get pods -n kube-system | grep metrics

# Enable if not running
minikube addons enable metrics-server

# Wait 1-2 minutes for metrics to be available
kubectl top nodes
kubectl top pods
```

### ngrok tunnel closed

```bash
# List screen sessions
screen -ls

# Reattach to session
screen -r ngrok-tunnel

# Restart tunnel
ngrok http 8001
```

### Can't access webapp via ngrok

```bash
# Check if kubectl proxy is running
ps aux | grep "kubectl proxy"

# Restart if not running
kubectl proxy --address='0.0.0.0' --accept-hosts='.*' --port=8001 &

# Check if pods are running
kubectl get pods

# Test proxy locally on EC2
curl http://localhost:8001/api/v1/namespaces/default/services/linkedin-caption-webapp-service:3000/proxy/
```

### MongoDB connection fails

```bash
# Check env vars in pod
kubectl exec POD_NAME -- env | grep MONGODB

# Update if wrong
kubectl set env deployment/linkedin-caption-webapp MONGODB_URI="correct-uri"
```

---

## 🛑 Cleanup Commands

**To delete all resources:**

```bash
# Delete HPA
kubectl delete -f kubernetes/webapp-hpa.yaml

# Delete service
kubectl delete -f kubernetes/webapp-service.yaml

# Delete deployment
kubectl delete -f kubernetes/webapp-deployment.yaml

# Verify deletion
kubectl get all
```

**To stop minikube:**

```bash
minikube stop
```

**To delete minikube cluster:**

```bash
minikube delete
```

**To kill ngrok tunnel:**

```bash
# List screens
screen -ls

# Kill ngrok tunnel
screen -X -S ngrok-tunnel quit

# Kill kubectl proxy
pkill -f "kubectl proxy"
```

---

## 📚 Key Commands Reference

| Task | Command |
|------|---------|
| Check pods | `kubectl get pods` |
| Check deployments | `kubectl get deployments` |
| Check services | `kubectl get svc` |
| Check HPA | `kubectl get hpa` |
| Check all resources | `kubectl get all` |
| View pod logs | `kubectl logs POD_NAME` |
| Describe resource | `kubectl describe TYPE NAME` |
| Get service URL | `minikube service SERVICE_NAME --url` |
| Check CPU/memory | `kubectl top pods` |
| Watch HPA | `kubectl get hpa -w` |
| Watch pods | `kubectl get pods -w` |

---

## ✅ Learning Outcomes Achieved

After completing this deployment:

✅ **Deploy servers on minikube cluster**
- Web application deployed with 2 initial replicas
- MongoDB Atlas (cloud-based, no local deployment needed)

✅ **Attach persistent volume for database**
- Using MongoDB Atlas (cloud PVC equivalent)

✅ **Apply NodePort service for load balancing**
- Service type: NodePort on port 30080
- Automatic load balancing across pods

✅ **Apply HorizontalPodAutoscaler**
- Auto-scaling from 2 to 10 pods
- Based on CPU (70%) and memory (80%) metrics

✅ **Expose via ngrok tunnels**
- Single tunnel exposes both webapp and dashboard
- Webapp access: `https://NGROK_URL/api/v1/namespaces/default/services/linkedin-caption-webapp-service:3000/proxy/`
- Dashboard access: `https://NGROK_URL/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/`

---

## 🎯 Assignment Success Criteria

- ✅ Web application runs on minikube
- ✅ Deployment YAML created and applied
- ✅ Service YAML created and applied (NodePort)
- ✅ HPA YAML created and applied
- ✅ Docker image bundled with application code
- ✅ Application accessible via ngrok URL
- ✅ Dashboard accessible via same ngrok URL (different path)
- ✅ HPA demonstrates auto-scaling behavior
- ✅ Single ngrok tunnel serves both webapp and dashboard

---

**Good luck with your deployment! 🚀**
