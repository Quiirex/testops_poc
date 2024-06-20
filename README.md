[![CI/CD Pipeline](https://github.com/Quiirex/testops_poc/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Quiirex/testops_poc/actions/workflows/ci-cd.yml)

# TestOps - PoC

This is a PoC for integrating TestOps practices and tools in the CI/CD pipeline.

## What is TestOps?

TestOps is a concept that aims to bring the best practices of DevOps to the testing world. It is a set of practices, tools, and methodologies that aim to improve the quality of the software development process by integrating testing into the development pipeline.

## The Pipeline

The CI/CD pipeline used in this PoC is designed to automate the processes of building, testing, and deploying a Node.js application. It includes the following key stages:

1. Setup:

   - Checkout Repository: Fetch the code from the main branch.
   - Setup Node.js with Cache: Install Node.js and cache npm dependencies for faster builds.
   - Install npm Packages: Install necessary npm packages.

2. Linting:

   - Checkout Repository: Fetch the code.
   - Setup Node.js: Install the required Node.js version.
   - Use Cached Node Modules: Utilize cached npm modules.
   - Run Linting: Execute linting scripts and generate a report.
   - Annotate and Upload Results: Annotate code with linting results and upload the report.

3. End-to-End (E2E) Testing:

   - Checkout Repository: Fetch the code.
   - Setup Node.js: Install the required Node.js version.
   - Use Cached Node Modules: Utilize cached npm modules.
   - Build and Start Application: Build the application and start the server.
   - Run E2E Tests: Execute end-to-end tests using Cypress.
   - Upload E2E Testing Report: Upload the generated test report.
   - Upload Results to TestRail: Integrate and upload test results to TestRail.

4. Security Testing:

   - Run ZAP Full Scan: Perform a full security scan using OWASP ZAP.
   - Store and Upload Security Testing Results: Save and upload the security testing report.

5. Performance Testing:

   - Checkout Repository: Fetch the code.
   - Setup Node.js: Install the required Node.js version.
   - Use Cached Node Modules: Utilize cached npm modules.
   - Build Application: Build the application.
   - Install and Run k6: Install k6 and run performance tests.
   - Upload Performance Report: Upload the performance testing report.

6. Containerization and Image Publishing:

   - Checkout Repository: Fetch the code.
   - Log in to DockerHub: Authenticate with DockerHub.
   - Build and Push Docker Image: Build and push the Docker image to the repository.
   - Upload Image Tag: Upload the Docker image tag for deployment.

7. Deployment:
   - Checkout Repository: Fetch the code.
   - Authenticate with Google Cloud: Authenticate with Google Cloud using credentials.
   - Set up Google Cloud SDK: Install and configure the Google Cloud SDK.
   - Configure kubectl: Set up kubectl for managing Kubernetes clusters.
   - Deploy to GKE: Deploy the application to a Google Kubernetes Engine (GKE) cluster.
   - Verify Deployment: Check the deployment status and list running pods.
