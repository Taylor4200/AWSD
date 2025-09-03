'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Star, 
  Gift, 
  TrendingUp, 
  Shield, 
  Zap, 
  Clock, 
  Users, 
  DollarSign,
  Award,
  Gem,
  Target,
  CheckCircle,
  Lock,
  ArrowRight
} from 'lucide-react'
import CasinoLayout from '@/components/layout/CasinoLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useUserStore } from '@/store/userStore'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { VIPTier, VIPProgress, VIPReward } from '@/types/vip'

export default function VIPPage() {
  const { user } = useUserStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'rewards'>('overview')

  const vipTiers: VIPTier[] = [
    {
      id: 'bronze',
      name: 'Bronze',
      level: 1,
      minWager: 0,
      color: '#CD7F32',
      icon: '🥉',
      rakeback: 5,
      bonusMultiplier: 1.0,
      withdrawalLimit: 10000,
      personalManager: false,
      prioritySupport: false,
      benefits: [
        {
          id: '1',
          type: 'rakeback',
          title: '5% Rakeback',
          description: 'Earn 5% back on all your wagers',
          icon: 'percent'
        },
        {
          id: '2',
          type: 'bonus',
          title: 'Weekly Bonus',
          description: 'Receive weekly reload bonuses',
          value: '$50',
          icon: 'gift'
        }
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      level: 2,
      minWager: 10000,
      color: '#C0C0C0',
      icon: '🥈',
      rakeback: 8,
      bonusMultiplier: 1.1,
      withdrawalLimit: 25000,
      personalManager: false,
      prioritySupport: false,
      benefits: [
        {
          id: '1',
          type: 'rakeback',
          title: '8% Rakeback',
          description: 'Earn 8% back on all your wagers',
          icon: 'percent'
        },
        {
          id: '2',
          type: 'bonus',
          title: 'Weekly Bonus',
          description: 'Enhanced weekly reload bonuses',
          value: '$100',
          icon: 'gift'
        },
        {
          id: '3',
          type: 'cashback',
          title: 'Loss Cashback',
          description: '5% cashback on net losses',
          value: '5%',
          icon: 'shield'
        }
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      level: 3,
      minWager: 50000,
      color: '#FFD700',
      icon: '🥇',
      rakeback: 12,
      bonusMultiplier: 1.2,
      withdrawalLimit: 50000,
      personalManager: false,
      prioritySupport: true,
      benefits: [
        {
          id: '1',
          type: 'rakeback',
          title: '12% Rakeback',
          description: 'Earn 12% back on all your wagers',
          icon: 'percent'
        },
        {
          id: '2',
          type: 'bonus',
          title: 'Weekly Bonus',
          description: 'Premium weekly reload bonuses',
          value: '$250',
          icon: 'gift'
        },
        {
          id: '3',
          type: 'cashback',
          title: 'Loss Cashback',
          description: '10% cashback on net losses',
          value: '10%',
          icon: 'shield'
        },
        {
          id: '4',
          type: 'support',
          title: 'Priority Support',
          description: 'Skip the queue with priority support',
          icon: 'headphones'
        }
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      level: 4,
      minWager: 250000,
      color: '#E5E4E2',
      icon: '💎',
      rakeback: 15,
      bonusMultiplier: 1.3,
      withdrawalLimit: 100000,
      personalManager: true,
      prioritySupport: true,
      benefits: [
        {
          id: '1',
          type: 'rakeback',
          title: '15% Rakeback',
          description: 'Earn 15% back on all your wagers',
          icon: 'percent'
        },
        {
          id: '2',
          type: 'bonus',
          title: 'Weekly Bonus',
          description: 'Exclusive weekly reload bonuses',
          value: '$500',
          icon: 'gift'
        },
        {
          id: '3',
          type: 'cashback',
          title: 'Loss Cashback',
          description: '15% cashback on net losses',
          value: '15%',
          icon: 'shield'
        },
        {
          id: '4',
          type: 'support',
          title: 'Personal Manager',
          description: 'Dedicated VIP account manager',
          icon: 'user'
        },
        {
          id: '5',
          type: 'exclusive',
          title: 'Exclusive Events',
          description: 'Access to VIP tournaments and events',
          icon: 'trophy'
        }
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond',
      level: 5,
      minWager: 1000000,
      color: '#B9F2FF',
      icon: '💍',
      rakeback: 20,
      bonusMultiplier: 1.5,
      withdrawalLimit: 250000,
      personalManager: true,
      prioritySupport: true,
      benefits: [
        {
          id: '1',
          type: 'rakeback',
          title: '20% Rakeback',
          description: 'Maximum rakeback on all wagers',
          icon: 'percent'
        },
        {
          id: '2',
          type: 'bonus',
          title: 'Weekly Bonus',
          description: 'Ultimate weekly reload bonuses',
          value: '$1,000',
          icon: 'gift'
        },
        {
          id: '3',
          type: 'cashback',
          title: 'Loss Cashback',
          description: '20% cashback on net losses',
          value: '20%',
          icon: 'shield'
        },
        {
          id: '4',
          type: 'support',
          title: 'Personal Manager',
          description: '24/7 dedicated VIP account manager',
          icon: 'user'
        },
        {
          id: '5',
          type: 'exclusive',
          title: 'Exclusive Events',
          description: 'VIP tournaments, trips, and experiences',
          icon: 'trophy'
        },
        {
          id: '6',
          type: 'gift',
          title: 'Monthly Gifts',
          description: 'Physical gifts and merchandise',
          icon: 'gift'
        }
      ]
    }
  ]

  // Mock user VIP progress
  const currentUserTier = vipTiers[1] // Silver tier
  const nextTier = vipTiers[2] // Gold tier
  const currentWager = user?.totalWagered || 25000
  
  const vipProgress: VIPProgress = {
    currentTier: currentUserTier,
    nextTier: nextTier,
    currentWager: currentWager,
    wagerToNextTier: nextTier.minWager - currentWager,
    progressPercentage: (currentWager / nextTier.minWager) * 100,
    monthlyRakeback: 450.50,
    lifetimeRakeback: 2850.75
  }

  const vipRewards: VIPReward[] = [
    {
      id: '1',
      type: 'daily',
      title: 'Daily Rakeback',
      description: 'Your daily rakeback reward',
      amount: 25.50,
      currency: 'coins',
      claimed: false,
      availableAt: new Date()
    },
    {
      id: '2',
      type: 'weekly',
      title: 'Weekly Bonus',
      description: 'Silver tier weekly bonus',
      amount: 100,
      currency: 'coins',
      claimed: true,
      availableAt: new Date(Date.now() - 86400000)
    },
    {
      id: '3',
      type: 'monthly',
      title: 'Monthly Cashback',
      description: 'Loss cashback for this month',
      amount: 75.25,
      currency: 'coins',
      claimed: false,
      availableAt: new Date(Date.now() + 86400000 * 5)
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Crown },
    { id: 'benefits', label: 'Benefits', icon: Gift },
    { id: 'rewards', label: 'Rewards', icon: Star }
  ]

  return (
    <CasinoLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-white">VIP Club</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Unlock exclusive benefits and rewards as you play. The more you wager, the higher you climb.
          </p>
        </div>

        {/* VIP Progress Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card variant="glass" className="border-[#2d3748] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-teal-600/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-2xl">
                    {vipProgress.currentTier.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {vipProgress.currentTier.name} VIP
                    </h2>
                    <p className="text-gray-400">
                      Level {vipProgress.currentTier.level} • {vipProgress.currentTier.rakeback}% Rakeback
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Lifetime Rakeback</div>
                  <div className="text-2xl font-bold text-green-400">
                    {formatCurrency(vipProgress.lifetimeRakeback)}
                  </div>
                </div>
              </div>

              {/* Progress to Next Tier */}
              {vipProgress.nextTier && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Progress to {vipProgress.nextTier.name}
                    </span>
                    <span className="text-sm text-white font-medium">
                      {formatCurrency(vipProgress.wagerToNextTier)} to go
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(vipProgress.progressPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Current Wager: </span>
                      <span className="text-white font-medium">
                        {formatCurrency(vipProgress.currentWager)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Target: </span>
                      <span className="text-white font-medium">
                        {formatCurrency(vipProgress.nextTier.minWager)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-[#1a2c38] rounded-lg p-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 ${
                activeTab === tab.id 
                  ? 'bg-[#00d4ff] text-black' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* VIP Tiers Grid */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">VIP Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vipTiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card 
                      variant="glass" 
                      className={`border-2 h-full ${
                        tier.id === vipProgress.currentTier.id 
                          ? 'border-[#00d4ff] bg-[#00d4ff]/5' 
                          : currentWager >= tier.minWager 
                            ? 'border-green-500/50' 
                            : 'border-[#2d3748]'
                      }`}
                    >
                      {tier.id === vipProgress.currentTier.id && (
                        <div className="absolute -top-3 left-4 bg-[#00d4ff] text-black text-xs px-3 py-1 rounded-full font-bold">
                          CURRENT
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <div className="text-4xl mb-2">{tier.icon}</div>
                        <CardTitle className="text-xl" style={{ color: tier.color }}>
                          {tier.name}
                        </CardTitle>
                        <p className="text-gray-400 text-sm">
                          Level {tier.level}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="text-center pb-4 border-b border-[#2d3748]">
                          <div className="text-sm text-gray-400 mb-1">Minimum Wager</div>
                          <div className="text-lg font-bold text-white">
                            {formatCurrency(tier.minWager)}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Rakeback</span>
                            <span className="text-green-400 font-bold">{tier.rakeback}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Bonus Multiplier</span>
                            <span className="text-blue-400 font-bold">{tier.bonusMultiplier}x</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Withdrawal Limit</span>
                            <span className="text-white font-bold">
                              {formatCurrency(tier.withdrawalLimit)}
                            </span>
                          </div>
                          {tier.personalManager && (
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">Personal Manager</span>
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Your Current Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vipProgress.currentTier.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glass" className="border-[#2d3748] p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center">
                        {benefit.type === 'rakeback' && <TrendingUp className="h-6 w-6 text-[#00d4ff]" />}
                        {benefit.type === 'bonus' && <Gift className="h-6 w-6 text-green-400" />}
                        {benefit.type === 'cashback' && <Shield className="h-6 w-6 text-blue-400" />}
                        {benefit.type === 'support' && <Users className="h-6 w-6 text-purple-400" />}
                        {benefit.type === 'exclusive' && <Crown className="h-6 w-6 text-yellow-400" />}
                        {benefit.type === 'gift' && <Gem className="h-6 w-6 text-pink-400" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{benefit.description}</p>
                        {benefit.value && (
                          <span className="text-[#00d4ff] font-bold">{benefit.value}</span>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Next Tier Preview */}
            {vipProgress.nextTier && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-6">
                  Unlock at {vipProgress.nextTier.name} Level
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vipProgress.nextTier.benefits.slice(vipProgress.currentTier.benefits.length).map((benefit, index) => (
                    <motion.div
                      key={benefit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="glass" className="border-[#2d3748] p-6 opacity-60 relative">
                        <div className="absolute top-4 right-4">
                          <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center">
                            {benefit.type === 'rakeback' && <TrendingUp className="h-6 w-6 text-gray-500" />}
                            {benefit.type === 'bonus' && <Gift className="h-6 w-6 text-gray-500" />}
                            {benefit.type === 'cashback' && <Shield className="h-6 w-6 text-gray-500" />}
                            {benefit.type === 'support' && <Users className="h-6 w-6 text-gray-500" />}
                            {benefit.type === 'exclusive' && <Crown className="h-6 w-6 text-gray-500" />}
                            {benefit.type === 'gift' && <Gem className="h-6 w-6 text-gray-500" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-400 mb-2">{benefit.title}</h4>
                            <p className="text-gray-500 text-sm mb-2">{benefit.description}</p>
                            {benefit.value && (
                              <span className="text-gray-500 font-bold">{benefit.value}</span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Available Rewards</h3>
              <div className="text-right">
                <div className="text-sm text-gray-400">This Month's Rakeback</div>
                <div className="text-lg font-bold text-green-400">
                  {formatCurrency(vipProgress.monthlyRakeback)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vipRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glass" className="border-[#2d3748] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {reward.type === 'daily' && <Clock className="h-5 w-5 text-blue-400" />}
                        {reward.type === 'weekly' && <Target className="h-5 w-5 text-green-400" />}
                        {reward.type === 'monthly' && <Award className="h-5 w-5 text-purple-400" />}
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          {reward.type}
                        </span>
                      </div>
                      {reward.claimed ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 border border-gray-500 rounded-full" />
                      )}
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-2">{reward.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{reward.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-[#00d4ff]">
                        +{formatCurrency(reward.amount)}
                      </div>
                      <Button 
                        size="sm" 
                        disabled={reward.claimed || reward.availableAt > new Date()}
                        className={reward.claimed ? "bg-gray-600" : "bg-[#00d4ff] text-black"}
                      >
                        {reward.claimed ? 'Claimed' : 'Claim'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CasinoLayout>
  )
}
