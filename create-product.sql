CREATE TABLE IF NOT EXISTS `shopping`.`product` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `rating` INT DEFAULT NULL,
  `num_in_stock` INT DEFAULT NULL,
  `num_sold` INT DEFAULT 0,
  `price` INT DEFAULT NULL,
  PRIMARY KEY (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;