data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
  site_bucket = "alice-codingnonsense"
  site_bucket_arn         = "arn:aws:s3:::${local.site_bucket}"
  site_bucket_objects_arn = "arn:aws:s3:::${local.site_bucket}/*"

  cloudfront_distribution_arn = "arn:aws:cloudfront::${local.account_id}:distribution/E311WEV1FY7DTR"

  terraform_permissions = {
    s3        = local.terraform_s3_actions
    dynamodb  = local.terraform_dynamodb_actions
    cloudfront = local.terraform_cloudfront_actions
    acm       = local.terraform_acm_actions
    waf       = local.terraform_waf_actions
    route53   = local.terraform_route53_actions
    iam       = local.terraform_iam_actions
  }
  any_resource = ["*"]

  # ---- Deploy permissions ----
  deploy_s3_actions = [
    "s3:ListBucket",
    "s3:PutObject",
    "s3:DeleteObject"
  ]
  deploy_cloudfront_actions = [
    "cloudfront:CreateInvalidation"
  ]

  # ---- Terraform permissions ----
  terraform_s3_actions = [
    "s3:ListBucket",
    "s3:ListBucketVersions",
    "s3:GetBucketAcl",
    "s3:GetBucketCORS",
    "s3:GetBucketLocation",
    "s3:GetBucketLogging",
    "s3:GetBucketObjectLockConfiguration",
    "s3:GetBucketPolicy",
    "s3:GetBucketRequestPayment",
    "s3:GetBucketTagging",
    "s3:GetBucketVersioning",
    "s3:GetBucketWebsite",
    "s3:GetEncryptionConfiguration",
    "s3:GetLifecycleConfiguration",
    "s3:GetObject",
    "s3:GetPublicAccessBlock",
    "s3:GetReplicationConfiguration",
    "s3:CreateBucket",
    "s3:PutBucketWebsite",
    "s3:PutObject",
    "s3:PutPublicAccessBlock",
    "s3:DeleteObject",
    "s3:DeleteBucket",
    "s3:DeleteBucketPolicy",
    "s3:DeleteBucketWebsite"
  ]
  terraform_dynamodb_actions = [
    "dynamodb:DescribeTable",
    "dynamodb:DescribeContinuousBackups",
    "dynamodb:DescribeTimeToLive",
    "dynamodb:ListTagsOfResource",
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "dynamodb:UpdateItem",
    "dynamodb:DeleteItem"
  ]
  terraform_cloudfront_actions = [
    "cloudfront:GetDistribution",
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "cloudfront:ListTagsForResource",
    "cloudfront:CreateDistribution",
    "cloudfront:UpdateDistribution",
    "cloudfront:DeleteDistribution",
    "cloudfront:TagResource",
    "cloudfront:UntagResource"
  ]
  terraform_acm_actions = [
    "acm:DescribeCertificate",
    "acm:ListCertificates",
    "acm:RequestCertificate",
    "acm:AddTagsToCertificate",
    "acm:DeleteCertificate"
  ]
  terraform_waf_actions = [
    "wafv2:GetWebACL",
    "wafv2:ListWebACLs",
    "wafv2:CreateWebACL",
    "wafv2:UpdateWebACL",
    "wafv2:AssociateWebACL",
    "wafv2:DisassociateWebACL",
    "wafv2:DeleteWebACL"
  ]
  terraform_route53_actions = [
    "route53:GetHostedZone",
    "route53:ListHostedZones",
    "route53:ListResourceRecordSets",
    "route53:ChangeResourceRecordSets"
  ]
  terraform_iam_actions = [
    "iam:GetPolicy",
    "iam:GetPolicyVersion",
    "iam:ListPolicyVersions",
    "iam:ListAttachedUserPolicies",
    "iam:CreatePolicy",
    "iam:CreatePolicyVersion",
    "iam:AttachUserPolicy",
    "iam:DetachUserPolicy",
    "iam:DeletePolicyVersion",
    "iam:DeletePolicy"
  ]
}
