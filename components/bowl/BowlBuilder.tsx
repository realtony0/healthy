'use client'

import { useState, useMemo } from 'react'
import { Plus, Minus, AlertCircle, Sparkles, Check, ArrowRight, LayoutGrid, Leaf, Dumbbell, Flame, ChevronRight, ShoppingCart } from 'lucide-react'
import { BOWL_SIZES, BOWL_SUPPLEMENTS, BOWL_UNIT_WEIGHTS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import type { Ingredient, IngredientType } from '@prisma/client'

interface BowlBuilderProps {
  ingredients: Ingredient[]
  onComplete: (config: BowlConfig) => void
}

export interface BowlConfig {
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  selectedIngredients: {
    ingredientId: string
    type: IngredientType
    quantity: number
  }[]
  supplements: {
    quinoaSelection: boolean
    extraUnits: number
  }
  totalPrice: number
}

const STEPS = [
  { id: 'size', name: 'Taille', icon: <LayoutGrid size={18} /> },
  { id: 'feculent', name: 'Base', icon: <Leaf size={18} /> },
  { id: 'proteine', name: 'Protéine', icon: <Dumbbell size={18} /> },
  { id: 'legumes', name: 'Légumes', icon: <Flame size={18} /> },
  { id: 'sauce', name: 'Sauce', icon: <Sparkles size={18} /> },
  { id: 'extras', name: 'Extras', icon: <Plus size={18} /> },
]

export default function BowlBuilder({ ingredients, onComplete }: BowlBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSize, setSelectedSize] = useState<keyof typeof BOWL_SIZES>('SMALL')
  const [selectedIngredients, setSelectedIngredients] = useState<Map<string, number>>(new Map())
  const [quinoaSelection, setQuinoaSelection] = useState(false)
  const [extraUnits, setExtraUnits] = useState(0)
  const [errors, setErrors] = useState<string[]>([])

  const maxUnits = BOWL_SIZES[selectedSize].units
  const usedUnits = useMemo(() => 
    Array.from(selectedIngredients.entries())
      .filter(([id]) => ingredients.find(i => i.id === id)?.type !== 'SAUCE')
      .reduce((sum, [, qty]) => sum + qty, 0)
  , [selectedIngredients, ingredients])
  
  const remainingUnits = maxUnits + extraUnits - usedUnits

  const ingredientsByType = useMemo(() => ({
    FECULENT: ingredients.filter(i => i.type === 'FECULENT'),
    PROTEINE: ingredients.filter(i => i.type === 'PROTEINE' || i.type === 'PROTEINE_PREMIUM'),
    LEGUMES: ingredients.filter(i => i.type === 'LEGUMES'),
    SAUCE: ingredients.filter(i => i.type === 'SAUCE'),
  }), [ingredients])

  const specialProteinsCount = useMemo(() => 
    Array.from(selectedIngredients.entries())
      .filter(([id]) => ingredients.find(i => i.id === id)?.type === 'PROTEINE_PREMIUM')
      .reduce((sum, [, qty]) => sum + qty, 0)
  , [selectedIngredients, ingredients])

  const calculatePrice = () => {
    let price = BOWL_SIZES[selectedSize].price
    selectedIngredients.forEach((quantity, ingredientId) => {
      const ingredient = ingredients.find(i => i.id === ingredientId)
      if (ingredient?.isPremium) price += ingredient.price * quantity
    })
    if (quinoaSelection) price += BOWL_SUPPLEMENTS.QUINOA_SELECTION.price
    if (extraUnits > 0) price += BOWL_SUPPLEMENTS.EXTRA_UNIT.price * extraUnits
    return price
  }

  const validate = (): boolean => {
    const newErrors: string[] = []
    const hasType = (type: IngredientType) => Array.from(selectedIngredients.keys()).some(id => ingredients.find(i => i.id === id)?.type === type)
    
    if (!hasType('FECULENT')) newErrors.push('Une base est requise.')
    if (!hasType('PROTEINE') && !hasType('PROTEINE_PREMIUM')) newErrors.push('Une protéine est requise.')
    if (Array.from(selectedIngredients.entries()).filter(([id]) => ingredients.find(i => i.id === id)?.type === 'SAUCE').length !== 1) newErrors.push('Choisissez une seule sauce.')
    if (usedUnits > maxUnits + extraUnits) newErrors.push('Dépassement d\'unités.')

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleIngredientToggle = (ingredientId: string, type: IngredientType) => {
    const newMap = new Map(selectedIngredients)
    const currentQty = newMap.get(ingredientId) || 0

    if (type === 'SAUCE') {
      // Pour les sauces : on remplace systématiquement la sauce actuelle (1 seule autorisée)
      // et cela ne consomme pas d'unités - TOUJOURS AUTORISÉ même si crédits épuisés
      ingredientsByType.SAUCE.forEach(s => newMap.delete(s.id))
      newMap.set(ingredientId, 1)
    } else if (type === 'PROTEINE_PREMIUM') {
      if (currentQty === 0) {
        // Maximum 2 protéines premium ET il faut avoir des unités disponibles
        if (specialProteinsCount < 2 && remainingUnits > 0) {
          newMap.set(ingredientId, 1)
        }
      } else {
        newMap.delete(ingredientId)
      }
    } else {
      // Pour les autres ingrédients : besoin d'unités disponibles
      if (currentQty === 0) {
        if (remainingUnits > 0) {
          newMap.set(ingredientId, 1)
        }
      } else {
        newMap.delete(ingredientId)
      }
    }
    setSelectedIngredients(newMap)
  }

  return (
    <div className="flex flex-col min-h-screen lg:min-h-0 lg:flex-row pb-20 lg:pb-0">
      {/* Top Mobile Progress */}
      <div className="lg:hidden sticky top-16 bg-white border-b border-gray-100 z-40 px-5 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-black text-brand uppercase tracking-widest italic">{STEPS[currentStep].name}</p>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{currentStep + 1} / {STEPS.length}</p>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Sidebar - Hidden on small mobile, fixed on desktop */}
      <aside className="hidden lg:flex w-80 bg-emerald-50/30 p-8 border-r border-emerald-100 flex-col gap-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-brand leading-none tracking-tighter">Personnalisation</h2>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest italic underline decoration-2 underline-offset-4">Étape {currentStep + 1}</p>
        </div>

        <div className="flex flex-col gap-2">
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-tighter transition-all ${
                currentStep === idx 
                  ? 'bg-brand text-white shadow-xl shadow-emerald-900/20 scale-[1.02]' 
                  : idx < currentStep 
                  ? 'bg-emerald-100 text-brand' 
                  : 'text-gray-400 hover:bg-white'
              }`}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-black/5">
                {idx < currentStep ? <Check size={16} strokeWidth={4} /> : step.icon}
              </div>
              {step.name}
            </button>
          ))}
        </div>

        <div className="mt-auto p-6 bg-white rounded-3xl shadow-xl shadow-emerald-900/5 space-y-4 border border-emerald-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-2">Unités utilisées</p>
          <div className="flex items-end justify-between leading-none">
            <span className={`text-4xl font-black italic font-serif ${remainingUnits < 0 ? 'text-red-500' : 'text-brand'}`}>{usedUnits}</span>
            <span className="text-gray-300 font-bold mb-1">/ {maxUnits + extraUnits}</span>
          </div>
          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest pt-2">
            Prix total: <span className="text-brand ml-1 italic font-serif text-sm">{formatPrice(calculatePrice())}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-16">
        <div className="max-w-2xl mx-auto space-y-10">
          {/* Step 0: Size */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-5xl font-black text-brand tracking-tighter">Quelle portion <br />souhaitez-vous ?</h3>
              <div className="grid gap-4">
                {Object.entries(BOWL_SIZES).map(([key, size]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedSize(key as keyof typeof BOWL_SIZES)
                      setCurrentStep(1)
                    }}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 text-left relative flex items-center justify-between group ${
                      selectedSize === key
                        ? 'border-brand bg-emerald-50 shadow-lg'
                        : 'border-gray-100 bg-white hover:border-emerald-100 shadow-sm'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-black text-2xl text-brand">{size.label}</div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">{size.units} ingrédients au choix</p>
                    </div>
                    <div className="text-2xl font-black text-emerald-600 italic font-serif">
                      {formatPrice(size.price)}
                    </div>
                    {selectedSize === key && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg rotate-12">
                        <Check size={16} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Steps 1-4: Ingredients */}
          {currentStep > 0 && currentStep < 5 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl lg:text-5xl font-black text-brand tracking-tighter leading-none">
                  {currentStep === 1 ? "Choisissez votre base" : 
                   currentStep === 2 ? "Votre protéine" :
                   currentStep === 3 ? "Vos légumes frais" :
                   "Votre sauce (Offerte)"}
                </h3>
                <p className="text-gray-400 font-bold italic text-sm underline decoration-emerald-100 decoration-4 underline-offset-4 decoration-skip-ink-none">
                  {currentStep === 4 
                    ? "Le choix d'une sauce est obligatoire et gratuit (ne consomme pas d'unités)." 
                    : `Il vous reste ${remainingUnits} unités.`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(currentStep === 1 ? ingredientsByType.FECULENT : 
                  currentStep === 2 ? ingredientsByType.PROTEINE :
                  currentStep === 3 ? ingredientsByType.LEGUMES :
                  ingredientsByType.SAUCE).map((ing) => {
                  const qty = selectedIngredients.get(ing.id) || 0
                  const isPremium = ing.type === 'PROTEINE_PREMIUM'
                  const isSauce = ing.type === 'SAUCE'
                  // Les sauces sont TOUJOURS sélectionnables, même si crédits épuisés
                  const disabled = isSauce 
                    ? false 
                    : (isPremium && specialProteinsCount >= 2 && qty === 0) || (qty === 0 && remainingUnits <= 0)
                  
                  return (
                    <button
                      key={ing.id}
                      disabled={disabled}
                      onClick={() => handleIngredientToggle(ing.id, ing.type)}
                      className={`p-6 rounded-[2rem] border-2 text-left transition-all duration-300 flex items-center justify-between group ${
                        qty > 0
                          ? 'border-brand bg-emerald-50 shadow-lg'
                          : disabled
                          ? 'border-gray-50 bg-gray-50 opacity-40 grayscale cursor-not-allowed'
                          : 'border-gray-50 bg-white hover:border-emerald-100 shadow-md'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-black text-gray-900 text-lg leading-tight">{ing.name}</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {isPremium ? `+${formatPrice(ing.price)}` : ing.type === 'SAUCE' ? 'Gratuit' : `${BOWL_UNIT_WEIGHTS[ing.type as keyof typeof BOWL_UNIT_WEIGHTS]}g portion`}
                        </div>
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        qty > 0 ? 'bg-brand text-white' : 'bg-gray-100 text-gray-300'
                      }`}>
                        {qty > 0 ? <Check size={20} strokeWidth={4} /> : <Plus size={20} strokeWidth={3} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 5: Extras */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <h3 className="text-3xl lg:text-5xl font-black text-brand tracking-tighter leading-none">Des extras ?</h3>
              
              <div className="grid gap-6">
                <button 
                  onClick={() => setQuinoaSelection(!quinoaSelection)}
                  className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 text-left relative flex items-center gap-6 ${
                    quinoaSelection ? 'border-brand bg-emerald-50 shadow-lg' : 'border-gray-100 bg-white shadow-sm'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${quinoaSelection ? 'bg-brand text-white' : 'bg-gray-50 text-gray-400'}`}>
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <p className="font-black text-gray-900">Quinoa Sélection</p>
                    <p className="text-emerald-600 font-bold italic font-serif">+{formatPrice(BOWL_SUPPLEMENTS.QUINOA_SELECTION.price)}</p>
                  </div>
                  {quinoaSelection && <div className="absolute top-6 right-6 text-brand"><Check size={20} strokeWidth={4} /></div>}
                </button>

                <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="font-black text-gray-900 leading-none">Unités supplémentaires</p>
                    <p className="text-emerald-600 font-bold italic font-serif text-sm">+{formatPrice(BOWL_SUPPLEMENTS.EXTRA_UNIT.price)} / unité</p>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
                    <button
                      onClick={() => setExtraUnits(Math.max(0, extraUnits - 1))}
                      className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-8 text-center text-2xl font-black italic font-serif">{extraUnits}</span>
                    <button
                      onClick={() => setExtraUnits(extraUnits + 1)}
                      className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-5 lg:relative lg:bg-transparent lg:border-0 lg:p-0 lg:mt-12 lg:shadow-none flex justify-between gap-4 z-50">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`flex-1 btn-mobile btn-soft !w-auto px-8 transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Retour
            </button>
            
            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-[2] btn-mobile btn-brand text-lg shadow-2xl"
              >
                Continuer
                <ChevronRight className="ml-2" size={20} />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (validate()) {
                    const config: BowlConfig = {
                      size: selectedSize,
                      selectedIngredients: Array.from(selectedIngredients.entries()).map(([ingredientId, quantity]) => ({
                        ingredientId,
                        type: ingredients.find(i => i.id === ingredientId)!.type,
                        quantity,
                      })),
                      supplements: {
                        quinoaSelection,
                        extraUnits,
                      },
                      totalPrice: calculatePrice(),
                    }
                    onComplete(config)
                  }
                }}
                className="flex-[2] btn-mobile btn-brand text-lg shadow-2xl"
              >
                Ajouter au panier
                <ShoppingCart className="ml-2" size={20} />
              </button>
            )}
          </div>

          {/* Inline Errors */}
          {errors.length > 0 && currentStep === STEPS.length - 1 && (
            <div className="p-6 bg-red-50 border-2 border-red-100 rounded-[2.5rem] space-y-2">
              {errors.map((error, index) => (
                <div key={index} className="flex items-center gap-3 text-red-700 font-bold text-sm">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
