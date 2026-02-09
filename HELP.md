npx prisma format

npx prisma generate
# or (better for development):
npx prisma migrate dev --name init
# or (quick prototyping / no migrations):
npx prisma db push