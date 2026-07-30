import React from 'react';
import { motion } from 'motion/react';
import { Scale, CheckCircle2, Factory, ShieldCheck, Zap, Layers } from 'lucide-react';
import type { CapacityTier, CapacityTierDetail } from '../../types/registration';
import { CAPACITY_TIERS } from '../../data/pricing';

interface CapacityCardProps {
  selectedTier: CapacityTier;
  onSelect: (tier: CapacityTier) => void;
}

export const CapacityCard: React.FC<CapacityCardProps> = ({
  selectedTier,
  onSelect,
}) => {
  const selectedDetail = CAPACITY_TIERS.find((t) => t.id === selectedTier) || CAPACITY_TIERS[1];

  const getTierIcon = (id: CapacityTier) => {
    switch (id) {
      case 'tier1':
        return <Scale className="w-6 h-6" />;
      case 'tier2':
        return <Layers className="w-6 h-6" />;
      case 'tier3':
        return <Factory className="w-6 h-6" />;
      case 'tier4':
        return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div>
      {/* 3 Tier Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {CAPACITY_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;

          return (
            <motion.div
              key={tier.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                scale: isSelected ? 1.02 : 1,
                borderColor: isSelected ? '#0F766E' : '#D6E8DE',
              }}
              onClick={() => onSelect(tier.id)}
              className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#ECFDF5]/70 border-[#0F766E] shadow-lg shadow-[#0F766E]/15 ring-2 ring-[#0F766E]/20'
                  : 'bg-white border-[#D6E8DE] shadow-xs hover:border-[#0F766E]/50 hover:shadow-md'
              }`}
            >
              {/* Selected Check Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/30'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {getTierIcon(tier.id)}
                </div>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
                )}
              </div>

              {/* Title & Range */}
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E] block mb-1">
                  {tier.title}
                </span>
                <h4 className="text-xl font-black text-[#0F172A] tracking-tight mb-2">
                  {tier.range}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tier.description}
                </p>
              </div>

              {/* Tag Footer */}
              <div className="pt-3 border-t border-[#D6E8DE]/80">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md block truncate text-center ${
                    isSelected
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tier.recommendedFor}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Tier Callout Box */}
      <motion.div
        key={selectedDetail.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#0F766E] to-[#065F46] text-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-[#0F766E]/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 block">
              Selected Processing Capacity Tier
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
              You are in <span className="text-emerald-300">{selectedDetail.title}</span> ({selectedDetail.range})
            </h3>
            <p className="text-xs text-emerald-100/90 mt-1">
              Your subscription plan pricing in the next step will automatically adjust to this capacity band.
            </p>
          </div>
        </div>

        <div className="relative z-10 shrink-0 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-200 block">
            Annual Tonnage Range
          </span>
          <span className="text-lg font-black text-white">{selectedDetail.range}</span>
        </div>
      </motion.div>
    </div>
  );
};
