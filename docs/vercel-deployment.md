# GhostKey Vercel Deployment

## Project

- Repository: `ghostkey-marketing`
- Vercel project name: `ghostkey-marketing`
- Framework preset: Other
- Build command: `npm run build`
- Output directory: `.`
- Install command: `npm install`

## Required public links

- Privacy Policy: https://tarunag10.github.io/GhostKey/privacy-policy.html
- Support: https://tarunag10.github.io/GhostKey/support.html

## Environment variables

No runtime secrets are required for the static marketing site.

Optional public variable for future automation:

```text
GHOSTKEY_APP_STORE_URL=[FILL: approved App Store URL]
```

## CLI deployment

```bash
npm run build
vercel --prod --yes --name ghostkey-marketing
```

## GitHub import deployment

1. Push this repository to GitHub as `ghostkey-marketing`.
2. In Vercel, choose Add New > Project.
3. Import `ghostkey-marketing`.
4. Use project name `ghostkey-marketing`.
5. Keep Framework Preset as Other.
6. Set Build Command to `npm run build`.
7. Set Output Directory to `.`.
8. Deploy.
9. Verify:
   - `/`
   - `/about`
   - `/download`
   - `/privacy-policy`
   - `/support`

## Post-deploy Apple metadata updates

After deployment, update App Store Connect:

- Marketing URL: use the Vercel production URL.
- Support URL: https://tarunag10.github.io/GhostKey/support.html
- Privacy Policy URL: https://tarunag10.github.io/GhostKey/privacy-policy.html
