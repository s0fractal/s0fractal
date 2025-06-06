#!/bin/bash
set -e

PROJECT_ID="whispernode-core"
BILLING_ACCOUNT="01A2BD-FCAE4E-E5AD7A"
REGION="europe-central2"
REPO_NAME="whispernode"

echo "🔧 Creating project..."
gcloud projects create $PROJECT_ID --name="WhisperNode Core" --set-as-default

echo "💳 Linking billing account..."
gcloud beta billing projects link $PROJECT_ID --billing-account=$BILLING_ACCOUNT

echo "🎯 Setting config project..."
gcloud config set project $PROJECT_ID

echo "📦 Enabling necessary services..."
gcloud services enable artifactregistry.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

echo "🏗️ Creating Artifact Registry repository..."
gcloud artifacts repositories create $REPO_NAME \
  --repository-format=docker \
  --location=$REGION \
  --description="WhisperNode image repo"

echo "🔑 Authorizing Docker access to Artifact Registry..."
gcloud auth configure-docker $REGION-docker.pkg.dev

echo "✅ Done. Project '$PROJECT_ID' is ready."