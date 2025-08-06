---
title: Choosing Between S3 Standard vs Glacier
tag: aws, s3
date: 2025-07-21
---

# {{ $frontmatter.title }}

## 🔍 Overview: S3 Standard vs Glacier storage classes

### **S3 Standard (and Standard‑IA)**

* **Purpose**: Frequent or predictable access.
* **Access latency**: Milliseconds.
* **Durability**: 99.999999999% (“11 nines”) ([AWS Documentation][1], [cloudwithdj.com][2])
* **Availability**: \~99.99% (Standard), \~99.9% (Standard‑IA) ([AWS Documentation][1])
* **Cost**: Higher per‑GB; minimal or no retrieval fees. Standard‑IA cheaper storage but charges per retrieval.
* **Minimum durations**: None for Standard; 30 days minimum for Standard‑IA/One‑Zone‑IA ([AWS Documentation][1])

### **Glacier Storage Classes** *(within S3)*

Three archival tiers, each offering the same 11‑nines durability as S3 Standard ([AWS Documentation][3]).

| Tier                                          | Min Storage Duration | Typical Access Frequency | Retrieval Time   | Real‑time Access?                                                             |
| --------------------------------------------- | -------------------- | ------------------------ | ---------------- | ----------------------------------------------------------------------------- |
| Glacier Instant Retrieval                     | 90 days              | Quarterly or less        | Milliseconds     | ✓ ([AWS Documentation][3])                                                    |
| Glacier Flexible Retrieval (formerly Glacier) | 90 days              | 1–2 times/year           | Minutes to hours | ✗ (must restore) ([AWS Documentation][3], [Digital Cloud][4])                 |
| Glacier Deep Archive                          | 180 days             | ≤ once/year              | 12–48 hours      | ✗ (restore required) ([AWS Documentation][3], [Amazon Web Services, Inc.][5]) |

* **Storage cost**: up to \~90% lower vs Standard (e.g. \~\$0.004 /GB/mo) ([Medium][6])
* **Retrieval cost**: charged per GB and request; faster tiers cost more ([Wikipedia][7])
* **Deletion charges**: deleting objects before minimum duration still bills for full minimum term ([AWS Documentation][3])
* **Object size note**: Glacier Instant requires ≥ 128 KB minimum (billed as 128 KB if smaller) ([AWS Documentation][3])

---

## ✅ When to Use Which

### Use **S3 Standard** or **Standard‑IA** when

* Data is accessed **frequently or predictably** (Standard: > monthly; IA: \~monthly).
* **Immediate, high‑performance access** is required.
* You want no additional retrieval latency or fees.

### Use **Glacier Instant Retrieval** when

* Data is **rarely accessed** (e.g. quarterly or less), but **must be available instantly** if needed.
* Example: medical images, satellite imagery, media archives that might be served dynamically ([AWS Documentation][1], [Amazon Web Services, Inc.][8])
* Cost‑sensitive vs Standard‑IA for low access frequency.

### Use **Glacier Flexible Retrieval** when

* Data access is **very infrequent** (once or twice a year).
* **Retrieval delays of minutes to hours are acceptable** (Expedited: 1–5 min; Standard: 3–5 h; Bulk: 5–12 h) ([Amazon Web Services, Inc.][8], [Reddit][9], [AWS Documentation][3])
* Use case: backups, disaster recovery, audit logs.

### Use **Glacier Deep Archive** when

* Data is archived for **long-term compliance** (e.g. 7–10 years) or rarely needed (< once/year).
* **Lowest possible storage cost** outweighs retrieval latency (makes sense if you can wait 12‑48 hours) ([Amazon Web Services, Inc.][5], [AWS for Engineers][10], [cloudwithdj.com][2])
* Ideal replacement for tape libraries, regulatory archives, digital preservation.

---

## ⚙️ Lifecycle & Cost Considerations

* **Automatically transition** objects from Standard to Glacier via S3 Lifecycle policies based on age, tags, etc.
* Transition **into Glacier has no minimum wait time**, but billing still honors the 90/180‑day minimum ([Medium][11], [Reddit][12]).
* **Lifecycle transitions cost** per request, especially when transitioning many small objects. Sometimes batching small files (e.g. zipping) helps ([Reddit][13]).

---

## 🧠 Quick Use‑Case Scenarios

* **Website assets (images/videos)**: S3 Standard (low latency, frequent use).
* **Monthly backup archives**: Standard‑IA or Glacier Instant if access needs are rare but quick.
* **Yearly audit logs or compliance data**: Glacier Flexible Retrieval – cost effective with some delay.
* **Multi-year retention archives (e.g. legal, financial)**: Glacier Deep Archive — ultra‑low cost, slow access is acceptable.

---

## 🧩 Summary Comparison

* **Access frequency & latency**: Standard (frequent/millisecond) → Instant Glacier (rare/millisecond) → Flexible (rare/minutes–hours) → Deep Archive (very rare/hours).
* **Storage cost**: Standard > Standard‑IA > Instant Retrieval > Flexible Retrieval > Deep Archive.
* **Retrieval cost & delay**: Standard has none; Glacier tiers trade cost for delay.

---

### ✔️ Recommendation Tips

* Define your data by **access pattern**, **latency requirement**, **frequency of retrieval**, and **retention policy**.
* Use S3 Lifecycle rules to automatically tier data over time.
* Monitor retrieval volumes and sizes to avoid surprising retrieval costs (especially for large restores).
* Batch small files to minimize request count and extra overhead.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html "Understanding and managing Amazon S3 storage classes - Amazon Simple Storage Service"
[2]: https://cloudwithdj.com/s3-glacier-vs-s3-standard-choosing-the-right-storage-class-for-your-data/ "S3 Glacier VS S3 Standard: Choosing the Right Storage Class for Your Data – Cloud with DJ"
[3]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html "Understanding S3 Glacier storage classes for long-term data storage - Amazon Simple Storage Service"
[4]: https://digitalcloud.training/amazon-s3-and-glacier/ "Amazon S3 and Glacier | AWS Cheat Sheet"
[5]: https://aws.amazon.com/s3/storage-classes// "Object Storage Classes – Amazon S3"
[6]: https://medium.com/%40christopheradamson253/introduction-to-aws-s3-glacier-archiving-data-in-the-cloud-3ac456db4259 "Introduction to AWS S3 Glacier: Archiving Data in the Cloud | by Christopher Adamson | Medium"
[7]: https://en.wikipedia.org/wiki/Amazon_S3_Glacier "Amazon S3 Glacier"
[8]: https://aws.amazon.com/s3/storage-classes/glacier/ "Secure archive storage – Amazon S3 Glacier storage classes – AWS"
[9]: https://www.reddit.com/r/aws/comments/p780wd "Is S3 glacier right option for my use case of storing 15TB of data?"
[10]: https://awsforengineers.com/blog/aws-s3-getting-started-understanding-storage-classes/ "AWS S3 Getting Started: Understanding Storage Classes"
[11]: https://medium.com/analytics-vidhya/amazon-s3-storage-classes-d77de43df23d "Amazon Web Service S3 Storage Classes | by Ankit Gupta | Analytics Vidhya | Medium"
[12]: https://www.reddit.com/r/AWSCertifications/comments/1f9f42f "S3 to Glacier question"
[13]: https://www.reddit.com/r/aws/comments/rylpxq "Reduced S3 costs by 60% with S3 Glacier Instant Retrieval storage class"
