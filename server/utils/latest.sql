CREATE TABLE pages(
page_id serial unique primary key,
page_title VARCHAR,
page_path VARCHAR(100)
);
CREATE TABLE imageAndTexts (
record_id serial unique primary key,
text_header VARCHAR,
text_body VARCHAR,
image VARCHAR,
button VARCHAR,
hasButton boolean,
imagetext_direction boolean
);
CREATE TABLE modules(
id serial unique primary key,
page_id INT REFERENCES pages(page_id),
module_Type VARCHAR,
record_id INT
);
CREATE TABLE textBanner (
    record_id SERIAL PRIMARY key,
    textBold VARCHAR,
    textNormal VARCHAR,
    background VARCHAR
);
CREATE TABLE heroBanner (
record_id serial unique primary key,
hero_image VARCHAR,
hero_text VARCHAR
);
INSERT INTO pages (page_title,page_path)
VALUES 
('Home','/'),
('About','/about'),
('Contact','/contact');
INSERT INTO modules (page_id,module_Type,record_id)
VALUES
(1,'heroBanner',1),
(1,'imageAndTexts',1),
(1,'imageAndTexts',2),
(1,'textBanner',1),
(2,'heroBanner',2),
(2,'imageAndTexts',3),
(2,'imageAndTexts',4),
(2,'textBanner',2),
(3,'heroBanner',3),
(3,'imageAndTexts',5),
(3,'textBanner',3);
INSERT INTO imageAndTexts (text_header,text_body,image,button,hasButton,imagetext_direction)
VALUES
('Changing the world is possible. We’ve done it before.','Our leadership team bring years of experience to bear on the greatest challenge of our time. We’re results driven, with a proven record of previous successes.','image1.jpg','click me1',true,true),
('Ready to take the next step? ','This is a movement of billions. Whether you’re most comfortable contributing time to help achieve our advocacy goals, money to help us grow, or energy to put political pressure on our governments to change, we need you on our team.','image2.jpg','discover me2',true,false),
('Changing the world is possible. We’ve done it before.','This is a movement of billions. Whether you’re most comfortable contributing time to help achieve our advocacy goals, money to help us grow, or energy to put political pressure on our governments to change, we need you on our team.','image3.jpg','click me',true,true),
('Ready to take the next step? ','This is a movement of billions. Whether you’re most comfortable contributing time to help achieve our advocacy goals, money to help us grow, or energy to put political pressure on our governments to change, we need you on our team.','image4.jpg','click me',true,false),
('Ready to take the next step?','Sign up to be the first to know about our events. In sit amet felis malesuada, feugiat purus eget, varius mi. Nulla lectus ante, consequat et ex eget, feugiat tincidunt metus.','image5.jpg','click me',true,false);

INSERT INTO textBanner(textBold,textNormal, background)
VALUES
('Climate change threatens every part of the planet. It’s a global problem that requires global cooperation.', 'Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places.','#f0f0'),
('Climate change threatens every part of the planet. It’s a global problem that requires global cooperation.', 'Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places.','#ff00'),
('Climate change threatens every part of the planet. It’s a global problem that requires global cooperation.', 'Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places.','#fff00');

INSERT INTO heroBanner(hero_image,hero_text)
VALUES 
('image1.jpg','Protecting natural habitats from extinction.'),
('image2.jpg','Protecting natural habitats from extinction.'),
('image3.jpg','Protecting natural habitats from extinction.');

