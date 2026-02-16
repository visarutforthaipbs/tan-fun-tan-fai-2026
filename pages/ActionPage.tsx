import React from 'react';
import { Link } from 'react-router-dom';
import { GetInvolved } from '../components/GetInvolved';
import { CitizenInnovation } from '../components/CitizenInnovation';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

const ActionPage: React.FC = () => {
    return (
        <div className="pt-16 pb-16">
            <SEO
                title="ช่วยกันทำ - Action Hub"
                description="รวมโปรเจกต์ สมทบทุน และการเป็นอาสาสมัครเพื่อร่วมแก้ปัญหาฝุ่นควันภาคเหนือ"
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
                        ร่วมเป็นส่วนหนึ่งของการแก้ปัญหา
                    </h1>
                    <p className="text-lg text-brand-grey max-w-2xl font-body">
                        เปลี่ยนความโกรธเป็นพลัง — สมทบทุน สมัครเป็นอาสา หรือร่วมติดตามกฎหมายอากาศสะอาด เพื่อคืนอากาศบริสุทธิ์ให้พวกเราทุกคน
                    </p>
                </div>
            </div>

            {/* Action Stats Cards */}
            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <div className="text-2xl font-bold text-brand-orange font-heading">3 โครงการ</div>
                        <div className="text-xs text-brand-grey font-medium uppercase tracking-wider mt-1">ต้องการการสนับสนุน</div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <div className="text-2xl font-bold text-brand-black font-heading">50 อาสา</div>
                        <div className="text-xs text-brand-grey font-medium uppercase tracking-wider mt-1">ที่กำลังเปิดรับสมัคร</div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 text-center">
                        <div className="text-2xl font-bold text-brand-black font-heading">15,000+</div>
                        <div className="text-xs text-brand-grey font-medium uppercase tracking-wider mt-1">รายชื่อร่วมลงนาม</div>
                    </div>
                </div>
            </div>

            {/* Full Get Involved Section */}
            <GetInvolved />

            {/* Citizen Innovation Section */}
            <div className="bg-gradient-to-b from-brand-white to-brand-smoke/30 py-10">
                <CitizenInnovation />
            </div>
        </div>
    );
};

export default ActionPage;
