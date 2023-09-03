CREATE TABLE "todo app" (
   id serial PRIMARY KEY,
  "task" varchar(200) NOT NULL,
  "priority" varchar(200) NOT NULL,
  "status" boolean NOT NULL,
  "notes" varchar(200) NOT NULL
);

INSERT INTO "todo app" (task, priority, status, notes)
VALUES 
  ('go grocery shoppping', 'low', 'true', 'buy milk and eggs'),
   ('yoga exercise', 'high', 'false', 'do yoga outside'),
    ('laundry', 'normal', 'true', 'buy more laundry detergent'),
     ('make dinner', 'high', 'false','make pasta chicken alferdo'),
      ('finsih homework', 'high', 'true', 'finish weekend homework');
      

