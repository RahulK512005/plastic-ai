'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Recycle,
  Factory,
  FileCheck2,
  TrendingUp,
  Download,
  Plus,
  LogOut,
  CheckCircle,
  Clock,
  ShieldCheck,
  Search,
  PackageCheck,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const RecyclerDashboardPage: React.FC = () => {
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
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <Factory className="w-3.5 h-3.5" /> Recycler Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>CPCB Recycler ID: <strong>CPCB-REC-2026-4402</strong></span>
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
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Facility • Growth Processing Tier
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">GreenPoly Recyclers Facility Terminal</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Location: GIDC Industrial Estate, Surat, Gujarat • Mechanical Recycling Unit
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="md" icon={<Download className="w-4 h-4" />}>
              Weighbridge Logs
            </Button>
            <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
              Issue Credit Certificate
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Monthly Capacity</span>
              <Factory className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">250.0 MT</div>
            <div className="text-[11px] text-slate-500 mt-1">Surat Plant Processing</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Credits Issued (July)</span>
              <FileCheck2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">198.4 MT</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">80% Utilization Rate</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Available Quota</span>
              <PackageCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">51.6 MT</div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">Ready for Brand Purchase</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Brand Buyers Connected</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">28 Brands</div>
            <div className="text-[11px] text-slate-500 mt-1">Direct Escrow Settlement</div>
          </div>
        </div>

        {/* Recent Issued Certificates */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">Issued Plastic Recycling Certificates</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search brand buyer or certificate..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 outline-none focus:border-emerald-600 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Certificate ID</th>
                  <th className="py-3 px-4">Brand Owner (Buyer)</th>
                  <th className="py-3 px-4">Plastic Category</th>
                  <th className="py-3 px-4">Weight (MT)</th>
                  <th className="py-3 px-4">CPCB Batch ID</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">PUN-CERT-2026-9041</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Acme Consumer Goods Pvt Ltd</td>
                  <td className="py-3.5 px-4">Category I (PET Flakes)</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">45.0 MT</td>
                  <td className="py-3.5 px-4 font-mono text-xs">CPCB-BATCH-8821</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Dispatched</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-700 font-bold hover:underline">View Proof</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">PUN-CERT-2026-9012</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">PureBeverage India Ltd</td>
                  <td className="py-3.5 px-4">Category I (PET)</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">80.0 MT</td>
                  <td className="py-3.5 px-4 font-mono text-xs">CPCB-BATCH-8790</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Dispatched</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-700 font-bold hover:underline">View Proof</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">PUN-CERT-2026-8902</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Nova Personal Care Inc</td>
                  <td className="py-3.5 px-4">Category II (Rigid HDPE)</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">73.4 MT</td>
                  <td className="py-3.5 px-4 font-mono text-xs">CPCB-BATCH-8650</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Dispatched</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-700 font-bold hover:underline">View Proof</button>
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
