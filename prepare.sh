#!/bin/bash 
(cd ./client && npm i) &
(cd ./backend && npm i && docker compose up -d && npx prisma migrate dev && npm run seed) 
