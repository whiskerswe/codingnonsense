resource "aws_iam_policy" "terraform_alice" {
  name = "TerraformCodingNonsensePolicy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:*",
          "dynamodb:*",
          "cloudfront:*",
          "acm:*",
          "wafv2:*",
          "route53:*",
          "iam:GetPolicy",
          "iam:GetPolicyVersion",
          "iam:ListPolicyVersions",
          "iam:CreatePolicy",
          "iam:DeletePolicy",
          "iam:CreatePolicyVersion",
          "iam:DeletePolicyVersion",
          "iam:AttachUserPolicy",
          "iam:DetachUserPolicy",
          "iam:ListAttachedUserPolicies"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "terraform_alice_attach" {
  user       = "terraform-admin"
  policy_arn = aws_iam_policy.terraform_alice.arn
}
