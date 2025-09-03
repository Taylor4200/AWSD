'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Clock, 
  Users,
  TrendingUp,
  Star,
  Calendar,
  Filter
} from 'lucide-react'
import CasinoLayout from '@/components/layout/CasinoLayout'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatNumber } from '@/lib/utils'

interface Match {
  id: string
  sport: string
  league: string
  homeTeam: string
  awayTeam: string
  homeOdds: number
  awayOdds: number
  drawOdds?: number
  startTime: Date
  isLive?: boolean
  viewers?: number
}

export default function SportsPage() {
  const [selectedSport, setSelectedSport] = useState('all')

  const sports = [
    { id: 'all', name: 'All Sports', icon: Trophy },
    { id: 'football', name: 'Football', icon: Trophy },
    { id: 'basketball', name: 'Basketball', icon: Trophy },
    { id: 'tennis', name: 'Tennis', icon: Trophy },
    { id: 'baseball', name: 'Baseball', icon: Trophy },
    { id: 'hockey', name: 'Hockey', icon: Trophy }
  ]

  const matches: Match[] = [
    {
      id: '1',
      sport: 'football',
      league: 'Premier League',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      homeOdds: 2.45,
      awayOdds: 2.80,
      drawOdds: 3.20,
      startTime: new Date(Date.now() + 3600000),
      viewers: 15420
    },
    {
      id: '2',
      sport: 'basketball',
      league: 'NBA',
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      homeOdds: 1.85,
      awayOdds: 1.95,
      startTime: new Date(Date.now() + 7200000),
      isLive: true,
      viewers: 8932
    },
    {
      id: '3',
      sport: 'tennis',
      league: 'ATP Masters',
      homeTeam: 'Djokovic',
      awayTeam: 'Nadal',
      homeOdds: 1.75,
      awayOdds: 2.10,
      startTime: new Date(Date.now() + 1800000),
      viewers: 5234
    }
  ]

  const filteredMatches = matches.filter(match => 
    selectedSport === 'all' || match.sport === selectedSport
  )

  return (
    <CasinoLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sports Betting</h1>
          <p className="text-gray-400">Support your team and win big</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Bets</div>
                <div className="text-lg font-bold text-white">7,783</div>
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Today's Matches</div>
                <div className="text-lg font-bold text-white">156</div>
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Volume</div>
                <div className="text-lg font-bold text-white">$2.4M</div>
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 border-[#2d3748]">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Live Events</div>
                <div className="text-lg font-bold text-white">23</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sport Categories */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {sports.map((sport) => (
            <Button
              key={sport.id}
              variant={selectedSport === sport.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedSport(sport.id)}
              className={`flex-shrink-0 ${
                selectedSport === sport.id 
                  ? 'bg-[#00d4ff] text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <sport.icon className="h-4 w-4 mr-2" />
              {sport.name}
            </Button>
          ))}
        </div>

        {/* Matches */}
        <div className="space-y-4">
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="border-[#2d3748] hover:border-[#00d4ff]/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-400 uppercase tracking-wide">
                        {match.league}
                      </div>
                      {match.isLive && (
                        <div className="flex items-center space-x-1 text-red-500">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold">LIVE</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      {match.startTime.toLocaleTimeString()}
                      {match.viewers && (
                        <>
                          <Users className="h-4 w-4 ml-2" />
                          {formatNumber(match.viewers)}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    {/* Home Team */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-white mb-2">
                        {match.homeTeam}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-[#2d3748] hover:border-[#00d4ff]"
                      >
                        {match.homeOdds.toFixed(2)}
                      </Button>
                    </div>

                    {/* VS / Draw */}
                    <div className="text-center">
                      <div className="text-gray-400 text-sm mb-2">VS</div>
                      {match.drawOdds && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full border-[#2d3748] hover:border-[#00d4ff]"
                        >
                          Draw {match.drawOdds.toFixed(2)}
                        </Button>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-white mb-2">
                        {match.awayTeam}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-[#2d3748] hover:border-[#00d4ff]"
                      >
                        {match.awayOdds.toFixed(2)}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="text-center mt-12 p-8">
          <Trophy className="h-12 w-12 text-[#00d4ff] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">More Sports Coming Soon</h3>
          <p className="text-gray-400">We're working on adding more sports and betting options.</p>
        </div>
      </div>
    </CasinoLayout>
  )
}
