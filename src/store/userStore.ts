import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User, Transaction, Achievement } from '@/types'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  transactions: Transaction[]
  achievements: Achievement[]
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  updateBalance: (amount: number, type: 'coins' | 'sweepstakes_coins') => void
  addTransaction: (transaction: Transaction) => void
  addAchievement: (achievement: Achievement) => void
  toggleGhostMode: () => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      transactions: [],
      achievements: [],

      setUser: (user) => 
        set({ 
          user, 
          isAuthenticated: !!user 
        }),

      setLoading: (loading) => 
        set({ isLoading: loading }),

      updateBalance: (amount, type) => 
        set((state) => {
          if (!state.user) return state
          
          const updatedUser = {
            ...state.user,
            [type === 'coins' ? 'balance' : 'sweepstakesCoins']: 
              state.user[type === 'coins' ? 'balance' : 'sweepstakesCoins'] + amount
          }
          
          return { user: updatedUser }
        }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions].slice(0, 100) // Keep last 100
        })),

      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [achievement, ...state.achievements]
        })),

      toggleGhostMode: () =>
        set((state) => {
          if (!state.user) return state
          
          const updatedUser = {
            ...state.user,
            isGhostMode: !state.user.isGhostMode
          }
          
          return { user: updatedUser }
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          transactions: [],
          achievements: []
        }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        achievements: state.achievements,
      }),
    }
  )
)
