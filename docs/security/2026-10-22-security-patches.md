# Security patches, 22 October 2026

## Summary

`npm audit` reported 20 issues (1 critical, 15 high, 3 moderate, 1 low). This update moves Next.js from 16.1.6 to 16.4.2, the latest 16.x release, and refreshes vulnerable transitive packages within their allowed ranges. No major version upgrades were made and no `overrides` were needed.

| Severity | Before | After |
| --- | --- | --- |
| Critical | 1 | 0 |
| High | 15 | 5 (all from `braces`, which has no fix) |
| Moderate | 3 | 0 |
| Low | 1 | 0 |

## Changes

| Package | From -> To | Advisories | Why it matters here |
| --- | --- | --- | --- |
| next (direct) | 16.1.6 -> 16.4.2 | Critical: GHSA-2xp9-vwfh-vxw4 (RCE in Image Optimization API via AVIF), GHSA-p293-qw3h-jr36 / CVE-2026-75604 (RCE on Windows hosts). High: GHSA-cjq9-62q9-8jv4 / CVE-2026-94483 (SSRF in Image Optimization), GHSA-6gpp-xcg3-4w24 / CVE-2026-64642, GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj, GHSA-26hh-7cqf-hhc6 / CVE-2026-45109, GHSA-mg66-mrh9-m8jx / CVE-2026-44579, GHSA-c4j6-fc7j-m34r / CVE-2026-44578, GHSA-492v-c6pp-mqqv / CVE-2026-44574, GHSA-267c-6grr-h53f / CVE-2026-44575, GHSA-36qx-fr4f-26g5 / CVE-2026-44573, GHSA-m99w-x7hq-7vfj / CVE-2026-64641, GHSA-89xv-2m56-2m9x / CVE-2026-64649, GHSA-p9j2-gv94-2wf4 / CVE-2026-64645. Plus 20 moderate/low. | The app is served by Next.js and builds with `output: "standalone"`, so it can be self-hosted, where the image optimizer and server issues apply directly. 16.3.8 is the lowest release that covers every listed advisory; 16.4.2 is the current 16.x release. |
| eslint-config-next (direct, dev) | 16.1.6 -> 16.4.2 | none directly | Kept in step with `next`. |
| postcss | 8.4.31, 8.5.6 -> 8.5.23 | GHSA-6g55-p6wh-862q / CVE-2026-45623, GHSA-r28c-9q8g-f849 / CVE-2026-73646, GHSA-qx2v-qp2m-jg93 / CVE-2026-41305, GHSA-fxqj-rqcc-2cmp / CVE-2026-69153 | Arbitrary `.map` file read during CSS builds. Next.js 16.4.2 ships with a patched postcss. |
| sharp | 0.34.5 -> 0.35.5 | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w | libvips/libheif flaws reachable through Next.js image optimization. Next.js 16.4.2 requires sharp 0.35.5. |
| brace-expansion, minimatch, picomatch, flatted, ajv, @humanfs/node, @babel/core | brace-expansion 2.0.2 -> 5.0.12 and 1.1.12 -> 1.1.21, minimatch 9.0.5 -> 10.2.6 and 3.1.2 -> 3.1.5, picomatch 2.3.1 -> 2.3.2 and 4.0.3 -> 4.0.7, flatted 3.3.3 -> 3.4.4, ajv 6.12.6 -> 6.15.0, @humanfs/node 0.16.7 -> 0.16.8, @babel/core 7.29.0 -> 7.29.7 | GHSA-3jxr-9vmj-r5cp / CVE-2026-13149, GHSA-3ppc-4f35-3m26 / CVE-2026-26996, GHSA-c2c7-rcm5-vvqj / CVE-2026-33671, GHSA-25h7-pfq9-p65f / CVE-2026-32141, GHSA-2g4f-4pwh-qvx6 / CVE-2025-69873, GHSA-p498-v437-472g, GHSA-4x5r-pxfx-6jf8 / CVE-2026-49356, and related IDs | DoS in lint and build tooling. Dev-only. The brace-expansion and minimatch major changes come from newer in-range `typescript-eslint` releases, not from a direct bump. |
| js-yaml, nanoid, source-map-js, browserslist, baseline-browser-mapping | js-yaml 4.1.1 -> 4.3.2, nanoid 3.3.11 -> 3.3.20, source-map-js 1.2.1 -> 1.2.2, browserslist 4.28.1 -> 4.29.4, baseline-browser-mapping 2.9.19 -> 2.11.30 | GHSA-52cp-r559-cp3m / CVE-2026-59869, GHSA-28wg-ghj8-5hjv / CVE-2026-67214, GHSA-68fv-2mgg-jv7q / CVE-2026-93749, GHSA-c83g-rgw3-j3cx / CVE-2026-73089, GHSA-w5vr-8v7q-w6rv / CVE-2026-45819, and related IDs | CPU or memory DoS in packages used by the build. |

Packages were resolved with `--before=2026-10-19` so that no release younger than three days was installed.

## Verification

Run on Node 26.12.0 / npm 11.20.0, before and after the change:

| Check | Before | After |
| --- | --- | --- |
| `npm ci` | pass | pass |
| `npx tsc --noEmit` | pass | pass |
| `npm run build` | pass | pass |
| `npm run lint` | fails: 3 existing errors (`react-hooks/set-state-in-effect` in `app/page.tsx`, 2x `react/no-unescaped-entities` in `components/HowToBurn.tsx`) | fails with the same 3 errors |
| `npm audit --package-lock-only` | 1 critical, 15 high, 3 moderate, 1 low | 0 critical, 5 high |

## Not fixed

| Package | Severity | Reason |
| --- | --- | --- |
| braces 3.0.3 (GHSA-vfj7-8cjw-p6xm / CVE-2026-93687) and dependents micromatch, fast-glob, @next/eslint-plugin-next, eslint-config-next | high | No patched braces release exists. npm's only suggestion is downgrading eslint-config-next to 14.2.35, which is wrong for a Next 16 app. Used only by ESLint during development, not in the deployed app. |

## What deployers should do

1. Redeploy from this commit. Nothing changes until the new Next.js build is live. If you self-host the standalone output, rebuild and restart the server.
2. Check your Node.js version. The 21 October 2026 Node.js security releases fix a Brotli remote code execution reachable through `fetch()` and several TLS certificate validation bypasses. Node 20 is end of life and did not get a fix. This repo does not pin Node (no `engines` field or `.nvmrc`, and `vercel.json` does not set it), so the version comes from your host. On Vercel, set it under Project Settings -> Build and Deployment -> Node.js Version. Use Node 22.23.4, 24.22.1 or 26.12.1, or newer.
