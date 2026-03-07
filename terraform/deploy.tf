# ------------------------------
# Deploy policy
# ------------------------------
data "aws_iam_policy_document" "alice_deploy" {
  statement {
    effect = "Allow"
    actions = local.deploy_s3_actions
    resources = [
      local.site_bucket_arn,
      local.site_bucket_objects_arn
    ]
  }
  statement {
    effect = "Allow"
    actions = local.deploy_cloudfront_actions
    resources = [local.cloudfront_distribution_arn]
  }
}