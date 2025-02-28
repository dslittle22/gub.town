# jil.im/just

default:
  just --list

dev:
  docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --force-recreate
