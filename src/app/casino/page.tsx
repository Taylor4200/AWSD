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
import GameCard from '@/components/ui/GameCard'
import { formatNumber } from '@/lib/utils'

interface Game {
  id: string
  name: string
  provider: string
  category: 'casino' | 'originals' | 'slots' | 'crash' | 'dice' | 'roulette' | 'blackjack' | 'baccarat' | 'poker'
  players: number
  rtp: number
  isNew?: boolean
  isHot?: boolean
  isExclusive?: boolean
  image: string
  isFeatured?: boolean
  tags?: string[]
  recentWin?: number
  popularity?: number
  volatility?: 'low' | 'medium' | 'high'
  minBet?: number
  maxBet?: number
  jackpot?: number
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
      isHot: true,
      image: '/Sweet1000.avif'
    },
    {
      id: '2',
      name: 'Gates of Olympus',
      provider: 'Pragmatic Play',
      category: 'slots',
      players: 892,
      rtp: 96.50,
      isHot: true,
      image: '/images/games/gates-of-olympus.jpg'
    },
    {
      id: '3',
      name: 'Book of Dead',
      provider: 'Play\'n GO',
      category: 'slots',
      players: 634,
      rtp: 94.25,
      image: '/images/games/book-of-dead.jpg'
    },
    {
      id: '4',
      name: 'Lightning Roulette',
      provider: 'Evolution Gaming',
      category: 'roulette',
      players: 445,
      rtp: 97.30,
      isNew: true,
      image: '/images/games/lightning-roulette.jpg'
    },
    {
      id: '5',
      name: 'Blackjack Classic',
      provider: 'NetEnt',
      category: 'blackjack',
      players: 234,
      rtp: 99.28,
      image: '/images/games/blackjack-classic.jpg'
    },
    {
      id: '6',
      name: 'Mega Moolah',
      provider: 'Microgaming',
      category: 'slots',
      players: 567,
      rtp: 88.12,
      image: '/images/games/mega-moolah.jpg'
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
            >
              <GameCard 
                game={game} 
                variant="compact"
              />
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
