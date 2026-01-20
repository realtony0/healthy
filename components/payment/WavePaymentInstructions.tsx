'use client'

import { QrCode, Smartphone, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { generateWaveInstructions } from '@/lib/wave'

interface WavePaymentInstructionsProps {
  amount: number
  orderNumber: string
  phone: string
}

export default function WavePaymentInstructions({
  amount,
  orderNumber,
  phone,
}: WavePaymentInstructionsProps) {
  const [copied, setCopied] = useState(false)
  const instructions = generateWaveInstructions({ amount, orderNumber, phone })

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(instructions.paymentLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200 rounded-[2.5rem] space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3 text-blue-700 font-black uppercase text-xs tracking-widest">
        <QrCode size={16} />
        Paiement Wave Professionnel
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* QR Code Section */}
        <div className="bg-white p-6 rounded-[2rem] border-2 border-blue-100 shadow-lg flex flex-col items-center justify-center space-y-4">
          <div className="relative w-48 h-48 bg-white rounded-2xl p-4 border-2 border-blue-50">
            <Image
              src={instructions.qrCodeUrl}
              alt="QR Code Wave"
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">
            Scannez avec Wave
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-gray-900 mb-4">{instructions.title}</h3>
          <ol className="space-y-3">
            {instructions.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-gray-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Payment Link */}
      <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Lien de paiement direct
            </p>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <Smartphone className="text-gray-400 flex-shrink-0" size={16} />
              <code className="text-xs font-mono text-gray-600 truncate flex-1">
                {instructions.paymentLink}
              </code>
              <button
                onClick={copyToClipboard}
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors flex-shrink-0"
                title="Copier le lien"
              >
                {copied ? (
                  <CheckCircle size={16} className="text-emerald-600" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 font-medium italic text-center">
          Cliquez sur le bouton de copie puis ouvrez Wave pour payer automatiquement
        </p>
      </div>

      {/* Phone Number */}
      <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
          Ou transférez manuellement au
        </p>
        <p className="text-3xl font-black text-blue-600 tracking-tighter">
          {instructions.phoneNumber}
        </p>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">
          Référence: CMD-{orderNumber}
        </p>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 pt-4 border-t border-blue-100">
        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
          <CheckCircle size={12} className="text-white" />
        </div>
        <p className="text-xs font-black text-gray-600 uppercase tracking-widest">
          Paiement sécurisé • Confirmation automatique
        </p>
      </div>
    </div>
  )
}
