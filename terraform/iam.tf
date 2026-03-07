# ------------------------------
# Terraform policy
# ------------------------------
data "aws_iam_policy_document" "terraform_alice" {
  dynamic "statement" {
    for_each = local.terraform_permissions
    content {
      effect    = "Allow"
      actions   = sort(statement.value)
      resources = local.any_resource
    }
  }
}

# ------------------------------
# Policies
# ------------------------------
resource "aws_iam_policy" "terraform_alice" {
  name   = "TerraformCodingNonsensePolicy"
  policy = data.aws_iam_policy_document.terraform_alice.json
}
resource "aws_iam_policy" "alice_deploy_policy" {
  name   = "AliceDeployPolicy"
  policy = data.aws_iam_policy_document.alice_deploy.json
}

# ------------------------------
# Attachments
# ------------------------------
resource "aws_iam_user_policy_attachment" "terraform_alice_attach" {
  user       = "terraform-admin"
  policy_arn = aws_iam_policy.terraform_alice.arn
}