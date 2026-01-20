'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { FRUIT_CHOICES, PRODUCTS_WITH_FRUIT_CHOICE, PRODUCTS_WITH_SEASONAL_FRUITS } from '@/lib/constants'

interface FruitSelectorProps {
  productSlug: string
  onSelectionChange: (fruits: string[]) => void
  initialSelection?: string[]
}

export default function FruitSelector({
  productSlug,
  onSelectionChange,
  initialSelection = [],
}: FruitSelectorProps) {
  const [selectedFruits, setSelectedFruits] = useState<string[]>(initialSelection)
  const [error, setError] = useState('')

  const requiresFruitChoice = PRODUCTS_WITH_FRUIT_CHOICE.includes(productSlug as any)
  const hasSeasonalFruits = PRODUCTS_WITH_SEASONAL_FRUITS.includes(productSlug as any)

  const handleFruitToggle = (fruit: string) => {
    setError('')
    let newSelection: string[]

    if (selectedFruits.includes(fruit)) {
      newSelection = selectedFruits.filter((f) => f !== fruit)
    } else {
      if (selectedFruits.length >= 2) {
        setError('Vous ne pouvez sélectionner que 2 fruits maximum')
        return
      }
      newSelection = [...selectedFruits, fruit]
    }

    setSelectedFruits(newSelection)
    onSelectionChange(newSelection)

    if (requiresFruitChoice && newSelection.length === 0) {
      setError('Vous devez sélectionner au moins 1 fruit')
    }
  }

  if (hasSeasonalFruits) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-gray-900 font-black uppercase tracking-widest text-xs mb-1">
              Fruits de saison
            </p>
            <p className="text-gray-600 text-sm font-medium leading-relaxed">
              Préparé avec les meilleurs fruits du moment, sélectionnés pour leur fraîcheur.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!requiresFruitChoice) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-black text-gray-900 uppercase tracking-widest block">
          Choisissez vos fruits (1 à 2)
        </label>
        <div className="grid grid-cols-2 gap-4">
          {FRUIT_CHOICES.map((fruit) => {
            const isSelected = selectedFruits.includes(fruit)
            return (
              <button
                key={fruit}
                type="button"
                onClick={() => handleFruitToggle(fruit)}
                className={`p-5 rounded-[2rem] border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                  isSelected
                    ? 'border-[#1a472a] bg-emerald-50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-emerald-100 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className={`font-bold ${isSelected ? 'text-[#1a472a]' : 'text-gray-700'}`}>{fruit}</span>
                  {isSelected && (
                    <div className="w-6 h-6 bg-[#1a472a] rounded-full flex items-center justify-center text-white">
                      <CheckCircle size={14} />
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#1a472a]" />
                )}
              </button>
            )
          })}
        </div>
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
          <span>Veuillez choisir 1 ou 2 fruits pour continuer.</span>
        </div>
      )}
    </div>
  )
}
