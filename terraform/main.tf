resource "aws_s3_bucket" "site" {
  bucket = "alice-codingnonsense"
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  is_ipv6_enabled     = true
  wait_for_deployment = true

  aliases = ["www.codingnonsense.art"]

  origin {
    domain_name              = "alice-codingnonsense.s3.eu-north-1.amazonaws.com"
    origin_id                = "alice-codingnonsense.s3.eu-north-1.amazonaws.com"
    origin_access_control_id = "E3T8ZEDCXFPFVV"
  }

  default_cache_behavior {
    target_origin_id       = "alice-codingnonsense.s3.eu-north-1.amazonaws.com"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:712042507766:certificate/0e626f61-b9dc-4b1a-b9e4-00809b692a76"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  web_acl_id = "arn:aws:wafv2:us-east-1:712042507766:global/webacl/CreatedByCloudFront-68a2e9d3/8fa8db6b-77e4-428d-bf79-19445d311d9a"

  tags = {
    Name = "alice-codingnonsense-art"
  }
}

resource "aws_s3_bucket" "tf_state" {
  bucket = "alice-terraform-state-712042507766"

  force_destroy = false
}

resource "aws_s3_bucket_versioning" "tf_state" {
  bucket = aws_s3_bucket.tf_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "tf_lock" {
  name         = "alice-terraform-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
