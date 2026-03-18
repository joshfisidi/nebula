# Tests, Mocks, And Quality Gates

## Main test files reviewed

- `tests/e2e/nebula-ui.spec.ts`
- `tests/e2e/helpers/nebula-mocks.ts`

## Test focus

The current E2E coverage is aimed at product-critical flows:

- local-first onboarding
- runtime-server fallback
- local-agent or bridge-fed graph rendering
- explorer interactions
- mobile rail behavior

That is a good alignment with the actual product path.

## Mock surface

`nebula-mocks.ts` simulates:

- broken local agent conditions
- server fallback conditions
- local bridge or session behavior
- WebSocket feeds

This allows the onboarding and live-state flows to be tested without relying on a real local agent in every run.

## Quality gates observed

- root workspace `typecheck`
- web-specific typecheck
- policy gate scripts
- E2E coverage for important UX paths

## Drift finding

The test suite still contains stale product wording:

- `Connect Nebula Sync`
- `Local bridge is feeding the graph stage.`
- `Nebula Sync active`

These strings no longer match the local-access-first product direction. That means the tests are a useful change detector, but they are currently lagging the product language.

## Practical risks

- stale copy assertions can produce noisy failures or false confidence depending on which paths are exercised
- mocked local-agent behavior may lag the real endpoint contract migration
- tests protect the UI flow, but they do not substitute for a protocol-level contract test

## Practical takeaway

The repo has meaningful UI-level safety checks, but they need to be kept in lockstep with the ongoing local-access migration. Right now the main test debt is wording and endpoint-contract drift, not the total absence of coverage.

