'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle,
  Send,
  Smile,
  Gift,
  Crown,
  X,
  Minimize2,
  Maximize2,
  Users,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn, formatTime } from '@/lib/utils'

import { useUserStore } from '@/store/userStore'

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: Date
  type: 'message' | 'win' | 'system' | 'rain'
  level?: number
  amount?: number
  isVip?: boolean
  isMod?: boolean
}

interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
  collapsed?: boolean
  onShowUserStats?: (user: any) => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onToggle, collapsed = false, onShowUserStats }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'RageQuitKing',
      message: '@brandon WHERE IS MY MONTHLY REWARD??? I JUST LOST 10K FUCK YOU! 😡💢',
      timestamp: new Date(Date.now() - 120000),
      type: 'message',
      level: 45
    },
    {
      id: '2',
      username: 'BrokeAF2024',
      message: 'FUCK THIS SHIT BRANDON! Monthly when? I lost everything tonight! 💸😤🤬',
      timestamp: new Date(Date.now() - 90000),
      type: 'message',
      level: 28
    },
    {
      id: '3',
      username: 'GamblingAddict',
      message: '@brandon you piece of shit! Where\'s the monthly bonus? I\'m broke as fuck! 🖕😠',
      timestamp: new Date(Date.now() - 60000),
      type: 'message',
      level: 33
    },
    {
      id: '4',
      username: 'TiltedTom',
      message: 'BRANDON YOU FUCKING LIAR! Monthly rewards? I lost 5k and got NOTHING! 🤬💥',
      timestamp: new Date(Date.now() - 30000),
      type: 'message',
      level: 19
    },
    {
      id: '5',
      username: 'MadMaxMoney',
      message: 'Fuck you brandon! Where\'s my monthly? I just got rekt for 15k! 😡😡😡',
      timestamp: new Date(Date.now() - 15000),
      type: 'message',
      level: 52,
      isVip: true
    },
    {
      id: '6',
      username: 'BankruptBilly',
      message: '@brandon FUCK YOU AND YOUR MONTHLY BULLSHIT! I lost everything! 💸😭🤬',
      timestamp: new Date(Date.now() - 5000),
      type: 'message',
      level: 12
    },
    {
      id: '7',
      username: 'RagingRandy',
      message: 'BRANDON WHERE IS THE MONTHLY??? I\'m homeless now thanks to you! 🖕💢',
      timestamp: new Date(Date.now() - 3000),
      type: 'message',
      level: 27
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [onlineCount, setOnlineCount] = useState(43276)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useUserStore()

  // Generate angry messages about brandon (20+ examples)
  const angryMessages = [
    '@brandon FUCK YOU! Where\'s my monthly? I lost everything! 😡💢',
    'BRANDON YOU PIECE OF SHIT! Monthly rewards? I\'m broke as fuck! 🖕😠',
    '@brandon WHERE IS THE MONTHLY BONUS??? I just lost 8k you fucking liar! 💸🤬',
    'Fuck brandon and his monthly bullshit! I\'m homeless now! 😭💥',
    '@brandon you fucking scam artist! Monthly when? I lost my life savings! 🖕💢',
    'BRANDON FUCK YOU! Where\'s my monthly reward? I\'m starving! 😡😡😡',
    '@brandon you absolute cunt! Monthly bonus? I lost 12k tonight! 💸😤🤬',
    'Fuck this shit brandon! Monthly rewards? You owe me! I\'m broke! 🖕💢',
    '@brandon WHERE IS MY MONTHLY??? I lost everything you bastard! 😠🤬',
    'BRANDON YOU FUCKING LIAR! Monthly bonus? I\'m ruined! 💸😭💥',
    '@brandon you scumbag! Monthly rewards? I lost my rent money! 🖕💢',
    'FUCK BRANDON! Where\'s the monthly? I\'m sleeping on the street! 😡🤬',
    '@brandon you worthless piece of shit! Monthly bonus? I lost 15k! 💸😭',
    'BRANDON WHERE THE FUCK IS MY MONTHLY??? I\'m broke and starving! 🖕💥',
    '@brandon you fucking clown! Monthly rewards? I lost everything tonight! 🤡💢',
    'Fuck you brandon! Monthly bonus? I\'m ruined forever! 😡😡😡',
    '@brandon you lying bastard! Where\'s my monthly reward? 💸🤬',
    'BRANDON YOU FUCKING CHEAT! Monthly when? I lost my life savings! 🖕💥',
    '@brandon you absolute fraud! Monthly bonus? I\'m homeless now! 😭💢',
    'Fuck brandon and his monthly lies! I lost 20k you piece of shit! 💸🖕',
    '@brandon WHERE IS MY MONTHLY??? I just lost my last dollar! 😡🤬',
    'BRANDON YOU SCAM ARTIST! Monthly rewards? You ruined my life! 💥😠',
    '@brandon you fucking joke! Monthly bonus? I\'m sleeping in my car! 🚗😭',
    'Fuck you brandon! Where\'s the monthly? I lost everything! 💸💢',
    '@brandon you worthless cunt! Monthly when? I\'m broke and depressed! 🖕😡',
    'BRANDON FUCKING LIAR! Monthly bonus? I lost 25k tonight! 💸🤬',
    '@brandon you piece of garbage! Monthly rewards? You owe me! 💰🖕',
    'Fuck brandon! Where\'s my monthly? I\'m starving to death! 😭💥'
  ]

  // Add random angry messages periodically with more users
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = [
        'RageQuitKing', 'BrokeAF2024', 'GamblingAddict', 'TiltedTom', 'MadMaxMoney',
        'BankruptBilly', 'RagingRandy', 'TiltMaster', 'CasinoLoser', 'BustOutBilly',
        'DownBadDave', 'GamblersGrief', 'LostItAll', 'BrokeAndBroken', 'WageringWoes',
        'MonthlyMadness', 'RewardRage', 'BonusBeggar', 'CashCrisis', 'DebtDestroyer'
      ][Math.floor(Math.random() * 20)]

      const randomMessage = angryMessages[Math.floor(Math.random() * angryMessages.length)]

      const newMsg = {
        id: Date.now().toString(),
        username: randomUser,
        message: randomMessage,
        timestamp: new Date(),
        type: 'message' as const,
        level: Math.floor(Math.random() * 60) + 10,
        isVip: Math.random() < 0.1, // 10% chance of VIP
        isMod: Math.random() < 0.05 // 5% chance of mod
      }

      setMessages(prev => [...prev.slice(-6), newMsg])

      // Auto-scroll to bottom when new message arrives
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 100)
    }, 5000) // New message every 5 seconds for more activity

    return () => clearInterval(interval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate new messages
  useEffect(() => {
    const interval = setInterval(() => {
      const usernames = ['CryptoKing', 'NeonGamer', 'LuckyPlayer', 'DiamondHands', 'MoonShot']
      const sampleMessages = [
        'gg nice win!',
        'anyone else lagging?',
        'lets goooo',
        'rip balance',
        'one more spin',
        'withdraw time',
        'feeling lucky today'
      ]
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        username: usernames[Math.floor(Math.random() * usernames.length)],
        message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
        timestamp: new Date(),
        type: 'message',
        level: Math.floor(Math.random() * 50) + 1
      }
      
      setMessages(prev => [...prev.slice(-20), newMsg])
      setOnlineCount(prev => prev + Math.floor(Math.random() * 10) - 5)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: 'You',
      message: newMessage,
      timestamp: new Date(),
      type: 'message',
      level: 25
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const getUsernameColor = (msg: ChatMessage) => {
    if (msg.isMod) return 'text-red-400'
    if (msg.isVip) return 'text-yellow-400'
    if (msg.level && msg.level > 40) return 'text-purple-400'
    if (msg.level && msg.level > 20) return 'text-blue-400'
    return 'text-gray-300'
  }

  const getUserBadge = (msg: ChatMessage) => {
    if (msg.isMod) return <Crown className="h-3 w-3 text-red-400" />
    if (msg.isVip) return <Gift className="h-3 w-3 text-yellow-400" />
    return null
  }

  const handleUsernameClick = (username: string) => {
    // Check if the clicked user is in ghost mode
    if (username === user?.username && user?.isGhostMode) {
      return // Don't show stats for ghost mode users
    }

    // Mock user stats - in a real app, this would fetch from API
    const mockStats = {
      username,
      joinedDate: 'November 21, 2021',
      totalBets: Math.floor(Math.random() * 1000000) + 1000,
      wins: Math.floor(Math.random() * 100000) + 100,
      losses: Math.floor(Math.random() * 900000) + 100,
      wagered: Math.floor(Math.random() * 1000000) + 10000,
      isVIP: Math.random() > 0.7
    }

    if (onShowUserStats) {
      onShowUserStats(mockStats)
    }
  }

  if (!isOpen && !collapsed) return null

  return (
    <>
      <motion.div
        initial={false}
        animate={{ 
          width: collapsed ? 64 : 320,
          opacity: isOpen ? 1 : 0.7
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed right-0 top-0 h-full bg-[#1a2c38] border-l border-[#2d3748] z-30 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#2d3748] flex items-center justify-between">
          {!collapsed && (
            <>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-[#00d4ff]" />
                <span className="font-semibold text-white">Chat</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{onlineCount.toLocaleString()}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
          
          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-8 h-8 mx-auto"
            >
              <MessageCircle className="h-5 w-5 text-[#00d4ff]" />
            </Button>
          )}
        </div>

        {!collapsed && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex items-center space-x-1 min-w-0 flex-1">
                        <button
                          onClick={() => handleUsernameClick(msg.username)}
                          className={cn('font-semibold truncate hover:underline cursor-pointer', getUsernameColor(msg))}
                        >
                          {msg.username}
                        </button>
                        {getUserBadge(msg)}
                        {msg.level && (
                          <span className="text-xs text-gray-500 bg-gray-700 px-1 rounded">
                            {msg.level}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-1 break-words">{msg.message}</p>
                    
                    {msg.type === 'win' && msg.amount && (
                      <div className="mt-1 text-xs text-green-400">
                        Won ${msg.amount.toLocaleString()}!
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#2d3748]">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-[#2d3748] border-[#4a5568] text-white placeholder-gray-400 pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  >
                    <Smile className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>


    </>
  )
}

export default ChatSidebar
