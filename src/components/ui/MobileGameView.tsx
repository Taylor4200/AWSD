'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Volume2, VolumeX, Settings, Star, Crown, Zap, Gift } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Game } from '@/lib/gameData'

interface MobileGameViewProps {
  game: Game
  onBack: () => void
}

const MobileGameView: React.FC<MobileGameViewProps> = ({ game, onBack }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentBet, setCurrentBet] = useState(1.00)
  const [balance, setBalance] = useState(1000.00)
  const [lastWin, setLastWin] = useState(0)
  const [freeSpins, setFreeSpins] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  // Generate random slot symbols for the game grid
  const generateSlotGrid = () => {
    const symbols = ['🍓', '🍊', '🍇', '🍒', '🍎', '🍌', '🍉', '🍍', '🎰', '💎', '7️⃣', '🔔']
    const grid = []
    for (let row = 0; row < 5; row++) {
      const rowSymbols = []
      for (let col = 0; col < 6; col++) {
        rowSymbols.push(symbols[Math.floor(Math.random() * symbols.length)])
      }
      grid.push(rowSymbols)
    }
    return grid
  }

  // Generate different game layouts based on category
  const generateGameLayout = () => {
    if (game.category === 'slots') {
      return generateSlotGrid()
    } else if (game.category === 'blackjack' || game.category === 'baccarat' || game.category === 'poker') {
      // For table games like blackjack, show cards
      return [['🃏', '🃏', '🃏', '🃏', '🃏'], ['🃏', '🃏', '🃏', '🃏', '🃏']]
    } else if (game.category === 'roulette') {
      // For roulette, show wheel
      return [['🎰', '🎰', '🎰'], ['🎲', '🎲', '🎲']]
    } else {
      return generateSlotGrid()
    }
  }

  const [slotGrid, setSlotGrid] = useState(generateGameLayout())

  const spin = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setBalance(prev => prev - currentBet)
    
    // Simulate spin animation
    setTimeout(() => {
      const newGrid = generateGameLayout()
      setSlotGrid(newGrid)
      
      // Simulate win calculation
      const winAmount = Math.random() > 0.7 ? currentBet * (Math.random() * 10 + 1) : 0
      setLastWin(winAmount)
      setBalance(prev => prev + winAmount)
      
      setIsSpinning(false)
    }, 2000)
  }

  const autoPlay = () => {
    // Auto play functionality
  }

  const quickSpin = () => {
    // Quick spin functionality
  }

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
              ←
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">{game.name}</h1>
              <p className="text-gray-400 text-xs">{game.provider}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-gray-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-300 hover:text-white"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

              {/* Game Area */}
        <div className="pt-16 pb-20 px-4">
          {/* Game Grid */}
          <div className="bg-[#2d3748] rounded-lg p-4 mb-4">
            {game.category === 'slots' ? (
              <div className="grid grid-cols-6 gap-1 mb-4">
                {slotGrid.map((row, rowIndex) => (
                  row.map((symbol, colIndex) => (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      className="bg-[#1a2c38] rounded-lg p-2 flex items-center justify-center text-2xl"
                      animate={isSpinning ? {
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{ duration: 0.3, repeat: isSpinning ? Infinity : 0 }}
                    >
                      {symbol}
                    </motion.div>
                  ))
                ))}
              </div>
            ) : game.category === 'blackjack' || game.category === 'baccarat' || game.category === 'poker' ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🃏</div>
                <div className="text-white text-lg font-semibold mb-2">{game.name}</div>
                <div className="text-gray-400 text-sm">Table Game</div>
              </div>
            ) : game.category === 'roulette' ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎰</div>
                <div className="text-white text-lg font-semibold mb-2">{game.name}</div>
                <div className="text-gray-400 text-sm">Roulette</div>
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-1 mb-4">
                {slotGrid.map((row, rowIndex) => (
                  row.map((symbol, colIndex) => (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      className="bg-[#1a2c38] rounded-lg p-2 flex items-center justify-center text-2xl"
                      animate={isSpinning ? {
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{ duration: 0.3, repeat: isSpinning ? Infinity : 0 }}
                    >
                      {symbol}
                    </motion.div>
                  ))
                ))}
              </div>
            )}
          
          {/* Win Line Indicator */}
          {lastWin > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-4"
            >
              <div className="text-green-400 text-lg font-bold">
                WIN! ${lastWin.toFixed(2)}
              </div>
            </motion.div>
          )}
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-[#1a2c38] rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs mb-1">Balance</div>
            <div className="text-white font-bold">${balance.toFixed(2)}</div>
          </div>
          <div className="bg-[#1a2c38] rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs mb-1">Bet</div>
            <div className="text-white font-bold">${currentBet.toFixed(2)}</div>
          </div>
          <div className="bg-[#1a2c38] rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs mb-1">Free Spins</div>
            <div className="text-yellow-400 font-bold">{freeSpins}</div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="space-y-3">
          {/* Bet Controls */}
          <div className="flex items-center justify-between bg-[#1a2c38] rounded-lg p-3">
            <span className="text-gray-300 text-sm">Bet Amount:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentBet(Math.max(0.10, currentBet - 0.10))}
                className="text-gray-300 hover:text-white"
              >
                -
              </Button>
              <span className="text-white font-bold min-w-[60px] text-center">
                ${currentBet.toFixed(2)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentBet(Math.min(100, currentBet + 0.10))}
                className="text-gray-300 hover:text-white"
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={autoPlay}
              className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black"
            >
              Auto Play
            </Button>
            <Button
              variant="default"
              onClick={spin}
              disabled={isSpinning || balance < currentBet}
              className="bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90 font-bold text-lg py-3"
            >
              {isSpinning ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCcw className="h-5 w-5" />
                </motion.div>
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={quickSpin}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
            >
              Quick Spin
            </Button>
          </div>
        </div>

        {/* Game Features */}
        <div className="mt-6 space-y-3">
          <div className="bg-[#1a2c38] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Game Features</span>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <Crown className="h-4 w-4 text-yellow-400" />
                <Zap className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
            <div className="text-gray-400 text-xs">
              • Free Spins Bonus Rounds<br/>
              • Wild Symbols & Multipliers<br/>
              • Progressive Jackpots<br/>
              • High Volatility Action
            </div>
          </div>

          <div className="bg-[#1a2c38] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Game Stats</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">RTP:</span>
                <span className="text-green-400">{game.rtp || '96.5'}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Volatility:</span>
                <span className="text-yellow-400">{game.volatility || 'High'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Min Bet:</span>
                <span className="text-white">${game.minBet || '0.10'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max Bet:</span>
                <span className="text-white">${game.maxBet || '100.00'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a2c38] rounded-lg p-4 w-80 max-w-[90vw]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Game Settings</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
                className="text-gray-300 hover:text-white"
              >
                ×
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Sound</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className={isMuted ? 'text-red-400' : 'text-green-400'}
                >
                  {isMuted ? 'Off' : 'On'}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto Play</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
                >
                  Off
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Quick Spin</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
                >
                  Off
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default MobileGameView
