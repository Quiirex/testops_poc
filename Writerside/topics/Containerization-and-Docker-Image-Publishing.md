# Containerization and Docker Image Publishing

The CI/CD job called **Containerize and Publish Image** runs on the latest version of Ubuntu and depends on the previously executed **[Performance Testing](Performance-Testing.md)** jobs. It is intended to create a Docker image of an application, upload it to the Docker Image repository - DockerHub and create an artifact with the version information of the Docker image.

```yaml
containerize-and-publish-image:
  name: Containerize and Publish Image
  runs-on: ubuntu-latest
  needs: performance-testing
  outputs:
    image-tag: ${{ steps.build-and-push.outputs.IMAGE_TAG }}
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    - name: Log in to DockerHub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    - id: build-and-push
      name: Build and push docker image
      run: |
        IMAGE_TAG=${{ secrets.DOCKERHUB_USERNAME }}/nowted-app:${{ github.sha }}
        echo $IMAGE_TAG > image-tag.txt
        docker build -t $IMAGE_TAG .
        docker push $IMAGE_TAG
    - name: Upload IMAGE_TAG file
      uses: actions/upload-artifact@v4
      with:
        name: image-tag
        path: image-tag.txt
```

## Description

1. **Checkout repository**: uses the actions/checkout@v4 action to download the content of the repository to the working environment. This step ensures that the repository will be available for further steps in the workflow.
2. **Log in to DockerHub**: uses the docker/login-action@v3 action to log in to DockerHub. It retrieves login information, such as username and password, from stored secrets.
3. **Build and push docker image**: this step executes a script that:
   1. creates a Docker image tag (IMAGE_TAG) using the username and the current "commit SHA" (github.sha),
   2. builds the Docker image with the tag (docker build -t $IMAGE_TAG .),
   3. upload the Docker image to the DockerHub repository (docker push $IMAGE_TAG),
   4. saves the Docker image tag to a file (image-tag.txt) for further use.
4. **Upload IMAGE_TAG file**: uses the actions/upload-artifact@v4 action to upload the image-tag.txt file as an artifact. This file contains the Docker image tag and will be used in the following steps.
5. **Output configuration**: the job defines the output data (image-tag) to be used in other parts of the pipeline. The content of this output is the Docker image-tag stored in the previous step.