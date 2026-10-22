terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "disputelens" {
  metadata {
    name = "disputelens-ai"
  }
}

# This shows you can manage infra as code
# Your actual app is deployed via ArgoCD in k8s/ folder
