CREATE TABLE `shopping`.`order-items` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT(20),
    order_id BIGINT(20),
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);