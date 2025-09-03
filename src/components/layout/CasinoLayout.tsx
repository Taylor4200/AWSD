'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  const [chatOpen, setChatOpen] = useState(true)
  const [userStatsModal, setUserStatsModal] = useState<{ isOpen: boolean; user: any }>({
    isOpen: false,
    user: null
  })
  const { showWalletModal, setWalletModal } = useUIStore()

  const handleShowUserStats = (user: any) => {
    setUserStatsModal({ isOpen: true, user })
  }

  const handleCloseUserStats = () => {
    setUserStatsModal({ isOpen: false, user: null })
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />

      {/* Right Chat Sidebar */}
      <ChatSidebar
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        collapsed={false}
        onShowUserStats={handleShowUserStats}
      />

      {/* Top Bar */}
      <TopBar 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleChat={() => setChatOpen(!chatOpen)}
        sidebarCollapsed={sidebarCollapsed}
        chatOpen={chatOpen}
      />

      {/* Main Content */}
      <motion.main
        className="transition-all duration-300 pt-16"
        style={{
          marginLeft: sidebarCollapsed ? 64 : 240,
          marginRight: chatOpen ? 320 : 0,
        }}
      >
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
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
      <LiveSupportWidget chatOpen={chatOpen} />
    </div>
  )
}

export default CasinoLayout
