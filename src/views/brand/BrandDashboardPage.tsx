'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Recycle,
  Building2,
  FileCheck2,
  Award,
  TrendingUp,
  Download,
  Plus,
  LogOut,
  CheckCircle,
  Clock,
  ShieldCheck,
  Search,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const BrandDashboardPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Punarvritt</span>
            </Link>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Building2 className="w-3.5 h-3.5" /> Brand Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>CPCB Reg: <strong>CPCB-PIBO-2026-8812</strong></span>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={<LogOut className="w-3.5 h-3.5" />}
              onClick={() => router.push('/')}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Account Active • Growth Plan
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Acme Consumer Goods Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Annual EPR Compliance Obligation Tracking (FY 2026-27)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="md" icon={<Download className="w-4 h-4" />}>
              Export CPCB Report
            </Button>
            <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
              Buy EPR Credits
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Total Target Quota</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">250.0 MT</div>
            <div className="text-[11px] text-slate-500 mt-1">Category I, II & III Plastic</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Fulfilled Credits</span>
              <FileCheck2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">182.5 MT</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">73% Obligation Met</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Pending Quota</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">67.5 MT</div>
            <div className="text-[11px] text-amber-600 font-medium mt-1">Due before March 31</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Verified Certificates</span>
              <TrendingUp className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">14 Certificates</div>
            <div className="text-[11px] text-slate-500 mt-1">Tamper-proof Digital Proofs</div>
          </div>
        </div>

        {/* Recent EPR Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">Recent Plastic Credit Purchases</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by certificate ID..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 outline-none focus:border-emerald-600 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Certificate ID</th>
                  <th className="py-3 px-4">Recycler Partner</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Volume (MT)</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">PUN-CERT-2026-9041</td>
                  <td className="py-3.5 px-4">GreenPoly Recyclers Pvt Ltd</td>
                  <td className="py-3.5 px-4">Category I (PET)</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">45.0 MT</td>
                  <td className="py-3.5 px-4">28 Jul 2026</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">CPCB Verified</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-700 font-bold hover:underline">Download PDF</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">PUN-CERT-2026-8819</td>
                  <td className="py-3.5 px-4">Apex Eco-Processing Gujarat</td>
                  <td className="py-3.5 px-4">Category II (Rigid PP)</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">30.0 MT</td>
                  <td className="py-3.5 px-4">15 Jul 2026</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">CPCB Verified</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-700 font-bold hover:underline">Download PDF</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">PUN-CERT-2026-7200</td>
                  <td className="py-3.5 px-4">EcoClean Aggregators India</td>
                  <td className="py-3.5 px-4">Category III (MLP)</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">107.5 MT</td>
                  <td className="py-3.5 px-4">02 Jun 2026</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">CPCB Verified</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-700 font-bold hover:underline">Download PDF</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
