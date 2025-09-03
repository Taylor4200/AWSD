import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility type to handle motion component props
export type MotionProps<T> = T & {
  [K in keyof T]: T[K] extends React.HTMLAttributes<any> ? any : T[K]
}

export function formatCurrency(
  amount: number,
  currency: 'USD' | 'coins' | 'sweepstakes_coins' = 'USD',
  decimals: number = 2
): string {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  switch (currency) {
    case 'USD':
      return `$${formatter.format(amount)}`
    case 'coins':
      return `${formatter.format(amount)} Coins`
    case 'sweepstakes_coins':
      return `${formatter.format(amount)} SC`
    default:
      return formatter.format(amount)
  }
}

export function formatNumber(num: number, compact: boolean = false): string {
  if (compact && num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (compact && num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return `${seconds}s ago`
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function calculateWinChance(rtp: number, betAmount: number, jackpot: number): number {
  // Simplified win chance calculation
  const baseChance = rtp / 100
  const jackpotBonus = Math.min(betAmount / jackpot, 0.1)
  return Math.min(baseChance + jackpotBonus, 0.95)
}

export function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'common':
      return '#9ca3af' // gray-400
    case 'rare':
      return '#3b82f6' // blue-500
    case 'epic':
      return '#8b5cf6' // purple-500
    case 'legendary':
      return '#f59e0b' // amber-500
    case 'mythic':
      return '#ef4444' // red-500
    default:
      return '#6b7280' // gray-500
  }
}

export function getRarityGradient(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'from-gray-400 to-gray-600'
    case 'rare':
      return 'from-blue-400 to-blue-600'
    case 'epic':
      return 'from-purple-400 to-purple-600'
    case 'legendary':
      return 'from-amber-400 to-orange-600'
    case 'mythic':
      return 'from-red-400 to-pink-600'
    default:
      return 'from-gray-400 to-gray-600'
  }
}

export function playSound(soundName: string, volume: number = 0.5): void {
  if (typeof window !== 'undefined') {
    const audio = new Audio(`/sounds/${soundName}.mp3`)
    audio.volume = volume
    audio.play().catch(console.error)
  }
}

export function vibrate(pattern: number | number[] = 100): void {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
  }
  return Promise.resolve(false)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  return usernameRegex.test(username)
}

export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function calculateLevel(experience: number): number {
  // Simple level calculation: every 1000 XP = 1 level
  return Math.floor(experience / 1000) + 1
}

export function calculateExperienceToNextLevel(experience: number): number {
  const currentLevel = calculateLevel(experience)
  const nextLevelXP = currentLevel * 1000
  return nextLevelXP - experience
}
