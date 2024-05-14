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

# List all images
docker images

# Run a container from an image
# `--name` flag is used to give a name to the container
# `-p` flag is used to map a port from the host to the container
# `-d` flag is used to run the container in detached mode (in the background)
docker run -p <host-port>:<container-port> -d --name <container-name> <image-name>

# List of running containers
docker ps

# Stop a container
docker stop <container-id/container-name>

# List all containers
docker ps -a

# Restart the container
# No need to do port mapping and other configuration we did earlier because it's already done when we ran "docker run" command
docker start <container-id/container-name>

# Remove a container
docker rm <container-id/container-name>

# Remove an image
docker rmi <image-id/image-name>

# Remove all containers
docker rm $(docker ps -a -q)

# Remove all images
docker rmi $(docker images -q)
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
FROM node:14

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

<!-- ## ✨ Tips -->

<!-- ## 📝 Snippets -->