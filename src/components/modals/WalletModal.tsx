'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  CreditCard, 
  Banknote, 
  Bitcoin, 
  Plus, 
  Minus,
  ArrowRight,
  Check,
  X
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useUserStore } from '@/store/userStore'
import { formatCurrency } from '@/lib/utils'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUserStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw'>('overview')
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string>('')

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: CreditCard, fee: '2.5%', time: 'Instant' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Banknote, fee: '0%', time: '1-3 days' },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, fee: '0%', time: 'Instant' }
  ]

  const handleDeposit = () => {
    if (!amount || !selectedMethod) return
    console.log('Processing deposit:', { amount, method: selectedMethod })
    setAmount('')
    setSelectedMethod('')
    setActiveTab('overview')
  }

  const handleWithdraw = () => {
    if (!amount || !selectedMethod) return
    console.log('Processing withdrawal:', { amount, method: selectedMethod })
    setAmount('')
    setSelectedMethod('')
    setActiveTab('overview')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Wallet"
      description="Manage your deposits and withdrawals"
      size="lg"
      variant="glass"
    >
      <div className="space-y-6">
        {/* Wallet Overview */}
        <div className="text-center p-6 bg-gradient-to-r from-[#00d4ff]/20 to-purple-600/20 rounded-xl border border-[#00d4ff]/30">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#00d4ff] to-purple-500 rounded-full flex items-center justify-center">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Your Wallet</h3>
          <div className="text-3xl font-bold text-[#00d4ff] mb-2">
            {formatCurrency(user?.balance || 0, 'USD')}
          </div>
          <p className="text-gray-400 text-sm">
            Available for deposits and withdrawals
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-[#1a2c38] rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: Wallet },
            { id: 'deposit', label: 'Deposit', icon: Plus },
            { id: 'withdraw', label: 'Withdraw', icon: Minus }
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
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="default"
                onClick={() => setActiveTab('deposit')}
                className="bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Deposit
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab('withdraw')}
                className="border-[#2d3748] hover:border-[#00d4ff]"
              >
                <Minus className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>

            {/* Payment Methods */}
            <Card variant="glass" className="border-[#2d3748]">
              <CardHeader>
                <CardTitle className="text-white">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <method.icon className="h-5 w-5 text-[#00d4ff]" />
                        <div>
                          <div className="text-white font-medium">{method.name}</div>
                          <div className="text-xs text-gray-400">
                            Fee: {method.fee} • Time: {method.time}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#00d4ff]">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="space-y-4">
            <Card variant="glass" className="border-[#2d3748] p-6">
              <h4 className="text-lg font-bold text-white mb-4">Deposit Funds</h4>
              
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-center text-xl"
                />
                
                <div className="grid grid-cols-4 gap-2">
                  {['25', '50', '100', '500'].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(preset)}
                      className="border-[#2d3748]"
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>

                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-white">Select Payment Method</h5>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedMethod === method.id 
                          ? 'border-[#00d4ff] bg-[#00d4ff]/10' 
                          : 'border-[#2d3748] bg-black/20 hover:border-[#00d4ff]/50'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className="h-5 w-5 text-[#00d4ff]" />
                        <div>
                          <div className="text-white font-medium">{method.name}</div>
                          <div className="text-xs text-gray-400">
                            Fee: {method.fee} • Time: {method.time}
                          </div>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <Check className="h-5 w-5 text-[#00d4ff]" />
                      )}
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleDeposit}
                  disabled={!amount || !selectedMethod || parseFloat(amount) <= 0}
                  className="w-full bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Deposit ${amount || '0'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="space-y-4">
            <Card variant="glass" className="border-[#2d3748] p-6">
              <h4 className="text-lg font-bold text-white mb-4">Withdraw Funds</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-400">Available Balance:</span>
                  <span className="text-white font-bold">
                    {formatCurrency(user?.balance || 0, 'USD')}
                  </span>
                </div>
                
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-center text-xl"
                />
                
                <div className="grid grid-cols-4 gap-2">
                  {['25', '50', '100', 'Max'].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (preset === 'Max') {
                          setAmount((user?.balance || 0).toString())
                        } else {
                          setAmount(preset)
                        }
                      }}
                      className="border-[#2d3748]"
                    >
                      {preset === 'Max' ? preset : `$${preset}`}
                    </Button>
                  ))}
                </div>

                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-white">Select Withdrawal Method</h5>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedMethod === method.id 
                          ? 'border-[#00d4ff] bg-[#00d4ff]/10' 
                          : 'border-[#2d3748] bg-black/20 hover:border-[#00d4ff]/50'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className="h-5 w-5 text-[#00d4ff]" />
                        <div>
                          <div className="text-white font-medium">{method.name}</div>
                          <div className="text-xs text-gray-400">
                            Fee: {method.fee} • Time: {method.time}
                          </div>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <Check className="h-5 w-5 text-[#00d4ff]" />
                      )}
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleWithdraw}
                  disabled={!amount || !selectedMethod || parseFloat(amount) <= 0 || parseFloat(amount) > (user?.balance || 0)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Withdraw ${amount || '0'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default WalletModal
