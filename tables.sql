create table categories(
    category_id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    category_name VARCHAR(100) NOT NULL UNIQUE CHECK(length(category_name) >= 3)
);


    create table products(
        product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_name TEXT NOT NULL,
        category_id  UUID NOT NULL,
        quantity INT NOT NULL check(quantity >= 0),
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL CHECK(price > 0),
        pic TEXT DEFAULT NULL,
        created_at  TIMESTAMP DEFAULT NOW() NOT NULL, 
        modified_at TIMESTAMP,
        unique(product_name,category_id),
        FOREIGN KEY(category_id) REFERENCES categories(category_id) on Delete null
    );

create table users(
     user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     first_name varchar(100) NOT  NULL,
     last_name varchar(100) NOT  NULL,
     email varchar(255) NOT NULL UNIQUE,
     password varchar(60) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()  NOT NULL,
     admin boolean NOT NULL DEFAULT FALSE
);

create table carts(
    cart_id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)  ON DELETE  CASCADE 
);



create table cartitems(
    cart_item_id  UUID  PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    product_id   UUID NOT NULL,
    cart_id UUID NOT NULL,
    quantity INT  NOT NULL   DEFAULT 1 CHECK(quantity > 0),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP,
    UNIQUE(cart_id,product_id),
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE  CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);



create table orders(
    order_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','PAID','FAILED','CANCELLED')),
    created_at TIMESTAMP  DEFAULT NOW() NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) on delete RESTRICT
);

create table order_items(
 order_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 order_id UUID NOT NULL,
 product_id UUID NOT NULL,
 quantity INT NOT NULL CHECK(quantity > 0),
 price_at_purchase DECIMAL(10,2) NOT NULL check(price_at_purchase > 0),
 FOREIGN KEY(product_id) REFERENCES products(product_id),
 FOREIGN KEY(order_id) REFERENCES orders(order_id)
);

create table payments(
    payment_id UUID  PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    order_id UUID   NOT NULL,
    amount DECIMAL(10,2) NOT NULL check(amount > 0),
    provider  TEXT  NOT NULL,
    external_payment_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','SUCCESS','CANCELLED','FAILED')),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(order_id)
);