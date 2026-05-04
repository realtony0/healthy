import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL non défini. Lancez : DATABASE_URL=... npx tsx scripts/rename-yogurt-bowl.ts')
    process.exit(1)
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    const updated = await prisma.product.updateMany({
      where: { slug: 'yaourt-grec-energie' },
      data: {
        name: 'Yogurt Bowl',
        slug: 'yogurt-bowl',
      },
    })
    console.log(`✅ Mis à jour : ${updated.count} produit(s)`)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
