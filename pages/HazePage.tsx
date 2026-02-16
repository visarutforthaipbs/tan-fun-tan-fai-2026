import React from 'react';
import { Link } from 'react-router-dom';
import { ContextSection } from '../components/ContextSection';
import { ArrowLeft, Mountain, Wind, Flame as FireIcon } from 'lucide-react';
import { SEO } from '../components/SEO';

const HazePage: React.FC = () => {
    return (
        <div className="pt-16 pb-16">
            <SEO
                title="รู้ทันฝุ่น - Haze 101"
                description="เข้าใจปัญหาฝุ่นควันภาคเหนืออย่างลึกซึ้ง จากภูมิศาสตร์ สภาพอากาศ สู่เศรษฐกิจ — ทำไมปัญหานี้ถึงซับซ้อนกว่าที่คิด"
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
                        ทำไมฝุ่นไม่หายไป?
                    </h1>
                    <p className="text-lg text-brand-grey max-w-2xl font-body">
                        เข้าใจปัญหาฝุ่นควันภาคเหนืออย่างลึกซึ้ง จากภูมิศาสตร์ สภาพอากาศ สู่เศรษฐกิจ — ทำไมปัญหานี้ถึงซับซ้อนกว่าที่คิด
                    </p>
                </div>
            </div>

            {/* Key Stats Cards */}
            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <Mountain className="mx-auto text-brand-black mb-2" size={28} />
                        <div className="text-2xl font-bold text-brand-black font-heading">310 เมตร</div>
                        <div className="text-xs text-brand-grey font-medium uppercase tracking-wider">ความลึกของแอ่งกระทะ</div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <Wind className="mx-auto text-brand-black mb-2" size={28} />
                        <div className="text-2xl font-bold text-brand-black font-heading">3-5 เดือน</div>
                        <div className="text-xs text-brand-grey font-medium uppercase tracking-wider">ระยะเวลาฝาชีครอบ</div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <FireIcon className="mx-auto text-brand-orange mb-2" size={28} />
                        <div className="text-2xl font-bold text-brand-black font-heading">~51%</div>
                        <div className="text-xs text-brand-grey font-medium uppercase tracking-wider">มาจากการเผาชีวมวล</div>
                    </div>
                </div>
            </div>

            {/* Full Context Section */}
            <ContextSection />
        </div>
    );
};

export default HazePage;
