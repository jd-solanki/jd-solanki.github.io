---
title: Docker - My Findings
tag: docker
date: 2024-05-14
---

# {{ $frontmatter.title }}

<br>

:::details Resources

- [Net Ninja Playlist for Docker](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7)
:::

<!-- ## 📚 Cheatsheet -->

## 🎮 Commands

```shell
# Build an image from a Dockerfile
# It assumes the Dockerfile is in the current directory (.)
# `-t` flag is used to tag the image with a name
docker build -t <image-name> .

# Run a container from an image
# `--name` flag is used to give a name to the container
# `-p` flag is used to map a port from the host to the container
# `-d` flag is used to run the container in detached mode (in the background)
docker run -p <host-port>:<container-port> -d --name <container-name> <image-name>

docker images                             # List all images
docker image rm <image-id/image-name>     # Remove an image
docker rmi <image-id/image-name>          # Remove an image
docker rmi $(docker images -q)            # Remove all images

docker ps                                 # List of running containers
docker ps -a                              # List all containers
docker stop <container-id/container-name> # Stop a container
docker rm <container-id/container-name>   # Remove a container
docker rm $(docker ps -a -q)              # Remove all containers

# Restart the container
# No need to do port mapping and other configuration we did earlier because it's already done when we ran "docker run" command
docker start <container-id/container-name>


```

## Glossary

### Images

- Like blueprints for containers
- It has configuration for creating a container
  - When we run an image, it creates a container
- Images are built using a file called `Dockerfile`

Below is example of a `Dockerfile` for a Node.js application:

```dockerfile
# Parent image
FROM node:20

# Working directory
WORKDIR /app

# Copy files from host to container
COPY ./ ./

# Install dependencies in container
RUN npm install

# Expose a port (Allows us to access the app from outside the container)
EXPOSE 5173

# Default command to run when container starts
CMD ["npm", "run", "dev"]
```

<br>

- When we copy files from host to container `COPY ./ ./`, it copies the files from the current directory of the host machine. We can ignore files by adding them to a `.dockerignore` file just like `.gitignore`.

### Containers

- Runnable instances of images

### Layer Caching

- When we build an image, Docker caches each step as a layer
  - For example, It'll cache parent image step, working directory step, copy files step, etc so that it doesn't have to rebuild them again.
- If we change a step in the `Dockerfile`, Docker will only rebuild the steps after the changed step

```dockerfile
# Parent image
FROM node:20

# Working directory
WORKDIR /app

# 🚨 As we copy source code in this layer and if source code changes, Docker will use cached layers for above steps and rebuild the steps after this step
# Copy files from host to container
COPY ./ ./

# Install dependencies in container
RUN npm install

# Expose a port (Allows us to access the app from outside the container)
EXPOSE 5173

# Default command to run when container starts
CMD ["npm", "run", "dev"]
```

If you notice, We've to perform `npm install` step again if we change the source code and not the dependencies. To avoid this, we can improve the `Dockerfile` like below:

```dockerfile
# Parent image
FROM node:20

# Working directory
WORKDIR /app

# Copy package.json file from host to container
COPY package.json ./

# Install dependencies in container
RUN npm install

# Copy source code from host to container
# 🚨 Now when source code changes, our node_modules will be retrieved from cache without reinstalling all the deps because it's above this layer
COPY ./ ./

# Expose a port (Allows us to access the app from outside the container)
EXPOSE 5173

# Default command to run when container starts
CMD ["npm", "run", "dev"]
```

Now, If we change the source code, Docker will use cached layers for `npm install` step and rebuild the steps after `COPY ./ ./` step saving us some time.

<!-- ## ✨ Tips -->

<!-- ## 📝 Snippets -->