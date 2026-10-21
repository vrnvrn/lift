# Security Policy

## Supported versions

Only the `main` branch (the deployed app) receives security fixes.

## Reporting a vulnerability

Please report vulnerabilities privately through GitHub's private vulnerability reporting:
open the repository's **Security** tab and choose **Report a vulnerability**. Do not open a
public issue for security problems.

## Dependency maintenance

Dependencies are audited periodically with `npm audit` and updated within their current
major versions; majors are only taken when required to fix a high or critical advisory.
Each update is recorded in `docs/` — see the latest record,
[SECURITY_UPDATE_2026-10-21.md](docs/SECURITY_UPDATE_2026-10-21.md).
