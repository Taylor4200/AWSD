'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Game } from '@/lib/gameData'

interface MobileGameViewProps {
  game: Game
  onBack: () => void
}

const MobileGameView: React.FC<MobileGameViewProps> = ({ game, onBack }) => {
  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      {/* Mobile Game Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-[#1a2c38] border-b border-[#2d3748] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">{game.name}</h1>
              <p className="text-gray-400 text-xs">{game.provider}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game HTML Content */}
      <div className="pt-16 pb-20 px-4">
        {/* Game Display Area */}
        <div className="bg-[#2d3748] rounded-lg p-4 mb-4 min-h-[400px] flex items-center justify-center">
          {game.category === 'slots' ? (
            <div className="text-center">
              <div className="text-8xl mb-4">🎰</div>
              <div className="text-white text-2xl font-bold mb-2">{game.name}</div>
              <div className="text-gray-400 text-sm mb-4">Slot Game</div>
              <div className="text-[#00d4ff] text-lg">HTML Game Content</div>
            </div>
          ) : game.category === 'blackjack' || game.category === 'baccarat' || game.category === 'poker' ? (
            <div className="text-center">
              <div className="text-8xl mb-4">🃏</div>
              <div className="text-white text-2xl font-bold mb-2">{game.name}</div>
              <div className="text-gray-400 text-sm mb-4">Table Game</div>
              <div className="text-[#00d4ff] text-lg">HTML Game Content</div>
            </div>
          ) : game.category === 'roulette' ? (
            <div className="text-center">
              <div className="text-8xl mb-4">🎰</div>
              <div className="text-white text-2xl font-bold mb-2">{game.name}</div>
              <div className="text-gray-400 text-sm mb-4">Roulette</div>
              <div className="text-[#00d4ff] text-lg">HTML Game Content</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl mb-4">🎮</div>
              <div className="text-white text-2xl font-bold mb-2">{game.name}</div>
              <div className="text-gray-400 text-sm mb-4">Casino Game</div>
              <div className="text-[#00d4ff] text-lg">HTML Game Content</div>
            </div>
          )}
        </div>

        {/* Game Info */}
        <div className="bg-[#1a2c38] rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Provider:</span>
              <span className="text-white">{game.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Category:</span>
              <span className="text-white capitalize">{game.category}</span>
            </div>
            {game.rtp && (
              <div className="flex justify-between">
                <span className="text-gray-400">RTP:</span>
                <span className="text-green-400">{game.rtp}%</span>
              </div>
            )}
            {game.volatility && (
              <div className="flex justify-between">
                <span className="text-gray-400">Volatility:</span>
                <span className="text-yellow-400">{game.volatility}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileGameView
