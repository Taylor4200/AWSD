'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Shield, Phone, Users } from 'lucide-react'
import Link from 'next/link'

export default function ResponsibleGamingPage() {
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
            <Heart className="h-8 w-8 text-[#00d4ff]" />
            <h1 className="text-3xl font-bold">Responsible Gaming</h1>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Our Commitment</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>At EDGE Casino, we are committed to providing a safe and responsible gaming environment. Our games are designed for entertainment purposes only.</p>
                <p>We believe that gaming should be an enjoyable pastime, not a source of financial hardship or personal problems.</p>
                <p className="text-yellow-400"><strong>Remember:</strong> Our games are sweepstakes contests for entertainment. Gold Coins have no monetary value.</p>
              </div>
            </section>

            {/* Entertainment Only */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Entertainment Only</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• Our games are designed for entertainment and fun</p>
                <p>• Gold Coins have no real monetary value</p>
                <p>• Sweepstakes Coins are promotional entries only</p>
                <p>• No guarantee of winning or specific outcomes</p>
                <p>• Set realistic expectations for your gaming experience</p>
              </div>
            </section>

            {/* Setting Limits */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Setting Healthy Limits</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Time Management</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Set time limits for your gaming sessions</li>
                    <li>• Take regular breaks from gaming</li>
                    <li>• Balance gaming with other activities</li>
                    <li>• Don't let gaming interfere with daily responsibilities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Financial Awareness</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Only spend what you can afford to lose</li>
                    <li>• Never chase losses</li>
                    <li>• Don't use money needed for essential expenses</li>
                    <li>• Keep track of your spending</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Warning Signs */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Warning Signs</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p className="text-red-400 font-semibold">Consider seeking help if you experience:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Spending more time or money than intended</li>
                  <li>• Neglecting work, family, or other responsibilities</li>
                  <li>• Lying about gaming activities</li>
                  <li>• Borrowing money to fund gaming</li>
                  <li>• Feeling anxious or depressed about gaming</li>
                  <li>• Trying to win back losses</li>
                  <li>• Gaming to escape problems or negative emotions</li>
                </ul>
              </div>
            </section>

            {/* Self-Exclusion */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Self-Exclusion Options
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>If you feel you need a break from gaming, we offer self-exclusion options:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Temporary account suspension (7 days to 6 months)</li>
                  <li>• Permanent account closure</li>
                  <li>• Contact our support team for assistance</li>
                  <li>• No questions asked - we respect your decision</li>
                </ul>
                <p className="text-[#00d4ff]"><strong>Contact:</strong> support@edgecasino.com for self-exclusion requests</p>
              </div>
            </section>

            {/* Getting Help */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Phone className="h-6 w-6 mr-2" />
                Getting Help
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Professional Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>National Problem Gambling Helpline:</strong> 1-800-522-4700</li>
                    <li>• <strong>Gamblers Anonymous:</strong> gamblersanonymous.org</li>
                    <li>• <strong>National Council on Problem Gambling:</strong> ncpgambling.org</li>
                    <li>• <strong>Gam-Anon:</strong> gam-anon.org (for family members)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Online Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>BeGambleAware:</strong> begambleaware.org</li>
                    <li>• <strong>Gambling Therapy:</strong> gamblingtherapy.org</li>
                    <li>• <strong>GamCare:</strong> gamcare.org.uk</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Parental Controls */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Parental Controls
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• Our services are for adults 18 and older only</p>
                <p>• Parents should monitor their children's internet usage</p>
                <p>• Use parental control software to restrict access</p>
                <p>• Keep gaming devices in common areas</p>
                <p>• Talk to children about responsible gaming</p>
                <p>• Set clear rules and time limits for gaming activities</p>
              </div>
            </section>

            {/* Tools & Features */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Responsible Gaming Tools</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>We provide tools to help you maintain control:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Session time reminders</li>
                  <li>• Spending limits and alerts</li>
                  <li>• Account activity monitoring</li>
                  <li>• Easy access to self-exclusion options</li>
                  <li>• Links to help resources</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Contact Us</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p><strong>For responsible gaming support:</strong></p>
                <p>Email: responsible@edgecasino.com</p>
                <p>Support: support@edgecasino.com</p>
                <p>24/7 Crisis Line: 1-800-522-4700</p>
                <p className="text-sm text-gray-300">We're here to help you maintain a healthy relationship with gaming.</p>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4 mt-8">
              <p className="text-center font-semibold text-yellow-400">
                GAMING SHOULD BE FUN AND ENTERTAINING. IF IT'S NOT, IT'S TIME TO TAKE A BREAK.
                <br />
                YOU ARE NOT ALONE - HELP IS AVAILABLE 24/7.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
