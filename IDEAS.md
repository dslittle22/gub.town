## Ideas

- James' "nuts" idea: we can have just one dockerfile that 1) builds and serves BE, 2) builds FE and chucks it in a directory. Then in the docker compose file, we tell nginx "hey, serve the frontend stuff in this specified directory".
- Have admin as a role, not as a boolean on user objects!
- Timestamp should be `createdAt`
- https://www.apollographql.com/docs/apollo-server/workflow/generate-types/
