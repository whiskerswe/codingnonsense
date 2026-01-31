# Deploy

This site is deployed as a static site.

## Architecture
- Build output: `dist/`
- Hosting: S3
- CDN: CloudFront
- DNS: Route 53

## Manual deploy (current)
1. `npm run build`
2. Sync `dist/` to the S3 bucket
3. Invalidate CloudFront (if needed)

No backend. No server-side code.
