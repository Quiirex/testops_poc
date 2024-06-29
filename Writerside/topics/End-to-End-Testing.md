# End-to-End Testing

The CI/CD job called **E2E Testing** is run on the latest version of the Ubuntu operating system and depends on the previously executed [Linting](Linting.md) job. It is intended to run end-to-end (E2E) tests, generate e2e testing reports and upload these reports as artefacts for later use.

## Pipeline job snippet

```yaml
e2e-testing:
  name: E2E Testing
  runs-on: ubuntu-latest
  needs: linting
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
    - name: Start server
      run: npm run start &
    - name: Wait for server to start
      run: npx wait-on http://localhost:3000
    - name: Run e2e tests
      run: npx cypress run --reporter junit --reporter-options mochaFile=reports/TEST-[hash].xml
    - name: Upload e2e testing report
      uses: actions/upload-artifact@v4
      with:
        name: e2e_testing_report
        path: reports
        retention-days: 5
    - name: Python setup
      if: always()
      uses: actions/setup-python@v3
      with:
        python-version: '3.x'
    - name: Upload e2e testing results to TestRail
      env:
        TESTRAIL_EMAIL: ${{ secrets.TESTRAIL_EMAIL }}
        TESTRAIL_PASS: ${{ secrets.TESTRAIL_PASS }}
      if: always()
      run: |
        pip install trcli
        junitparser merge --glob "reports/TEST-*" "reports/junit-report.xml"
        trcli -y \
          -h https://lukamlinaric.testrail.io/ \
          --project "TestOps PoC" \
          -u "$TESTRAIL_EMAIL" \
          -p "$TESTRAIL_PASS" \
          parse_junit \
          --title "E2E Tests from CI/CD Pipeline" \
          --run-description ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }} \
          -f "reports/junit-report.xml"
```

## Description

1. **Checkout repository**: uses the actions/checkout@v4 action to download the content of the repository to the working environment. This step ensures that the repository will be available for further steps in the workflow.
2. **Setup node.js**: uses the actions/setup-node@v4 action to set up the Node.js environment. The version of Node.js (node-version: 18.x) to be used in this work is specified. 
3. **Use cached node_modules**: executes the command "npm ci --cache ~/.npm" to use cached npm modules. This step ensures faster dependency installation as it uses caching.
4. **Build application**: executes the "npm run build" command to build the application. This step prepares the application for launching and testing.
5. **Start server**: executes the "npm run start &" command to start the server in the background. This step allows the application to run while the tests are running.
6. **Wait for server to start**: executes the "npx wait-on http://localhost:3000" command to wait for the server to become available at the specified URL. This step ensures that the server is fully booted before testing starts.
7. **Run e2e tests**: executes the command "npx cypress run --reporter junit --reporter-options mochaFile=reports/TEST-[hash].xml" to run end-to-end tests using the Cypress tool. This step generates a test report in JUnit format.
8. **Upload e2e testing report**: uses the actions/upload-artifact@v4 action to upload the E2E testing report as an artifact. The report is uploaded with a retention time of 5 days (retention-days: 5), allowing later review and analysis of the testing results.
9. **python setup**: uses the actions/setup-python@v3 action to set up the Python environment. The Python version (python-version: '3.x') to be used in the next step is specified.
10. **Upload e2e testing results to TestRail**: this step, which is executed regardless of the success of the previous steps (command "if: always()"), involves uploading the testing results to the TestRail portal. Using environment variables and commands, the results are aggregated and uploaded to the TestRail portal, allowing further analysis and tracking of the test results.