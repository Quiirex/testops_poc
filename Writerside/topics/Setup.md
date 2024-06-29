# Setup

In our proposed CI/CD pipeline with TestOps strategies and tools included, the first step is always to set up the environment and install the necessary dependencies by caching the Node modules.

## Pipeline job snippet

```yaml
jobs:
  setup:
    name: Setup
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup node.js with node_modules cache
        id: node-with-cache
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      - name: Install npm packages
        run: npm ci
```

## Description

The purpose of this part of the pipeline is to prepare the environment for further continuous integration and delivery processes on the latest version of Ubuntu (Linux). It includes repository checking, setting up the Node.js environment, and managing the npm cache for faster dependency loading. It includes three steps:

1. **Checkout repository**: uses the "actions/checkout@v4" action to download the repository contents from the version control system to the working environment. This step ensures that the repository will be available for further steps in the workflow.
2. **Setup node.js with node_modules cache**: uses the "actions/cache@v4" action to set up a Node.js environment with a cache of Node modules. The specified caching paths and keys (path: ~/.npm and key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}) ensure that caching is used to install dependencies faster. If a cache with the appropriate key is not available, it is restored from predefined restore-keys, which helps to improve the efficiency of the workflow.
3. **Install npm packages**: executes the "npm ci" command, which installs all npm packages specified in the package-lock.json file. "npm ci" is an optimised version of the "npm install" command, which provides a fresher, faster and more reliable installation of dependencies.
