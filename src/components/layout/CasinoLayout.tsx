'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import ChatSidebar from './ChatSidebar'
import TopBar from './TopBar'
import LegalFooter from './LegalFooter'
import WalletModal from '@/components/modals/WalletModal'
import LiveSupportWidget from '@/components/ui/LiveSupportWidget'
import UserStatsModal from '@/components/modals/UserStatsModal'
import { useUIStore } from '@/store/uiStore'

interface CasinoLayoutProps {
  children: React.ReactNode
}

const CasinoLayout: React.FC<CasinoLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [chatOpen, setChatOpen] = useState(false) // Default closed on mobile
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [userStatsModal, setUserStatsModal] = useState<{ isOpen: boolean; user: any }>({
    isOpen: false,
    user: null
  })
  const { showWalletModal, setWalletModal } = useUIStore()

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleShowUserStats = (user: any) => {
    setUserStatsModal({ isOpen: true, user })
  }

  const handleCloseUserStats = () => {
    setUserStatsModal({ isOpen: false, user: null })
  }

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen)
      setMobileChatOpen(false) // Close chat when opening sidebar
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const handleToggleChat = () => {
    if (isMobile) {
      setMobileChatOpen(!mobileChatOpen)
      setMobileSidebarOpen(false) // Close sidebar when opening chat
    } else {
      setChatOpen(!chatOpen)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white overflow-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {(mobileSidebarOpen || mobileChatOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => {
              setMobileSidebarOpen(false)
              setMobileChatOpen(false)
            }}
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar 
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />
      </div>

      {/* Left Sidebar - Mobile */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed left-0 top-0 h-full w-70 bg-dark-200 border-r border-white/10 z-50 md:hidden"
          >
            <Sidebar 
              collapsed={false}
              onCollapse={() => setMobileSidebarOpen(false)}
              isMobile={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Chat Sidebar - Desktop */}
      <div className="hidden md:block">
        <ChatSidebar
          isOpen={chatOpen}
          onToggle={() => setChatOpen(!chatOpen)}
          collapsed={false}
          onShowUserStats={handleShowUserStats}
        />
      </div>

      {/* Right Chat Sidebar - Mobile */}
      <AnimatePresence>
        {mobileChatOpen && (
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            className="fixed right-0 top-0 h-full w-80 bg-dark-200 border-l border-white/10 z-50 md:hidden"
          >
            <ChatSidebar
              isOpen={true}
              onToggle={() => setMobileChatOpen(false)}
              collapsed={false}
              onShowUserStats={handleShowUserStats}
              isMobile={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <TopBar 
        onToggleSidebar={handleToggleSidebar}
        onToggleChat={handleToggleChat}
        sidebarCollapsed={sidebarCollapsed}
        chatOpen={chatOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        mobileChatOpen={mobileChatOpen}
      />

      {/* Main Content */}
      <motion.main
        className="transition-all duration-300 pt-16 md:pt-16"
        style={{
          marginLeft: !isMobile ? (sidebarCollapsed ? 64 : 240) : 0,
          marginRight: !isMobile ? (chatOpen ? 320 : 0) : 0,
        }}
      >
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 px-4 md:px-6">
            {children}
          </div>
          <LegalFooter />
        </div>
      </motion.main>

      {/* Global Modals */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setWalletModal(false)}
      />

      {/* User Stats Modal */}
      {userStatsModal.user && (
        <UserStatsModal
          isOpen={userStatsModal.isOpen}
          onClose={handleCloseUserStats}
          userStats={userStatsModal.user}
        />
      )}

      {/* Live Support Widget */}
      <LiveSupportWidget chatOpen={chatOpen || mobileChatOpen} />
    </div>
  )
}

export default CasinoLayout
