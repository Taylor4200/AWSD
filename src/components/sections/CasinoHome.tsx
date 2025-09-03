'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import GameCard from '@/components/ui/GameCard'
import { games, getGamesByCategory, searchGames, getFeaturedGames, getExclusiveGames, getHotGames } from '@/lib/gameData'

const CasinoHome: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('featured') // Default to featured games
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'continue', name: 'Continue Playing', count: 0 },
    { id: 'featured', name: 'Featured Games', count: getFeaturedGames().length },
    { id: 'originals', name: 'Originals', count: getExclusiveGames().length },
    { id: 'popular', name: 'Popular', count: getHotGames().length },
    { id: 'all', name: 'All Games', count: games.length },
  ]

  const filteredGames = activeFilter === 'all' 
    ? games 
    : activeFilter === 'featured'
    ? getFeaturedGames()
    : activeFilter === 'originals'
    ? getExclusiveGames()
    : activeFilter === 'popular'
    ? getHotGames()
    : activeFilter === 'continue'
    ? [] // Continue playing would show recently played games
    : getGamesByCategory(activeFilter)

  const searchedGames = searchTerm 
    ? searchGames(searchTerm)
    : filteredGames

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a2c38] to-[#2d3748] py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Weekly Raffle Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2c38] via-[#2d3748] to-[#1a2c38] p-4 md:p-8 border border-[#00d4ff]/30 shadow-2xl shadow-[#00d4ff]/10">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00d4ff]/5 via-transparent to-[#00d4ff]/5" />
                  <div className="absolute top-4 right-4 w-32 h-32 bg-[#00d4ff]/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#00d4ff]/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-8 h-8 bg-[#00d4ff] rounded-full flex items-center justify-center mr-3">
                          <span className="text-black font-bold text-sm">🎰</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                          $100K Weekly Raffle
                        </h2>
                      </div>
                      <p className="text-gray-300 text-base mb-4">
                        Earn tickets with every wager and compete for massive prizes!
                      </p>
                      
                      {/* Mobile Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-[#00d4ff]/20">
                          <div className="text-[#00d4ff] text-xs font-semibold mb-1">⏰ Time Left</div>
                          <div className="text-xl font-bold text-white">4d 21h</div>
                        </div>
                        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-[#00d4ff]/20">
                          <div className="text-[#00d4ff] text-xs font-semibold mb-1">🎫 Your Tickets</div>
                          <div className="text-xl font-bold text-white">0</div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="default" 
                        className="w-full bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black font-bold py-3 text-lg shadow-lg shadow-[#00d4ff]/25"
                        onClick={() => window.location.href = '/raffle/weeklyraffle0901'}
                      >
                        🎫 Enter Raffle
                      </Button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-[#00d4ff] rounded-full flex items-center justify-center mr-3">
                          <span className="text-black font-bold text-sm">🎰</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white">
                          $100,000 Weekly Raffle
                        </h2>
                      </div>
                      <p className="text-gray-300 text-lg mb-6 max-w-md">
                        Earn tickets with every wager and compete for massive prizes! Join thousands of players in our biggest weekly event.
                      </p>
                      <Button 
                        variant="default" 
                        className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black font-bold px-8 py-3 text-lg shadow-lg shadow-[#00d4ff]/25"
                        onClick={() => window.location.href = '/raffle/weeklyraffle0901'}
                      >
                        🎫 Enter Raffle
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-[#00d4ff]/20">
                        <div className="text-[#00d4ff] text-sm font-semibold mb-2">⏰ Time Left</div>
                        <div className="text-3xl font-bold text-white mb-4">4d 21h 26m</div>
                        <div className="space-y-2">
                          <div className="text-gray-300 text-sm">
                            🎫 Your Tickets: <span className="text-[#00d4ff] font-bold">0</span>
                          </div>
                          <div className="text-gray-300 text-sm">
                            👥 Participants: <span className="text-[#00d4ff] font-bold">2,341</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-[#00d4ff]/40 rounded-full"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + i * 8}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>

                {/* Prize highlight */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full font-bold text-xs shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏆 $100K Prize Pool
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category.id)}
              className={activeFilter === category.id 
                ? "bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90" 
                : "border-[#4a5568] text-gray-300 hover:border-[#00d4ff] hover:text-white"
              }
            >
              {category.name}
              <span className="ml-2 bg-black/20 px-2 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {searchedGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GameCard 
                game={game} 
                variant="compact"
                onClick={() => console.log(`Playing ${game.name}`)}
              />
            </motion.div>
          ))}
        </div>

        {searchedGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No games found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CasinoHome
