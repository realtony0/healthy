'use client'

import { useEffect, useState } from 'react'
import { RefreshCcw, User, ShieldCheck, Mail, Phone, Calendar, Package, ChevronRight, Search } from 'lucide-react'

type AdminUser = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  phone: string | null
  role: 'USER' | 'ADMIN'
  createdAt: string
  _count: {
    orders: number
    subscriptions: number
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.firstName && u.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.lastName && u.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Communauté</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Utilisateurs</h1>
          <p className="text-gray-500 font-medium italic">Gérez les comptes clients et les rôles administratifs.</p>
        </div>
        
        <button 
          onClick={fetchUsers}
          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#1a472a] hover:rotate-180 transition-all duration-500"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Rechercher par nom, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner shadow-gray-200/50"
        />
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredUsers.map((u) => (
            <div key={u.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30 flex flex-col lg:flex-row items-center gap-8 group hover:border-[#1a472a] transition-all duration-500">
              <div className="flex items-center gap-6 flex-1 w-full text-center md:text-left">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#1a472a] shadow-inner font-black text-xl italic relative overflow-hidden">
                  {u.firstName?.charAt(0) || u.email.charAt(0)}
                  <div className="absolute inset-0 bg-emerald-500/5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-[#1a472a] transition-colors leading-none">
                      {u.firstName} {u.lastName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                      u.role === 'ADMIN' ? 'bg-[#1a472a] text-white' : 'bg-gray-50 text-gray-400 border-gray-100'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-400 italic leading-none">{u.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 lg:gap-12 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl">
                  <Package size={16} className="text-blue-500" />
                  <span className="text-sm font-black text-gray-900">{u._count.orders}</span>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Cmds</p>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl">
                  <Calendar size={16} className="text-emerald-500" />
                  <span className="text-sm font-black text-gray-900">{u._count.subscriptions}</span>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Abos</p>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm font-black text-gray-900">{u.phone || 'N/A'}</span>
                </div>

                <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#1a472a] group-hover:text-white transition-all duration-300">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
