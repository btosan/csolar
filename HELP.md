npm install @prisma/adapter-pg pg



<!-- production -->
npx prisma migrate dev --name add_project_date_default
npx prisma migrate dev --name baseline
npx prisma migrate deploy

npx prisma migrate resolve --applied 20260219_init

npx prisma migrate dev --name add-monitoring-enhancements


rm -rf package-lock.json .next

<!-- DEV  ORDER OF PRISMA PRODUCTION MIGRATION AFTER UPDATING SCHEMA.PRISMA-->
# STEP 1:
npx prisma format

# STEP 2:
npx prisma generate
# or (better for development):

# STEP 3:
npx prisma migrate dev --name add-equipment
# or (quick prototyping / no migrations):

# STEP 4:
npx prisma db push


<!--PROD  ORDER OF PRISMA PRODUCTION MIGRATION AFTER UPDATING SCHEMA.PRISMA -->
# STEP 1:
npx prisma migrate dev --name add-equipment

# STEP 2:
git add prisma/migrations
git commit -m "Add monitoring enhancements"
git push

# STEP 3:
npx prisma migrate deploy

# STEP 4:
npx prisma db push

