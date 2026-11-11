# Security Policy

## Supported Versions

Only the latest minor release receives security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.5.x   | :white_check_mark: |
| < 0.5   | :x:                |

Versions up to and including 0.4.0 are vulnerable to OS command injection
(CWE-78) via the file path, output directory, or `customConverter` option.
Upgrade to 0.5.0 or later.

## Reporting a Vulnerability

Please do not report security vulnerabilities through public issues or pull
requests.

Report them privately via GitHub:
<https://github.com/hckrnews/ppt2pdf/security/advisories/new>

Include a description, the affected version, and steps to reproduce. You can
expect an initial response within a week. If the report is accepted, a fix is
prepared in a private fork and a security advisory is published together with
the patched release. If it is declined, you will receive an explanation.
