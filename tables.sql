create table users(
     userid UUID PRIMARY KEY,
     firstname varchar(100) NOT  null,
     lastname varchar(100) NOT  null,
     email varchar(255) NOT NULL UNIQUE,
     password varchar(60) NOT NULL, --bcrypt 60 chars long
     cartid UUID,
     paymentsid  UUID,
     admin boolean NOT NULL,
    FOREIGN KEY(cartid) REFERENCES cart(cartid),
    FOREIGN KEY(paymentsid) REFERENCES payments(paymentid) 
);

create table cart(
    cartid UUID PRIMARY KEY NOT NULL,
    productid UUID NOT NULL UNIQUE,
    quantity INT,
    totalprice DECIMAL,
    FOREIGN KEY(productid) REFERENCES products(productid)
);
 
create table products(
    productid UUID PRIMARY KEY,
    productname TEXT NOT NULL,
    categoryid  UUID NOT NULL,
    quantity INT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    pic TEXT NOT NULL,
    FOREIGN KEY(categoryid) REFERENCES category(categoryid)
);


create table category(
    categoryid UUID PRIMARY KEY NOT NULL,
    categoryname VARCHAR(100) NOT NULL UNIQUE
);

create table payments(
    paymentid UUID PRIMARY KEY,
    paymentmethod VARCHAR(25),
    paymentDate DATE,
    totalPurchase DECIMAL,
    purchaseid UUID,
    FOREIGN KEY(purchaseid) REFERENCES purchases(purchaseid)
);

create table purchases(
    purchaseid UUID PRIMARY KEY,
    productid UUID,
    quantity INT,
    purchaseDate DATE,
    FOREIGN KEY(productid) REFERENCES PRODUCTS(productid)
);