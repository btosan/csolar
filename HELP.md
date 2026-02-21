npm install @prisma/adapter-pg pg


npx prisma format

npx prisma generate
# or (better for development):
npx prisma migrate dev --name init
# or (quick prototyping / no migrations):
npx prisma db push

<!-- production -->
npx prisma migrate dev --name baseline
npx prisma migrate deploy

npx prisma migrate resolve --applied 20260219_init


rm -rf package-lock.json .next