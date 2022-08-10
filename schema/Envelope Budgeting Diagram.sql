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

ALTER TABLE "envelopes" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");
