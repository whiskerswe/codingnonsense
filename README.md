
<img src="docs/images/book36.jpg" width="150">

# Coding Nonsense

An experimental interactive storytelling project inspired by *Alice in Wonderland*.

The application presents chapters as pages containing images and sentences,
with navigation controlled by a small story engine.

The project also explores a lightweight deployment setup using AWS and Terraform.

---

## Tech stack

Frontend
- React
- TypeScript
- Vite
- Tailwind

Infrastructure
- AWS S3 (static hosting)
- CloudFront
- Route53
- Terraform
---
## Running locally

Install dependencies:
npm install

Start development server:
npm run dev

Build production version:
npm run build

---
## Infrastructure

Infrastructure is defined in the `terraform/` directory.

Terraform provisions:

- S3 bucket for static hosting
- CloudFront distribution
- Route53 records
- IAM policies for deploy and infrastructure management

Terraform state is stored remotely in S3 with DynamoDB locking.

This project uses IAM users instead of roles since it is a single-person project.

---

## Deployment

Deployment is handled via GitHub Actions.

The deploy workflow uploads the built site to S3 and invalidates the CloudFront cache.

---

## Project structure

src/
    components/
    domain/
    app/

terraform/
    provider.tf
    iam.tf
    main.tf
    locals.tf

---

## Notes

Images are based on public domain illustrations by John Tenniel.