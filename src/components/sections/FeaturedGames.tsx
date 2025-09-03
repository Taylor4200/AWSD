'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Play, TrendingUp, Star, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface FeaturedGame {
  id: string
  name: string
  type: string
  image: string
  jackpot: number
  rtp: number
  popularity: number
  recentWin?: number
  isHot?: boolean
  isNew?: boolean
}

const FeaturedGames: React.FC = () => {
  const games: FeaturedGame[] = [
    {
      id: '1',
      name: 'Neon Crash',
      type: 'Crash',
      image: '/images/games/neon-crash.jpg',
      jackpot: 45678.90,
      rtp: 97.5,
      popularity: 95,
      recentWin: 12847.50,
      isHot: true
    },
    {
      id: '2',
      name: 'Cyber Slots',
      type: 'Slots',
      image: '/images/games/cyber-slots.jpg',
      jackpot: 123456.78,
      rtp: 96.8,
      popularity: 88,
      isNew: true
    },
    {
      id: '3',
      name: 'Quantum Dice',
      type: 'Dice',
      image: '/images/games/quantum-dice.jpg',
      jackpot: 23456.12,
      rtp: 98.2,
      popularity: 76,
      recentWin: 8934.25
    },
    {
      id: '4',
      name: 'Holographic Roulette',
      type: 'Roulette',
      image: '/images/games/holo-roulette.jpg',
      jackpot: 67890.34,
      rtp: 97.1,
      popularity: 82,
      isHot: true
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-futuristic mb-4">
            <span className="neon-text-blue">FEATURED</span>{' '}
            <span className="text-white">GAMES</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience our most popular games with cutting-edge graphics and massive jackpots
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card variant="glass" hover className="h-full overflow-hidden">
                <div className="relative">
                  {/* Game Image */}
                  <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                    {/* Enhanced Game-specific visual elements */}
                    {game.name === 'Neon Crash' && (
                      <div className="absolute inset-0 flex items-center justify-center z-5">
                        <div className="relative">
                          <motion.div
                            className="text-4xl filter drop-shadow-lg"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            💥
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/15" />
                          <motion.div
                            className="absolute top-2 right-2 text-lg text-orange-400"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            ⚡
                          </motion.div>

                        </div>
                      </div>
                    )}

                    {game.name === 'Cyber Slots' && (
                      <div className="absolute inset-0 flex items-center justify-center z-5">
                        <div className="relative">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-8 h-12 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-lg border-2 border-white/30"
                              animate={{ rotate: [0, 2, -2, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <div className="w-full h-1 bg-white/40 rounded mt-1" />
                              <div className="w-full h-1 bg-white/40 rounded mt-0.5" />
                              <div className="w-full h-1 bg-white/40 rounded mt-0.5" />
                            </motion.div>
                            <motion.div
                              className="w-8 h-12 bg-gradient-to-b from-purple-400 to-pink-500 rounded-lg border-2 border-white/30"
                              animate={{ rotate: [0, -2, 2, 0] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                            >
                              <div className="w-full h-1 bg-white/40 rounded mt-1" />
                              <div className="w-full h-1 bg-white/40 rounded mt-0.5" />
                              <div className="w-full h-1 bg-white/40 rounded mt-0.5" />
                            </motion.div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 to-purple-400/10" />

                        </div>
                      </div>
                    )}

                    {game.name === 'Quantum Dice' && (
                      <div className="absolute inset-0 flex items-center justify-center z-5">
                        <div className="relative">
                          <div className="grid grid-cols-3 gap-1">
                            {[...Array(9)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`w-3 h-3 rounded-full ${[0,2,4,6,8].includes(i) ? 'bg-purple-400' : 'bg-purple-400/40'} border border-purple-400/50`}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                              />
                            ))}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-400/15 to-transparent" />
                          <motion.div
                            className="absolute top-2 right-2 text-lg text-cyan-400"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            🎲
                          </motion.div>

                        </div>
                      </div>
                    )}

                    {game.name === 'Holographic Roulette' && (
                      <div className="absolute inset-0 flex items-center justify-center z-5">
                        <div className="relative">
                          <motion.div
                            className="text-4xl filter drop-shadow-lg"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            🎰
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/15" />
                          <motion.div
                            className="absolute top-2 left-2 text-lg text-emerald-400"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            🌀
                          </motion.div>

                        </div>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-20 flex gap-2">
                      {game.isHot && (
                        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Zap className="h-3 w-3 mr-1" />
                          HOT
                        </div>
                      )}
                      {game.isNew && (
                        <div className="bg-neon-green text-black text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          NEW
                        </div>
                      )}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="neon" size="lg" icon={<Play className="h-5 w-5" />}>
                        PLAY NOW
                      </Button>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 via-neon-purple/20 to-neon-pink/30 animate-pulse" />

                    {/* Animated particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/30 rounded-full"
                          style={{
                            left: `${15 + i * 20}%`,
                            top: `${20 + i * 20}%`,
                          }}
                          animate={{
                            y: [0, -15, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            delay: i * 0.7,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white mb-1">{game.name}</h3>
                      <p className="text-sm text-gray-400">{game.type}</p>
                    </div>

                    {/* Game Stats */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Jackpot</span>
                        <span className="text-sm font-bold text-neon-yellow">
                          {formatCurrency(game.jackpot)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">RTP</span>
                        <span className="text-sm font-bold text-neon-green">
                          {game.rtp}%
                        </span>
                      </div>

                      {game.recentWin && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Recent Win</span>
                          <span className="text-sm font-bold text-neon-blue">
                            {formatCurrency(game.recentWin)}
                          </span>
                        </div>
                      )}

                      {/* Popularity Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Popularity</span>
                          <span className="text-sm font-bold text-white">
                            {game.popularity}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${game.popularity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="px-8">
            View All Games
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedGames
