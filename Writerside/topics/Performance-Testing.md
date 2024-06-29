# Performance Testing

The CI/CD job called **Performance Testing** is run on the latest version of the Ubuntu operating system and depends on the **[E2E Testing](End-to-End-Testing.md)** job that has been run before. It is intended to run performance tests, generate test reports and upload the reports as artefacts for later use.

## Pipeline job snippet

```yaml
performance-testing:
  name: Performance Testing
  runs-on: ubuntu-latest
  needs: e2e-testing
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    - name: Setup node.js
      uses: actions/setup-node@v4
      with:
        node-version: 18.x
    - name: Use cached node_modules
      run: npm ci --cache ~/.npm
    - name: Build application
      run: npm run build
    - name: Install k6
      run: |
        curl https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz -L | tar xvz --strip-components 1
    - name: Start server and run performance tests
      run: | 
        npm start & npx wait-on http://localhost:3000
        ./k6 run __tests__/performance/test.js --vus 50 --duration 15s --out json=performance-testing-report.json
    - name: Upload performance report
      uses: actions/upload-artifact@v4
      with:
        name: performance-testing-report
        path: performance-testing-report.json
```

## Description

1. **Checkout repository**: uses the actions/checkout@v4 action to download the content of the repository to the working environment. This step ensures that the repository will be available for further steps in the workflow.
2. **Setup node.js**: uses the actions/setup-node@v4 action to set up the Node.js environment. The version of Node.js (node-version: 18.x) to be used in this work is specified. 
3. **Use cached node_modules**: executes the command "npm ci --cache ~/.npm" to use cached npm modules. This step ensures faster dependency installation as it uses caching.
4. **Build application**: executes the "npm run build" command to build the application. This step prepares the application for launching and testing.
5. **Install k6**: executes the command "curl https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz -L | tar xvz --strip-components 1" to install the k6 tool. This tool is used to perform performance tests.
6. **Start server and run performance tests**: execute the command "npm start & npx wait-on http://localhost:3000; ./k6 run __tests__/performance/test.js --vus 50 --duration 15s --out json=performance-testing-report.json" to start the server and run the performance tests. This step starts the server, waits until the server is available and then runs the performance tests with the k6 tool, using 50 virtual users for a period of 15 seconds. The results of the testing are saved in the performance-testing-report.json file.
7. **Upload performance report**: uses the actions/upload-artifact@v4 action to upload the performance testing report as an artifact. The report (performance-testing-report.json) is uploaded, allowing later review and analysis of the performance testing results.