'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, Plus, Minus } from 'lucide-react'
import { FRUIT_CHOICES, TOPPINGS, TOPPING_PRICE, PRODUCTS_WITH_FRUIT_CHOICE } from '@/lib/constants'

interface FruitSelectorProps {
  productSlug: string
  onSelectionChange: (fruits: string[], toppings: string[]) => void
  initialFruits?: string[]
  initialToppings?: string[]
}

export default function FruitSelector({
  productSlug,
  onSelectionChange,
  initialFruits = [],
  initialToppings = [],
}: FruitSelectorProps) {
  const [selectedFruits, setSelectedFruits] = useState<string[]>(initialFruits)
  const [selectedToppings, setSelectedToppings] = useState<string[]>(initialToppings)
  const [error, setError] = useState('')

  const hasCustomization = PRODUCTS_WITH_FRUIT_CHOICE.includes(productSlug as any)

  if (!hasCustomization) return null

  const handleFruitToggle = (fruit: string) => {
    setError('')
    let newSelection: string[]
    if (selectedFruits.includes(fruit)) {
      newSelection = selectedFruits.filter((f) => f !== fruit)
    } else {
      if (selectedFruits.length >= 3) {
        setError('Vous pouvez choisir jusqu'à 3 fruits maximum')
        return
      }
      newSelection = [...selectedFruits, fruit]
    }
    setSelectedFruits(newSelection)
    onSelectionChange(newSelection, selectedToppings)
  }

  const handleToppingToggle = (topping: string) => {
    const newToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter((t) => t !== topping)
      : [...selectedToppings, topping]
    setSelectedToppings(newToppings)
    onSelectionChange(selectedFruits, newToppings)
  }

  return (
    <div className="space-y-8">
      {/* Fruits */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest block">
            Choisissez vos fruits
          </label>
          <span className="text-xs font-bold text-gray-400">{selectedFruits.length}/3 sélectionnés</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FRUIT_CHOICES.map((fruit) => {
            const isSelected = selectedFruits.includes(fruit)
            return (
              <button
                key={fruit}
                type="button"
                onClick={() => handleFruitToggle(fruit)}
                className={`p-4 rounded-[1.5rem] border-2 transition-all duration-200 text-center relative overflow-hidden ${
                  isSelected
                    ? 'border-[#1a472a] bg-emerald-50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-emerald-100 shadow-sm'
                }`}
              >
                <span className={`font-bold text-sm ${isSelected ? 'text-[#1a472a]' : 'text-gray-700'}`}>{fruit}</span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#1a472a] rounded-full flex items-center justify-center text-white">
                    <CheckCircle size={12} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
        {error && (
          <div className="flex items-center gap-3 text-red-700 bg-red-50 border-2 border-red-100 rounded-[1.5rem] p-4 font-bold text-sm">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        {selectedFruits.length === 0 && (
          <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border-2 border-emerald-100 rounded-[1.5rem] p-4 font-bold text-sm italic">
            <AlertCircle size={18} />
            <span>Sélectionnez au moins 1 fruit pour continuer.</span>
          </div>
        )}
      </div>

      {/* Toppings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest block">
            Toppings extra
          </label>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {TOPPING_PRICE.toLocaleString('fr-FR')} FCFA / topping
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TOPPINGS.map((topping) => {
            const isSelected = selectedToppings.includes(topping)
            return (
              <button
                key={topping}
                type="button"
                onClick={() => handleToppingToggle(topping)}
                className={`p-4 rounded-[1.5rem] border-2 transition-all duration-200 text-center relative ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-amber-200 shadow-sm'
                }`}
              >
                <span className={`font-bold text-sm leading-tight ${isSelected ? 'text-amber-800' : 'text-gray-700'}`}>{topping}</span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-white">
                    <CheckCircle size={12} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
        {selectedToppings.length > 0 && (
          <div className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <span className="text-sm font-bold text-amber-800">{selectedToppings.length} topping{selectedToppings.length > 1 ? 's' : ''} sélectionné{selectedToppings.length > 1 ? 's' : ''}</span>
            <span className="text-sm font-black text-amber-700">+{(selectedToppings.length * TOPPING_PRICE).toLocaleString('fr-FR')} FCFA</span>
          </div>
        )}
      </div>
    </div>
  )
}
