# Best Practices

The following best practices have been taken into account in the implementation of the CI/CD pipeline:
- **Isolation of environments**: the use of containerisation ensures that all environments (development, testing, production) are consistent and isolated.
- **Transparent documentation**: each step in the pipeline is clearly documented, making it easy for other team members to understand and adapt the process.
- **Communication and reporting**: at the end of each pipeline run, we are informed of the result of the pipeline via email (this needs to be enabled in your GitHub account settings), allowing the development team to react in a timely manner.
- **Use of caching**: caching npm modules and other dependencies in the application reduces the build time and increases the efficiency of the pipeline.
- **Task partitioning**: the pipeline is divided into several independent tasks, making it easier to maintain and adapt individual steps.
- **Secrets and credentials management**: all sensitive information, such as passwords and access tokens, are stored securely in GitHub Secrets, reducing the risk of security breaches.
- **Automated dependency vulnerability checking**: we have enabled regular dependency checking and updating for known security vulnerabilities (GitHub Dependabot), ensuring that we are using the latest and most secure versions of libraries.
- **Use of proven tools and plugins**: we have used widely used and proven tools and plugins with a high level of support and documentation, which increases the reliability of our pipeline.