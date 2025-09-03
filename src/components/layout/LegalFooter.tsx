'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, FileText, Heart, AlertTriangle } from 'lucide-react'

export default function LegalFooter() {
  return (
    <footer className="bg-[#0f1a2a] border-t border-[#2d3748] mt-auto">
      <div className="container mx-auto px-4 py-6">
        {/* Main Legal Notice */}
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-center font-bold text-red-400 text-sm">
            NO PURCHASE NECESSARY. VOID WHERE PROHIBITED. 18+ ONLY. 
            GOLD COINS HAVE NO MONETARY VALUE. SWEEPSTAKES COINS ARE PROMOTIONAL ENTRIES.
          </p>
        </div>

        {/* Legal Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link 
            href="/legal/terms" 
            className="flex items-center space-x-2 text-gray-300 hover:text-[#00d4ff] transition-colors p-2 rounded"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm">Terms of Service</span>
          </Link>
          
          <Link 
            href="/legal/privacy" 
            className="flex items-center space-x-2 text-gray-300 hover:text-[#00d4ff] transition-colors p-2 rounded"
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm">Privacy Policy</span>
          </Link>
          
          <Link 
            href="/legal/responsible-gaming" 
            className="flex items-center space-x-2 text-gray-300 hover:text-[#00d4ff] transition-colors p-2 rounded"
          >
            <Heart className="h-4 w-4" />
            <span className="text-sm">Responsible Gaming</span>
          </Link>
          
          <Link 
            href="/legal/disclaimers" 
            className="flex items-center space-x-2 text-gray-300 hover:text-[#00d4ff] transition-colors p-2 rounded"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Legal Disclaimers</span>
          </Link>
        </div>

        {/* Age Restriction & Jurisdiction */}
        <div className="text-center text-gray-400 text-xs space-y-2">
          <p>18+ ONLY. NOT AVAILABLE IN WA, ID, NV, MI</p>
          <p>© 2024 EDGE Casino. All rights reserved.</p>
          <p>For help with gambling problems, call 1-800-522-4700</p>
        </div>
      </div>
    </footer>
  )
}
