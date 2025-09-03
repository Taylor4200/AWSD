'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Smile, 
  Paperclip, 
  Phone,
  Mail,
  Clock,
  User,
  Bot,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { useUserStore } from '@/store/userStore'
import { formatTime } from '@/lib/utils'

interface LiveSupportModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ChatMessage {
  id: string
  sender: 'user' | 'agent' | 'bot'
  message: string
  timestamp: Date
  type: 'text' | 'system'
}

interface SupportAgent {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'busy' | 'offline'
  responseTime: string
}

const LiveSupportModal: React.FC<LiveSupportModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUserStore()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      message: 'Hello! I\'m here to help you with any questions. A human agent will be with you shortly.',
      timestamp: new Date(Date.now() - 60000),
      type: 'text'
    },
    {
      id: '2',
      sender: 'agent',
      message: 'Hi there! I\'m Sarah from the Nexus support team. How can I assist you today?',
      timestamp: new Date(Date.now() - 30000),
      type: 'text'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connected')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const supportAgent: SupportAgent = {
    id: '1',
    name: 'Sarah Johnson',
    status: 'online',
    responseTime: '< 1 min'
  }

  const quickReplies = [
    'I need help with deposits',
    'How do I verify my account?',
    'Withdrawal issues',
    'Game not loading',
    'VIP program questions'
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        message: 'Thank you for your message! I\'m looking into that for you right now. Give me just a moment to check your account details.',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400'
      case 'busy': return 'bg-yellow-400'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getMessageAlignment = (sender: string) => {
    return sender === 'user' ? 'justify-end' : 'justify-start'
  }

  const getMessageStyle = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'bg-[#00d4ff] text-black ml-12'
      case 'agent':
        return 'bg-[#2d3748] text-white mr-12'
      case 'bot':
        return 'bg-purple-600/20 text-purple-200 mr-12 border border-purple-500/30'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Live Support"
      description="Get instant help from our support team"
      size="lg"
      variant="glass"
    >
      <div className="h-[600px] flex flex-col">
        {/* Support Agent Info */}
        <div className="flex items-center justify-between p-4 bg-[#1a2c38] rounded-lg mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(supportAgent.status)} rounded-full border-2 border-[#1a2c38]`} />
            </div>
            <div>
              <h4 className="font-medium text-white">{supportAgent.name}</h4>
              <p className="text-sm text-gray-400">Support Agent • Responds in {supportAgent.responseTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 text-sm ${
              connectionStatus === 'connected' ? 'text-green-400' : 
              connectionStatus === 'connecting' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-400' : 
                connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
              } animate-pulse`} />
              <span className="capitalize">{connectionStatus}</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${getMessageAlignment(message.sender)}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${getMessageStyle(message.sender)}`}>
                  {message.sender !== 'user' && (
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === 'bot' ? 'Support Bot' : supportAgent.name}
                      </span>
                    </div>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-[#2d3748] text-white px-4 py-2 rounded-lg mr-12">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-xs ml-2">Sarah is typing...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Quick replies:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="text-xs border-[#2d3748] hover:border-[#00d4ff]"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="bg-[#1a2c38] border-[#2d3748] pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Paperclip className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Smile className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-4 p-3 bg-[#1a2c38] rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Need immediate assistance?</p>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-blue-400">
              <Mail className="h-4 w-4" />
              <span>support@nexuscasino.com</span>
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <Phone className="h-4 w-4" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LiveSupportModal
