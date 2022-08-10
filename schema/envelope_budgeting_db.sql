CREATE TABLE "envelopes" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int UNIQUE,
  "balance" decimal
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "envelope_id" int,
  "date" date,
  "payment_amount" decimal,
  "payment_receipient" varchar
);

ALTER TABLE "envelopes" ADD CONSTRAINT "envelopes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_envelope_id_fkey" FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id") ON DELETE CASCADE;


INSERT INTO categories(name) VALUES('savings');
INSERT INTO categories(name) VALUES('groceries');
INSERT INTO categories(name) VALUES('rent');

INSERT INTO envelopes(category_id,balance) VALUES(1,90);
INSERT INTO envelopes(category_id,balance) VALUES(2,35);
INSERT INTO envelopes(category_id,balance) VALUES(3,175);

INSERT INTO transactions(envelope_id,date,payment_amount,payment_receipient) VALUES(1,NOW(),15,'Uber');
INSERT INTO transactions(envelope_id,date,payment_amount,payment_receipient) VALUES(1,NOW(),75,'Riot Games');
INSERT INTO transactions(envelope_id,date,payment_amount,payment_receipient) VALUES(2,NOW(),30,'Street vendor');

