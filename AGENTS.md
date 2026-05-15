# AGENTS.md

This file provides guidance to coding agents (e.g. Claude Code, claude.ai/code) when working with code in this repository.

## Repository purpose

`@appscode/json-filter` — a small JavaScript library that filters out fields from a JSON object based on a set of operations. Used across AppsCode UIs to project response payloads to only the fields a component needs.

## Architecture

- `json-filter.js` — the library source.
- `test.js` — unit tests.
- `rollup.config.js` — bundler config.
- `appscode-json-filter-*.tgz` — pre-published tarball (kept for direct install).
- `package.json` — npm scripts and metadata.

## Common commands

- `npm install` — install dependencies.
- `npm test` — run `test.js`.
- `npx rollup -c` — produce the distributable bundle.
- `npm publish` — publish to npm (releases).

## Conventions

- Single-file library. Keep additions minimal; complex transformations belong in the consuming app.
- The library is published as `@appscode/json-filter`; bump `package.json` version on every API change.
- License: see `LICENSE` if present.
