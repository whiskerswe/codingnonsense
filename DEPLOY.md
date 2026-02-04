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
    `aws s3 sync dist/ s3://alice-codingnonsense --delete`
3. Invalidate CloudFront (if needed)
   `aws cloudfront create-invalidation \
   --distribution-id E311WEV1FY7DTR \
   --paths "/*"`

## Run local
`npm run dev`

No backend. No server-side code.
