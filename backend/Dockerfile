FROM wordpress:6.2

WORKDIR /var/www/html

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp

RUN rm -rf wp-content/*

RUN apt-get update -y && apt-get upgrade -y && apt install -y apt-utils

# Install composer

# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
# RUN php composer-setup.php
# RUN php -r "unlink('composer-setup.php');"
# RUN mv composer.phar /usr/local/bin/composer

# Install pdo_mysql extension for MailPoet3
RUN docker-php-ext-install pdo pdo_mysql

# This is a Debian system, so...
RUN apt-get -y install apt-transport-https lsb-release ca-certificates curl wget gnupg

RUN curl -sSLo /usr/share/keyrings/deb.sury.org-apache2.gpg https://packages.sury.org/apache2/apt.gpg

RUN sh -c 'echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-apache2.gpg] https://packages.sury.org/apache2/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/apache2.list'

RUN apt-get update -y && apt-get upgrade -y

# Copy the files
COPY . wp-content

COPY .htaccess .

VOLUME wp-content/uploads

EXPOSE 80
