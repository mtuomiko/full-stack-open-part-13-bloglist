## Full stack open part 13 bloglist backend

FSO course [part 13](https://fullstackopen.com/en/part13).

## NPM commands

* `tsc` compile TypeScript to `build/`
* `dev` run main entrypoint `index.ts` with `ts-node-dev`
* `lint` eslint
* `start` run built main entrypoint from `build/`
* `cli` run built CLI (exercise 13.3) from `build/`
* `migration:down` revert previous migration (migrations stored at `src/migrations`)

## Environment variables (can be defined in `.env` file) 

* `DB_URL` complete postgresql connection url, for example `postgres://user:pass@db.com:5432/database`
* `PORT` port to run the app on
* `JWT_SECRET` secret for JWT usage
