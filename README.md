# engine

## Testing

This project uses `node:test` and `node:assert`

We recommend running tests in isolation as some tests need to spin up docker containers and may take a long time.

Run all the tests with `npm t`
Run a single test with `node ./adapters/export-file-to-google-drive/test`

### Getting setup

1. Duplicate `.env.test-example` -> `.env.test`
1. Populate the values from vault, or ask another developer

### Notes

Ensure any required envirnoment variables are documented in the `.env.test-example` file and the value is added to vault
