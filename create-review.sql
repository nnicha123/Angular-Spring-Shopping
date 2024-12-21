CREATE TABLE `shopping`.`review` (
    id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    comment TEXT,
    rating INT,
    product_id BIGINT(20) NOT NULL,
    customer_id BIGINT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);