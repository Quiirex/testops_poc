# Linting

The CI/CD job called **Linting** is performed on the latest version of Ubuntu and depends on the previously performed **[Setup](Setup.md)** work. It is intended to check the code against certain style and syntax guidelines, generate a report and upload the report as an artefact for later use.

## Pipeline job snippet

```yaml
linting:
  name: Linting
  runs-on: ubuntu-latest
  needs: setup
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    - name: Setup node.js
      uses: actions/setup-node@v4
      with:
        node-version: 18.x
    - name: Use cached node_modules
      run: npm ci --cache ~/.npm
    - name: Run linting and generate report
      run: npm run lint
    - name: Annotate code linting results
      uses: ataylorme/eslint-annotate-action@v3
      with:
        report-json: 'lint_report.json'
    - name: Upload linting report
      uses: actions/upload-artifact@v4
      with:
        name: lint_report.json
        path: lint_report.json
        retention-days: 5
```

## Description

1. **Checkout repository**: uses the actions/checkout@v4 action to download the content of the repository to the working environment. This step ensures that the repository will be available for further steps in the workflow.
2. **Setup node.js**: uses the actions/setup-node@v4 action to set up the Node.js environment. The version of Node.js (node-version: 18.x) to be used in this work is specified. 
3. **Use cached node_modules**: executes the command "npm ci --cache ~/.npm" to use cached npm modules. This step ensures faster dependency installation as it uses the caching that was set in the previous section called "Setup".
4. **Run linting and generate report**: executes the "npm run lint" command to run the code linting process, which checks the code against style and syntax guidelines. This step generates a code cleanup report that will be used in the following steps. 
5. **Annotate code linting results**: uses the ataylorme/eslint-annotate-action@v3 action to annotate the code linting results for the purpose of displaying them directly in code merge requests, etc. The code linting report (report-json: 'lint_report.json') generated in the previous step is specified as input parameter.
6. **Upload linting report**: uses the actions/upload-artifact@v4 action to upload the linting report as an artifact. The report (lint_report.json) is uploaded with a retention time of 5 days (retention-days: 5), allowing later inspection and analysis of the code cleanup results.