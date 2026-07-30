import React from 'react';
import { motion } from 'motion/react';
import { Recycle, Anvil, CheckCircle2 } from 'lucide-react';
import type { MaterialCategory } from '../../types/registration';

interface MaterialCardProps {
  material: MaterialCategory;
  selected: boolean;
  onSelect: (material: MaterialCategory) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  selected,
  onSelect,
}) => {
  const isPlastic = material === 'plastic';

  const title = isPlastic ? 'Plastic Materials' : 'Metal Materials';
  const subtitle = isPlastic
    ? 'PET, HDPE, PP, LDPE, MLP & Flexible Plastics'
    : 'Aluminum, Copper, Ferrous & Non-Ferrous Scrap';

  const description = isPlastic
    ? 'Comprehensive recycling & EPR fulfillment for rigid, flexible, multi-layered, and compostable plastic waste streams.'
    : 'Industrial scrap tracking, ingot certifications, and metallic circularity documentation for metal recyclers.';

  const Icon = isPlastic ? Recycle : Anvil;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      animate={{
        scale: selected ? 1.02 : 1,
        borderColor: selected ? '#0F766E' : '#D6E8DE',
      }}
      onClick={() => onSelect(material)}
      className={`relative p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        selected
          ? 'bg-[#ECFDF5]/60 border-[#0F766E] shadow-lg shadow-[#0F766E]/10 ring-2 ring-[#0F766E]/20'
          : 'bg-white border-[#D6E8DE] shadow-xs hover:border-[#0F766E]/50 hover:shadow-md'
      }`}
    >
      {/* Radio Indicator */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            selected
              ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/30'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>

        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            selected
              ? 'border-[#0F766E] bg-[#0F766E] text-white'
              : 'border-slate-300 bg-white'
          }`}
        >
          {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
      </div>

      {/* Title & Info */}
      <div>
        <h4 className="text-lg font-extrabold text-[#0F172A] mb-1">{title}</h4>
        <span className="text-xs font-bold text-[#0F766E] block mb-2">{subtitle}</span>
        <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
      </div>

      {/* Selection state footer pill */}
      <div className="mt-5 pt-4 border-t border-[#D6E8DE]">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
            selected
              ? 'bg-[#0F766E] text-white'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {selected ? 'Selected Primary Material' : 'Click to Select'}
        </span>
      </div>
    </motion.div>
  );
};
