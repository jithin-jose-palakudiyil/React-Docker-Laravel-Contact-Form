#FROM php:8.1.1-apache-bullseye

FROM php:8.1

RUN apt-get update -y && apt-get install -y openssl zip unzip git curl

RUN docker-php-ext-install pdo pdo_mysql 

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --ignore-platform-reqs

WORKDIR /app/api

COPY . .

RUN composer install

#RUN composer create-project --prefer-dist laravel/laravel laravel-docker


EXPOSE 8000

CMD php artisan serve --host=0.0.0.0