#!/bin/bash
# Start backend
cd ~/Projects/RecruitAi
npm run dev &
# Start frontend
cd ~/Projects/RecruitAi/RecruitAICapstone/frontend
npm run dev &
# Start n8n (jika belum running)
cd ~/Projects/RecruitAi/RecruitAICapstone/n8n-docker
docker compose up -d
