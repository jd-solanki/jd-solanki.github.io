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
# docker run -p <host-port>:<container-port> -d --name <container-name> <image-name>
docker run -p 3000:3000 -d --name my-app my-image

docker images                             # List all images
docker image rm <image-id/image-name>     # Remove an image
docker rmi <image-id/image-name>          # Remove an image
docker rmi $(docker images -q)            # Remove all images

docker ps                                 # List of running containers
docker ps -a                              # List all containers
docker start <container-id/container-name> # Start a container
docker stop <container-id/container-name> # Stop a container
docker rm <container-id/container-name>   # Remove a container
docker rm $(docker ps -a -q)              # Remove all containers

docker volume ls                          # List all volumes
docker volume rm <volume-name>            # Remove a volume
docker volume rm $(docker volume ls -q)   # Remove all volumes

# Restart the container
# No need to do port mapping and other configuration we did earlier because it's already done when we ran "docker run" command
docker start <container-id/container-name>

docker compose up     # Run containers defined in `docker-compose.yml` file
docker compose down   # Stop and remove containers defined in `docker-compose.yml` file
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

### Volumes

- Used to share files between container and host machine.
  - Nice example can be source code, It's useful for development because we can see changes in the container without rebuilding the image.
- It's two way sync, changes in container will reflect in host machine and vice versa.
- You can map host directory to container directory using `-v` flag in `docker run` command.

```shell
docker run -p <host-port>:<container-port> -v <host-directory>:<container-directory> -d --name <container-name> <image-name>
```

- You can also map container to host directory using `-v` flag in `docker run` command.

```shell
# docker run -p <host-port>:<container-port> -v <container-directory> -d --name <container-name> <image-name>

docker run -p 3000:3000 -v /app/node_modules -v /app/node_modules -d --name my-app my-image
```

### Docker Compose

- Used to run multiple containers at once
- Instead of writing long `docker run` command even for single container, we can define all the configurations in a `docker-compose.yml` file

```yaml
version: '1'
services:
  my-app:
    build: .
    ports:
      - '3000:3000'
    volumes:
      - /app/node_modules
      - .:/app
```

You can run the containers using below command:

```shell
docker-compose up
```

## ✨ Tips

- While working on multiple projects use single container for specific service/image. E.g. Postgres container.
  - For development, You use single container across multiple projects to save space
  - For Production, Have separate container even for same version for each project

<!-- ## 📝 Snippets -->