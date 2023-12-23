INSERT INTO `role`
VALUES
(1,'ROLE_ADMIN'),
(2,'ROLE_USER'),
(3,'ROLE_COACH');

INSERT INTO `calendar` 
values 
(1,null);

INSERT INTO `user`
values
(1,"hoa","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Phan Trương Quý Hòa","Quận 8","ntd21@gmail.com","0123456789",
1.6,65.0,3,"2003-01-01","male",null,'I am coach number 1',10000000,null,1),
(2,"khoa","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Trần Đăng Khoa","Quận 7","ntd21@gmail.com","0123456789",
1.6,65.0,3,"2003-01-01","male",null,'I am coach number 2',50000000,null,null),
(3,"ducanh","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Lê Trọng Đức Anh","B28 Đường 4A","letrongducanh456@gmail.com","0379242227",
1.8,72.0,4,"2003-07-06","male",null,null,null,1,null),
(4,"dat","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Nguyễn Thành Đạt","Quận 12","ntd21@gmail.com","0123456789",
1.6,65.0,3,"2003-01-01","male",null,null,null,2,null);
INSERT INTO `ingredient`
values
(1,"chicken breast",null,0),
(2,"brocolli",null,0),
(3,"carrot",null,0),
(4,"chicken breast",null,1),
(5,"brocolli",null,1),
(6,"carrot",null,1);

INSERT INTO `user_role`
values
(1,2),
(1,3),
(2,2),
(2,3),
(3,2),
(4,2);

INSERT INTO `user_ingredient`
values
(1,4),
(1,5),
(1,3);

INSERT INTO `post`
values
(1,null,'2023-11-25','This is post number 1',5,1),
(2,null,'2023-11-26','This is post number 2',50,1),
(3,null,'2023-11-27','This is post number 3',500,1),
(4,null,'2023-11-28','This is post number 4',5000,1);

INSERT INTO `comment`
values
(1,'Great content!',1,1),
(2,'This is so stupid, i hate it!',2,1),
(3,'Don\'t mind that kid, keep up with the good work!',1,1),
(4,'Who is kid you moron?',2,1),
(5,'Love this thing',1,2);

INSERT INTO `dish`
values
(1,'Grilled  Garlic Chicken with Broccoli',350,null),
(2,'Baked Parmesan Crusted Chicken with Roasted Broccoli',400,null),
(3,'Grilled Chicken Salad with Carrot Ginger Dressing',430,null),
(4,'Chicken and Carrot Stir-Fry with Quinoa',520,null);

INSERT INTO `dish_ingredient` 
values
(1,4),
(1,5),
(2,4),
(2,5),
(3,4),
(3,6),
(4,4),
(4,6);

INSERT INTO `workout_activities`
values
(1,'Bicep curl',null),
(2,'Dumbell rolls',null),
(3,'Dumbbell Reverse Curl',null),
(4,'Incline bench press',null),
(5,'Dumbbell bench press',null),
(6,'Dumbbell flies',null),
(7,'Bulgarian split squat',null),
(8,'Romanian deadlift',null),
(9,'Barbell squat',null),
(10,'Mountain climber',null),
(11,'Ab crunch',null),
(12,'Flutter kick',null);

INSERT INTO `daily_workout`
values
(1,null,1),
(2,null,1),
(3,null,1),
(4,null,1),
(5,null,1),
(6,null,1),
(7,null,1);

INSERT INTO `daily_dish`
values
(1,1),
(1,2),
(2,3),
(2,4),
(3,1),
(3,3),
(4,2),
(4,4),
(5,1),
(5,2),
(6,3),
(6,4),
(7,1),
(7,3);

INSERT INTO `daily_activities`
values
(1,1),
(1,2),
(1,3),
(3,4),
(3,5),
(3,6),
(5,7),
(5,8),
(5,9),
(7,10),
(7,11),
(7,12);

