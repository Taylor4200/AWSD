'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Play, 
  Users,
  Star,
  Zap,
  TrendingUp
} from 'lucide-react'
import CasinoLayout from '@/components/layout/CasinoLayout'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatNumber } from '@/lib/utils'

interface OriginalGame {
  id: string
  name: string
  description: string
  players: number
  category: string
  isPopular?: boolean
  isNew?: boolean
}

export default function OriginalsPage() {
  const games: OriginalGame[] = [
    {
      id: '1',
      name: 'DICE',
      description: 'Classic dice game with provably fair results',
      players: 2068,
      category: 'Classic',
      isPopular: true
    },
    {
      id: '2',
      name: 'CRASH',
      description: 'Watch the multiplier rise and cash out before it crashes',
      players: 1547,
      category: 'Multiplier',
      isPopular: true
    },
    {
      id: '3',
      name: 'PLINKO',
      description: 'Drop the ball and watch it bounce to victory',
      players: 892,
      category: 'Arcade'
    },
    {
      id: '4',
      name: 'MINES',
      description: 'Navigate the minefield to find hidden treasures',
      players: 634,
      category: 'Strategy'
    },
    {
      id: '5',
      name: 'KENO',
      description: 'Pick your lucky numbers and win big',
      players: 1047,
      category: 'Lottery'
    },
    {
      id: '6',
      name: 'WHEEL',
      description: 'Spin the wheel of fortune',
      players: 445,
      category: 'Wheel',
      isNew: true
    },
    {
      id: '7',
      name: 'HILO',
      description: 'Guess if the next card is higher or lower',
      players: 321,
      category: 'Cards'
    },
    {
      id: '8',
      name: 'LIMBO',
      description: 'How low can you go? Beat the target number',
      players: 567,
      category: 'Classic'
    }
  ]

  return (
    <CasinoLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="h-8 w-8 text-[#00d4ff]" />
            <h1 className="text-3xl font-bold text-white">Nexus Originals</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Exclusive games designed and built by our team. Provably fair, lightning fast, and uniquely ours.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Players</div>
                <div className="text-lg font-bold text-white">8,521</div>
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Original Games</div>
                <div className="text-lg font-bold text-white">8</div>
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Bets</div>
                <div className="text-lg font-bold text-white">2.1M</div>
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Avg RTP</div>
                <div className="text-lg font-bold text-white">99%</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 p-8 mb-8"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Provably Fair Gaming
                </h2>
                <p className="text-white/80 text-lg mb-4">
                  Every game is cryptographically verifiable. You can verify the fairness of every bet.
                </p>
                <Button variant="default" className="bg-white text-black hover:bg-gray-100">
                  Learn More About Fairness
                </Button>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm mb-1">House Edge</div>
                <div className="text-4xl font-bold text-white">1%</div>
                <div className="text-white/80 text-sm">Industry Leading</div>
              </div>
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute right-4 top-4 opacity-20">
            <Crown className="h-24 w-24 text-white" />
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Card variant="glass" className="overflow-hidden border-[#2d3748] hover:border-[#00d4ff]/50 transition-all h-full">
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  {/* Game Visual */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                    <div className="text-6xl font-bold text-white/20">
                      {game.name.charAt(0)}
                    </div>
                  </div>

                  {/* Enhanced Game-specific visual elements */}
                  {game.name === 'DICE' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="grid grid-cols-3 gap-3">
                          {[...Array(9)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-6 h-6 rounded-full ${[0,2,4,6,8].includes(i) ? 'bg-[#00d4ff]' : 'bg-[#00d4ff]/40'} border-2 border-[#00d4ff]/60`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00d4ff]/15 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 text-lg text-cyan-400"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          🎲
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'MAKE A BUCK' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-5xl font-bold text-green-400 drop-shadow-2xl"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          💰
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 text-xl text-yellow-400"
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
                          className="text-5xl filter drop-shadow-2xl"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        >
                          🏔️
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/25 via-cyan-400/20 to-transparent" />
                        <motion.div
                          className="absolute top-4 left-4 text-lg text-cyan-400"
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
                          className="text-5xl filter drop-shadow-2xl"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          💎
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/25 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 text-xl text-purple-400"
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
                        <div className="flex space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-10 h-14 bg-gradient-to-b from-purple-400 to-pink-500 rounded-lg border-3 border-white/40 shadow-xl"
                              animate={{ rotate: [0, 3, -3, 0] }}
                              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                            >
                              <div className="w-full h-1 bg-white/50 rounded mt-1" />
                              <div className="w-full h-1 bg-white/50 rounded mt-0.5" />
                            </motion.div>
                          ))}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full border-3 border-white flex items-center justify-center">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-400/15 to-transparent" />
                      </div>
                    </div>
                  )}

                  {game.name === 'KENO' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="grid grid-cols-5 gap-2">
                          {[...Array(25)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-4 h-4 rounded-full border-2 border-yellow-400/60 ${
                                [7,12,17,22].includes(i) ? 'bg-yellow-400' : 'bg-yellow-400/30'
                              }`}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent" />

                      </div>
                    </div>
                  )}

                  {game.name === 'PACKS' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="flex space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-10 h-14 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-lg border-3 border-white/40 shadow-xl"
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            >
                              <div className="w-full h-1 bg-white/50 rounded mt-1" />
                              <div className="w-full h-1 bg-white/50 rounded mt-0.5" />
                            </motion.div>
                          ))}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-3 border-white flex items-center justify-center">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/15 to-transparent" />
                      </div>
                    </div>
                  )}

                  {game.name === 'CRASH' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-5xl filter drop-shadow-2xl"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          📈
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/25 via-orange-500/20 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 text-xl text-red-400"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          💥
                        </motion.div>
                        <motion.div
                          className="absolute bottom-4 left-4 text-lg text-orange-400 font-bold"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          x
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'PLINKO' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-5xl filter drop-shadow-2xl"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🟡
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/25 via-orange-400/20 to-transparent" />
                        <motion.div
                          className="absolute top-4 left-4 text-lg text-orange-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🎯
                        </motion.div>
                        <motion.div
                          className="absolute bottom-4 right-4 text-sm text-yellow-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          🏆
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'MINES' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-5xl filter drop-shadow-2xl"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          💣
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/25 via-gray-600/20 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 text-lg text-red-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          💎
                        </motion.div>
                        <motion.div
                          className="absolute bottom-4 left-4 text-sm text-gray-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ⚠️
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'WHEEL' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-5xl filter drop-shadow-2xl"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          🎡
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-purple-500/20 to-transparent" />
                        <motion.div
                          className="absolute top-4 left-4 text-lg text-blue-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🎰
                        </motion.div>
                        <motion.div
                          className="absolute bottom-4 right-4 text-sm text-purple-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          🏆
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'HILO' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-8 h-10 bg-red-600 rounded border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold"
                            animate={{ rotate: [0, 2, -2, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            A♠
                          </motion.div>
                          <motion.div
                            className="text-2xl opacity-60"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ?
                          </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/15 via-black/10 to-transparent" />
                        <motion.div
                          className="absolute bottom-4 left-4 text-sm text-red-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🔮
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {game.name === 'LIMBO' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="text-5xl filter drop-shadow-2xl"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🎯
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/25 via-teal-500/20 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 text-lg text-green-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          📈
                        </motion.div>
                        <motion.div
                          className="absolute bottom-4 left-4 text-sm text-teal-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          🎲
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Animated background particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
                        style={{
                          left: `${10 + i * 15}%`,
                          top: `${15 + i * 12}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 0.7, 0.3],
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
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    <span className="bg-[#00d4ff] text-black text-xs px-2 py-1 rounded-full font-bold">
                      EXCLUSIVE
                    </span>
                    {game.isPopular && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        POPULAR
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
                      PLAY NOW
                    </Button>
                  </div>

                  {/* Player Count */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Users className="h-3 w-3 mr-1 text-green-400" />
                    {formatNumber(game.players)}
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-lg">
                      {game.name}
                    </h3>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {game.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Provably Fair</span>
                    <span>1% House Edge</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8">
          <Crown className="h-12 w-12 text-[#00d4ff] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">More Originals Coming Soon</h3>
          <p className="text-gray-400 mb-4">
            We're constantly developing new and innovative games exclusively for our platform.
          </p>
          <Button variant="outline" size="lg">
            Suggest a Game
          </Button>
        </div>
      </div>
    </CasinoLayout>
  )
}
