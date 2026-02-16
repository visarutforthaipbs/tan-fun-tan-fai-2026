import React from 'react';
import { Link } from 'react-router-dom';
import { SurvivalSection } from '../components/SurvivalSection';
import { ArrowLeft, Shield, Wind, MapPin } from 'lucide-react';
import { SEO } from '../components/SEO';

const SurvivalPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-white font-body pb-20">
            <SEO
                title="คู่มือเอาตัวรอด - Survival Guide"
                description="แผนที่อากาศสะอาด วิธีทำเครื่องฟอกอากาศ DIY และ Checklist ก่อนออกจากบ้าน — ทุกอย่างที่คุณต้องรู้เพื่อรอดจากฤดูฝุ่น"
            />
            {/* Page Header */}
            <div className="bg-brand-black px-6 pt-12 pb-20 relative overflow-hidden text-brand-white">
                {/* Abstract Background Detail */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-brand-grey hover:text-brand-orange transition-colors mb-6 font-medium">
                        <ArrowLeft size={16} /> กลับหน้าหลัก
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                        คู่มือเอาตัวรอด
                    </h1>
                    <p className="text-lg text-brand-grey max-w-2xl font-body">
                        แผนที่อากาศสะอาด วิธีทำเครื่องฟอกอากาศ DIY และ Checklist ก่อนออกจากบ้าน — ทุกอย่างที่คุณต้องรู้เพื่อรอดจากฤดูฝุ่น
                    </p>
                </div>
            </div>

            {/* Quick Tips Cards */}
            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <Shield className="mx-auto text-brand-black mb-2" size={28} />
                        <div className="text-sm font-bold text-brand-black font-heading uppercase">สวมหน้ากาก N95</div>
                        <div className="text-xs text-brand-grey mt-1 font-medium">ทุกครั้งที่ออกจากบ้าน</div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <Wind className="mx-auto text-brand-black mb-2" size={28} />
                        <div className="text-sm font-bold text-brand-black font-heading uppercase">เครื่องฟอก DIY</div>
                        <div className="text-xs text-brand-grey mt-1 font-medium">ราคาไม่ถึง 500 บาท</div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <MapPin className="mx-auto text-brand-orange mb-2" size={28} />
                        <div className="text-sm font-bold text-brand-black font-heading uppercase">หาพื้นที่สะอาด</div>
                        <div className="text-xs text-brand-grey mt-1 font-medium">จากแผนที่ Crowdsourced</div>
                    </div>
                </div>
            </div>

            {/* Main Survival Content - Map & DIY */}
            <SurvivalSection />
        </div>
    );
};

export default SurvivalPage;
