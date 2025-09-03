'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Clock, 
  Gift,
  Info,
  CheckCircle,
  Target
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useUserStore } from '@/store/userStore'
import { formatCurrency, formatTime } from '@/lib/utils'

interface RakebackModalProps {
  isOpen: boolean
  onClose: () => void
}

interface RakebackPeriod {
  id: string
  period: string
  wagered: number
  rakeback: number
  rate: number
  claimed: boolean
  claimableAt: Date
}

const RakebackModal: React.FC<RakebackModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUserStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'info'>('overview')

  // Mock rakeback data
  const currentRakeback = {
    daily: 25.50,
    weekly: 156.75,
    monthly: 642.30,
    lifetime: 2847.65,
    rate: 8, // 8% for Silver VIP
    nextClaim: new Date(Date.now() + 3600000) // 1 hour from now
  }

  const rakebackHistory: RakebackPeriod[] = [
    {
      id: '1',
      period: 'Today',
      wagered: 318.75,
      rakeback: 25.50,
      rate: 8,
      claimed: false,
      claimableAt: new Date(Date.now() + 3600000)
    },
    {
      id: '2',
      period: 'Yesterday',
      wagered: 425.00,
      rakeback: 34.00,
      rate: 8,
      claimed: true,
      claimableAt: new Date(Date.now() - 86400000)
    },
    {
      id: '3',
      period: 'Dec 15, 2024',
      wagered: 567.25,
      rakeback: 45.38,
      rate: 8,
      claimed: true,
      claimableAt: new Date(Date.now() - 172800000)
    },
    {
      id: '4',
      period: 'Dec 14, 2024',
      wagered: 234.50,
      rakeback: 18.76,
      rate: 8,
      claimed: true,
      claimableAt: new Date(Date.now() - 259200000)
    }
  ]

  const handleClaimRakeback = (periodId: string) => {
    // Handle rakeback claim
    console.log('Claiming rakeback for period:', periodId)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rakeback Dashboard"
      description="Track and claim your rakeback rewards"
      size="lg"
      variant="glass"
    >
      <div className="space-y-6">
        {/* Current Stats */}
        <div className="text-center p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl border border-green-500/30">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Your Rakeback Rate</h3>
          <div className="text-4xl font-bold text-green-400 mb-2">{currentRakeback.rate}%</div>
          <p className="text-gray-400 text-sm">Silver VIP Tier • Earn on every bet</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-[#1a2c38] rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'history', label: 'History', icon: Calendar },
            { id: 'info', label: 'How it Works', icon: Info }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 ${
                activeTab === tab.id 
                  ? 'bg-[#00d4ff] text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Rakeback Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="glass" className="border-[#2d3748] p-4 text-center">
                <div className="text-xl font-bold text-green-400 mb-1">
                  {formatCurrency(currentRakeback.daily)}
                </div>
                <div className="text-sm text-gray-400">Today</div>
              </Card>
              
              <Card variant="glass" className="border-[#2d3748] p-4 text-center">
                <div className="text-xl font-bold text-blue-400 mb-1">
                  {formatCurrency(currentRakeback.weekly)}
                </div>
                <div className="text-sm text-gray-400">This Week</div>
              </Card>
              
              <Card variant="glass" className="border-[#2d3748] p-4 text-center">
                <div className="text-xl font-bold text-purple-400 mb-1">
                  {formatCurrency(currentRakeback.monthly)}
                </div>
                <div className="text-sm text-gray-400">This Month</div>
              </Card>
              
              <Card variant="glass" className="border-[#2d3748] p-4 text-center">
                <div className="text-xl font-bold text-yellow-400 mb-1">
                  {formatCurrency(currentRakeback.lifetime)}
                </div>
                <div className="text-sm text-gray-400">Lifetime</div>
              </Card>
            </div>

            {/* Claimable Rakeback */}
            <Card variant="glass" className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Available to Claim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(currentRakeback.daily)}
                    </div>
                    <p className="text-gray-400 text-sm">
                      Available in {formatTime(currentRakeback.nextClaim)}
                    </p>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* VIP Upgrade Prompt */}
            <Card variant="glass" className="border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Target className="h-8 w-8 text-yellow-400" />
                    <div>
                      <h4 className="font-bold text-white">Increase Your Rakeback</h4>
                      <p className="text-sm text-gray-400">
                        Upgrade to Gold VIP for 12% rakeback rate
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-yellow-500/50 text-yellow-400">
                    Upgrade VIP
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {rakebackHistory.map((period, index) => (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glass" className="border-[#2d3748]">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            period.claimed ? 'bg-green-400' : 'bg-yellow-400'
                          }`} />
                          <div>
                            <div className="font-medium text-white">{period.period}</div>
                            <div className="text-sm text-gray-400">
                              {formatCurrency(period.wagered)} wagered • {period.rate}% rate
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold text-green-400">
                              {formatCurrency(period.rakeback)}
                            </div>
                            <div className="text-xs text-gray-400">
                              {formatTime(period.claimableAt)}
                            </div>
                          </div>
                          
                          {period.claimed ? (
                            <div className="flex items-center text-green-400">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span className="text-sm">Claimed</span>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => handleClaimRakeback(period.id)}
                              disabled={period.claimableAt > new Date()}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Claim
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            <Card variant="glass" className="border-[#2d3748] p-6">
              <h4 className="text-lg font-bold text-white mb-4">How Rakeback Works</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Play Any Game</h5>
                    <p className="text-sm">Every bet you place contributes to your rakeback earnings, regardless of win or loss.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Earn Percentage Back</h5>
                    <p className="text-sm">Your VIP tier determines your rakeback rate. Higher tiers earn more back on every bet.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Claim Daily</h5>
                    <p className="text-sm">Rakeback is calculated daily and becomes available to claim after 24 hours.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="border-[#2d3748] p-6">
              <h4 className="text-lg font-bold text-white mb-4">VIP Rakeback Rates</h4>
              <div className="space-y-3">
                {[
                  { tier: 'Bronze', rate: '5%', color: 'text-orange-400' },
                  { tier: 'Silver', rate: '8%', color: 'text-gray-400' },
                  { tier: 'Gold', rate: '12%', color: 'text-yellow-400' },
                  { tier: 'Platinum', rate: '15%', color: 'text-blue-400' },
                  { tier: 'Diamond', rate: '20%', color: 'text-purple-400' }
                ].map((tier) => (
                  <div key={tier.tier} className="flex items-center justify-between p-2 bg-black/20 rounded-lg">
                    <span className={`font-medium ${tier.color}`}>{tier.tier} VIP</span>
                    <span className="font-bold text-white">{tier.rate} Rakeback</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default RakebackModal
