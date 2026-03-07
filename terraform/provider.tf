
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "terraform"
}

terraform {
  backend "s3" {
    bucket         = "alice-terraform-state-712042507766"
    key            = "alice/terraform.tfstate"
    region         = "eu-north-1"
    dynamodb_table = "alice-terraform-lock"
    encrypt        = true
    profile        = "terraform"
  }
}
