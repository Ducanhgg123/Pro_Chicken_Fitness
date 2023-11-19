DROP SCHEMA IF EXISTS `ProChickenFitness`;
CREATE SCHEMA `ProChickenFitness`;
USE `ProChickenFitness`;

DROP TABLE IF EXISTS `user_role`;
DROP TABLE IF EXISTS `user_ingredient`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `ingredient`;

CREATE TABLE `user`(
	`id` int NOT NULL auto_increment,
    `username` varchar(500) NOT NULL,
    `password` varchar(500) NOT NULL,
    `fullname` varchar(500),
    `address` varchar(500),
    `email` varchar(500),
    `phonenumber` varchar(50),
    `height` real default 0,
    `weight` real default 0,
    `workout_frequency` int default 0,
    `date_of_birth` datetime ,
    `gender` varchar(100) default 'male',
    `avatar` mediumblob,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `ingredient`(
	`id` int not null auto_increment,
    `name` varchar(500) not null,
    `image` mediumblob,
    `status` boolean not null default 1,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `role`(
	`id` int not null auto_increment,
    `name` varchar(500) not null,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `user_role`(
	`user_id` int not null,
    `role_id` int not null,
    primary key (`user_id`,`role_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `user_ingredient`(
	`user_id` int not null,
    `ingredient_id` int not null,
    primary key (`user_id`,`ingredient_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

alter table `user_ingredient`
add foreign key (`user_id`) references `user`(`id`),
add foreign key (`ingredient_id`) references `ingredient`(`id`);

alter table `user_role`
add foreign key (`user_id`) references `user`(`id`),
add foreign key (`role_id`) references `role`(`id`); 


