# Deployment

The CI/CD job called **Deploy to GKE Cluster** runs on the latest version of Ubuntu and depends on the previously executed **[Security Testing](Security-Testing.md)** job. It is intended to install the application on the Google Kubernetes Engine (GKE) cluster, check the installation status and load the necessary configurations.

```yaml
deployment:
  name: Deploy to GKE Cluster
  runs-on: ubuntu-latest
  needs: security-testing
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    - id: auth
      name: Authenticate with google cloud
      uses: google-github-actions/auth@v2
      with:
        credentials_json: '${{ secrets.GCP_CREDENTIALS }}'
    - name: Set up google cloud SDK
      uses: google-github-actions/setup-gcloud@v2
      with:
        install_components: 'gke-gcloud-auth-plugin'
    - name: Configure kubectl
      run: |
        gcloud container clusters get-credentials autopilot-cluster-1 --region europe-central2
        kubectl config current-context
    - name: Download IMAGE_TAG file
      uses: actions/download-artifact@v4
      with:
        name: image-tag
    - name: Apply kubernetes manifests
      run: |
        IMAGE_TAG=$(cat image-tag.txt)
        echo "Using image tag: $IMAGE_TAG"
        sed -i "s|quiirex/nowted-app:latest|$IMAGE_TAG|g" k8s/resources.yaml
        cat k8s/resources.yaml
        kubectl apply -f k8s/resources.yaml
    - name: Verify deployment
      run: |
        echo "Checking deployment status..."
        kubectl rollout status deployment/testopspoc
        echo "Listing pods..."
        kubectl get pods
```

## Description

1. **Checkout repository**: uses the actions/checkout@v4 action to download the content of the repository to the working environment. This step ensures that the repository will be available for further steps in the workflow. 
2. **Authenticate with Google Cloud**: uses the google-github-actions/auth@v2 action to authenticate with Google Cloud using the credentials stored in the secret (credentials_json: '${{{ secrets.GCP_CREDENTIALS }}'). This step ensures that the Google Cloud permissions are set correctly.
3. **Set up Google Cloud SDK**: uses the google-github-actions/setup-gcloud@v2 action to set up Google Cloud SDK by installing the "gke-gcloud-auth-plugin" add-on. This step enables the use of Google Cloud tools in the following steps.
4. **Configure kubectl**: executes the "gcloud container clusters get-credentials autopilot-cluster-1 --region europe-central2" command to get the credentials for the GKE cluster and the "kubectl config current-context" command to check the current kubectl context. This step ensures that kubectl is correctly configured to communicate with the GKE cluster.
5. **Download IMAGE_TAG file**: uses the actions/download-artifact@v4 action to download an artifact named 'image-tag'. This step ensures that the image tag file (IMAGE_TAG) is available for use in the next step.
6. **Apply Kubernetes manifests**: executes the command to read the image tag from the file (IMAGE_TAG=$(cat image-tag.txt)) and replace the image tag in the Kubernetes manifest (sed -i "s|quirex/nowted-app|$IMAGE_TAG|g" k8s/resources.yaml). Then apply the updated Kubernetes manifest (kubectl apply -f k8s/resources.yaml). This step installs the application on the GKE cluster using the corresponding Docker image.
7. **Verify deployment**: executes the command to check the deployment status (kubectl rollout status deployment/testopspoc) and print out the current pods (kubectl get pods). This step ensures that the deployment is successful and provides an overview of the current pod status.