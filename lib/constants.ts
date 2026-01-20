export const BOWL_SIZES = {
  SMALL: {
    label: 'Small',
    units: 3,
    price: 2500,
  },
  MEDIUM: {
    label: 'Medium',
    units: 5,
    price: 3200,
  },
  LARGE: {
    label: 'Large',
    units: 7,
    price: 3800,
  },
} as const

export const BOWL_SUPPLEMENTS = {
  QUINOA_SELECTION: {
    label: 'Quinoa sélection',
    price: 500,
  },
  PROTEINE_SPECIALE: {
    label: 'Protéine spéciale',
    price: 700,
  },
  EXTRA_UNIT: {
    label: 'Dépassement unité',
    price: 500,
  },
} as const

export const BOWL_UNIT_WEIGHTS = {
  FECULENT: 100, // g
  PROTEINE: 100, // g
  PROTEINE_PREMIUM: 100, // g
  LEGUMES: 70, // g
  SAUCE: 30, // g
  SUPPLEMENT: 50, // g
} as const

export const FRUIT_CHOICES = [
  'Banane',
  'Fraise',
  'Fruits rouges',
  'Mangue',
] as const

export const PRODUCTS_WITH_SEASONAL_FRUITS = [
  'yaourt-grec-energie',
  'overnight-oats',
] as const

export const PRODUCTS_WITH_FRUIT_CHOICE = [
  'smoothie-proteine-naturel',
] as const

export const SUBSCRIPTION_GOALS = {
  PERTE_POIDS: 'Perte de poids',
  RE_EQUILIBRAGE: 'Rééquilibrage',
  PRISE_MASSE: 'Prise de masse',
} as const

export const SUBSCRIPTION_MEAL_PLANS = {
  DEJEUNER_SEUL: 'Déjeuner seul',
  DINER_SEUL: 'Dîner seul',
  DEJEUNER_DINER: 'Déjeuner + Dîner',
  PETIT_DEJEUNER_DEJEUNER_DINER: 'Petit-déjeuner + Déjeuner + Dîner',
} as const

export const SUBSCRIPTION_DURATIONS = {
  SEVEN_DAYS: '7 jours',
  FOUR_WEEKS: '4 semaines',
} as const

export const SUBSCRIPTION_PRICES = {
  SEVEN_DAYS: {
    DEJEUNER_SEUL: {
      PERTE_POIDS: 15000,
      RE_EQUILIBRAGE: 17000,
      PRISE_MASSE: 19000,
    },
    DINER_SEUL: {
      PERTE_POIDS: 15000,
      RE_EQUILIBRAGE: 17000,
      PRISE_MASSE: 19000,
    },
    DEJEUNER_DINER: {
      PERTE_POIDS: 28000,
      RE_EQUILIBRAGE: 32000,
      PRISE_MASSE: 36000,
    },
    PETIT_DEJEUNER_DEJEUNER_DINER: {
      PERTE_POIDS: 36000,
      RE_EQUILIBRAGE: 42000,
      PRISE_MASSE: 48000,
    },
  },
  FOUR_WEEKS: {
    DEJEUNER_SEUL: {
      PERTE_POIDS: 60000,
      RE_EQUILIBRAGE: 68000,
      PRISE_MASSE: 76000,
    },
  },
} as const

export const PAYMENT_METHODS = {
  CASH: 'Cash',
  WAVE: 'Wave',
  ORANGE_MONEY: 'Orange Money',
} as const

export const ADMIN_PATH = '/mmb22115'
