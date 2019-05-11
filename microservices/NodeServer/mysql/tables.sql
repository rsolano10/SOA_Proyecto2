CREATE TABLE orders(
	id int not null,
    username varchar(30),
    date date,
    primary key (id)
);

CREATE TABLE product_order(
	id_order int not null,
    id_product int not null,
    price int,
    quantity int,
    primary key (id_order)
);