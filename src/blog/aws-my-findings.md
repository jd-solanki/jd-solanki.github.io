---
title: AWS - My Findings
tag: aws
date: 2024-05-30
---

# {{ $frontmatter.title }}

## 📚 Cheatsheet

### Services

| Service | Full Form | Description |
| --- | --- | --- |
| IAM | Identity and Access Management | Used to manage users, groups, and roles |
| S3 | Simple Storage Service | Used to store files |
| EC2 | Elastic Compute Cloud | Provide remote/cloud servers |
| SES | Simple Email Service | Used to send emails |
| DynamoDB | Amazon Dynamo Database | NoSQL database service |
| RDS | Relational Database Service | Managed relational database service |
| Lambda | AWS Lambda | Serverless computing service |
| API Gateway | Amazon API Gateway | Create, publish, maintain, monitor, and secure APIs |
| CloudFront | Amazon CloudFront | Content delivery network (CDN) service |
| Route 53 | Amazon Route 53 | Domain Name System (DNS) web service |
| CloudWatch | Amazon CloudWatch | Monitor AWS resources and applications |
| SNS | Simple Notification Service | Pub/sub messaging and mobile notifications |
| SQS | Simple Queue Service | Fully managed message queuing service |
| AppSync | AWS AppSync | Managed GraphQL service |
| Cognito | Amazon Cognito | User authentication and authorization service |
| Amazon Auto Scaling | Amazon Auto Scaling | Automatically adjust the number of EC2 instances |
| Amazon Inspector | Amazon Inspector | Automated security assessment service |
| AWS Firewall Manager | AWS Firewall Manager | Central management of AWS WAF and VPC security groups |
| AWS Key Management Service (KMS) | AWS Key Management Service | Managed service to create and control encryption keys |
| Amazon SageMaker | Amazon SageMaker | Managed service to build, train, and deploy machine learning models |
| Kinesis | Amazon Kinesis | Real-time data streaming service |
| Elastic Beanstalk | AWS Elastic Beanstalk | Platform as a service (PaaS) for deploying and scaling web applications and services |
| Elastic Load Balancing | Elastic Load Balancing | Automatically distribute incoming application traffic across multiple targets |
| VPC | Virtual Private Cloud | Virtual network dedicated to your AWS account |
| EBS | Elastic Block Store | Persistent block storage volumes for EC2 instances |
| EFS | Elastic File System | Scalable file storage for use with EC2 instances |
| Glacier | Amazon Glacier | Low-cost storage service for data archiving and backup |
| Athena | Amazon Athena | Query data in S3 using SQL |
| Redshift | Amazon Redshift | Data warehousing service |
| ElastiCache | Amazon ElastiCache | In-memory data store and cache service |
| CloudFormation | AWS CloudFormation | Infrastructure as code service |

### EC2 (Elastic Compute Cloud)

- Provide remote/cloud servers
- You can enable SSH login from "Security Group". There is source IP field where you can specify your IP address, Generally it's default to 0.0.0.0/0 which means anyone can access your server. If you want to only allow your IP address to access the server, you can specify your IP address in this field.
- Default username for Amazon Linux is `ec2-user`

### SES (Simple Email Service)

- Used to send emails. You can also send emails in bulk.
- You can verify your domain and email address in SES. You can only send emails from verified domain and email address.

<!-- ## ✨ Tips -->

<!-- ## 📝 Snippets -->