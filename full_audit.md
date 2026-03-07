# Full Codebase Audit

- Generated: 2026-03-07T17:45:57Z
- Root: /Users/josh/.openclaw/workspace/projects/nebula
- Excluded: node_modules .next dist build .cache .turbo .parcel-cache coverage docs .git .openclaw

## 1) Core File Tree

```text
.
├── .pnpm-store
│   └── v3
├── apps
│   ├── server
│   │   ├── src
│   │   │   ├── universe
│   │   │   │   ├── graph.ts
│   │   │   │   ├── ids.ts
│   │   │   │   ├── ignore.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── layout.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── watch.ts
│   │   │   │   └── ws.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   └── web
│       ├── app
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── src
│       │   ├── components
│       │   │   └── ui
│       │   │       ├── badge.tsx
│       │   │       ├── button.tsx
│       │   │       ├── card.tsx
│       │   │       ├── input.tsx
│       │   │       └── native-select.tsx
│       │   ├── lib
│       │   │   └── utils.ts
│       │   └── universe
│       │       ├── AnimatedSVGEdge.tsx
│       │       ├── FloatingConnectionLine.tsx
│       │       ├── FloatingEdge.tsx
│       │       ├── graphStore.ts
│       │       ├── layoutEngines.ts
│       │       ├── patch.ts
│       │       ├── ProjectViewerPanel.tsx
│       │       ├── ReactFlowOverlay.tsx
│       │       ├── UniverseLiveProvider.tsx
│       │       ├── UniverseScene.tsx
│       │       └── wsClient.ts
│       ├── .env.example
│       ├── next-env.d.ts
│       ├── next.config.mjs
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── tsconfig.json
│       ├── tsconfig.tsbuildinfo
│       └── tsconfig.typecheck.json
├── packages
│   ├── physics
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   └── verlet.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── protocol
│       ├── src
│       │   ├── index.ts
│       │   └── types.ts
│       ├── package.json
│       └── tsconfig.json
├── scripts
│   ├── automation
│   │   ├── nebula-cron-run.cjs
│   │   ├── nebula-github-sync.cjs
│   │   └── nebula-health-check.cjs
│   ├── dev
│   │   ├── start-bg.sh
│   │   ├── start.sh
│   │   ├── status-bg.sh
│   │   └── stop-bg.sh
│   └── audit_full.sh
├── tools
│   └── nebula-maintainer
│       ├── out
│       │   ├── 2026-03-03_1000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_1900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_1900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_2000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_2000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_2100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_2100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_2200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_2200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-03_2300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-03_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-03_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-03_2300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_0900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_0900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_1900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_1900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_2000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_2000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_2100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_2100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_2200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_2200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-04_2300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-04_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-04_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-04_2300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_0900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_0900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_1900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_1900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_2000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_2000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_2100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_2100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_2200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_2200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-05_2300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-05_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-05_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-05_2300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_0900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_0900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_1900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_1900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_2000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_2000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_2100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_2100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_2200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_2200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-06_2300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-06_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-06_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-06_2300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0200_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0300_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0300_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0400_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0400_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0500_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0500_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0600_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0600_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0700_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0700_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0800_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0800_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_0900_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_0900_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_1000_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_1000_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_1100_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   ├── 2026-03-07_1100_ET_threejs_org_examples_.txt
│       │   ├── 2026-03-07_1200_ET_github_com_vasturiano_three_fatline.txt
│       │   ├── 2026-03-07_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
│       │   ├── 2026-03-07_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
│       │   ├── 2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
│       │   ├── 2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
│       │   └── 2026-03-07_1200_ET_threejs_org_examples_.txt
│       ├── sources
│       │   └── seed_urls.txt
│       ├── src
│       │   ├── config.cjs
│       │   ├── config.ts
│       │   ├── main.cjs
│       │   └── main.ts
│       ├── com.openclaw.nebula.hourly.plist
│       ├── nebula-hourly.service
│       ├── nebula-hourly.timer
│       ├── package.json
│       └── tsconfig.json
├── upgrades
│   ├── briefs
│   │   ├── BRIEF_2026-03-05__10_09_23_ET.md
│   │   ├── BRIEF_2026-03-05__11_02_01_ET.md
│   │   ├── BRIEF_2026-03-05__12_02_02_ET.md
│   │   ├── BRIEF_2026-03-05__13_02_07_ET.md
│   │   ├── BRIEF_2026-03-05__14_02_04_ET.md
│   │   ├── BRIEF_2026-03-05__15_02_07_ET.md
│   │   ├── BRIEF_2026-03-05__16_02_06_ET.md
│   │   ├── BRIEF_2026-03-05__17_02_06_ET.md
│   │   ├── BRIEF_2026-03-05__18_02_04_ET.md
│   │   ├── BRIEF_2026-03-05__19_02_09_ET.md
│   │   ├── BRIEF_2026-03-05__20_02_04_ET.md
│   │   ├── BRIEF_2026-03-05__21_02_20_ET.md
│   │   ├── BRIEF_2026-03-05__22_02_17_ET.md
│   │   ├── BRIEF_2026-03-05__23_02_14_ET.md
│   │   ├── BRIEF_2026-03-06__00_02_19_ET.md
│   │   ├── BRIEF_2026-03-06__01_02_52_ET.md
│   │   ├── BRIEF_2026-03-06__02_02_15_ET.md
│   │   ├── BRIEF_2026-03-06__03_02_12_ET.md
│   │   ├── BRIEF_2026-03-06__04_02_08_ET.md
│   │   ├── BRIEF_2026-03-06__05_02_23_ET.md
│   │   ├── BRIEF_2026-03-06__06_02_07_ET.md
│   │   ├── BRIEF_2026-03-06__07_02_07_ET.md
│   │   ├── BRIEF_2026-03-06__08_08_34_ET.md
│   │   ├── BRIEF_2026-03-06__09_03_08_ET.md
│   │   ├── BRIEF_2026-03-06__10_04_28_ET.md
│   │   ├── BRIEF_2026-03-06__11_02_21_ET.md
│   │   ├── BRIEF_2026-03-06__12_02_21_ET.md
│   │   ├── BRIEF_2026-03-06__13_02_12_ET.md
│   │   ├── BRIEF_2026-03-06__14_02_12_ET.md
│   │   ├── BRIEF_2026-03-06__15_02_16_ET.md
│   │   ├── BRIEF_2026-03-06__16_02_13_ET.md
│   │   ├── BRIEF_2026-03-06__17_02_15_ET.md
│   │   ├── BRIEF_2026-03-06__18_02_14_ET.md
│   │   ├── BRIEF_2026-03-06__19_02_30_ET.md
│   │   ├── BRIEF_2026-03-06__20_02_15_ET.md
│   │   ├── BRIEF_2026-03-06__21_02_40_ET.md
│   │   ├── BRIEF_2026-03-06__22_02_14_ET.md
│   │   ├── BRIEF_2026-03-06__23_02_17_ET.md
│   │   ├── BRIEF_2026-03-07__00_02_15_ET.md
│   │   ├── BRIEF_2026-03-07__01_02_11_ET.md
│   │   ├── BRIEF_2026-03-07__02_02_12_ET.md
│   │   ├── BRIEF_2026-03-07__03_02_56_ET.md
│   │   ├── BRIEF_2026-03-07__04_02_30_ET.md
│   │   ├── BRIEF_2026-03-07__05_02_17_ET.md
│   │   ├── BRIEF_2026-03-07__06_02_29_ET.md
│   │   ├── BRIEF_2026-03-07__07_03_10_ET.md
│   │   ├── BRIEF_2026-03-07__08_05_26_ET.md
│   │   ├── BRIEF_2026-03-07__08_50_59_ET.md
│   │   ├── BRIEF_2026-03-07__09_02_21_ET.md
│   │   ├── BRIEF_2026-03-07__09_43_00_ET.md
│   │   ├── BRIEF_2026-03-07__10_02_13_ET.md
│   │   ├── BRIEF_2026-03-07__11_02_05_ET.md
│   │   └── BRIEF_2026-03-07__12_04_19_ET.md
│   ├── .last-posted-brief
│   └── README.md
├── visual-fixture
│   ├── alpha-app
│   │   ├── assets
│   │   │   └── icons
│   │   ├── config
│   │   │   └── app.json
│   │   ├── empty-folder
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── Header.js
│   │   │   │   └── Sidebar.js
│   │   │   ├── lib
│   │   │   │   └── math.js
│   │   │   ├── routes
│   │   │   │   └── home.js
│   │   │   └── index.js
│   │   ├── tests
│   │   │   └── unit
│   │   │       └── header.test.txt
│   │   └── README.md
│   └── data-service
│       ├── config
│       │   └── service.yaml
│       ├── empty-dir
│       ├── logs
│       │   └── archive
│       │       └── .keep
│       ├── scripts
│       │   └── reindex.sh
│       ├── src
│       │   ├── api
│       │   │   └── health.js
│       │   ├── domain
│       │   │   └── types.js
│       │   ├── storage
│       │   │   └── repo.js
│       │   └── index.js
│       └── README.md
├── .DS_Store
├── .gitignore
├── .nebula-dev.log
├── full_audit.md
├── instructions.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.base.json

51 directories, 741 files
```

## 2) Core Source Files (index)

```text
apps/server/package.json
apps/server/src/index.ts
apps/server/src/universe/graph.ts
apps/server/src/universe/ids.ts
apps/server/src/universe/ignore.ts
apps/server/src/universe/index.ts
apps/server/src/universe/layout.ts
apps/server/src/universe/types.ts
apps/server/src/universe/watch.ts
apps/server/src/universe/ws.ts
apps/server/tsconfig.json
apps/web/app/globals.css
apps/web/app/layout.tsx
apps/web/app/page.tsx
apps/web/next-env.d.ts
apps/web/next.config.mjs
apps/web/package.json
apps/web/postcss.config.mjs
apps/web/src/components/ui/badge.tsx
apps/web/src/components/ui/button.tsx
apps/web/src/components/ui/card.tsx
apps/web/src/components/ui/input.tsx
apps/web/src/components/ui/native-select.tsx
apps/web/src/lib/utils.ts
apps/web/src/universe/AnimatedSVGEdge.tsx
apps/web/src/universe/FloatingConnectionLine.tsx
apps/web/src/universe/FloatingEdge.tsx
apps/web/src/universe/graphStore.ts
apps/web/src/universe/layoutEngines.ts
apps/web/src/universe/patch.ts
apps/web/src/universe/ProjectViewerPanel.tsx
apps/web/src/universe/ReactFlowOverlay.tsx
apps/web/src/universe/UniverseLiveProvider.tsx
apps/web/src/universe/UniverseScene.tsx
apps/web/src/universe/wsClient.ts
apps/web/tsconfig.json
apps/web/tsconfig.typecheck.json
full_audit.md
instructions.md
package.json
packages/physics/package.json
packages/physics/src/index.ts
packages/physics/src/verlet.ts
packages/physics/tsconfig.json
packages/protocol/package.json
packages/protocol/src/index.ts
packages/protocol/src/types.ts
packages/protocol/tsconfig.json
pnpm-lock.yaml
pnpm-workspace.yaml
README.md
scripts/audit_full.sh
scripts/automation/nebula-cron-run.cjs
scripts/automation/nebula-github-sync.cjs
scripts/automation/nebula-health-check.cjs
scripts/dev/start-bg.sh
scripts/dev/start.sh
scripts/dev/status-bg.sh
scripts/dev/stop-bg.sh
tools/nebula-maintainer/package.json
tools/nebula-maintainer/src/config.cjs
tools/nebula-maintainer/src/config.ts
tools/nebula-maintainer/src/main.cjs
tools/nebula-maintainer/src/main.ts
tools/nebula-maintainer/tsconfig.json
tsconfig.base.json
upgrades/briefs/BRIEF_2026-03-05__10_09_23_ET.md
upgrades/briefs/BRIEF_2026-03-05__11_02_01_ET.md
upgrades/briefs/BRIEF_2026-03-05__12_02_02_ET.md
upgrades/briefs/BRIEF_2026-03-05__13_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-05__14_02_04_ET.md
upgrades/briefs/BRIEF_2026-03-05__15_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-05__16_02_06_ET.md
upgrades/briefs/BRIEF_2026-03-05__17_02_06_ET.md
upgrades/briefs/BRIEF_2026-03-05__18_02_04_ET.md
upgrades/briefs/BRIEF_2026-03-05__19_02_09_ET.md
upgrades/briefs/BRIEF_2026-03-05__20_02_04_ET.md
upgrades/briefs/BRIEF_2026-03-05__21_02_20_ET.md
upgrades/briefs/BRIEF_2026-03-05__22_02_17_ET.md
upgrades/briefs/BRIEF_2026-03-05__23_02_14_ET.md
upgrades/briefs/BRIEF_2026-03-06__00_02_19_ET.md
upgrades/briefs/BRIEF_2026-03-06__01_02_52_ET.md
upgrades/briefs/BRIEF_2026-03-06__02_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-06__03_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-06__04_02_08_ET.md
upgrades/briefs/BRIEF_2026-03-06__05_02_23_ET.md
upgrades/briefs/BRIEF_2026-03-06__06_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-06__07_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-06__08_08_34_ET.md
upgrades/briefs/BRIEF_2026-03-06__09_03_08_ET.md
upgrades/briefs/BRIEF_2026-03-06__10_04_28_ET.md
upgrades/briefs/BRIEF_2026-03-06__11_02_21_ET.md
upgrades/briefs/BRIEF_2026-03-06__12_02_21_ET.md
upgrades/briefs/BRIEF_2026-03-06__13_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-06__14_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-06__15_02_16_ET.md
upgrades/briefs/BRIEF_2026-03-06__16_02_13_ET.md
upgrades/briefs/BRIEF_2026-03-06__17_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-06__18_02_14_ET.md
upgrades/briefs/BRIEF_2026-03-06__19_02_30_ET.md
upgrades/briefs/BRIEF_2026-03-06__20_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-06__21_02_40_ET.md
upgrades/briefs/BRIEF_2026-03-06__22_02_14_ET.md
upgrades/briefs/BRIEF_2026-03-06__23_02_17_ET.md
upgrades/briefs/BRIEF_2026-03-07__00_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-07__01_02_11_ET.md
upgrades/briefs/BRIEF_2026-03-07__02_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-07__03_02_56_ET.md
upgrades/briefs/BRIEF_2026-03-07__04_02_30_ET.md
upgrades/briefs/BRIEF_2026-03-07__05_02_17_ET.md
upgrades/briefs/BRIEF_2026-03-07__06_02_29_ET.md
upgrades/briefs/BRIEF_2026-03-07__07_03_10_ET.md
upgrades/briefs/BRIEF_2026-03-07__08_05_26_ET.md
upgrades/briefs/BRIEF_2026-03-07__08_50_59_ET.md
upgrades/briefs/BRIEF_2026-03-07__09_02_21_ET.md
upgrades/briefs/BRIEF_2026-03-07__09_43_00_ET.md
upgrades/briefs/BRIEF_2026-03-07__10_02_13_ET.md
upgrades/briefs/BRIEF_2026-03-07__11_02_05_ET.md
upgrades/briefs/BRIEF_2026-03-07__12_04_19_ET.md
upgrades/README.md
visual-fixture/alpha-app/config/app.json
visual-fixture/alpha-app/README.md
visual-fixture/alpha-app/src/components/Header.js
visual-fixture/alpha-app/src/components/Sidebar.js
visual-fixture/alpha-app/src/index.js
visual-fixture/alpha-app/src/lib/math.js
visual-fixture/alpha-app/src/routes/home.js
visual-fixture/data-service/config/service.yaml
visual-fixture/data-service/README.md
visual-fixture/data-service/scripts/reindex.sh
visual-fixture/data-service/src/api/health.js
visual-fixture/data-service/src/domain/types.js
visual-fixture/data-service/src/index.js
visual-fixture/data-service/src/storage/repo.js
```

## 3) ripgrep symbol map (top-level patterns)

```text
scripts/audit_full.sh:76:    "(export\\s+function|export\\s+const|class\\s+|create\\(|use[A-Z][A-Za-z0-9_]+\\(|ReactFlow|WebSocket|chokidar|layoutWithElk|layoutWithDagre|chooseLayout|setFocusId|toggleExpandedNode)" \
apps/server/src/universe/index.ts:10:export function startUniverseRuntime(params: {
tools/nebula-maintainer/src/main.ts:182:      files: ['apps/web/src/universe/ReactFlowOverlay.tsx', 'apps/web/src/universe/FloatingEdge.tsx'],
tools/nebula-maintainer/src/main.ts:192:      files: ['apps/web/src/universe/ReactFlowOverlay.tsx', 'apps/web/src/universe/ProjectViewerPanel.tsx'],
tools/nebula-maintainer/src/main.ts:212:      files: ['apps/web/src/universe/ReactFlowOverlay.tsx', 'apps/web/src/universe/EdgeSystem.tsx'],
tools/nebula-maintainer/src/main.ts:579:      'WebSocket server bind host is 0.0.0.0 (LAN/Tailscale reachable).',
tools/nebula-maintainer/src/main.ts:580:      'Regression: WebSocket server is not explicitly bound to 0.0.0.0',
tools/nebula-maintainer/src/main.ts:596:      () => fs.existsSync(path.join(NEBULA_ROOT, 'apps/web/src/universe/ReactFlowOverlay.tsx')),
tools/nebula-maintainer/src/main.ts:597:      'ReactFlowOverlay exists.',
tools/nebula-maintainer/src/main.ts:598:      'Regression: apps/web/src/universe/ReactFlowOverlay.tsx missing',
packages/physics/src/verlet.ts:31:export function applySpringConstraints(ctx: IntegratorContext): void {
packages/physics/src/verlet.ts:64:export function applyCentralGravity(ctx: IntegratorContext): void {
packages/physics/src/verlet.ts:80:export function applyNoiseDrift(ctx: IntegratorContext, time: number): void {
packages/physics/src/verlet.ts:93:export function integrateVerlet(ctx: IntegratorContext): void {
tools/nebula-maintainer/src/config.ts:3:export const NEBULA_ROOT = process.env.NEBULA_ROOT || '/Users/josh/.openclaw/workspace/projects/nebula';
tools/nebula-maintainer/src/config.ts:4:export const TZ_LABEL = process.env.NEBULA_TZ_LABEL || 'ET';
tools/nebula-maintainer/src/config.ts:6:export const OUTPUT_DIR = path.join(NEBULA_ROOT, 'docs/upgrades/hourly');
tools/nebula-maintainer/src/config.ts:7:export const LATEST_PATH = path.join(NEBULA_ROOT, 'docs/upgrades/LATEST.md');
tools/nebula-maintainer/src/config.ts:8:export const OUT_DIR = path.join(NEBULA_ROOT, 'tools/nebula-maintainer/out');
tools/nebula-maintainer/src/config.ts:10:export const LOCK_PATH = path.join(NEBULA_ROOT, '.openclaw/locks/nebula-hourly.lock');
tools/nebula-maintainer/src/config.ts:11:export const QUEUE_LOCK_PATH = path.join(NEBULA_ROOT, '.openclaw/locks/nebula-queue.lock');
tools/nebula-maintainer/src/config.ts:12:export const STATE_DIR = path.join(NEBULA_ROOT, '.openclaw/state/nebula');
tools/nebula-maintainer/src/config.ts:13:export const QUEUE_PATH = path.join(STATE_DIR, 'queue.json');
tools/nebula-maintainer/src/config.ts:14:export const HARDENING_SKIP_MAP_PATH = path.join(STATE_DIR, 'hardening-skip-map.json');
tools/nebula-maintainer/src/config.ts:15:export const NORTH_STAR_PATH = path.join(NEBULA_ROOT, 'docs/upgrades/NORTH_STAR.md');
tools/nebula-maintainer/src/config.ts:17:export const SOURCES_PATH = path.join(NEBULA_ROOT, 'tools/nebula-maintainer/sources/seed_urls.txt');
tools/nebula-maintainer/src/config.ts:18:export const EXAMPLES_DIR = path.join(NEBULA_ROOT, 'docs/examples');
tools/nebula-maintainer/src/config.ts:20:export const RETENTION_DAYS = Number(process.env.NEBULA_RETENTION_DAYS || 14);
tools/nebula-maintainer/src/config.ts:21:export const MAX_PATCHES_PER_RUN = Number(process.env.NEBULA_MAX_PATCHES_PER_RUN || 2);
tools/nebula-maintainer/src/config.ts:22:export const QUEUE_MAX_ATTEMPTS = Number(process.env.NEBULA_QUEUE_MAX_ATTEMPTS || 3);
apps/server/package.json:14:    "chokidar": "^4.0.1",
apps/server/src/universe/layout.ts:30:export function computeLayout(nodes: Map<string, GraphNode>, rootId: string): Map<string, Vec3> {
apps/server/src/universe/ids.ts:4:export function normalizePath(absPath: string): string {
apps/server/src/universe/ids.ts:13:export function nodeId(absPath: string): string {
apps/server/src/universe/ids.ts:17:export function edgeId(kind: string, from: string, to: string): string {
apps/server/src/universe/ws.ts:1:import { WebSocket, WebSocketServer } from "ws";
apps/server/src/universe/ws.ts:10:export function startUniverseWsServer(port: number, getSnapshot: () => UniverseSnapshotMessage): UniverseWs {
apps/server/src/universe/ws.ts:11:  const wss = new WebSocketServer({ port, host: "0.0.0.0" });
apps/server/src/universe/ws.ts:12:  const clients = new Set<WebSocket>();
apps/server/src/universe/ws.ts:31:        if (client.readyState === WebSocket.OPEN) client.close();
apps/server/src/universe/ws.ts:38:function send(socket: WebSocket, msg: UniverseMessage): void {
apps/server/src/universe/ws.ts:39:  if (socket.readyState !== WebSocket.OPEN) return;
apps/web/src/universe/patch.ts:50:export function isUniverseMessage(value: unknown): value is UniverseMessage {
apps/server/src/universe/graph.ts:7:export class UniverseGraph {
apps/server/src/universe/ignore.ts:7:export function shouldIgnore(absPath: string): boolean {
apps/web/src/lib/utils.ts:4:export function cn(...inputs: ClassValue[]) {
apps/server/src/universe/watch.ts:2:import chokidar from "chokidar";
apps/server/src/universe/watch.ts:12:export function startUniverseWatcher(params: {
apps/server/src/universe/watch.ts:23:  const watcher = chokidar.watch(rootPath, {
apps/web/src/universe/graphStore.ts:27:  toggleExpandedNode: (nodeId: string) => void;
apps/web/src/universe/graphStore.ts:28:  setFocusId: (nodeId: string | null) => void;
apps/web/src/universe/graphStore.ts:120:export const useUniverseGraphStore = create<UniverseGraphState>((set, get) => ({
apps/web/src/universe/graphStore.ts:238:  toggleExpandedNode(nodeId) {
apps/web/src/universe/graphStore.ts:247:  setFocusId(nodeId) {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
apps/web/src/universe/FloatingEdge.tsx:5:export function FloatingEdge({
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
apps/web/src/components/ui/badge.tsx:17:export function Badge({ className, variant, ...props }: BadgeProps) {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
apps/web/src/universe/UniverseLiveProvider.tsx:15:export function UniverseLiveProvider({ children }: { children: React.ReactNode }) {
apps/web/src/universe/UniverseLiveProvider.tsx:16:  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
apps/web/src/universe/UniverseLiveProvider.tsx:17:  const applyPatch = useUniverseGraphStore((s) => s.applyPatch);
apps/web/src/universe/UniverseLiveProvider.tsx:18:  const setConnected = useUniverseGraphStore((s) => s.setConnected);
apps/web/src/universe/UniverseLiveProvider.tsx:20:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
apps/web/src/universe/AnimatedSVGEdge.tsx:5:export function AnimatedSVGEdge({
apps/web/src/components/ui/native-select.tsx:4:export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
apps/web/src/components/ui/native-select.tsx:16:export function NativeSelectOption(props: React.ComponentProps<"option">) {
apps/web/src/components/ui/card.tsx:4:export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
apps/web/src/components/ui/card.tsx:8:export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
apps/web/src/components/ui/card.tsx:12:export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
apps/web/src/components/ui/card.tsx:16:export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
apps/web/src/universe/FloatingConnectionLine.tsx:5:export function FloatingConnectionLine({
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
apps/web/src/universe/layoutEngines.ts:10:export function chooseLayout(ctx: {
apps/web/src/universe/layoutEngines.ts:23:export function layoutWithRadial(nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
apps/web/src/universe/layoutEngines.ts:45:export function layoutWithDagre(nodes: Node[], edges: Edge[], direction: "TB" | "LR" = "LR"): { nodes: Node[]; edges: Edge[] } {
apps/web/src/universe/layoutEngines.ts:68:export async function layoutWithElk(
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
apps/web/src/universe/wsClient.ts:3:export function connectUniverseWs(params: {
apps/web/src/universe/wsClient.ts:9:  let socket: WebSocket | null = null;
apps/web/src/universe/wsClient.ts:15:    socket = new WebSocket(params.url);
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
apps/web/src/universe/ProjectViewerPanel.tsx:22:export function ProjectViewerPanel() {
apps/web/src/universe/ProjectViewerPanel.tsx:23:  const nodes = useUniverseGraphStore((s) => s.nodeArray);
apps/web/src/universe/ProjectViewerPanel.tsx:24:  const edges = useUniverseGraphStore((s) => s.edgeArray);
apps/web/src/universe/ProjectViewerPanel.tsx:25:  const connected = useUniverseGraphStore((s) => s.connected);
apps/web/src/universe/ProjectViewerPanel.tsx:26:  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);
apps/web/src/universe/ProjectViewerPanel.tsx:27:  const setProjectSelection = useUniverseGraphStore((s) => s.setProjectSelection);
apps/web/src/universe/ProjectViewerPanel.tsx:28:  const selectAllProjects = useUniverseGraphStore((s) => s.selectAllProjects);
apps/web/src/universe/ProjectViewerPanel.tsx:29:  const clearProjectSelection = useUniverseGraphStore((s) => s.clearProjectSelection);
apps/web/src/universe/ProjectViewerPanel.tsx:30:  const [query, setQuery] = useState("");
apps/web/src/universe/ProjectViewerPanel.tsx:32:  const [viewportWidth, setViewportWidth] = useState(1280);
apps/web/src/universe/ProjectViewerPanel.tsx:33:  const [mobileOpen, setMobileOpen] = useState(true);
apps/web/src/universe/ProjectViewerPanel.tsx:35:  useEffect(() => {
apps/web/src/universe/ProjectViewerPanel.tsx:44:  const byParent = useMemo(() => {
apps/web/src/universe/ProjectViewerPanel.tsx:72:  const rootNodes = useMemo(() => byParent.get("__root__") ?? [], [byParent]);
apps/web/src/universe/ProjectViewerPanel.tsx:74:  const projects = useMemo(
apps/web/src/universe/ProjectViewerPanel.tsx:82:  const visibleRoots = useMemo(
apps/web/src/universe/ProjectViewerPanel.tsx:87:  const selectedProjectValue = useMemo(() => {
apps/web/src/universe/ProjectViewerPanel.tsx:92:  const visibleSet = useMemo(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
apps/web/app/layout.tsx:4:export const metadata: Metadata = {
apps/web/app/layout.tsx:9:export const viewport: Viewport = {
apps/web/src/universe/UniverseScene.tsx:5:import { ReactFlowOverlay } from "./ReactFlowOverlay";
apps/web/src/universe/UniverseScene.tsx:10:  const connected = useUniverseGraphStore((s) => s.connected);
apps/web/src/universe/UniverseScene.tsx:11:  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
apps/web/src/universe/UniverseScene.tsx:12:  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);
apps/web/src/universe/UniverseScene.tsx:40:export function UniverseScene() {
apps/web/src/universe/UniverseScene.tsx:41:  const [mobile, setMobile] = useState(false);
apps/web/src/universe/UniverseScene.tsx:43:  useEffect(() => {
apps/web/src/universe/UniverseScene.tsx:55:        <ReactFlowOverlay enabled />
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
apps/web/src/universe/ReactFlowOverlay.tsx:4:import ReactFlow, {
apps/web/src/universe/ReactFlowOverlay.tsx:11:  type ReactFlowInstance,
apps/web/src/universe/ReactFlowOverlay.tsx:17:  chooseLayout,
apps/web/src/universe/ReactFlowOverlay.tsx:18:  layoutWithDagre,
apps/web/src/universe/ReactFlowOverlay.tsx:19:  layoutWithElk,
apps/web/src/universe/ReactFlowOverlay.tsx:101:export const ReactFlowOverlay = memo(function ReactFlowOverlay({ enabled }: { enabled: boolean }) {
apps/web/src/universe/ReactFlowOverlay.tsx:102:  const version = useUniverseGraphStore((s) => s.version);
apps/web/src/universe/ReactFlowOverlay.tsx:103:  const selectedProjectsKey = useUniverseGraphStore((s) => [...s.selectedProjectIds].sort().join("|"));
apps/web/src/universe/ReactFlowOverlay.tsx:104:  const expandedKey = useUniverseGraphStore((s) => [...s.expandedNodeIds].sort().join("|"));
apps/web/src/universe/ReactFlowOverlay.tsx:105:  const focusId = useUniverseGraphStore((s) => s.focusId);
apps/web/src/universe/ReactFlowOverlay.tsx:106:  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
apps/web/src/universe/ReactFlowOverlay.tsx:107:  const setFocusId = useUniverseGraphStore((s) => s.setFocusId);
apps/web/src/universe/ReactFlowOverlay.tsx:108:  const addEdgeToGraph = useUniverseGraphStore((s) => s.addEdge);
apps/web/src/universe/ReactFlowOverlay.tsx:110:  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
apps/web/src/universe/ReactFlowOverlay.tsx:111:  const [zoom, setZoom] = useState(0.9);
apps/web/src/universe/ReactFlowOverlay.tsx:113:  const [rf, setRf] = useState<ReactFlowInstance | null>(null);
apps/web/src/universe/ReactFlowOverlay.tsx:116:  const focusLockRef = useRef(false);
apps/web/src/universe/ReactFlowOverlay.tsx:120:  useEffect(() => {
apps/web/src/universe/ReactFlowOverlay.tsx:129:  const graphSnapshot = useMemo(() => {
apps/web/src/universe/ReactFlowOverlay.tsx:303:  useEffect(() => {
apps/web/src/universe/ReactFlowOverlay.tsx:315:    const autoEngine = chooseLayout({
apps/web/src/universe/ReactFlowOverlay.tsx:335:        const out = layoutWithDagre(graphSnapshot.nodes, graphSnapshot.edges, "LR");
apps/web/src/universe/ReactFlowOverlay.tsx:340:      const out = await layoutWithElk(graphSnapshot.nodes, graphSnapshot.edges, isMobile ? undefined : "RIGHT");
apps/web/src/universe/ReactFlowOverlay.tsx:360:  const focusNode = useCallback(
apps/web/src/universe/ReactFlowOverlay.tsx:364:      setFocusId(nodeId);
apps/web/src/universe/ReactFlowOverlay.tsx:386:    [isMobile, rf, setFocusId]
apps/web/src/universe/ReactFlowOverlay.tsx:389:  const onNodeClick = useCallback(
apps/web/src/universe/ReactFlowOverlay.tsx:395:        toggleExpandedNode(node.id);
apps/web/src/universe/ReactFlowOverlay.tsx:400:    [focusNode, isMobile, toggleExpandedNode]
apps/web/src/universe/ReactFlowOverlay.tsx:403:  useEffect(() => {
apps/web/src/universe/ReactFlowOverlay.tsx:435:  const onMoveEnd = useCallback((_: unknown, view: Viewport) => {
apps/web/src/universe/ReactFlowOverlay.tsx:439:  useEffect(() => {
apps/web/src/universe/ReactFlowOverlay.tsx:483:      <ReactFlow
apps/web/src/universe/ReactFlowOverlay.tsx:500:      </ReactFlow>
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:20:const geom = useMemo(() => new BoxGeometry(), [])
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:21:const mat = useMemo(() => new MeshBasicMaterial(), [])
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:48:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:57:const [x, setX] = useState(0)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:58:useFrame(() => setX((x) => x + 0.1))
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:75:const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:76:useFrame((state, delta) => (meshRef.current.position.x += delta))
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:88:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:103:  const meshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:104:  useFrame((state, delta) => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:120:  const { x } = useSpring({ x: active ? 100 : 0 })
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:135:const x = useSelector((state) => state.x)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:143:useFrame(() => (ref.current.position.x = api.getState().x))
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:195:const [isPending, startTransition] = useTransition()
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:196:const [radius, setRadius] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:225:useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:237:  useFrame(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:253:  const [texture, set] = useState()
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:254:  useEffect(() => void new TextureLoader().load(url, set), [])
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt:271:  const texture = useLoader(TextureLoader, url)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:48:  const orbitControlsRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:49:  const { invalidate, camera, gl } = useThree()
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:50:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:135:  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:159:  const instancedMeshRef = useRef()
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:160:  useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:196:  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:233:  const { scene } = useGLTF(url)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:259:  const [dpr, setDpr] = useState(1.5)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:274:const [dpr, setDpr] = useState(1)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:298:  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:347:const regress = useThree((state) => state.performance.regress)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:348:useEffect(() => {
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:374:  const current = useThree((state) => state.performance.current)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:375:  const setPixelRatio = useThree((state) => state.setDpr)
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt:376:  useEffect(() => {
```

## 4) fzf-ready path list

```text
.DS_Store
.gitignore
.nebula-dev.log
apps/server/package.json
apps/server/src/index.ts
apps/server/src/universe/graph.ts
apps/server/src/universe/ids.ts
apps/server/src/universe/ignore.ts
apps/server/src/universe/index.ts
apps/server/src/universe/layout.ts
apps/server/src/universe/types.ts
apps/server/src/universe/watch.ts
apps/server/src/universe/ws.ts
apps/server/tsconfig.json
apps/server/tsconfig.tsbuildinfo
apps/web/.env.example
apps/web/app/globals.css
apps/web/app/layout.tsx
apps/web/app/page.tsx
apps/web/next-env.d.ts
apps/web/next.config.mjs
apps/web/package.json
apps/web/postcss.config.mjs
apps/web/src/components/ui/badge.tsx
apps/web/src/components/ui/button.tsx
apps/web/src/components/ui/card.tsx
apps/web/src/components/ui/input.tsx
apps/web/src/components/ui/native-select.tsx
apps/web/src/lib/utils.ts
apps/web/src/universe/AnimatedSVGEdge.tsx
apps/web/src/universe/FloatingConnectionLine.tsx
apps/web/src/universe/FloatingEdge.tsx
apps/web/src/universe/graphStore.ts
apps/web/src/universe/layoutEngines.ts
apps/web/src/universe/patch.ts
apps/web/src/universe/ProjectViewerPanel.tsx
apps/web/src/universe/ReactFlowOverlay.tsx
apps/web/src/universe/UniverseLiveProvider.tsx
apps/web/src/universe/UniverseScene.tsx
apps/web/src/universe/wsClient.ts
apps/web/tsconfig.json
apps/web/tsconfig.tsbuildinfo
apps/web/tsconfig.typecheck.json
full_audit.md
instructions.md
package.json
packages/physics/package.json
packages/physics/src/index.ts
packages/physics/src/verlet.ts
packages/physics/tsconfig.json
packages/protocol/package.json
packages/protocol/src/index.ts
packages/protocol/src/types.ts
packages/protocol/tsconfig.json
pnpm-lock.yaml
pnpm-workspace.yaml
README.md
scripts/audit_full.sh
scripts/automation/nebula-cron-run.cjs
scripts/automation/nebula-github-sync.cjs
scripts/automation/nebula-health-check.cjs
scripts/dev/start-bg.sh
scripts/dev/start.sh
scripts/dev/status-bg.sh
scripts/dev/stop-bg.sh
tools/nebula-maintainer/com.openclaw.nebula.hourly.plist
tools/nebula-maintainer/nebula-hourly.service
tools/nebula-maintainer/nebula-hourly.timer
tools/nebula-maintainer/out/2026-03-03_1000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_1900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_1900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_2000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_2000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_2100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_2100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_2200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_2200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-03_2300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-03_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-03_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-03_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-03_2300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_0900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_0900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_1900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_1900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_2000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_2000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_2100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_2100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_2200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_2200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-04_2300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-04_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-04_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-04_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-04_2300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_0900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_0900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_1900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_1900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_2000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_2000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_2100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_2100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_2200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_2200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-05_2300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-05_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-05_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-05_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-05_2300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_0900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_0900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_1900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_1900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_1900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_1900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_1900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_2000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_2000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_2000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_2000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_2000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_2100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_2100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_2100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_2100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_2100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_2200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_2200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_2200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_2200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_2200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-06_2300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-06_2300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-06_2300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-06_2300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-06_2300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0300_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0300_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0300_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0300_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0300_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0400_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0400_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0400_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0400_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0400_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0500_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0500_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0500_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0500_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0500_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0600_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0600_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0600_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0600_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0600_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0700_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0700_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0700_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0700_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0700_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0800_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0800_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0800_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0800_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0800_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_0900_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_0900_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_0900_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_0900_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_0900_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_1000_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_1000_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_1000_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_1000_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_1000_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_1100_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_1100_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_1100_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_1100_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_1100_ET_threejs_org_examples_.txt
tools/nebula-maintainer/out/2026-03-07_1200_ET_github_com_vasturiano_three_fatline.txt
tools/nebula-maintainer/out/2026-03-07_1200_ET_nextjs_org_docs_app_getting_started_deploying.txt
tools/nebula-maintainer/out/2026-03-07_1200_ET_nextjs_org_docs_app_guides_production_checklist.txt
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_pitfalls.txt
tools/nebula-maintainer/out/2026-03-07_1200_ET_r3f_docs_pmnd_rs_advanced_scaling_performance.txt
tools/nebula-maintainer/out/2026-03-07_1200_ET_threejs_org_examples_.txt
tools/nebula-maintainer/package.json
tools/nebula-maintainer/sources/seed_urls.txt
tools/nebula-maintainer/src/config.cjs
tools/nebula-maintainer/src/config.ts
tools/nebula-maintainer/src/main.cjs
tools/nebula-maintainer/src/main.ts
tools/nebula-maintainer/tsconfig.json
tsconfig.base.json
upgrades/.last-posted-brief
upgrades/briefs/BRIEF_2026-03-05__10_09_23_ET.md
upgrades/briefs/BRIEF_2026-03-05__11_02_01_ET.md
upgrades/briefs/BRIEF_2026-03-05__12_02_02_ET.md
upgrades/briefs/BRIEF_2026-03-05__13_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-05__14_02_04_ET.md
upgrades/briefs/BRIEF_2026-03-05__15_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-05__16_02_06_ET.md
upgrades/briefs/BRIEF_2026-03-05__17_02_06_ET.md
upgrades/briefs/BRIEF_2026-03-05__18_02_04_ET.md
upgrades/briefs/BRIEF_2026-03-05__19_02_09_ET.md
upgrades/briefs/BRIEF_2026-03-05__20_02_04_ET.md
upgrades/briefs/BRIEF_2026-03-05__21_02_20_ET.md
upgrades/briefs/BRIEF_2026-03-05__22_02_17_ET.md
upgrades/briefs/BRIEF_2026-03-05__23_02_14_ET.md
upgrades/briefs/BRIEF_2026-03-06__00_02_19_ET.md
upgrades/briefs/BRIEF_2026-03-06__01_02_52_ET.md
upgrades/briefs/BRIEF_2026-03-06__02_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-06__03_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-06__04_02_08_ET.md
upgrades/briefs/BRIEF_2026-03-06__05_02_23_ET.md
upgrades/briefs/BRIEF_2026-03-06__06_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-06__07_02_07_ET.md
upgrades/briefs/BRIEF_2026-03-06__08_08_34_ET.md
upgrades/briefs/BRIEF_2026-03-06__09_03_08_ET.md
upgrades/briefs/BRIEF_2026-03-06__10_04_28_ET.md
upgrades/briefs/BRIEF_2026-03-06__11_02_21_ET.md
upgrades/briefs/BRIEF_2026-03-06__12_02_21_ET.md
upgrades/briefs/BRIEF_2026-03-06__13_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-06__14_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-06__15_02_16_ET.md
upgrades/briefs/BRIEF_2026-03-06__16_02_13_ET.md
upgrades/briefs/BRIEF_2026-03-06__17_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-06__18_02_14_ET.md
upgrades/briefs/BRIEF_2026-03-06__19_02_30_ET.md
upgrades/briefs/BRIEF_2026-03-06__20_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-06__21_02_40_ET.md
upgrades/briefs/BRIEF_2026-03-06__22_02_14_ET.md
upgrades/briefs/BRIEF_2026-03-06__23_02_17_ET.md
upgrades/briefs/BRIEF_2026-03-07__00_02_15_ET.md
upgrades/briefs/BRIEF_2026-03-07__01_02_11_ET.md
upgrades/briefs/BRIEF_2026-03-07__02_02_12_ET.md
upgrades/briefs/BRIEF_2026-03-07__03_02_56_ET.md
upgrades/briefs/BRIEF_2026-03-07__04_02_30_ET.md
upgrades/briefs/BRIEF_2026-03-07__05_02_17_ET.md
upgrades/briefs/BRIEF_2026-03-07__06_02_29_ET.md
upgrades/briefs/BRIEF_2026-03-07__07_03_10_ET.md
upgrades/briefs/BRIEF_2026-03-07__08_05_26_ET.md
upgrades/briefs/BRIEF_2026-03-07__08_50_59_ET.md
upgrades/briefs/BRIEF_2026-03-07__09_02_21_ET.md
upgrades/briefs/BRIEF_2026-03-07__09_43_00_ET.md
upgrades/briefs/BRIEF_2026-03-07__10_02_13_ET.md
upgrades/briefs/BRIEF_2026-03-07__11_02_05_ET.md
upgrades/briefs/BRIEF_2026-03-07__12_04_19_ET.md
upgrades/README.md
visual-fixture/alpha-app/config/app.json
visual-fixture/alpha-app/README.md
visual-fixture/alpha-app/src/components/Header.js
visual-fixture/alpha-app/src/components/Sidebar.js
visual-fixture/alpha-app/src/index.js
visual-fixture/alpha-app/src/lib/math.js
visual-fixture/alpha-app/src/routes/home.js
visual-fixture/alpha-app/tests/unit/header.test.txt
visual-fixture/data-service/config/service.yaml
visual-fixture/data-service/logs/archive/.keep
visual-fixture/data-service/README.md
visual-fixture/data-service/scripts/reindex.sh
visual-fixture/data-service/src/api/health.js
visual-fixture/data-service/src/domain/types.js
visual-fixture/data-service/src/index.js
visual-fixture/data-service/src/storage/repo.js
```

## 5) Key package manifests

### package.json

```json
{
  "name": "nebula",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*",
    "tools/*"
  ],
  "scripts": {
    "build": "npm run -ws build",
    "dev": "./scripts/dev/start.sh",
    "dev:bg": "./scripts/dev/start-bg.sh",
    "dev:stop": "./scripts/dev/stop-bg.sh",
    "dev:status": "./scripts/dev/status-bg.sh",
    "typecheck": "npm run -ws typecheck",
    "nebula:hourly": "npm run -w nebula-maintainer run",
    "nebula:cron:run": "node scripts/automation/nebula-cron-run.cjs",
    "nebula:cron:health": "node scripts/automation/nebula-health-check.cjs",
    "nebula:github:sync": "node scripts/automation/nebula-github-sync.cjs"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}
```

### apps/web/package.json

```json
{
  "name": "@nebula/web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc -p tsconfig.typecheck.json --noEmit --incremental false"
  },
  "dependencies": {
    "@nebula/physics": "workspace:*",
    "@nebula/protocol": "workspace:*",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dagre": "^0.8.5",
    "elkjs": "^0.11.1",
    "leva": "^0.9.36",
    "lucide-react": "^0.577.0",
    "next": "^14.2.25",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "reactflow": "^11.11.4",
    "tailwind-merge": "^3.5.0",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.1",
    "@types/dagre": "^0.7.54",
    "@types/node": "^22.13.8",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "autoprefixer": "^10.4.27",
    "postcss": "^8.5.8",
    "tailwindcss": "^4.2.1",
    "typescript": "^5.7.3"
  }
}
```

### apps/server/package.json

```json
{
  "name": "@nebula/server",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@nebula/protocol": "workspace:*",
    "chokidar": "^4.0.1",
    "ws": "^8.18.0"
  },
  "devDependencies": {
    "@types/node": "^22.13.8",
    "@types/ws": "^8.5.13",
    "tsx": "^4.19.3",
    "typescript": "^5.7.3"
  }
}
```

### pnpm-workspace.yaml

```json
packages:
  - apps/*
  - packages/*
```

## 6) Directory stats

```text
 604 tools
  55 upgrades
  40 apps
  16 visual-fixture
   8 scripts
   8 packages
   1 tsconfig.base.json
   1 README.md
   1 pnpm-workspace.yaml
   1 pnpm-lock.yaml
   1 package.json
   1 instructions.md
   1 full_audit.md
   1 .nebula-dev.log
   1 .gitignore
   1 .DS_Store
```
