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
    `description` text,
    `price` int default 0,
    `coach_id` int default null,
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

CREATE TABLE `post`(
	`id` int not null auto_increment,
    `thumbnail` mediumblob,
    `post_date` datetime,
    `content` text, 
    `like_count` int default 0,
    `user_id` int default null,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `comment`(
	`id` int not null auto_increment,
    `content` text,
    `user_id` int,
    `post_id` int,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


CREATE TABLE `dish`(
	`id` int not null auto_increment,
    `name` varchar(256),
    `total_calories` int,
    `picture` mediumblob,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `dish_ingredient`(
	`dish_id` int not null,
    `ingredient_id` int not null,
    primary key (`dish_id`,`ingredient_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `workout_activities`(
	`id` int not null,
    `name` varchar(256),
    `picture` mediumblob,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `daily_workout`(
	`id` int not null,
    `date_set` datetime,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `daily_dish`(
	`daily_id` int not null,
    `dish_id` int not null,
    primary key (`daily_id`,`dish_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `daily_activities`(
	`daily_id` int not null,
    `activity_id` int not null,
    primary key (`daily_id`,`activity_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

alter table `user_ingredient`
add foreign key (`user_id`) references `user`(`id`),
add foreign key (`ingredient_id`) references `ingredient`(`id`);

alter table `user_role`
add foreign key (`user_id`) references `user`(`id`),
add foreign key (`role_id`) references `role`(`id`); 


alter table `comment`
add foreign key (`user_id`) references `user`(`id`),
add foreign key (`post_id`) references `post`(`id`);

alter table `post`
add foreign key (`user_id`) references `user`(`id`);

alter table `user`
add foreign key (`coach_id`) references `user`(`id`);

alter table `dish_ingredient`
add foreign key (`dish_id`) references `dish`(`id`),
add foreign key (`ingredient_id`) references `ingredient`(`id`);

alter table `daily_dish` 
add foreign key (`daily_id`) references `daily_workout`(`id`),
add foreign key (`dish_id`) references `dish`(`id`);

alter table `daily_activities`
add foreign key (`daily_id`) references `daily_workout`(`id`),
add foreign key (`activity_id`) references `workout_activities`(`id`);


