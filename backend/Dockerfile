FROM wordpress

WORKDIR /var/www/html

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp

RUN rm -rf wp-content/*

RUN apt-get update

RUN apt-get install postfix

# Copy the files
COPY . wp-content

VOLUME wp-content/uploads

EXPOSE 80
