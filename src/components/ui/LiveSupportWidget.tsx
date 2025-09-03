'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Headphones, X, MessageCircle, HelpCircle, Megaphone, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useUserStore } from '@/store/userStore'

interface LiveSupportWidgetProps {
  chatOpen?: boolean
}

const LiveSupportWidget: React.FC<LiveSupportWidgetProps> = ({ chatOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const { user } = useUserStore()

  const supportData = {
    recentMessage: {
      agent: 'Nikola',
      message: 'Rate your conversation',
      time: '2d ago'
    },
    update: {
      title: 'New VIP Telegram Channel',
      message: 'Hi there, 👋',
      type: 'Update'
    }
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'news', label: 'News', icon: Megaphone }
  ]

  return (
    <>
      {/* Floating Support Button */}
      <motion.div
        className="fixed bottom-6 z-50 transition-all duration-300"
        style={{
          right: chatOpen ? '340px' : '24px' // 320px chat width + 20px margin
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#1a2c38] border-2 border-[#00d4ff] hover:bg-[#00d4ff]/10 hover:shadow-[#00d4ff]/30 transition-all duration-200 group"
        >
          <Headphones className="h-6 w-6 text-[#00d4ff] group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>

      {/* Support Widget Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl w-80 max-h-[600px] overflow-hidden"
          >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                                         <img 
                       src="/Logo11.png" 
                       alt="EDGE Casino" 
                       className="w-6 h-6 object-contain"
                     />
                    <span className="text-white font-bold text-lg">EDGE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-semibold">
                    Hey {user?.username || 'there'} 👋
                  </h3>
                  <p className="text-sm opacity-90">How can we help?</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Recent Message */}
                <div className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">N</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Rate your conversation</p>
                        <p className="text-xs text-gray-500">Nikola • 2d ago</p>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Update */}
                <div className="bg-blue-50 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Update</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">New VIP Telegram Channel</p>
                        <p className="text-xs text-gray-500">Hi there, 👋</p>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex flex-col items-center py-3 px-2 text-xs transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mb-1" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveSupportWidget
