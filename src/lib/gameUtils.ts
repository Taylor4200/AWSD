import { supabase } from './supabase'
import { xpSystem } from './xpUtils'

// Game utilities for XP and coin rewards
export const gameUtils = {
  // Add XP from game actions
  addGameXP: async (userId: string, xpAmount: number) => {
    try {
      const { data, error } = await supabase.rpc('add_experience', {
        user_id: userId,
        exp_amount: xpAmount
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding game XP:', error)
      throw error
    }
  },

  // Add XP from SC/GC earnings
  addCoinXP: async (userId: string, sweepstakesCoins: number, goldCoins: number) => {
    try {
      const { data, error } = await supabase.rpc('add_coin_experience', {
        user_id: userId,
        sweepstakes_coins: sweepstakesCoins,
        gold_coins: goldCoins
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding coin XP:', error)
      throw error
    }
  },

  // Calculate and add XP for game win
  addGameWinXP: async (userId: string, betAmount: number, winAmount: number) => {
    try {
      let totalXP = xpSystem.rewards.GAME_WON
      
      // Add bonus XP for big wins (over 10x bet)
      const multiplier = winAmount / betAmount
      if (multiplier >= 10) {
        totalXP += xpSystem.rewards.BIG_WIN
      }
      
      // Add XP from coins earned
      const coinXP = xpSystem.calculateCoinXP(winAmount, 0) // Assuming winAmount is in SC
      totalXP += coinXP
      
      return await gameUtils.addGameXP(userId, totalXP)
    } catch (error) {
      console.error('Error adding game win XP:', error)
      throw error
    }
  },

  // Get user stats
  getUserStats: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error getting user stats:', error)
      throw error
    }
  },

  // Update user stats after game
  updateGameStats: async (userId: string, gameData: {
    wagered: number
    won: number
    isWin: boolean
    sweepstakesCoins?: number
    goldCoins?: number
  }) => {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .update({
          total_wagered: supabase.sql`total_wagered + ${gameData.wagered}`,
          total_won: supabase.sql`total_won + ${gameData.won}`,
          games_played: supabase.sql`games_played + 1`,
          games_won: supabase.sql`games_won + ${gameData.isWin ? 1 : 0}`,
          biggest_win: supabase.sql`GREATEST(biggest_win, ${gameData.won})`,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()
      
      if (error) throw error
      
      // Add XP from the game
      if (gameData.isWin) {
        await gameUtils.addGameWinXP(userId, gameData.wagered, gameData.won)
      } else {
        await gameUtils.addGameXP(userId, xpSystem.rewards.GAME_PLAYED)
      }
      
      // Add XP from coins if provided
      if (gameData.sweepstakesCoins || gameData.goldCoins) {
        await gameUtils.addCoinXP(
          userId, 
          gameData.sweepstakesCoins || 0, 
          gameData.goldCoins || 0
        )
      }
      
      return data
    } catch (error) {
      console.error('Error updating game stats:', error)
      throw error
    }
  }
}
