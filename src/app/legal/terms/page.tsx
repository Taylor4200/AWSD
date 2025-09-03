'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Users, Gift, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f1a2a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Casino</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a2c38] rounded-lg shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-8 w-8 text-[#00d4ff]" />
            <h1 className="text-3xl font-bold">Terms of Service & Sweepstakes Rules</h1>
          </div>

          <div className="space-y-8">
            {/* Eligibility Section */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Eligibility Requirements
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• Must be 18 years of age or older</p>
                <p>• Must be a resident of permitted jurisdictions</p>
                <p>• <strong>Excluded States:</strong> Washington, Idaho, Nevada, Michigan</p>
                <p>• One account per person/household</p>
                <p>• Employees and immediate family members of EDGE Casino are not eligible</p>
              </div>
            </section>

            {/* Currency System */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Gift className="h-6 w-6 mr-2" />
                Currency System
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#2d3748] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Gold Coins (GC)</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Play-for-fun currency only</li>
                    <li>• No real monetary value</li>
                    <li>• Used solely for entertainment</li>
                    <li>• Cannot be redeemed for prizes</li>
                  </ul>
                </div>
                <div className="bg-[#2d3748] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Sweepstakes Coins (SC)</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Promotional sweepstakes entries</li>
                    <li>• Redeemable for prizes</li>
                    <li>• Fixed redemption rate: 1 SC = $1</li>
                    <li>• Subject to KYC verification</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Free Entry Method */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Free Alternative Method of Entry (AMOE)</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p><strong>No Purchase Necessary:</strong> You can obtain Sweepstakes Coins without making any purchase.</p>
                <p><strong>Free Entry Method:</strong> Send a self-addressed, stamped envelope to:</p>
                <div className="bg-[#1a2c38] rounded p-3 ml-4">
                  <p>EDGE Casino</p>
                  <p>Free Entry Request</p>
                  <p>P.O. Box [Your Address]</p>
                  <p>Include your name, email, and request for Sweepstakes Coins</p>
                </div>
                <p className="text-sm text-gray-300">*Limit one free entry request per envelope per day</p>
              </div>
            </section>

            {/* Game Fairness */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Game Fairness & Random Number Generation</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• All games use certified Random Number Generation (RNG)</p>
                <p>• RNG is independently tested and verified</p>
                <p>• Game outcomes are completely random and fair</p>
                <p>• No manipulation of results is possible</p>
              </div>
            </section>

            {/* Redemption Rules */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Prize Redemption Rules</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• Minimum redemption: 100 Sweepstakes Coins ($100)</p>
                <p>• Identity verification required before redemption</p>
                <p>• KYC (Know Your Customer) process mandatory</p>
                <p>• Processing time: 3-5 business days</p>
                <p>• Redemption options: Cash, Gift Cards, Cryptocurrency</p>
                <p>• Void where prohibited by law</p>
              </div>
            </section>

            {/* Prohibited Conduct */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                Prohibited Conduct
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• Creating multiple accounts</p>
                <p>• Using VPNs to circumvent location restrictions</p>
                <p>• Automated play or bot usage</p>
                <p>• Attempting to manipulate games or systems</p>
                <p>• Sharing account credentials</p>
                <p>• Any form of fraud or abuse</p>
                <p className="text-red-400"><strong>Violation may result in account termination and forfeiture of all coins.</strong></p>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Disclaimers & Limitations</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• No guarantees of winning or specific outcomes</p>
                <p>• Service provided "as is" without warranties</p>
                <p>• Limited liability for any damages</p>
                <p>• We reserve the right to modify terms at any time</p>
                <p>• Void where prohibited by law</p>
                <p>• Participation constitutes acceptance of these terms</p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Contact Information</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p><strong>For questions about these terms:</strong></p>
                <p>Email: legal@edgecasino.com</p>
                <p>Support: support@edgecasino.com</p>
                <p>Last Updated: {new Date().toLocaleDateString()}</p>
              </div>
            </section>

            {/* Official Disclaimer */}
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mt-8">
              <p className="text-center font-semibold text-red-400">
                NO PURCHASE NECESSARY. VOID WHERE PROHIBITED. 
                SWEEPSTAKES COINS ARE PROMOTIONAL ENTRIES WITH NO MONETARY VALUE. 
                GOLD COINS ARE FOR ENTERTAINMENT ONLY.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
