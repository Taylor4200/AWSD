import { create } from 'zustand'
import { Game, GameSession, RecentWin, PackDraw } from '@/types'

interface GameState {
  games: Game[]
  activeGame: Game | null
  gameSession: GameSession | null
  recentWins: RecentWin[]
  packDraws: PackDraw[]
  jackpots: Record<string, number>
  isLoading: boolean
  
  // Actions
  setGames: (games: Game[]) => void
  setActiveGame: (game: Game | null) => void
  setGameSession: (session: GameSession | null) => void
  addRecentWin: (win: RecentWin) => void
  setPackDraws: (packDraws: PackDraw[]) => void
  updateJackpot: (gameId: string, amount: number) => void
  setLoading: (loading: boolean) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  games: [],
  activeGame: null,
  gameSession: null,
  recentWins: [],
  packDraws: [],
  jackpots: {},
  isLoading: false,

  setGames: (games) => set({ games }),

  setActiveGame: (game) => set({ activeGame: game }),

  setGameSession: (session) => set({ gameSession: session }),

  addRecentWin: (win) =>
    set((state) => ({
      recentWins: [win, ...state.recentWins].slice(0, 50) // Keep last 50 wins
    })),

  setPackDraws: (packDraws) => set({ packDraws }),

  updateJackpot: (gameId, amount) =>
    set((state) => ({
      jackpots: {
        ...state.jackpots,
        [gameId]: amount
      }
    })),

  setLoading: (loading) => set({ isLoading: loading }),
}))
