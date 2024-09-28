-- migrate:up
CREATE TABLE rekening (
    id int(11) NOT NULL AUTO_INCREMENT,
    id_user int(11) DEFAULT NULL,
    no_rekening varchar(255) DEFAULT NULL,
    saldo int(11) DEFAULT NULL,
    name_bank varchar(255) DEFAULT NULL,
    status tinyint(1) DEFAULT '0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY no_rekening (no_rekening),
    KEY id_user (id_user),
    CONSTRAINT rekening_ibfk_1 FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
)

-- migrate:down

DROP TABLE rekening

