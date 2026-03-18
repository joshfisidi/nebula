# Dependencies, Config, And Environment

## Workspace shape

The repo is a workspace-style JavaScript or TypeScript monorepo with app, package, test, and tooling boundaries.

## Root script surface

The root `package.json` exposes commands for:

- build
- dev
- background dev stack control
- Playwright runs
- typecheck
- multiple Nebula automation and audit tasks

That indicates the root package is acting as the operator cockpit for both development and maintenance.

## Next.js config

`apps/web/next.config.mjs` includes several important choices:

- `reactStrictMode: true`
- `poweredByHeader: false`
- `compress: true`
- `experimental.externalDir = true`
- `transpilePackages` for `@nebula/protocol` and `@nebula/physics`
- `allowedDevOrigins` extended from localhost, LAN IPs, and environment values

## Server environment shape

The server reads environment variables for:

- ports
- allowed roots
- physics tick timing
- patch queue flush timing
- patch queue snapshot threshold

This means behavior can be tuned operationally without changing source.

## Exposure and trust model

- the app is built for local-first trust, not arbitrary remote multitenancy
- both web and server config show accommodation for local-network development
- security depends on local-runtime assumptions, allowed-root enforcement, and operator control

## Practical risks

- LAN-friendly defaults deserve explicit operational documentation
- environment-based tuning can produce behavior drift across machines if not recorded
- config is distributed across app, server, scripts, and tools, so operator understanding matters

## Practical takeaway

Nebula's configuration model is flexible and realistic for a local developer tool. The tradeoff is that environment shape is part of product behavior, so audit and diagnostics need to keep surfacing it clearly.

