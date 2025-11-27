---
title: 'Shipping Nuxt Layers with Config: Validation & Type Safety'
description: A guide on how to create and configure Nuxt layers for better modularity.
private: true
---

### 1. Expose Config via runtimeConfig & appConfig

- Instruct consumers to add required config in their `nuxt.config.ts`:

  ```ts
  export default defineNuxtConfig({
    runtimeConfig: {
      mySecret: process.env.MY_SECRET, // required, no default
    },
    appConfig: {
      featureFlag: true, // example
    }
  })
  ```

- Do **not** set defaults for secrets in your layer.

---

### 2. Validate Config in Your Layer Module

- In your layer's module, check for required config at runtime:

  ```js
  export default defineNuxtModule({
    setup(_options, nuxt) {
      nuxt.hook('ready', () => {
        if (!nuxt.options.runtimeConfig.mySecret) {
          throw new Error('Missing required runtimeConfig: mySecret')
        }
      })
    }
  })
  ```

- This fails dev/build if config missing, clear error [YouTube: Nuxt's runtimeConfig - The most common mistake](https://www.youtube.com/watch?v=_FYV5WfiWvs).

---

### 3. Type Safety for Consumers

- Document required config shape in your module's types.
- Nuxt 3 generates types for runtimeConfig, so consumers get type hints in IDE [feat(nuxt): generate types and source map for runtime config with typescript](https://github.com/nuxt/nuxt/pull/33309).
- TypeScript can warn if config shape is wrong, but not if value is missing at runtime.

---

### 4. appConfig vs runtimeConfig

- Use `runtimeConfig` for secrets/env (server/client separation).
- Use `appConfig` for public, non-secret app settings [docs: update configuration files format](https://github.com/nuxt/nuxt/pull/30087).

---

### 5. Summary

- Require config, no defaults for secrets.
- Validate at runtime in module, fail fast.
- Type hints via Nuxt's generated types.
- Use `appConfig` for public, `runtimeConfig` for secrets.

**Result:**
Consumers get type errors in IDE, runtime errors if config missing, no accidental secret leaks.
Fast, safe, clear.
This paste expires in <1 day. Public IP access. Share whatever you see with others in seconds with Context.Terms of ServiceReport this
