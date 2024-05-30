---
title: AWS - My Findings
tag: aws
date: 2024-05-30
---

# {{ $frontmatter.title }}

## 📚 Cheatsheet

### EC2 (Elastic Compute Cloud)

- Provide remote/cloud servers
- You can enable SSH login from "Security Group". There is source IP field where you can specify your IP address, Generally it's default to 0.0.0.0/0 which means anyone can access your server. If you want to only allow your IP address to access the server, you can specify your IP address in this field.
- Default username for Amazon Linux is `ec2-user`

### SES (Simple Email Service)

- Used to send emails. You can also send emails in bulk.
- You can verify your domain and email address in SES. You can only send emails from verified domain and email address.

<!-- ## ✨ Tips -->

<!-- ## 📝 Snippets -->