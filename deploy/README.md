# GitLab Deploy Setup

This project is deployed by a GitLab runner that has access to Docker on the target VM.

## Runner requirements

- Linux VM
- Docker Engine
- Docker Compose v2
- GitLab runner registered to this repo
- Runner must be able to run untagged jobs, or add the runner tag to `.gitlab-ci.yml`

## Required GitLab variables

Add these in `Settings > CI/CD > Variables`.

Use `deploy/.env.gitlab.example` as the checklist. Real values must not be committed.

Minimum required values:

```env
DEPLOY_BRANCH=main
DB_NAME=recruitmen_db
DB_USER=recruitai
DB_PASSWORD=...
MYSQL_ROOT_PASSWORD=...
JWT_SECRET=...
FRONTEND_URL=https://frontend.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
N8N_WEBHOOK_URL=https://workflow.jagr.id/webhook/candidate
```

For temporary Cloudflare tunnel deployment, remove or leave `NEXT_PUBLIC_API_URL` empty so the frontend calls the backend through the same public tunnel path (`/api`).

## Deploy flow

On push to `DEPLOY_BRANCH`, GitLab will:

1. Validate the Docker Compose production config.
2. Build backend and frontend Docker images on the VM.
3. Start/update `mysql`, `backend`, `frontend`, `gateway`, and `tunnel` with Docker Compose.
4. Check backend `/health`.
5. Print a temporary `https://*.trycloudflare.com` URL from the tunnel logs.

MySQL data is stored in the Docker volume `recruitai_mysql_data`. Do not remove this volume unless you intentionally want to reset production data.

The SQL dump `recruitmen_db.sql` is only imported automatically when the MySQL volume is created for the first time.

## n8n callback

The backend sends candidates to:

```env
N8N_WEBHOOK_URL=https://workflow.jagr.id/webhook/candidate
```

The n8n node `HTTP - Update Candidate in Backend` must call the deployed backend:

```text
https://api.example.com/api/n8n/update-result
```

Replace `api.example.com` with the real backend domain.

For a temporary tunnel demo, use the printed `trycloudflare.com` URL:

```text
https://<printed-url>/api/n8n/update-result
```
