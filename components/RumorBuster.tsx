import React, { useState } from 'react';
import { RUMORS } from '../data';
import { X, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const RumorBuster: React.FC = () => {
    const [openId, setOpenId] = useState<string | null>(RUMORS[0].id);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const getIcon = (verdict: string) => {
        if (verdict === 'True') return <Check className="text-brand-black" />;
        if (verdict === 'False') return <X className="text-brand-orange" />;
        return <AlertCircle className="text-brand-grey" />;
    };

    const getColor = (verdict: string) => {
        if (verdict === 'True') return 'border-brand-black/10 bg-brand-smoke';
        if (verdict === 'False') return 'border-brand-orange/20 bg-brand-alert';
        return 'border-brand-grey/20 bg-brand-smoke';
    };

    return (
        <section id="rumors" className="py-12 px-6 max-w-3xl mx-auto scroll-mt-24">
            <h2 className="text-2xl font-bold text-center mb-8 text-brand-black">Rumor Buster: ข่าวลือ vs ความจริง</h2>
            
            <div className="space-y-4">
                {RUMORS.map((item) => (
                    <div key={item.id} className="bg-brand-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <button 
                            onClick={() => toggle(item.id)}
                            className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-brand-smoke transition-colors"
                        >
                            <span className="font-medium text-brand-black pr-4">ข่าวลือ: "{item.title}"</span>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                                    item.verdict === 'False' ? 'bg-brand-alert text-brand-orange' : 'bg-brand-smoke text-brand-black'
                                }`}>
                                    {item.verdict}
                                </span>
                                {openId === item.id ? <ChevronUp size={18} className="text-brand-grey"/> : <ChevronDown size={18} className="text-brand-grey"/>}
                            </div>
                        </button>
                        
                        {openId === item.id && (
                            <div className={`p-4 md:p-5 border-t ${getColor(item.verdict)} animate-fade-in`}>
                                <div className="flex gap-3">
                                    <div className="mt-1 flex-shrink-0">{getIcon(item.verdict)}</div>
                                    <p className="text-brand-black leading-relaxed">{item.explanation}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};