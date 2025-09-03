'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Star, 
  TrendingUp, 
  Filter,
  Search,
  Users,
  Crown,
  Zap
} from 'lucide-react'
import CasinoLayout from '@/components/layout/CasinoLayout'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatNumber } from '@/lib/utils'

interface Game {
  id: string
  name: string
  provider: string
  category: string
  players: number
  rtp: number
  isNew?: boolean
  isHot?: boolean
  isExclusive?: boolean
}

export default function CasinoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Games', count: 2847 },
    { id: 'slots', name: 'Slots', count: 1823 },
    { id: 'table', name: 'Table Games', count: 156 },
    { id: 'live', name: 'Live Casino', count: 89 },
    { id: 'jackpots', name: 'Jackpots', count: 67 },
    { id: 'new', name: 'New Games', count: 34 }
  ]

  const games: Game[] = [
    {
      id: '1',
      name: 'Sweet Bonanza',
      provider: 'Pragmatic Play',
      category: 'slots',
      players: 1247,
      rtp: 96.51,
      isHot: true
    },
    {
      id: '2',
      name: 'Gates of Olympus',
      provider: 'Pragmatic Play',
      category: 'slots',
      players: 892,
      rtp: 96.50,
      isHot: true
    },
    {
      id: '3',
      name: 'Book of Dead',
      provider: 'Play\'n GO',
      category: 'slots',
      players: 634,
      rtp: 94.25
    },
    {
      id: '4',
      name: 'Lightning Roulette',
      provider: 'Evolution Gaming',
      category: 'live',
      players: 445,
      rtp: 97.30,
      isNew: true
    },
    {
      id: '5',
      name: 'Blackjack Classic',
      provider: 'NetEnt',
      category: 'table',
      players: 234,
      rtp: 99.28
    },
    {
      id: '6',
      name: 'Mega Moolah',
      provider: 'Microgaming',
      category: 'jackpots',
      players: 567,
      rtp: 88.12
    }
  ]

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <CasinoLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Casino Games</h1>
          <p className="text-gray-400">Thousands of games from top providers</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
                className="bg-[#1a2c38] border-[#2d3748]"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 ${
                  selectedCategory === category.id 
                    ? 'bg-[#00d4ff] text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">
                  ({formatNumber(category.count)})
                </span>
              </Button>
            ))}
          </div>
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

                  {/* Enhanced Game-specific visual elements */}
                  {game.name === 'Sweet Bonanza' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-3xl filter drop-shadow-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🍬
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/15 via-yellow-400/10 to-transparent" />
                        <motion.div
                          className="absolute top-2 right-2 text-lg text-yellow-400"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          ✨
                        </motion.div>
                        <motion.div
                          className="absolute bottom-2 left-2 text-sm text-pink-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🍭
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'Gates of Olympus' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-3xl filter drop-shadow-lg"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        >
                          ⚡
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-purple-500/15 to-transparent" />
                        <motion.div
                          className="absolute top-3 right-3 text-lg text-purple-400"
                          animate={{ rotate: [0, -360] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          🏛️
                        </motion.div>
                        <motion.div
                          className="absolute bottom-2 left-2 text-xs text-yellow-400 font-bold"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ZEUS
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'Book of Dead' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-3xl filter drop-shadow-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          📜
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-orange-500/15 to-transparent" />
                        <motion.div
                          className="absolute top-2 left-2 text-lg text-amber-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🏺
                        </motion.div>
                        <motion.div
                          className="absolute bottom-2 right-2 text-sm text-orange-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                          👑
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'Lightning Roulette' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-3xl filter drop-shadow-lg"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        >
                          ⚡
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/25 via-blue-500/20 to-transparent" />
                        <motion.div
                          className="absolute top-3 left-3 text-lg text-blue-400"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          🎰
                        </motion.div>

                      </div>
                    </div>
                  )}

                  {game.name === 'Blackjack Classic' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-6 h-8 bg-red-600 rounded border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold"
                            animate={{ rotate: [0, 2, -2, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            A♠
                          </motion.div>
                          <motion.div
                            className="w-6 h-8 bg-black rounded border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold"
                            animate={{ rotate: [0, -2, 2, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                          >
                            K♥
                          </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/15 via-gray-600/10 to-transparent" />

                      </div>
                    </div>
                  )}

                  {game.name === 'Mega Moolah' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-3xl filter drop-shadow-lg"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🦁
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 via-yellow-500/20 to-transparent" />
                        <motion.div
                          className="absolute top-2 right-2 text-lg text-yellow-400"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          💰
                        </motion.div>

                      </div>
                    </div>
                  )}

                  {/* Animated background particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/15 rounded-full"
                        style={{
                          left: `${15 + i * 20}%`,
                          top: `${25 + i * 15}%`,
                        }}
                        animate={{
                          y: [0, -12, 0],
                          opacity: [0.2, 0.5, 0.2],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          delay: i * 0.7,
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
                    {game.isHot && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        HOT
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
                  <p className="text-xs text-gray-400 truncate mb-1">{game.provider}</p>
                  <p className="text-xs text-green-400">RTP: {game.rtp}%</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Games
          </Button>
        </div>
      </div>
    </CasinoLayout>
  )
}
