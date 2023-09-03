CREATE TABLE "todo app" (
   id serial PRIMARY KEY,
  "task" varchar(200) NOT NULL,
  "priority" varchar(200) NOT NULL,
  "status" boolean NOT NULL,
  "notes" varchar(200) NOT NULL
);


INSERT INTO "todo app" (task, priority, status, notes)
VALUES 
  ('Go grocery shoppping', 'low', 'true', 'Buy milk and eggs'),
   ('Yoga exercise', 'high', 'false', 'Do yoga outside'),
    ('Laundry', 'normal', 'true', 'Add laundry detergent to grocery list'),
     ('Make dinner', 'high', 'false','Make pasta chicken alferdo'),
      ('Finsih homework', 'high', 'true', 'Finish weekend homework');
      