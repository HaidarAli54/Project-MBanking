-- migrate:up
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(255) DEFAULT NULL,
  fullname varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  phone_number varchar(20) DEFAULT NULL,
  activation_token varchar(255) DEFAULT NULL,
  is_verified tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- migrate:down

DROP TABLE users;
