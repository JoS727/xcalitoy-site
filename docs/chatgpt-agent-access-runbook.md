# ChatGPT Agent Access Runbook

Use this runbook to grant ChatGPT-assisted automation access to this repository and non-production infrastructure with least privilege.

## 1) Define required access first

For each use case, mark only what is required:

- Repository read
- Repository write (only if needed)
- Deployment trigger
- Infrastructure read-only

Default to read-only and non-production scope.

## 2) Use a dedicated machine identity

- Create a dedicated GitHub App (preferred) or bot account.
- Do not use personal user tokens.
- Track owner, purpose, and expiration/review date for the identity.

## 3) Restrict repository permissions

For a GitHub App installation, start with:

- `Contents: Read-only`
- `Metadata: Read-only`
- No admin scopes

Install only on required repositories. Add write scopes only after a reviewed need.

For private repositories, ensure all of the following are true:

- The GitHub App is installed on each required private repository (or selected private repos in the org install flow).
- Organization third-party app restrictions allow this App installation.
- If using a bot account instead of an App, the bot is an explicit collaborator on each required private repository with minimum permissions.
- If your organization enforces SAML SSO, the machine identity is SSO-authorized for repository access.

## 4) Use short-lived infrastructure credentials

- Use GitHub OIDC + cloud IAM role assumption.
- Do not store long-lived cloud API keys in repository or prompts.
- Scope the IAM role to non-production resources for pilot usage.

This repository includes `.github/workflows/chatgpt-agent-pilot.yml` as an OIDC-based pilot check.

## 5) Store secrets in a secret manager

- Store needed values in GitHub Environment Secrets or cloud secret manager.
- Never store secrets in source files, prompts, or workflow YAML literals.
- Rotate secrets on a fixed schedule and after personnel/tooling changes.

## 6) Enable and review audit logging

- Enable GitHub audit logging/organization security logs.
- Enable cloud audit logs (for example, CloudTrail in AWS).
- Monitor for unusual token use, role assumptions, or repo write activity.

## 7) Prepare emergency revoke path

Document and test a fast revoke process:

- Disable GitHub App installation or bot token
- Remove IAM role trust relationship/OIDC permissions
- Disable or remove environment secrets
- Re-run pilot to confirm access is revoked

## 8) Pilot before broad rollout

Use one non-production environment first:

1. Configure `nonprod-chatgpt-pilot` GitHub Environment.
2. Add `AWS_CHATGPT_PILOT_ROLE_ARN` as an environment secret.
3. Run `ChatGPT Agent Pilot Access Check` manually.
4. Confirm the machine identity can read one target private repository and cannot access non-approved private repositories.
5. Verify logs, least-privilege behavior, and revoke flow.
6. Expand to additional repos/environments only after sign-off.
