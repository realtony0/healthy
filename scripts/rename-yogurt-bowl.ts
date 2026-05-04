import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const updated = await prisma.product.updateMany({
    where: { slug: 'yaourt-grec-energie' },
    data: {
      name: 'Yogurt Bowl',
      slug: 'yogurt-bowl',
    },
  })
  console.log(`Updated ${updated.count} product(s)`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
