## 🚀 DevOps Pipeline - 100% Automated

- **Docker** - Multi-stage build for Next.js app
- **CI/CD** - GitHub Actions -> Build & Push to GHCR
- **Kubernetes** - Deployment + Service manifests
- **GitOps** - ArgoCD Application for auto-sync
- **IaC** - Terraform for infra provisioning

### Architecture
GitHub Push -> Actions Build -> GHCR Push -> ArgoCD Sync -> K8s Cluster

### Run Locally
kubectl apply -f k8s/
