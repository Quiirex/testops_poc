# Security Testing

The CI/CD job called **Security Testing** is run on the latest version of the Ubuntu operating system and is dependent on the previously run **[Containerize and Publish Image](Containerization-and-Docker-Image-Publishing.md)** job. It is intended to run security tests on an application, generate security testing reports and upload these reports as artefacts for later use.

```yaml
security-testing:
  name: Security Testing
  runs-on: ubuntu-latest
  needs: containerize-and-publish-image
  outputs:
    full_scan_result: ${{ steps.store_full_scan_result.outputs.full_scan_result }}
  services:
    app:
      image: quiirex/nowted-app:latest
      ports:
        - 3000:3000
  steps:
    - name: Run ZAP full scan
      id: full_scan
      uses: zaproxy/action-full-scan@v0.10.0
      with:
        target: 'http://app:3000'
    - name: Store security testing results
      id: store_full_scan_result
      run: |
        mkdir -p full_scan_results
        mv *.html full_scan_results/ || true
        FULL_RESULT_FILE=$(find full_scan_results -name "*.html" -type f)
        echo "::set-output name=full_scan_result::$FULL_RESULT_FILE"
    - name: Upload security testing report
      uses: actions/upload-artifact@v4
      with:
        name: security_testing_report
        path: ${{ steps.store_full_scan_result.outputs.full_scan_result }}
        retention-days: 5
```

## Description

1. **Run ZAP full scan**: uses the zaproxy/action-full-scan@v0.10.0 action to perform a full security scan of the application running at http://app:3000. This step identifies potential security vulnerabilities in the application.
2. **Store security testing results**: using a command line script, this step creates a folder "full_scan_results", moves all html files to this folder and sets a variable "full_scan_result" containing the path to the stored results file. This step ensures that the results of the security scan are correctly stored for later use.
3. **Upload security testing report**: uses the actions/upload-artifact@v4 action to upload the security testing report as an artifact. The report is uploaded with a retention time of 5 days (retention-days: 5), allowing later review and analysis of the security testing results.