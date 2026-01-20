/**
 * Script pour créer un compte administrateur
 * Usage: npx tsx scripts/create-admin.ts <email> <password>
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function createAdmin() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error('❌ Usage: npx tsx scripts/create-admin.ts <email> <password>')
    console.error('   Exemple: npx tsx scripts/create-admin.ts admin@healthy.sn MonMotDePasse123')
    process.exit(1)
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      // Mettre à jour le rôle et le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.user.update({
        where: { email },
        data: {
          role: 'ADMIN',
          password: hashedPassword,
        },
      })
      console.log(`✅ Compte admin mis à jour pour ${email}`)
    } else {
      // Créer un nouveau compte admin
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'Healthy',
          role: 'ADMIN',
        },
      })
      console.log(`✅ Compte admin créé pour ${email}`)
    }

    console.log('\n📧 Email:', email)
    console.log('🔑 Mot de passe:', password)
    console.log('\n⚠️  IMPORTANT: Notez ces identifiants et supprimez-les de votre historique de commandes !')
  } catch (error) {
    console.error('❌ Erreur lors de la création du compte admin:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
