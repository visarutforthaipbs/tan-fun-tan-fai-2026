import React from 'react';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-black text-brand-grey py-12 px-6 border-t border-brand-grey/20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo/logo.svg" alt="Tan Fun Tan Fai Logo" className="h-15 w-auto brightness-200 grayscale" />
                    </div>

                    <div className="text-sm text-center md:text-right space-y-2">
                        <p>&copy; 2024 Tan Fun Tan Fai. Open Source Project.</p>
                        <p className="text-brand-grey/60">ข้อมูลในเว็บนี้เป็นข้อมูลจำลอง (Mock Data) เพื่อการสาธิตเท่านั้น</p>
                        <div className="flex justify-center md:justify-end gap-4 mt-2">
                            <Link to="/privacy-policy" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
                            <Link to="/about-us" className="hover:text-white transition-colors">เกี่ยวกับเรา</Link>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                                <Github size={14} /> Contribute
                            </a>
                        </div>
                    </div>
                </div>

                {/* Partners */}
                <div className="mt-8 pt-8 border-t border-brand-grey/20">
                    <p className="text-xs text-brand-grey/60 text-center mb-4 uppercase tracking-wide font-heading">หน่วยงานสนับสนุน</p>
                    <div className="flex justify-center items-center gap-8 flex-wrap">
                        <img src="/logo/partners-1.svg" alt="Partner" className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity" />
                        <img src="/logo/partners-2.svg" alt="Partner" className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity" />
                        <img src="/logo/partners-3.svg" alt="Partner" className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </footer>
    );
};