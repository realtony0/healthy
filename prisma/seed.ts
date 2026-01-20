import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Créer les catégories
  const categories = [
    {
      name: 'Crée ton Bowl',
      slug: 'cree-ton-bowl',
      type: 'BOWL_BUILDER' as const,
      sortOrder: 1,
    },
    {
      name: 'Plats Signature',
      slug: 'plats-signature',
      type: 'STANDARD' as const,
      sortOrder: 2,
    },
    {
      name: "L'Essentiel",
      slug: 'lessentiel',
      type: 'STANDARD' as const,
      sortOrder: 3,
    },
    {
      name: 'Rituel du Matin',
      slug: 'rituel-du-matin',
      type: 'STANDARD' as const,
      sortOrder: 4,
    },
    {
      name: 'Shots Healthy',
      slug: 'shots-healthy',
      type: 'STANDARD' as const,
      sortOrder: 5,
    },
    {
      name: 'Snacks & Energy Balls',
      slug: 'snacks-energy-balls',
      type: 'STANDARD' as const,
      sortOrder: 6,
    },
  ]

  for (const catData of categories) {
    await prisma.category.upsert({
      where: { slug: catData.slug },
      update: {},
      create: catData,
    })
  }

  // Créer les ingrédients pour les bowls
  const ingredients = [
    // Féculents
    { name: 'Riz complet', type: 'FECULENT' as const, price: 0 },
    { name: 'Quinoa', type: 'FECULENT' as const, price: 0 },
    { name: 'Patate douce', type: 'FECULENT' as const, price: 0 },
    { name: 'Pâtes complètes', type: 'FECULENT' as const, price: 0 },

    // Protéines
    { name: 'Poulet grillé', type: 'PROTEINE' as const, price: 0 },
    { name: 'Poisson grillé', type: 'PROTEINE' as const, price: 0 },
    { name: 'Œufs', type: 'PROTEINE' as const, price: 0 },
    { name: 'Légumineuses', type: 'PROTEINE' as const, price: 0 },

    // Protéines Spéciales
    { name: 'Saumon', type: 'PROTEINE_PREMIUM' as const, price: 700, isPremium: true },
    { name: 'Thon', type: 'PROTEINE_PREMIUM' as const, price: 700, isPremium: true },
    { name: 'Poulet rôti', type: 'PROTEINE_PREMIUM' as const, price: 700, isPremium: true },

    // Légumes
    { name: 'Salade verte', type: 'LEGUMES' as const, price: 0 },
    { name: 'Tomates', type: 'LEGUMES' as const, price: 0 },
    { name: 'Concombres', type: 'LEGUMES' as const, price: 0 },
    { name: 'Carottes', type: 'LEGUMES' as const, price: 0 },
    { name: 'Brocolis', type: 'LEGUMES' as const, price: 0 },

    // Sauces
    { name: 'Sauce yaourt', type: 'SAUCE' as const, price: 0 },
    { name: 'Sauce tahini', type: 'SAUCE' as const, price: 0 },
    { name: 'Sauce citron', type: 'SAUCE' as const, price: 0 },
    { name: 'Sauce piquante', type: 'SAUCE' as const, price: 0 },
  ]

  for (const ingData of ingredients) {
    const existing = await prisma.ingredient.findFirst({
      where: {
        name: ingData.name,
        type: ingData.type,
      },
    })

    if (!existing) {
      await prisma.ingredient.create({
        data: ingData,
      })
    }
  }

  // Créer les produits principaux avec photos
  const platsSignature = await prisma.category.findUnique({
    where: { slug: 'plats-signature' },
  })
  const lessentiel = await prisma.category.findUnique({
    where: { slug: 'lessentiel' },
  })
  const rituelMatin = await prisma.category.findUnique({
    where: { slug: 'rituel-du-matin' },
  })
  const shotsHealthy = await prisma.category.findUnique({
    where: { slug: 'shots-healthy' },
  })
  const snacksEnergy = await prisma.category.findUnique({
    where: { slug: 'snacks-energy-balls' },
  })
  const bowlCategory = await prisma.category.findUnique({
    where: { slug: 'cree-ton-bowl' },
  })

  // Plats Signature
  if (platsSignature) {
    const products = [
      {
        name: 'Bowl Énergie',
        slug: 'bowl-energie',
        description:
          'Un bowl équilibré avec quinoa, poulet grillé et légumes de saison.',
        price: 3500,
        kcal: 450,
        proteins: 35,
        image: '/img/bowl-poulet-mais.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 1,
      },
      {
        name: 'Bowl Méditerranéen',
        slug: 'bowl-mediterraneen',
        description: 'Riz complet, poisson grillé, légumes frais.',
        price: 3800,
        kcal: 420,
        proteins: 30,
        image: '/img/poisson-blanc-legumes.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 2,
      },
      {
        name: 'Bœuf & Purée de Patate Douce',
        slug: 'boeuf-puree-patate-douce',
        description: 'Bœuf saisi accompagné de purée de patate douce.',
        price: 4200,
        kcal: 520,
        proteins: 40,
        image:
          '/img/boeuf-puree-patate-douce.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 3,
      },
      {
        name: 'Patate Douce façon Tacos',
        slug: 'patate-douce-tacos-boeuf',
        description: 'Patate douce et bœuf façon tacos healthy.',
        price: 3900,
        kcal: 480,
        proteins: 32,
        image: '/img/patate-douce-tacos.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 4,
      },
      {
        name: 'Poulet Grillé & Légumes',
        slug: 'poulet-grille-legumes',
        description: 'Poulet grillé mariné et légumes de saison.',
        price: 3800,
        kcal: 430,
        proteins: 38,
        image: '/img/poulet-grille-legumes.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 5,
      },
      {
        name: 'Poisson Blanc aux Herbes',
        slug: 'poisson-blanc-herbes-citron',
        description: 'Poisson blanc aux herbes et citron, avec accompagnement.',
        price: 3900,
        kcal: 410,
        proteins: 34,
        image: '/img/poisson-blanc-herbes.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 6,
      },
      {
        name: 'Poisson Blanc & Légumes',
        slug: 'poisson-blanc-legumes',
        description: 'Filet de poisson blanc et légumes croquants.',
        price: 3800,
        kcal: 400,
        proteins: 32,
        image: '/img/poisson-blanc-legumes.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 7,
      },
    ]

    for (const prodData of products) {
      await prisma.product.upsert({
        where: { slug: prodData.slug },
        update: {
          image: prodData.image,
          description: prodData.description,
          price: prodData.price,
          kcal: prodData.kcal,
          proteins: prodData.proteins,
          categoryId: prodData.categoryId,
          sortOrder: prodData.sortOrder,
        },
        create: prodData,
      })
    }
  }

  // L'Essentiel
  if (lessentiel) {
    const products = [
      {
        name: 'Bowl Lentilles & Pommes de Terre',
        slug: 'bowl-lentilles-pommes-terre',
        description:
          'Bowl veggie de lentilles et pommes de terre croustillantes.',
        price: 3200,
        kcal: 430,
        proteins: 24,
        image:
          '/img/bowl-lentilles-veggie.jpeg',
        categoryId: lessentiel.id,
        sortOrder: 1,
      },
      {
        name: 'Salade Concombre & Poulet',
        slug: 'salade-concombre-poulet',
        description: 'Salade croquante de concombre et poulet.',
        price: 2800,
        kcal: 320,
        proteins: 26,
        image: '/img/salade-concombre-poulet.jpeg',
        categoryId: lessentiel.id,
        sortOrder: 2,
      },
      {
        name: 'Barquettes Concombre & Crevettes',
        slug: 'barquettes-concombre-crevettes',
        description: 'Barquettes fraîches de concombre aux crevettes.',
        price: 3000,
        kcal: 280,
        proteins: 22,
        image: '/img/barquettes-concombre-crevettes.jpeg',
        categoryId: lessentiel.id,
        sortOrder: 3,
      },
      {
        name: 'Coupe Laitue & Crevettes',
        slug: 'coupe-laitue-crevettes',
        description: 'Coupe de laitue croquante aux crevettes.',
        price: 3000,
        kcal: 270,
        proteins: 21,
        image: '/img/coupe-laitue-crevettes.jpeg',
        categoryId: lessentiel.id,
        sortOrder: 4,
      },
    ]

    for (const prodData of products) {
      await prisma.product.upsert({
        where: { slug: prodData.slug },
        update: {
          image: prodData.image,
          description: prodData.description,
          price: prodData.price,
          kcal: prodData.kcal,
          proteins: prodData.proteins,
          categoryId: prodData.categoryId,
          sortOrder: prodData.sortOrder,
        },
        create: prodData,
      })
    }
  }

  // Rituel du Matin (inclut les produits avec règles fruits)
  if (rituelMatin) {
    const products = [
      {
        name: 'Toast Avocat Œuf',
        slug: 'toast-avocat-oeuf',
        description: 'Toast avocat et œuf pour bien démarrer la journée.',
        price: 2500,
        kcal: 350,
        proteins: 18,
        image: '/img/toast-avocat-oeuf.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 1,
      },
      {
        name: 'Yaourt Grec Énergie',
        slug: 'yaourt-grec-energie',
        description:
          'Yaourt grec protéiné, préparé avec des fruits de saison, selon disponibilité.',
        price: 2200,
        kcal: 280,
        proteins: 18,
        image: '/img/yaourt-grec-energie.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 2,
      },
      {
        name: 'Overnight Oats',
        slug: 'overnight-oats',
        description:
          'Flocons d’avoine préparés la veille, avec fruits de saison, selon disponibilité.',
        price: 2300,
        kcal: 300,
        proteins: 16,
        image: '/img/overnight-oats.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 3,
      },
      {
        name: 'Smoothie Protéiné Naturel',
        slug: 'smoothie-proteine-naturel',
        description:
          'Smoothie protéiné naturel avec votre choix de 1 à 2 fruits.',
        price: 2600,
        kcal: 240,
        proteins: 20,
        image: '/img/smoothie-proteine.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 4,
      },
      {
        name: 'Amandes Nature',
        slug: 'amandes-nature',
        description: 'Portion d’amandes nature pour un snack healthy.',
        price: 1500,
        kcal: 200,
        proteins: 8,
        image: '/img/amandes.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 5,
      },
    ]

    for (const prodData of products) {
      await prisma.product.upsert({
        where: { slug: prodData.slug },
        update: {
          image: prodData.image,
          description: prodData.description,
          price: prodData.price,
          kcal: prodData.kcal,
          proteins: prodData.proteins,
          categoryId: prodData.categoryId,
          sortOrder: prodData.sortOrder,
        },
        create: prodData,
      })
    }
  }

  // Shots Healthy
  if (shotsHealthy) {
    const products = [
      {
        name: 'Shot Détox',
        slug: 'shot-detox',
        description: 'Shot détoxifiant pour purifier l’organisme.',
        price: 800,
        kcal: 20,
        proteins: 1,
        image: '/img/shot-detox.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 1,
      },
      {
        name: 'Shot Brûle-Graisse',
        slug: 'shot-brule-graisse',
        description: 'Shot brûle-graisse naturel.',
        price: 800,
        kcal: 20,
        proteins: 1,
        image: '/img/shot-brule-graisse.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 2,
      },
      {
        name: 'Shot Énergie',
        slug: 'shot-energie',
        description: 'Shot énergisant pour bien démarrer la journée.',
        price: 800,
        kcal: 25,
        proteins: 1,
        image: '/img/shot-energy.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 3,
      },
      {
        name: 'Shot Immunité',
        slug: 'shot-immunite',
        description: 'Shot pour booster les défenses naturelles.',
        price: 800,
        kcal: 25,
        proteins: 1,
        image: '/img/shot-immunite.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 4,
      },
      {
        name: 'Pack Mix 4 Shots',
        slug: 'pack-mix-4-shots',
        description: 'Pack de 4 shots assortis.',
        price: 2800,
        kcal: 80,
        proteins: 4,
        image: '/img/pack-mix-4-shots.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 5,
      },
    ]

    for (const prodData of products) {
      await prisma.product.upsert({
        where: { slug: prodData.slug },
        update: {
          image: prodData.image,
          description: prodData.description,
          price: prodData.price,
          kcal: prodData.kcal,
          proteins: prodData.proteins,
          categoryId: prodData.categoryId,
          sortOrder: prodData.sortOrder,
        },
        create: prodData,
      })
    }
  }

  // Snacks & Energy Balls
  if (snacksEnergy) {
    const products = [
      {
        name: 'Energy Balls Beurre de Cacahuète',
        slug: 'energy-balls-beurre-cacahuete',
        description: '5 energy balls au beurre de cacahuète.',
        price: 2000,
        kcal: 250,
        proteins: 8,
        image: '/img/energy-balls-beurre-cacahuete.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 1,
      },
      {
        name: 'Energy Balls Chocolat',
        slug: 'energy-balls-chocolat',
        description: '5 energy balls au chocolat.',
        price: 2000,
        kcal: 260,
        proteins: 8,
        image: '/img/energy-balls-choco.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 2,
      },
      {
        name: 'Energy Balls Coco Dattes',
        slug: 'energy-balls-coco-dattes',
        description: '5 energy balls coco-dattes.',
        price: 2000,
        kcal: 250,
        proteins: 8,
        image: '/img/energy-balls-coco-dattes.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 3,
      },
      {
        name: 'Energy Balls Protéines',
        slug: 'energy-balls-proteines',
        description: '5 energy balls protéinées.',
        price: 2200,
        kcal: 260,
        proteins: 10,
        image: '/img/energy-balls-proteines.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 4,
      },
      {
        name: 'Pack Mix Energy Balls',
        slug: 'pack-mix-energy-balls',
        description: 'Pack mix de 4 variétés d’energy balls.',
        price: 2800,
        kcal: 300,
        proteins: 10,
        image: '/img/energy-balls-mix.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 5,
      },
    ]

    for (const prodData of products) {
      await prisma.product.upsert({
        where: { slug: prodData.slug },
        update: {
          image: prodData.image,
          description: prodData.description,
          price: prodData.price,
          kcal: prodData.kcal,
          proteins: prodData.proteins,
          categoryId: prodData.categoryId,
          sortOrder: prodData.sortOrder,
        },
        create: prodData,
      })
    }
  }

  // Produit virtuel pour les bowls personnalisés
  if (bowlCategory) {
    await prisma.product.upsert({
      where: { slug: 'bowl-personnalise' },
      update: {
        image: '/img/bowl-poulet-mais.jpeg',
      },
      create: {
        name: 'Bowl Personnalisé',
        slug: 'bowl-personnalise',
        description: 'Bowl créé sur-mesure via le module Crée ton Bowl.',
        price: 0,
        image: '/img/bowl-poulet-mais.jpeg',
        categoryId: bowlCategory.id,
        sortOrder: 1,
        isVisible: false,
      },
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
