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

  // Liste des slugs autorisés (uniquement ceux fournis par l'utilisateur)
  const allowedSlugs = [
    // Plats Signature (7)
    'bowl-poulet-mais-dore',
    'patate-douce-tacos-boeuf-signature',
    'boulettes-poulet-signature',
    'coupes-laitue-crevettes',
    'poisson-blanc-herbes-citron',
    'bowl-lentilles-pommes-terre-croustillantes-veggie',
    'boeuf-saisi-puree-patate-douce',
    // L'Essentiel (4)
    'salade-concombre-poulet',
    'barquette-concombre-crevettes',
    'poulet-grille-legumes',
    'poisson-blanc-legumes',
    // Rituel du Matin (5)
    'yaourt-grec-energie',
    'toast-avocat-oeufs',
    'overnight-oats',
    'smoothie-proteine-naturel',
    'amandes',
    // Shots Healthy (4)
    'shot-immunite',
    'shot-energie',
    'shot-brule-graisse',
    'shot-detox',
    // Energy Balls (4)
    'energy-balls-beurre-cacahuete',
    'energy-balls-choco',
    'energy-balls-coco-dattes',
    'energy-balls-proteinees',
    // Bowl personnalisé (invisible, pour le système)
    'bowl-personnalise',
  ]

  // Supprimer tous les produits qui ne sont pas dans la liste autorisée
  console.log('Nettoyage des produits non autorisés...')
  await prisma.product.deleteMany({
    where: {
      slug: {
        notIn: allowedSlugs,
      },
    },
  })
  console.log('Nettoyage terminé.')

  // Plats Signature
  if (platsSignature) {
    const products = [
      {
        name: 'Bowl de poulet au Maïs Doré',
        slug: 'bowl-poulet-mais-dore',
        description:
          'Poulet grillé aux épices, riz blanc et maïs crémeux façon street corn, relevé au citron vert et coriandre. Un bowl riche en protéines, savoureux et équilibré.',
        price: 3500,
        kcal: 620,
        proteins: 42,
        image: '/img/bowl-poulet-mais.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 1,
      },
      {
        name: 'Patate Douce et Bœuf façon Tacos-Signature',
        slug: 'patate-douce-tacos-boeuf-signature',
        description: 'Patates douces rôties garnies de bœuf haché épicé façon taco, accompagnées de yaourt grec léger, guacamole et herbes fraîches. Un plat sain, rassasiant et riche en protéines.',
        price: 3900,
        kcal: 650,
        proteins: 38,
        image: '/img/patate-douce-tacos.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 2,
      },
      {
        name: 'Boulettes de poulet-Signature',
        slug: 'boulettes-poulet-signature',
        description: 'Boulettes de poulets juteuses, riz blanc et légumes grillés. Un bowl équilibré, savoureux et riche en protéines.',
        price: 3500,
        kcal: 600,
        proteins: 40,
        image: '/img/poulet-signature.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 3,
      },
      {
        name: 'Coupes de laitue au Crevettes',
        slug: 'coupes-laitue-crevettes',
        description: 'Crevettes épicées, riz léger, légumes frais et sauce crémeuse au yaourt et citron vert, servis dans des feuilles de laitue croquantes. Frais, léger et riche en protéines.',
        price: 3000,
        kcal: 580,
        proteins: 42,
        image: '/img/coupe-laitue-crevettes.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 4,
      },
      {
        name: 'Poisson Blanc aux Herbes & Citron',
        slug: 'poisson-blanc-herbes-citron',
        description: 'Dorade grillé relevée au citron vert accompagné de riz. Un bowl frais, équilibré et riche en protéines.',
        price: 3900,
        kcal: 550,
        proteins: 40,
        image: '/img/poisson-blanc-herbes.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 5,
      },
      {
        name: 'Bowl de lentilles & Pommes de terre Croustillantes Veggie',
        slug: 'bowl-lentilles-pommes-terre-croustillantes-veggie',
        description: 'Pommes de terre croustillantes, lentilles épicées façon taco, pico de légumes frais et sauce crémeuse au citron vert. Un bowl 100 % végétarien, gourmand et équilibré.',
        price: 3200,
        kcal: 620,
        proteins: 30,
        image: '/img/bowl-lentilles-veggie.jpeg',
        categoryId: platsSignature.id,
        sortOrder: 6,
      },
      {
        name: 'Bœuf saisi accompagné de purée de Patate Douce',
        slug: 'boeuf-saisi-puree-patate-douce',
        description: 'Bœuf grillé tranché, purée de patate douce onctueuse et salsa fraîche aux herbes. Un bowl réconfortant, équilibré et riche en protéines.',
        price: 4200,
        kcal: 650,
        proteins: 42,
        image: '/img/boeuf-puree-patate-douce.jpeg',
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
        name: 'Salade de concombre au poulet',
        slug: 'salade-concombre-poulet',
        description: 'Concombre croquant, poulet tendre et sauce légère au yaourt grec citronné. Une salade fraîche, légère et riche en protéines, parfaite pour un repas healthy.',
        price: 2800,
        kcal: 345,
        proteins: 50.3,
        image: '/img/salade-concombre-poulet.jpeg',
        categoryId: lessentiel.id,
        sortOrder: 1,
      },
      {
        name: 'Barquette de concombre aux Crevettes',
        slug: 'barquette-concombre-crevettes',
        description: 'Concombre garni de riz, crevettes épicées et sauce crémeuse légèrement relevée. Frais, léger et riche en protéines.',
        price: 3000,
        kcal: 280,
        proteins: 38,
        image: '/img/barquettes-concombre-crevettes.jpeg',
        categoryId: lessentiel.id,
        sortOrder: 2,
      },
      {
        name: 'Poulet Grillé et légumes',
        slug: 'poulet-grille-legumes',
        description: 'Poulet grillé aux herbes, légumes rôtis colorés et fondants. Un bowl simple, sain et riche en protéines.',
        price: 3800,
        kcal: 360,
        proteins: 40,
        image: '/img/poulet-grille-legumes.jpeg',
        categoryId: lessentiel.id,
        sortOrder: 3,
      },
      {
        name: 'Poisson blanc et Légumes',
        slug: 'poisson-blanc-legumes',
        description: 'Filet de poisson grillé au citron, brocoli, courgettes et tomates cerises. Un bowl léger, frais et riche en protéines.',
        price: 3800,
        kcal: 320,
        proteins: 40,
        image: '/img/poisson-blanc-legumes.jpeg',
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
        name: 'Yaourt Grec Énergie',
        slug: 'yaourt-grec-energie',
        description: null,
        price: 2200,
        kcal: 320,
        proteins: 22,
        image: '/img/yaourt-grec-energie.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 1,
      },
      {
        name: 'Toast Avocat & Oeufs',
        slug: 'toast-avocat-oeufs',
        description: null,
        price: 2500,
        kcal: 380,
        proteins: 20,
        image: '/img/toast-avocat-oeuf.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 2,
      },
      {
        name: 'Overnight Oats',
        slug: 'overnight-oats',
        description: null,
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
        description: null,
        price: 2600,
        kcal: 400,
        proteins: 26,
        image: '/img/smoothie-proteine.jpeg',
        categoryId: rituelMatin.id,
        sortOrder: 4,
      },
      {
        name: 'Amandes',
        slug: 'amandes',
        description: null,
        price: 1500,
        kcal: 587,
        proteins: 20.5,
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
        name: 'Shot Immunité',
        slug: 'shot-immunite',
        description: 'Concentré naturel à base de gingembre, citron et curcuma, pour booster les défenses et l\'énergie au quotidien.',
        price: 800,
        kcal: 33,
        proteins: 0,
        image: '/img/shot-immunite.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 1,
      },
      {
        name: 'Shot Énergie',
        slug: 'shot-energie',
        description: 'Concentré naturel à base de gingembre, citron et orange, pour un boost d\'énergie immédiat et naturel.',
        price: 800,
        kcal: 38,
        proteins: 0,
        image: '/img/shot-energy.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 2,
      },
      {
        name: 'Shot Brûle Graisse',
        slug: 'shot-brule-graisse',
        description: 'Shot naturel à base de citron, gingembre et piment doux, conçu pour stimuler le métabolisme et apporter un effet tonique.',
        price: 800,
        kcal: 28,
        proteins: 0,
        image: '/img/shot-brule-graisse.jpeg',
        categoryId: shotsHealthy.id,
        sortOrder: 3,
      },
      {
        name: 'Shot Detox',
        slug: 'shot-detox',
        description: 'Shot frais et naturel à base de citron, concombre et menthe, pour aider à l\'hydratation et à la sensation de légèreté.',
        price: 800,
        kcal: 23,
        proteins: 0,
        image: '/img/shot-detox.jpeg',
        categoryId: shotsHealthy.id,
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

  // Snacks & Energy Balls
  if (snacksEnergy) {
    const products = [
      {
        name: 'Energy Balls Beurre de Cacahuète',
        slug: 'energy-balls-beurre-cacahuete',
        description: 'Flocons d\'avoine, beurre de cacahuète et dattes pour une énergie rapide et durable. Très rassasiantes.',
        price: 2000,
        kcal: 440,
        proteins: 15,
        image: '/img/energy-balls-beurre-cacahuete.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 1,
      },
      {
        name: 'Energy Balls Choco',
        slug: 'energy-balls-choco',
        description: 'Flocons d\'avoine, cacao non sucré, dattes et pépites de chocolat. Gourmandes, version healthy.',
        price: 2000,
        kcal: 475,
        proteins: 13.5,
        image: '/img/energy-balls-choco.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 2,
      },
      {
        name: 'Energy Balls Coco-Dattes',
        slug: 'energy-balls-coco-dattes',
        description: 'Dattes, coco râpée et flocons d\'avoine. 100 % naturelles, sans sucre ajouté.',
        price: 2000,
        kcal: 420,
        proteins: 9,
        image: '/img/energy-balls-coco-dattes.jpeg',
        categoryId: snacksEnergy.id,
        sortOrder: 3,
      },
      {
        name: 'Energy Balls Protéinées',
        slug: 'energy-balls-proteinees',
        description: 'Flocons d\'avoine, beurre d\'amande ou cacahuète et graines. Idéales après le sport.',
        price: 2200,
        kcal: 450,
        proteins: 18,
        image: '/img/energy-balls-proteines.jpeg',
        categoryId: snacksEnergy.id,
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
