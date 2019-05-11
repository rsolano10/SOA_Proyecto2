FROM ubuntu:18.04

WORKDIR /usr/src/serverphp

COPY . /usr/src/serverphp

RUN apt-get update

RUN apt-get install php7.0 -yq

RUN apt install composer -yq

RUN apt-get install php-mysql -yq 

RUN apt install php-mbstring -yq

CMD [ "php", "-S", "0.0.0.0:8008", "./src/index.php" ]
