# Deploying a LeafMVC Application to Digital Ocean

::: warning Version support
Version support. This tutorial assumes use of LeafPHP >= 3.0 and PHP >=7.0.
:::

## What Are We Building

This experiment will guide you deploying your first LeafMVC application to Digital Ocean. A majority
of the same steps apply to Leaf v3 core as well.

::: details (New to Digital Ocean?)
Digital Ocean is a cloud service provider that offers great introductory pricing for virtual private
servers (VPS). Create an account, tether a credit card, and prepare to build.
:::

## Prerequisites

Before continuing, it is important to determine if you would like to purhcase or point a domain name
to the VPS you are about to spin up. $DOMAIN will be shown several times throughout this experiment
and should be replaced by either your domain name (example.com) or the Droplet's public IP address. You
can grab the public IP address from the Digital Ocean control panel.

For instructions on how to setup a domain with Digital Ocean, [click here](https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/).

## 1. Create a new droplet

From the control panel, click the green "Create" button and select droplet. We will create a VPS with the
following options selected:

* Ubuntu: 20.04 (LTS)
* Plan: Basic
* CPU Options: Premium AMD or Regular Intel
* $6/mo package

::: tip Scaling ⚡️
Should your application grow in requirements or traffic, you can always come back and increase your package selection.
:::

### Authentication

It is highly recommended that your utilize SSH-based authentication. Select an existing key, or [generate a new key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), then add it.

## 2. Initial droplet setup

After your droplet has been created, you will need to login, secure it, and install required software. The first task will
be to create an admin user, then utilie that account for future SSH connections.

```bash
ssh root@$DOMAIN
adduser username
usermod -aG sudo username
rsync --archive --chown=username:username ~/.ssh /home/username
```

Test the admin account: ``su - username``. If the command executes, you can terminal the SSH session and log
back in with your new user account (recommended).

### Setup firewall

Next we will setup UFW - Ubuntu Firewall. We will allow communication on ports: 22 (SSH), 80 (HTTP), and 443 (SSL).

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

After creating the firewall's rules and enabling UFW, you can view firewall status by ``sudo ufw status``.

### Install required software

It is now time install all of the needed software to enable LeafPHP to run. First, we need to update all system software:

```bash
sudo apt update
sudo apt upgrade
```

Be sure to respond **Y** when asked to continue. Now we can intall NGINX, PHP, MySQL, and curl.

```bash
sudo apt install nginx php-fpm php-mysql php-curl
```

Once complete, follow the
[NGINX instructions](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04#step-3-%E2%80%93-installing-php-and-configuring-nginx-to-use-the-php-processor).
Ensure that your directory is set as such: `` root /var/www/$DOMAIN/public;`` Below is an example sites-available file.

```nginx
server {
    server_name itsglint.com www.itsglint.com 147.182.136.153;
    root /var/www/itsglint.com/public;

    index index.html index.htm index.php;

    location / {
        try_files $uri /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    }
}
```

::: warning Leaf Router and .htaccess support
It is important to mirror the location blocks as-in. Otherwise, LeafRouter will not work properly or at all.
:::

Next, we will install Mysql. Follow the [install instructions](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04#step-2-%E2%80%93-installing-mysql-to-manage-site-data).

```bash
sudo apt install mysql-server
```

### Install your Leaf🍁 application

Next, we will download and install our application with all dependencies. Clone your repository from Github, 
or any source, and place your Leaf project in ``/var/www/$DOMAIN``. Afterwards, install required dependencies
and perform initial Leaf tasks:

```bash
composer install
php leaf db:install
php leaf db:migrate
```

You also may seed the database if required: `php leaf db:seed`.

Congratulations 🎉, you now have a fully working production server, and should be able to reach your application at $DOMAIN.

::: details Recommended: Complete SSL Setup
If your Leaf applications is more than a hobbyist adventure and serving actual clients or visitors, it is
strongly recommended to complete the SSL setup. SSL encrypts traffic between a browser and server. Replace
example.com with $DOMAIN.

```
sudo apt install certbot python3-certbot-nginx
sudo systemctl reload nginx
sudo certbot --nginx -d example.com -d www.example.com
```

When prompted for HTTPS redirction, select **Option 2**, forcing HTTPS traffic.

:::

<br>

Experiment by **[Matthew Reichardt](https://github.com/matthewjamesr)**
