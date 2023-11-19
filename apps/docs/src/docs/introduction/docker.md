# Using Docker

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Docker allows developers to package their applications and dependencies into lightweight and portable containers, which can be easily deployed and run on any environment, making it easier to develop and deploy applications consistently. This means you don't have to worry about configuring or setting up complicated development tools such as web servers and databases on your local machine.

<VideoDocs
  title="New to Docker?"
  subject="Docker Tutorial for Beginners"
  description="This video by Mosh Hamedani will walk you through the basics of Docker."
  link="https://www.youtube.com/embed/pTFZFxd4hOI"
/>

This guide will walk you through how to set up your Leaf application using Docker from scratch. To get started, you need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/). After this, you can either use the Leaf CLI or manually create your application.

## Using the Leaf CLI

The Leaf CLI provides a simple way to get started with Docker in your Leaf applications. To create a new Dockerized Leaf app using the Leaf CLI, you need to add the `--docker` option to the `leaf create` command:

```bash
leaf create my-app --docker
```

This will setup a new Leaf application with Docker support. Although your app is dockerized, Leaf CLI still allows you to use the `serve` command to start your application. This command will automatically start your application using Docker instead of the built-in server.

```bash
leaf serve
```

### Docker Files

You will notice a bunch of docker related files in your project. These are added by the Leaf CLI since you used the `--docker` option. You can always customize these files to suit your specific needs.

```bash
├── docker
│   ├── 000-default.conf
│   ├── Dockerfile
│   └── php.ini
├── docker-compose.yml
```

- `000-default.conf` is the Apache configuration file that will be used by the Docker container.
- `Dockerfile` is the Dockerfile that will be used to build the Docker image.
- `php.ini` is the PHP configuration file that will be used by the Docker container.
- `docker-compose.yml` is the Docker Compose file that will be used to start the Docker container.

## Adding to existing projects

If you already have an existing Leaf application and you want to add Docker support to it, you will need to do so manually. We have provided a sample below that you can use as a reference.

**Dockerfile:**

```dockerfile
FROM php:8.1-apache

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev \
    wget \
    git \
    unzip

RUN docker-php-ext-install zip pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer global require leafs/cli

RUN ln -s /root/.composer/vendor/bin/leaf /usr/local/bin/leaf

# If you have a custom PHP ini file you can uncomment this line
# COPY ./php.ini /usr/local/etc/php/php.ini

RUN apt-get purge -y g++ \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

WORKDIR /var/www

RUN chown -R www-data:www-data /var/www

CMD ["apache2-foreground"]
```

**docker-compose.yml:**

```yaml
version: '3.1'
services:
  application:
    build: ./docker
    image: leafphp/docker
    ports:
      - '8080:80'
    volumes:
      - .:/var/www
```

**000-default.conf:**

```apacheconf
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www

    <Directory /var/www>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

After adding these files, you can start your application using Docker by running the following command:

```bash
leaf serve
```

Or with the docker compose command:

```bash
docker compose up
```
