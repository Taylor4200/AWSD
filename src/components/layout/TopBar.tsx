'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search,
  User,
  Wallet,
  ChevronDown,
  Menu,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  History
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import NotificationsDropdown from '@/components/ui/NotificationsDropdown'
import UserDropdown from '@/components/ui/UserDropdown'
import TopBarCurrencySelector from '@/components/ui/TopBarCurrencySelector'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'

interface TopBarProps {
  onToggleSidebar: () => void
  onToggleChat: () => void
  sidebarCollapsed: boolean
  chatOpen: boolean
  mobileSidebarOpen?: boolean
  mobileChatOpen?: boolean
}

const TopBar: React.FC<TopBarProps> = ({ 
  onToggleSidebar, 
  onToggleChat, 
  sidebarCollapsed,
  chatOpen,
  mobileSidebarOpen = false,
  mobileChatOpen = false
}) => {
  const { user, isAuthenticated, selectedCurrency, setSelectedCurrency } = useUserStore()
  const { setAuthModal, setWalletModal, setLiveStatsModal, setMyBetsModal } = useUIStore()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div 
      className="fixed top-0 bg-[#0f1419] border-b border-[#2d3748] z-20 transition-all duration-300"
      style={{ 
        left: isMobile ? 0 : (sidebarCollapsed ? 64 : 240),
        right: isMobile ? 0 : (chatOpen ? 320 : 0),
        width: isMobile ? '100vw' : `calc(100vw - ${sidebarCollapsed ? 64 : 240}px - ${chatOpen ? 320 : 0}px)`
      }}
    >
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section - Sidebar Controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden"
          >
            {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Desktop Sidebar Toggle Button - Only show when sidebar is collapsed */}
          {sidebarCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="hidden md:block text-gray-400 hover:text-white hover:bg-white/10"
              title="Expand Sidebar"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}

          {/* Search - Hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              className="bg-[#1a2c38] border border-[#2d3748] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4ff] w-64"
            />
          </div>
        </div>

        {/* Center Section - Currency Selector and Wallet */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 md:space-x-3">
          {isAuthenticated && user ? (
            <>
              {/* Currency Selector */}
              <TopBarCurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
                className="flex"
              />

              {/* Wallet Button */}
              <Button
                variant="default"
                size="sm"
                onClick={() => setWalletModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 text-xs md:text-sm px-2 md:px-4"
              >
                <span className="hidden sm:block">Wallet</span>
                <span className="sm:hidden">$$</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAuthModal(true)}
                className="text-gray-300 hidden sm:block"
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs md:text-sm px-2 md:px-4"
              >
                <span className="hidden sm:block">Sign Up</span>
                <span className="sm:hidden">Join</span>
              </Button>
            </div>
          )}
        </div>

        {/* Right Section - Other Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {isAuthenticated && user ? (
            <>
              {/* Notifications Dropdown - Hidden on mobile */}
              <div className="hidden md:block">
                <NotificationsDropdown 
                  isOpen={showNotifications}
                  onToggle={() => setShowNotifications(!showNotifications)}
                />
              </div>

              {/* User Menu - Hidden on mobile */}
              <div className="hidden md:block">
                <UserDropdown 
                  isOpen={showUserMenu}
                  onToggle={() => setShowUserMenu(!showUserMenu)}
                />
              </div>
            </>
          ) : null}

          {/* Chat Toggle */}
          <Button
            variant={chatOpen || mobileChatOpen ? "default" : "ghost"}
            size="icon"
            onClick={onToggleChat}
            className={`transition-all duration-200 ${
              chatOpen || mobileChatOpen
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "hover:bg-white/10"
            }`}
          >
            {mobileChatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          </Button>

          {/* Live Stats Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLiveStatsModal(true)}
            className="text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200"
            title="Live Stats"
          >
            <BarChart3 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
