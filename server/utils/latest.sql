DROP TABLE IF EXISTS
pages,
imageAndTexts,
heroBanner,
textBanner,
modules CASCADE;


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
('Changing the world is possible. We’ve done it before.','Our leadership team bring years of experience to bear on the greatest challenge of our time. We’re results driven, with a proven record of previous successes.','textAndImage-image1.jpg','Learn More',true,true),
('Ready to take the next step? ','This is a movement of billions. Whether you’re most comfortable contributing time to help achieve our advocacy goals, money to help us grow, or energy to put political pressure on our governments to change, we need you on our team.','textAndImage-image2.jpg','Take Action',true,false),
('Invest in your relationship with yourself','We all have a tendency to put others first, but in doing so, we can sometimes neglect our relationship with ourselves. Let me be your advocate and show you a kinder, gentler way to treat the most important person in your life.','textAndImage-image3.jpg','Learn More',true,true),
('Ready to take the next step? ','This is a movement of billions. Whether you’re most comfortable contributing time to help achieve our advocacy goals, money to help us grow, or energy to put political pressure on our governments to change, we need you on our team.','textAndImage-image4.jpg','Take Action',true,false),
('Take Action','Ready to take the next step? You can become a contributor to our cause, or participate yourself.','image5.jpg','Find Out How',true,false);

INSERT INTO textBanner(textBold,textNormal, background)
VALUES
('Climate change threatens every part of the planet. It’s a global problem that requires global cooperation.', 'Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places.','#f0f0'),
('Our Organization', 'Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places.','#ff00'),
('Ready to take the next step? You can become a contributor to our cause, or participate yourself.', 'Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places.','#fff00');

INSERT INTO heroBanner(hero_image,hero_text)
VALUES 
('herobanner-image1.jpg',' They inspire everyone to care for the planet.'),
('herobanner-image2.jpg','Starts With You'),
('herobanner-image3.jpg','Protecting natural habitats from extinction.');
