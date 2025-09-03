'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play,
  Star,
  TrendingUp,
  Clock,
  Users,
  Gift,
  Zap,
  Crown,
  Filter
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { simulateLogin } from '@/lib/mockData'

interface Game {
  id: string
  name: string
  provider: string
  image: string
  players: number
  isExclusive?: boolean
  isNew?: boolean
  isHot?: boolean
  category: string
}

const CasinoHome: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filters = [
    { id: 'all', label: 'All Games', icon: null },
    { id: 'exclusive', label: 'Exclusive', icon: Star },
    { id: 'new', label: 'New', icon: Zap },
    { id: 'hot', label: 'Hot', icon: TrendingUp },
    { id: 'slots', label: 'Slots', icon: null },
    { id: 'originals', label: 'Originals', icon: Crown },
  ]

  const games: Game[] = [
          {
        id: '1',
        name: 'DICE',
        provider: 'EDGE Originals',
        image: '/api/placeholder/300/200',
        players: 2068,
        isExclusive: true,
        category: 'originals'
      },
      {
        id: '2',
        name: 'MAKE A BUCK',
        provider: 'EDGE Originals',
        image: '/api/placeholder/300/200',
        players: 3,
        isExclusive: true,
        category: 'originals'
      },
    {
      id: '3',
      name: 'ICE QUEST',
      provider: 'Pragmatic Play',
      image: '/api/placeholder/300/200',
      players: 22,
      category: 'slots'
    },
    {
      id: '4',
      name: 'ZERODAY HEIST',
      provider: 'Hacksaw Gaming',
      image: '/api/placeholder/300/200',
      players: 5,
      isExclusive: true,
      category: 'originals'
    },
    {
      id: '5',
      name: 'PARODY PACKS',
      provider: 'Pragmatic Play',
      image: '/api/placeholder/300/200',
      players: 18,
      category: 'slots'
    },
          {
        id: '6',
        name: 'KENO',
        provider: 'EDGE Originals',
        image: '/api/placeholder/300/200',
        players: 1047,
        isExclusive: true,
        category: 'originals'
      },
      {
        id: '7',
        name: 'PACKS',
        provider: 'EDGE Originals',
        image: '/api/placeholder/300/200',
        players: 222,
        isExclusive: true,
        category: 'originals'
      },
    {
      id: '8',
      name: 'FRUIT COCKTAIL',
      provider: 'Atomic Slot Lab',
      image: '/api/placeholder/300/200',
      players: 1,
      isNew: true,
      category: 'slots'
    }
  ]

  const weeklyRaffle = {
    prize: 100000,
    timeLeft: '4d 23h 38m',
    tickets: 0
  }

  const promoCards = [
    {
      title: 'Casino',
      subtitle: 'Thousands of Games',
      image: '/api/placeholder/400/200',
      color: 'from-purple-600 to-blue-600'
    },
    {
      title: 'Sports Betting',
      subtitle: 'Support Your Team',
      image: '/api/placeholder/400/200',
      color: 'from-orange-500 to-red-600'
    }
  ]

  const filteredGames = games.filter(game => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'exclusive') return game.isExclusive
    if (activeFilter === 'new') return game.isNew
    if (activeFilter === 'hot') return game.players > 100
    return game.category === activeFilter
  })

  return (
    <div className="p-6 space-y-8">
      {/* Temporary Login Button for Testing */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={simulateLogin}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          🧪 Test Login
        </Button>
      </div>
      {/* Weekly Raffle Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-6"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                ${formatNumber(weeklyRaffle.prize)} Weekly Raffle
              </h2>
              <Button 
                variant="default" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
              >
                Learn More
              </Button>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-sm mb-1">Time Left</div>
              <div className="text-2xl font-bold text-white">{weeklyRaffle.timeLeft}</div>
              <div className="text-white/80 text-sm mt-2">
                ⭐ Your Tickets: {weeklyRaffle.tickets}
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating coins animation */}
        <div className="absolute right-4 top-4 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-yellow-300 rounded-full"
              style={{
                left: Math.random() * 200,
                top: Math.random() * 100,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Promo Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {promoCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 cursor-pointer hover:scale-[1.02] transition-transform`}
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-white/80 mb-4">{card.subtitle}</p>
            </div>
            <div className="absolute right-4 bottom-4 opacity-30">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Playing Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Clock className="h-6 w-6 mr-2 text-[#00d4ff]" />
            Continue Playing
          </h2>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon">
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Game Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 ${
                activeFilter === filter.id 
                  ? 'bg-[#00d4ff] text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter.icon && <filter.icon className="h-4 w-4 mr-1" />}
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
                             <Card variant="glass" className="overflow-hidden border-[#2d3748] hover:border-[#00d4ff]/50 transition-all">
                 <div className="relative aspect-[3/2] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                   {/* Game Image Placeholder */}
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

                   {/* Game-specific styling based on category */}
                   {game.category === 'originals' && (
                     <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/15 via-[#00d4ff]/8 to-transparent" />
                   )}

                   {game.category === 'slots' && (
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-600/25 via-pink-600/25 to-orange-600/25" />
                   )}

                   {/* Enhanced Game-specific visual elements */}
                   {game.name === 'DICE' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <div className="grid grid-cols-3 gap-2">
                           {[...Array(9)].map((_, i) => (
                             <motion.div
                               key={i}
                               className={`w-4 h-4 rounded-full ${[0,2,4,6,8].includes(i) ? 'bg-[#00d4ff]' : 'bg-[#00d4ff]/30'} border border-[#00d4ff]/50`}
                               animate={{ scale: [1, 1.1, 1] }}
                               transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                             />
                           ))}
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-[#00d4ff]/10 to-transparent" />
                       </div>
                     </div>
                   )}

                   {game.name === 'KENO' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <div className="grid grid-cols-5 gap-1">
                           {[...Array(25)].map((_, i) => (
                             <motion.div
                               key={i}
                               className={`w-3 h-3 rounded-full border border-yellow-400/50 ${
                                 [7,12,17,22].includes(i) ? 'bg-yellow-400' : 'bg-yellow-400/20'
                               }`}
                               animate={{ scale: [1, 1.2, 1] }}
                               transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                             />
                           ))}
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent" />
                       </div>
                     </div>
                   )}

                   {game.name === 'PACKS' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <div className="flex space-x-1">
                           {[...Array(3)].map((_, i) => (
                             <motion.div
                               key={i}
                               className="w-8 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-lg border-2 border-white/30 shadow-lg"
                               animate={{ y: [0, -2, 0] }}
                               transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                             >
                               <div className="w-full h-1 bg-white/30 rounded mt-1" />
                               <div className="w-full h-1 bg-white/30 rounded mt-0.5" />
                             </motion.div>
                           ))}
                         </div>
                         <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                           <span className="text-white text-xs font-bold">3</span>
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent" />
                       </div>
                     </div>
                   )}

                   {game.name === 'MAKE A BUCK' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <motion.div
                           className="text-4xl font-bold text-green-400 drop-shadow-lg"
                           animate={{ scale: [1, 1.1, 1] }}
                           transition={{ duration: 2, repeat: Infinity }}
                         >
                           💰
                         </motion.div>
                         <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent" />
                         <motion.div
                           className="absolute top-2 right-2 text-lg text-yellow-400"
                           animate={{ rotate: [0, 360] }}
                           transition={{ duration: 3, repeat: Infinity }}
                         >
                           ✨
                         </motion.div>
                       </div>
                     </div>
                   )}

                   {game.name === 'ICE QUEST' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <motion.div
                           className="text-4xl filter drop-shadow-lg"
                           animate={{ scale: [1, 1.05, 1] }}
                           transition={{ duration: 2.5, repeat: Infinity }}
                         >
                           🏔️
                         </motion.div>
                         <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-cyan-400/10 to-transparent" />
                         <motion.div
                           className="absolute bottom-2 left-2 text-sm text-cyan-400"
                           animate={{ opacity: [0.3, 1, 0.3] }}
                           transition={{ duration: 2, repeat: Infinity }}
                         >
                           ❄️
                         </motion.div>
                       </div>
                     </div>
                   )}

                   {game.name === 'ZERODAY HEIST' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <motion.div
                           className="text-4xl filter drop-shadow-lg"
                           animate={{ scale: [1, 1.1, 1] }}
                           transition={{ duration: 2, repeat: Infinity }}
                         >
                           💎
                         </motion.div>
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-transparent" />
                         <motion.div
                           className="absolute top-3 right-3 text-lg text-purple-400"
                           animate={{ rotate: [0, -360] }}
                           transition={{ duration: 4, repeat: Infinity }}
                         >
                           💎
                         </motion.div>
                         
                       </div>
                     </div>
                   )}

                   {game.name === 'PARODY PACKS' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <div className="flex space-x-1">
                           {[...Array(3)].map((_, i) => (
                             <motion.div
                               key={i}
                               className="w-6 h-10 bg-gradient-to-b from-purple-400 to-pink-500 rounded-lg border-2 border-white/30 shadow-lg"
                               animate={{ rotate: [0, 2, -2, 0] }}
                               transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                             >
                               <div className="w-full h-0.5 bg-white/40 rounded mt-1" />
                               <div className="w-full h-0.5 bg-white/40 rounded mt-0.5" />
                             </motion.div>
                           ))}
                         </div>
                         <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                           <span className="text-white text-xs font-bold">!</span>
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-purple-400/10 to-transparent" />
                       </div>
                     </div>
                   )}

                   {game.name === 'FRUIT COCKTAIL' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                         <motion.div
                           className="text-4xl filter drop-shadow-lg"
                           animate={{ scale: [1, 1.05, 1] }}
                           transition={{ duration: 2, repeat: Infinity }}
                         >
                           🍹
                         </motion.div>
                         <div className="absolute inset-0 bg-gradient-to-br from-orange-400/15 via-yellow-400/10 to-transparent" />
                         <motion.div
                           className="absolute top-2 left-2 text-sm text-orange-400"
                           animate={{ opacity: [0.3, 1, 0.3] }}
                           transition={{ duration: 2, repeat: Infinity }}
                         >
                           🍓
                         </motion.div>
                         <motion.div
                           className="absolute bottom-2 right-2 text-sm text-yellow-400"
                           animate={{ opacity: [0.3, 1, 0.3] }}
                           transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                         >
                           🍍
                         </motion.div>
                       </div>
                     </div>
                   )}

                   {/* Animated background particles */}
                   <div className="absolute inset-0 overflow-hidden pointer-events-none">
                     {[...Array(5)].map((_, i) => (
                       <motion.div
                         key={i}
                         className="absolute w-1 h-1 bg-white/20 rounded-full"
                         style={{
                           left: `${10 + i * 20}%`,
                           top: `${20 + i * 15}%`,
                         }}
                         animate={{
                           y: [0, -15, 0],
                           opacity: [0.2, 0.6, 0.2],
                           scale: [1, 1.5, 1],
                         }}
                         transition={{
                           duration: 4,
                           repeat: Infinity,
                           delay: i * 0.8,
                         }}
                       />
                     ))}
                   </div>
                   
                   {/* Animated background elements */}
                   <div className="absolute inset-0 overflow-hidden">
                     {[...Array(3)].map((_, i) => (
                       <motion.div
                         key={i}
                         className="absolute w-2 h-2 bg-white/10 rounded-full"
                         style={{
                           left: `${20 + i * 30}%`,
                           top: `${30 + i * 20}%`,
                         }}
                         animate={{
                           y: [0, -10, 0],
                           opacity: [0.3, 0.8, 0.3],
                         }}
                         transition={{
                           duration: 3,
                           repeat: Infinity,
                           delay: i * 0.5,
                         }}
                       />
                     ))}
                   </div>
                   
                   {/* Badges */}
                   <div className="absolute top-2 left-2 flex flex-col space-y-1">
                     {game.isExclusive && (
                       <span className="bg-[#00d4ff] text-black text-xs px-2 py-1 rounded-full font-bold">
                         EXCLUSIVE
                       </span>
                     )}
                     {game.isNew && (
                       <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                         NEW
                       </span>
                     )}
                   </div>

                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="default" size="lg" className="bg-[#00d4ff] text-black">
                       <Play className="h-5 w-5 mr-2" />
                       PLAY
                     </Button>
                   </div>

                   {/* Player Count */}
                   <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                     <Users className="h-3 w-3 mr-1 text-green-400" />
                     {formatNumber(game.players)}
                   </div>
                 </div>

                <CardContent className="p-3">
                  <h3 className="font-bold text-white text-sm mb-1 truncate">
                    {game.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">{game.provider}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CasinoHome
