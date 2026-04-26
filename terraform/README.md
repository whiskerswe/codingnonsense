validateInfrastructure for codingnonsense.art

- S3 static hosting
- CloudFront CDN
- ACM certificate
- Route53 DNS
- Terraform state in S3 + DynamoDB locking

IAM

Users instead of roles as this is a simple one-person project.
- terraform-admin → infrastructure management
- alice-deploy → site deployment

