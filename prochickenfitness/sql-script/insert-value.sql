INSERT INTO `role`
VALUES
(1,'ROLE_ADMIN'),
(2,'ROLE_USER'),
(3,'ROLE_COACH');

INSERT INTO `user`
values
(1,"hoa","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Phan Trương Quý Hòa","Quận 8","ntd21@gmail.com","0123456789",
1.6,65.0,3,"2003-01-01","male",null,'I am coach number 1',10000000,null),
(2,"khoa","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Trần Đăng Khoa","Quận 7","ntd21@gmail.com","0123456789",
1.6,65.0,3,"2003-01-01","male",null,'I am coach number 2',50000000,null),
(3,"ducanh","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Lê Trọng Đức Anh","B28 Đường 4A","letrongducanh456@gmail.com","0379242227",
1.8,72.0,4,"2003-07-06","male",null,null,null,1),
(4,"dat","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Nguyễn Thành Đạt","Quận 12","ntd21@gmail.com","0123456789",
1.6,65.0,3,"2003-01-01","male",null,null,null,2);
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
(1,'Great content!',1),
(2,'This is so stupid, i hate it!',2),
(3,'Don\'t mind that kid, keep up with the good work!',1),
(4,'Who is kid you moron?',2),
(5,'Love this thing',1);

INSERT INTO `post_comment`
values
(1,1),
(1,2),
(1,3),
(1,4),
(2,5);
