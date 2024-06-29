# The CI/CD Pipeline

We created a workflow or CI/CD pipeline, which we called **ci-cd.yml**. We included tools from all eight categories of TestOps tools which we have identified:

1. Test automation tools,
2. Continuous Integration and Continuous Deployment (CI/CD) tools,
3. Test management tools,
4. Performance testing tools,
5. Security testing tools,
6. Containerisation and orchestration tools,
7. Monitoring and reporting tools,
8. Version control tools.

In implementing the TestOps strategies, we established three levels of testing: **E2E testing**, **performance testing** and **security testing**. This covered all the tools from the identified TestOps tool categories that are directly related to application testing. 

The pipeline is designed to be extensible, allowing for an unlimited number of additional levels and types of testing to be added should the need arise. It is also possible to extend the pipeline with quality thresholds that define the thresholds for the allowed passage of test steps.

## The Architecture

Below is the image of the proposed CI/CD Pipeline Architecture which includes TestOps strategies and tools.
![Pipeline Architecture](Pipeline-Architecture.png) {width="550"}

## Pipeline Steps

Our PoC CI/CD pipeline consists of several key steps that are executed whenever changes are introduced to the main repository branch or when a code merge request is opened on the main branch. The aim of these steps is to ensure high quality, performance and security of our application before its final deployment to the production environment.
The order of the steps in the pipeline has been carefully planned to maximise efficiency and to capture all key aspects of testing:

1. **[Setting up the environment](Setup.md)**: the first step is to set up the environment, where the code is checked and dependencies are set. This ensures that the environment is ready for the next steps.
2. **[Cleaning the code (linting)](Linting.md)**: the linting step checks that the code conforms to certain style rules and standards, which improves the readability and robustness of the code.
3. **[E2E Testing](End-to-End-Testing.md)**: this is performed after the linting step, as we assume that the code is already properly formatted and ready for functional testing. This verifies the functionality of the application.
4. **[Performance Testing](Performance-Testing.md)**: after successful E2E testing, we check whether the application meets the performance requirements. Performing these tests after the functional tests allows testing a realistic version of the application.
5. **[Containerisation and publishing of the Docker image](Containerization-and-Docker-Image-Publishing.md)**: once we are confident of the functionality and performance of the application, we package it in a Docker image and publish it to the Docker image repository, Docker Hub. This allows consistent and reproducible deployment across different environments.
6. **[Security testing](Security-Testing.md)**: this is performed after containerisation to ensure that there are no security flaws specific to the container environment. This order is crucial as it allows to check the complete set of dependencies and configurations in their final form.
7. **[Deployment to the GKE cluster](Deployment.md)**: the final step is to deploy the application to the Google Kubernetes Engine (GKE) cluster, where the application is ready for production use. Before installation, we check that the security testing has been successfully completed.