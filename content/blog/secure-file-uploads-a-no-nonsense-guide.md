---
title: "Secure File Uploads: A No-Nonsense Guide"
description: Learn how to securely upload files to your servers with best practices & recommendations
---

File uploads are a common feature, but a frequent source of security holes. Here's a concise guide to doing them right.

## Endpoints: Specific, Not Generic

Don't use one `/api/upload` endpoint for everything. Create separate endpoints for each feature.

- `/api/users/avatar`
- `/api/products/image`

**Why?**

- **Specific Validation:** Avatars need different size/type rules than product images.
- **Security:** Apply different permissions. Users upload their own avatar; admins upload product images.
- **Clarity:** Simpler code, easier maintenance.

## Serving Files: Specific Routes are Critical

Like endpoints, use specific routes to serve files. A generic `/files/:filename` route is a security risk.

**Why?**

- **Access Control:** This is non-negotiable. A user's invoice is private. A profile picture is public. You can't enforce this with one generic route. Specific routes let you apply middleware for auth checks.

## The Validation Checklist

Validation must happen on both client and server.

**1. Client-Side (Good UX)**

- Check file size and type (`file.size`, `file.type`) in the browser.
- Give immediate feedback. Prevents pointless uploads.
- **Never trust this.** It's easily bypassed.

**2. Server-Side (Mandatory Security)**

- **Size:** Always re-check the file size. Prevents simple DoS attacks.
- **Type:** This is the most critical step. **Never trust the file extension or the client-provided MIME type.**
- **Use Magic Numbers:** Read the first few bytes of the file to determine its true type. In the Node.js/Nuxt.js ecosystem, the best tool is the [`file-type`](https://github.com/sindresorhus/file-type) library.

#### Core Security Practices

- **Safe Storage:** Don't save uploads in your public web directory. Use a non-web-accessible folder or, better, a cloud storage service like S3 or Google Cloud Storage.
- **Randomize Filenames:** Never use the original filename. It can be manipulated (`../../etc/passwd.jpg`). Generate a unique, random name.
- **Authentication:** Ensure the user is logged in and has permission to upload *before* processing the file.

### TL;DR

- Use specific routes for uploading and serving.
- Validate on client for UX, on server for security.
- On server, check size and use a library like [`file-type`](https://github.com/sindresorhus/file-type) to verify content.
- Generate random filenames.
- Store files outside the web root or in the cloud.
