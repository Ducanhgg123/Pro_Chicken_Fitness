INSERT INTO `role`
VALUES
(1,'ROLE_ADMIN'),
(2,'ROLE_USER'),
(3,'ROLE_COACH');

INSERT INTO `user`
values
(1,"ducanh","$2a$12$DAHxNao5CT4U2pAH4T0T3OdB6H1BIq7arzZxl4YGp5WzHaFDxtQ8q",
"Lê Trọng Đức Anh","B28 Đường 4A","letrongducanh456@gmail.com","0379242227",
1.8,72.0,4,"2003-07-06","male",null);

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
(1,2);

INSERT INTO `user_ingredient`
values
(1,4),
(1,5),
(1,3);