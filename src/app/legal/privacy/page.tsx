'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Eye, Shield, Database } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
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
            <Lock className="h-8 w-8 text-[#00d4ff]" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Introduction</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>This Privacy Policy describes how EDGE Casino ("we," "us," or "our") collects, uses, and protects your personal information when you use our sweepstakes gaming platform.</p>
                <p>By using our services, you consent to the collection and use of information in accordance with this policy.</p>
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2" />
                Information We Collect
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Personal Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Name and contact information (email, phone)</li>
                    <li>• Date of birth and age verification</li>
                    <li>• Geographic location and IP address</li>
                    <li>• Payment information (if purchasing Gold Coins)</li>
                    <li>• Government-issued ID (for KYC verification)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Usage Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Game play activity and preferences</li>
                    <li>• Account activity and transaction history</li>
                    <li>• Device information and browser type</li>
                    <li>• Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">How We Use Your Information</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• To provide and maintain our sweepstakes gaming services</p>
                <p>• To verify your identity and eligibility for prizes</p>
                <p>• To process prize redemptions and payments</p>
                <p>• To detect and prevent fraud, abuse, and illegal activity</p>
                <p>• To comply with legal and regulatory requirements</p>
                <p>• To improve our services and user experience</p>
                <p>• To communicate with you about your account and services</p>
                <p>• To send promotional offers (with your consent)</p>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Information Sharing & Disclosure
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">We Do Not Sell Your Personal Information</h3>
                  <p className="text-sm">We do not sell, trade, or rent your personal information to third parties for marketing purposes.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Service Providers</h3>
                  <p className="text-sm mb-2">We may share information with trusted third-party service providers:</p>
                  <ul className="space-y-1 text-sm ml-4">
                    <li>• Payment processors for transactions</li>
                    <li>• KYC/identity verification services</li>
                    <li>• Cloud hosting and infrastructure providers</li>
                    <li>• Customer support and analytics services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Legal Requirements</h3>
                  <p className="text-sm">We may disclose information when required by law, court order, or government request.</p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Data Security</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• We implement industry-standard security measures</p>
                <p>• All data is encrypted in transit and at rest</p>
                <p>• Regular security audits and monitoring</p>
                <p>• Limited access to personal information</p>
                <p>• Secure data centers with physical security</p>
                <p className="text-yellow-400"><strong>Note:</strong> No method of transmission over the internet is 100% secure.</p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2" />
                Your Rights & Choices
              </h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Access & Control</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Access your personal information</li>
                    <li>• Request correction of inaccurate data</li>
                    <li>• Request deletion of your account</li>
                    <li>• Opt-out of marketing communications</li>
                    <li>• Export your data in a portable format</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#00d4ff] mb-2">Cookies & Tracking</h3>
                  <p className="text-sm">You can control cookies through your browser settings. Some features may not work if cookies are disabled.</p>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Children's Privacy</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• Our services are not intended for children under 18</p>
                <p>• We do not knowingly collect information from children under 18</p>
                <p>• If we discover we have collected information from a child, we will delete it immediately</p>
                <p>• Parents should contact us if they believe their child has provided personal information</p>
              </div>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">International Users</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• Our services are operated from the United States</p>
                <p>• If you are accessing from outside the US, your information may be transferred to the US</p>
                <p>• We comply with applicable data protection laws</p>
                <p>• EU users have additional rights under GDPR</p>
                <p>• California residents have rights under CCPA</p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Changes to This Policy</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p>• We may update this Privacy Policy from time to time</p>
                <p>• We will notify you of significant changes via email or website notice</p>
                <p>• Continued use of our services constitutes acceptance of updated policy</p>
                <p>• Previous versions will be archived and available upon request</p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">Contact Us</h2>
              <div className="bg-[#2d3748] rounded-lg p-4 space-y-3">
                <p><strong>For privacy-related questions or requests:</strong></p>
                <p>Email: privacy@edgecasino.com</p>
                <p>Data Protection Officer: dpo@edgecasino.com</p>
                <p>Support: support@edgecasino.com</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
