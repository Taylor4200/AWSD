export interface VIPTier {
  id: string
  name: string
  level: number
  minWager: number
  color: string
  icon: string
  benefits: VIPBenefit[]
  rakeback: number
  bonusMultiplier: number
  withdrawalLimit: number
  personalManager: boolean
  prioritySupport: boolean
}

export interface VIPBenefit {
  id: string
  type: 'rakeback' | 'bonus' | 'cashback' | 'exclusive' | 'support' | 'withdrawal' | 'gift'
  title: string
  description: string
  value?: string
  icon: string
}

export interface VIPProgress {
  currentTier: VIPTier
  nextTier?: VIPTier
  currentWager: number
  wagerToNextTier: number
  progressPercentage: number
  monthlyRakeback: number
  lifetimeRakeback: number
}

export interface VIPReward {
  id: string
  type: 'daily' | 'weekly' | 'monthly' | 'milestone'
  title: string
  description: string
  amount: number
  currency: 'coins' | 'sweepstakes_coins'
  claimed: boolean
  availableAt: Date
  expiresAt?: Date
}
