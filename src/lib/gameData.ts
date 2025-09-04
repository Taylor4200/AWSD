export interface Game {
  id: string
  name: string
  provider: string
  category: 'casino' | 'originals' | 'slots' | 'crash' | 'dice' | 'roulette' | 'blackjack' | 'baccarat' | 'poker'
  image: string
  description?: string
  rtp?: number
  volatility?: 'low' | 'medium' | 'high'
  minBet?: number
  maxBet?: number
  jackpot?: number
  players?: number
  isHot?: boolean
  isNew?: boolean
  isExclusive?: boolean
  isFeatured?: boolean
  tags?: string[]
  recentWin?: number
  popularity?: number
}

export const games: Game[] = [
  // Featured Games
  {
    id: 'sweet-bonanza-1000',
    name: 'Sweet Bonanza 1000',
    provider: 'PRAGMATIC PLAY',
    category: 'slots',
    image: '/Sweet1000.avif',
    description: 'A sweet adventure with cascading wins and multipliers up to 1000x',
    rtp: 96.5,
    volatility: 'high',
    minBet: 0.20,
    maxBet: 100,
    jackpot: 50000,
    players: 1247,
    isHot: true,
    isFeatured: true,
    tags: ['candy', 'multiplier', 'cascading'],
    recentWin: 15420,
    popularity: 95
  },
  {
    id: 'dog-house-royal-hunt',
    name: 'The Dog House Royal Hunt',
    provider: 'PRAGMATIC PLAY',
    category: 'slots',
    image: '/RoyalHunt.avif',
    description: 'Hunt for royal treasures with wild multipliers and free spins',
    rtp: 96.5,
    volatility: 'high',
    minBet: 0.20,
    maxBet: 100,
    jackpot: 75000,
    players: 892,
    isNew: true,
    isFeatured: true,
    tags: ['animals', 'wilds', 'free-spins'],
    recentWin: 23450,
    popularity: 88
  },
  {
    id: 'sugar-rush-1000',
    name: 'Sugar Rush 1000',
    provider: 'PRAGMATIC PLAY',
    category: 'slots',
    image: '/Sugar1000.avif',
    description: 'Delicious wins with up to 1000x multipliers in this sweet slot',
    rtp: 96.5,
    volatility: 'high',
    minBet: 0.20,
    maxBet: 100,
    jackpot: 60000,
    players: 1567,
    isHot: true,
    isFeatured: true,
    tags: ['candy', 'multiplier', 'sweet'],
    recentWin: 18750,
    popularity: 92
  },
  {
    id: 'gem-ghosts',
    name: 'Gem Ghosts',
    provider: 'BULLSHARK GAMES',
    category: 'slots',
    image: '/GemGhosts.avif',
    description: 'Mine for precious gems in this ghostly adventure',
    rtp: 96.0,
    volatility: 'medium',
    minBet: 0.10,
    maxBet: 50,
    jackpot: 25000,
    players: 445,
    isNew: true,
    isFeatured: true,
    tags: ['gems', 'mining', 'ghosts'],
    recentWin: 8920,
    popularity: 76
  },
  {
    id: 'sweet-bonanza-xmas',
    name: 'Sweet Bonanza Xmas',
    provider: 'PRAGMATIC PLAY',
    category: 'slots',
    image: '/SweetXmas.avif',
    description: 'Festive fun with holiday-themed cascading wins',
    rtp: 96.5,
    volatility: 'high',
    minBet: 0.20,
    maxBet: 100,
    jackpot: 40000,
    players: 678,
    isNew: true,
    isFeatured: true,
    tags: ['christmas', 'candy', 'festive'],
    recentWin: 12340,
    popularity: 85
  },
  {
    id: 'dice',
    name: 'DICE',
    provider: 'EDGE ORIGINALS',
    category: 'dice',
    image: '/Dice.avif',
    description: 'Classic dice game with provably fair results',
    rtp: 99.0,
    volatility: 'medium',
    minBet: 0.01,
    maxBet: 1000,
    jackpot: 50000,
    players: 1892,
    isHot: true,
    isFeatured: true,
    tags: ['dice', 'classic', 'provably-fair'],
    recentWin: 15670,
    popularity: 91
  },

  // Casino Games
  {
    id: 'neon-crash',
    name: 'Neon Crash',
    provider: 'EDGE ORIGINALS',
    category: 'crash',
    image: '/images/games/neon-crash.jpg',
    description: 'Watch the multiplier grow and cash out before it crashes',
    rtp: 99.0,
    volatility: 'high',
    minBet: 0.01,
    maxBet: 1000,
    jackpot: 100000,
    players: 3421,
    isHot: true,
    isExclusive: true,
    tags: ['crash', 'multiplier', 'neon'],
    recentWin: 45670,
    popularity: 97
  },
  {
    id: 'cyber-slots',
    name: 'Cyber Slots',
    provider: 'EDGE ORIGINALS',
    category: 'slots',
    image: '/images/games/cyber-slots.jpg',
    description: 'Futuristic slot machine with cyberpunk aesthetics',
    rtp: 96.8,
    volatility: 'medium',
    minBet: 0.10,
    maxBet: 100,
    jackpot: 75000,
    players: 1234,
    isNew: true,
    isExclusive: true,
    tags: ['cyberpunk', 'futuristic', 'slots'],
    recentWin: 23450,
    popularity: 82
  },
  {
    id: 'quantum-dice',
    name: 'Quantum Dice',
    provider: 'EDGE ORIGINALS',
    category: 'dice',
    image: '/images/games/quantum-dice.jpg',
    description: 'Quantum mechanics meets classic dice game',
    rtp: 98.2,
    volatility: 'medium',
    minBet: 0.01,
    maxBet: 1000,
    jackpot: 50000,
    players: 892,
    isExclusive: true,
    tags: ['quantum', 'dice', 'physics'],
    recentWin: 15670,
    popularity: 78
  },
  {
    id: 'holographic-roulette',
    name: 'Holographic Roulette',
    provider: 'EDGE ORIGINALS',
    category: 'roulette',
    image: '/images/games/holo-roulette.jpg',
    description: '3D holographic roulette with immersive experience',
    rtp: 97.1,
    volatility: 'low',
    minBet: 1.00,
    maxBet: 1000,
    jackpot: 35000,
    players: 567,
    isHot: true,
    isExclusive: true,
    tags: ['holographic', 'roulette', '3d'],
    recentWin: 8920,
    popularity: 85
  },

  // Originals
  {
    id: 'edge-crash',
    name: 'EDGE Crash',
    provider: 'EDGE ORIGINALS',
    category: 'crash',
    image: '/images/games/edge-crash.jpg',
    description: 'Our signature crash game with unique mechanics',
    rtp: 99.0,
    volatility: 'high',
    minBet: 0.01,
    maxBet: 1000,
    jackpot: 100000,
    players: 5678,
    isHot: true,
    isExclusive: true,
    tags: ['crash', 'signature', 'unique'],
    recentWin: 67890,
    popularity: 99
  },
  {
    id: 'edge-dice',
    name: 'EDGE Dice',
    provider: 'EDGE ORIGINALS',
    category: 'dice',
    image: '/images/games/edge-dice.jpg',
    description: 'Classic dice game with EDGE twist',
    rtp: 99.0,
    volatility: 'medium',
    minBet: 0.01,
    maxBet: 1000,
    jackpot: 50000,
    players: 3456,
    isExclusive: true,
    tags: ['dice', 'classic', 'edge'],
    recentWin: 23450,
    popularity: 92
  },
  {
    id: 'edge-roulette',
    name: 'EDGE Roulette',
    provider: 'EDGE ORIGINALS',
    category: 'roulette',
    image: '/images/games/edge-roulette.jpg',
    description: 'European roulette with enhanced graphics',
    rtp: 97.3,
    volatility: 'low',
    minBet: 1.00,
    maxBet: 1000,
    jackpot: 35000,
    players: 1234,
    isExclusive: true,
    tags: ['roulette', 'european', 'enhanced'],
    recentWin: 8920,
    popularity: 87
  },
  {
    id: 'edge-blackjack',
    name: 'EDGE Blackjack',
    provider: 'EDGE ORIGINALS',
    category: 'blackjack',
    image: '/images/games/edge-blackjack.jpg',
    description: 'Beat the dealer in our classic blackjack game',
    rtp: 99.5,
    volatility: 'low',
    minBet: 1.00,
    maxBet: 1000,
    jackpot: 25000,
    players: 987,
    isExclusive: true,
    tags: ['blackjack', 'classic', 'dealer'],
    recentWin: 5670,
    popularity: 84
  }
]

// Helper functions
export const getGamesByCategory = (category: string): Game[] => {
  return games.filter(game => game.category === category)
}

export const getFeaturedGames = (): Game[] => {
  return games.filter(game => game.isFeatured)
}

export const getHotGames = (): Game[] => {
  return games.filter(game => game.isHot)
}

export const getNewGames = (): Game[] => {
  return games.filter(game => game.isNew)
}

export const getExclusiveGames = (): Game[] => {
  return games.filter(game => game.isExclusive)
}

export const searchGames = (query: string): Game[] => {
  const lowercaseQuery = query.toLowerCase()
  return games.filter(game => 
    game.name.toLowerCase().includes(lowercaseQuery) ||
    game.provider.toLowerCase().includes(lowercaseQuery) ||
    game.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id)
}
