

# Docker Cheat Sheet

## DOCKER HUB

Login

```shell
docker login [OPTIONS] [SERVER]
#Options:
#  -p, --password string   Password
#      --password-stdin    Take the password from stdin
#  -u, --username string   Username
```

Pull

```shell
docker pull image
```

Search

```shell
docker search image
```

## CONTAINERS

Check

```shell
docker ps
docker stats
docker images
```

Run Image as a container

```shell
docker run -it image /bin/bash
# interactive; tty
```

## Reference

1.   [Docker cheat sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf)
2.   [Docker.docs](https://docs.docker.com/reference/cli/docker/image/build/#tag)