# Security Dependency Update — 2026-10-21

## Summary

`npm audit` reported 20 vulnerable packages (1 critical, 15 high, 3 moderate, 1 low).
`next`, `eslint-config-next`, `react` and `react-dom` (pinned exactly) were moved to the
latest release of their current major, all other dependencies were updated within their
semver ranges, and the declared devDependency ranges were raised to the installed versions.
No major-version bumps and no `overrides` were needed.

After the update `npm audit` reports 5 high findings, all from a single advisory in
`braces` (development-only lint tooling) for which no patched release exists — see
[Remaining items](#remaining-items).

## Advisories fixed

| Package | Severity | Advisories | From → To |
| --- | --- | --- | --- |
| next | critical | GHSA-2xp9-vwfh-vxw4, GHSA-p293-qw3h-jr36 (critical); GHSA-267c-6grr-h53f, GHSA-26hh-7cqf-hhc6, GHSA-36qx-fr4f-26g5, GHSA-492v-c6pp-mqqv, GHSA-6gpp-xcg3-4w24, GHSA-89xv-2m56-2m9x, GHSA-8h8q-6873-q5fj, GHSA-c4j6-fc7j-m34r, GHSA-cjq9-62q9-8jv4, GHSA-m99w-x7hq-7vfj, GHSA-mg66-mrh9-m8jx, GHSA-p9j2-gv94-2wf4, GHSA-q4gf-8mx6-v5v3 (high); GHSA-3x4c-7xq6-9pq8, GHSA-4633-3j49-mh5q, GHSA-4c39-4ccg-62r3, GHSA-4jqv-mc3x-m676, GHSA-68g3-v927-f742, GHSA-955p-x3mx-jcvp, GHSA-f87g-xv8r-7p7x, GHSA-ffhc-5mcf-pf4q, GHSA-ggv3-7p47-pfv8, GHSA-gx5p-jg67-6x7h, GHSA-h27x-g6w4-24gq, GHSA-h64f-5h5j-jqjh, GHSA-mcj8-r9mp-w47p, GHSA-mq59-m269-xvcx, GHSA-q8wf-6r8g-63ch, GHSA-wfc6-r584-vfw7 (moderate); GHSA-39w2-rjm5-chcv, GHSA-3g8h-86w9-wvmq, GHSA-jcc7-9wpm-mj36, GHSA-vfv6-92ff-j949 (low) | 16.1.6 → 16.4.2 |
| sharp (via next) | high | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w | 0.34.5 → 0.35.5 |
| postcss | high | GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849 (high); GHSA-fxqj-rqcc-2cmp, GHSA-qx2v-qp2m-jg93 (moderate) | 8.5.6 → 8.5.31; next's nested copy 8.4.31 → 8.5.23 |
| nanoid | high | GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8, GHSA-xwg4-73v4-xw9w | 3.3.11 → 3.3.20 |
| source-map-js | high | GHSA-68fv-2mgg-jv7q | 1.2.1 → 1.2.2 |
| browserslist | high | GHSA-73wf-gq98-2v4g, GHSA-c83g-rgw3-j3cx | 4.28.1 → 4.29.4 |
| brace-expansion | high | GHSA-3jxr-9vmj-r5cp, GHSA-6j4f-fj2g-mc7p, GHSA-mh99-v99m-4gvg, GHSA-qhr7-859c-m2p7, GHSA-rgw5-rvv9-x895 (high); GHSA-f886-m6hf-6m8v, GHSA-q2hr-2g5m-vwhr (moderate) | 1.1.12 → 1.1.21; 2.0.2 → 5.0.12 (under @typescript-eslint/typescript-estree) |
| minimatch | high | GHSA-23c5-xmqv-rm74, GHSA-3ppc-4f35-3m26, GHSA-7r86-cg39-jmmj | 3.1.2 → 3.1.5; 9.0.5 → 10.2.6 (under @typescript-eslint/typescript-estree) |
| js-yaml | high | GHSA-2883-xcg3-v3hh, GHSA-52cp-r559-cp3m, GHSA-5p4m-2wfm-xmqj (high); GHSA-h67p-54hq-rp68 (moderate) | 4.1.1 → 4.3.2 |
| flatted | high | GHSA-25h7-pfq9-p65f, GHSA-rf6f-7fwh-wjgh | 3.3.3 → 3.4.4 |
| picomatch | high | GHSA-c2c7-rcm5-vvqj (high); GHSA-3v7f-55p6-f55p (moderate) | 2.3.1 → 2.3.2; 4.0.3 → 4.0.7 |
| ajv | moderate | GHSA-2g4f-4pwh-qvx6 | 6.12.6 → 6.15.0 |
| baseline-browser-mapping | moderate | GHSA-w5vr-8v7q-w6rv | 2.9.19 → 2.11.30 |
| @humanfs/node | moderate | GHSA-p498-v437-472g | 0.16.7 → 0.16.8 |
| @babel/core | low | GHSA-4x5r-pxfx-6jf8 | 7.29.0 → 7.29.7 |

## Other dependencies updated (same major)

| Package | From → To |
| --- | --- |
| react, react-dom | 19.2.3 → 19.3.1 |
| eslint-config-next | 16.1.6 → 16.4.2 |
| eslint | 9.39.2 → 9.39.5 |
| tailwindcss, @tailwindcss/postcss | 4.1.18 → 4.3.3 |
| @types/node | 20.19.30 → 20.19.43 |
| @types/react, @types/react-dom | 19.2.x → 19.3.0 |

## Audit counts

| | critical | high | moderate | low | total |
| --- | --- | --- | --- | --- | --- |
| Before | 1 | 15 | 3 | 1 | 20 |
| After | 0 | 5 | 0 | 0 | 5 |

## Verification

Run before and after the update, after a clean `rm -rf node_modules .next && npm ci`:

| Command | Before | After |
| --- | --- | --- |
| `npm audit` | 20 (1 critical, 15 high, 3 moderate, 1 low) | 5 high (braces chain only) |
| `npm run lint` | fails: 3 errors (`react-hooks/set-state-in-effect`, 2× `react/no-unescaped-entities`) | same 3 pre-existing errors, nothing new |
| `npx tsc --noEmit` | passes | passes |
| `npm run build` | passes (Next.js 16.1.6) | passes (Next.js 16.4.2) |

## Remaining items

- **braces — GHSA-vfj7-8cjw-p6xm (high).** Affects every published version (latest is 3.0.3),
  so there is no patched version to update or override to. It is reached only through
  development lint tooling (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob`
  → `micromatch` → `braces`) and is not part of the production bundle. npm also flags the
  parents (`eslint-config-next`, `@next/eslint-plugin-next`, `fast-glob`, `micromatch`)
  as high for this reason. The only `npm audit fix --force` suggestion is a downgrade to
  `eslint-config-next@14`, which is incompatible with Next.js 16 and was not taken.
  Re-check when a patched `braces` is released.
- **Pre-existing lint errors** (3) are unrelated to this update and were left unchanged.
- Available major upgrades not taken (no security need): `eslint` 10, `typescript` 7,
  `@types/node` 26.
