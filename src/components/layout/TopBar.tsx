'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search,
  User,
  Wallet,
  ChevronDown,
  Menu,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import NotificationsDropdown from '@/components/ui/NotificationsDropdown'
import BalanceDropdown from '@/components/ui/BalanceDropdown'
import UserDropdown from '@/components/ui/UserDropdown'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'

interface TopBarProps {
  onToggleSidebar: () => void
  onToggleChat: () => void
  sidebarCollapsed: boolean
  chatOpen: boolean
}

const TopBar: React.FC<TopBarProps> = ({ 
  onToggleSidebar, 
  onToggleChat, 
  sidebarCollapsed,
  chatOpen 
}) => {
  const { user, isAuthenticated } = useUserStore()
  const { setAuthModal, setWalletModal } = useUIStore()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div 
      className="fixed top-0 bg-[#0f1419] border-b border-[#2d3748] z-20 transition-all duration-300"
      style={{ 
        left: sidebarCollapsed ? 64 : 240,
        right: chatOpen ? 320 : 0
      }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - Only show on mobile when sidebar is collapsed */}
          <Link href="/" className="lg:hidden">
            <div className="flex items-center space-x-2">
                             <img 
                 src="/Logo11.png" 
                 alt="EDGE Casino" 
                 className="w-8 h-8 object-contain"
               />
              <span className="text-lg font-bold text-white">EDGE</span>
            </div>
          </Link>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              className="bg-[#1a2c38] border border-[#2d3748] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4ff] w-64"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && user ? (
            <>
              {/* Balance Dropdown */}
              <BalanceDropdown 
                isOpen={showBalance}
                onToggle={() => setShowBalance(!showBalance)}
              />

              {/* Wallet Button */}
              <Button
                variant="default"
                size="sm"
                onClick={() => setWalletModal(true)}
                className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 hover:shadow-[#00d4ff]/30 text-black font-semibold transition-all duration-200"
              >
                Wallet
              </Button>

              {/* Notifications Dropdown */}
              <NotificationsDropdown 
                isOpen={showNotifications}
                onToggle={() => setShowNotifications(!showNotifications)}
              />

              {/* User Menu */}
              <UserDropdown 
                isOpen={showUserMenu}
                onToggle={() => setShowUserMenu(!showUserMenu)}
              />
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAuthModal(true)}
                className="text-gray-300"
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setAuthModal(true)}
                className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black font-semibold"
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Chat Toggle */}
          <Button
            variant={chatOpen ? "default" : "ghost"}
            size="icon"
            onClick={onToggleChat}
            className={`transition-all duration-200 ${
              chatOpen 
                ? "bg-[#00d4ff] text-black hover:shadow-[#00d4ff]/30" 
                : "hover:bg-[#00d4ff]/10"
            }`}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
