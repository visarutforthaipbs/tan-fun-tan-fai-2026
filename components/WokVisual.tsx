import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WokVisual: React.FC = () => {
  const [showInversion, setShowInversion] = useState(true);

  return (
    <div className="relative w-full h-60 md:h-80 bg-brand-smoke rounded-xl overflow-hidden border border-gray-200 shadow-inner">
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setShowInversion(!showInversion)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md ${showInversion ? 'bg-brand-orange text-white' : 'bg-brand-white text-brand-black border border-gray-200'
            }`}
        >
          {showInversion ? 'ปิดฝาชี (Inversion ON)' : 'เปิดฝาชี (Inversion OFF)'}
        </button>
      </div>

      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        {/* Sky */}
        <rect width="400" height="300" fill="#F5F5F5" />

        {/* Mountains (The Wok) */}
        <path
          d="M-50,300 L-50,120 Q50,220 200,250 Q350,220 450,120 L450,300 Z"
          fill="#8C8C8C"
        />

        {/* City on Valley Floor */}
        <g opacity="0.8">
          <rect x="170" y="235" width="60" height="20" fill="#1A1A1A" rx="2" />
          <rect x="185" y="225" width="10" height="15" fill="#1A1A1A" rx="1" />
          <rect x="205" y="220" width="8" height="20" fill="#1A1A1A" rx="1" />
        </g>

        {/* Trapped Smoke - only when inversion is ON */}
        <AnimatePresence>
          {showInversion && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Inversion Lid */}
              <motion.line
                initial={{ x1: 0, x2: 400, y1: 0, y2: 0 }}
                animate={{ y1: 100, y2: 100 }}
                stroke="#F15A24"
                strokeWidth="3"
                strokeDasharray="8,4"
              />
              <text x="10" y="90" className="text-[12px] fill-brand-orange font-bold font-heading">Inversion Layer (ฝาชีครอบ)</text>

              {/* Smoke Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={100 + Math.random() * 200}
                  cy={150 + Math.random() * 80}
                  r={5 + Math.random() * 15}
                  fill="#8C8C8C"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Normal Air Flow - when inversion is OFF */}
        <AnimatePresence>
          {!showInversion && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.path
                d="M-20,80 Q200,80 420,80"
                stroke="#1A1A1A"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <text x="10" y="70" className="text-[12px] fill-brand-black font-bold font-heading">Wind Flow (อากาศถ่ายเท)</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      <div className="absolute bottom-4 right-4 bg-brand-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
        <p className="text-xs text-brand-black font-bold">ภูมิศาสตร์แอ่งกระทะเชียงใหม่</p>
      </div>

      <div className="absolute bottom-4 left-4 max-w-[200px]">
        <p className="text-[10px] text-brand-white leading-tight italic bg-brand-white/50 p-2 rounded">
          {showInversion
            ? "อากาศเย็นถูกกดทับด้วยอากาศอุ่นด้านบน ทำให้ฝุ่นถูกกักขังอยู่ในแอ่ง"
            : "เมื่อไม่มีชั้นอุณหภูมิผกผัน ลมจะสามารถพัดพาฝุ่นออกจากพื้นที่ได้"}
        </p>
      </div>
    </div>
  );
};