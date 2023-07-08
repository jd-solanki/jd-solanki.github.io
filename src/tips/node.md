# Node

<br>

### Generate `package-lock.json` from `node_modules`

Assume you develop project using [pnpm](https://pnpm.io) package manager for your projects and you also want to ship `package-lock.json` file for npm users.

We can easily generate `package-lock.json` from existing `node_modules` dir using the below command:

```bash
npm i --package-lock-only
```
