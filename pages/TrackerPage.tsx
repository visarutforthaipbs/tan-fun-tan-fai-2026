import React from 'react';
import { Link } from 'react-router-dom';
import { TrackerSection } from '../components/TrackerSection';
import { ArrowLeft, Database, Activity, Archive } from 'lucide-react';
import { POLICY_DATA } from '../data';
import { SEO } from '../components/SEO';

const TrackerPage: React.FC = () => {
    const totalPolicies = POLICY_DATA.length;
    const inProgress = POLICY_DATA.filter(p => p.status === 'doing').length;
    const lessons = POLICY_DATA.filter(p => p.status === 'failed').length;

    return (
        <div className="pt-16 pb-16">
            <SEO
                title="ติดตามนโยบาย - Policy Tracker"
                description="รวมทุกนโยบายและโครงการที่เคยถูกเสนอ กำลังดำเนินการ หรือล้มเหลว เพื่อหยุดการวนลูปของปัญหาเดิมๆ"
            />
            {/* Page Header */}
            <div className="bg-brand-black px-6 pt-12 pb-20 relative overflow-hidden">
                {/* Abstract Background Detail */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-brand-grey hover:text-brand-orange transition-colors mb-6 font-medium">
                        <ArrowLeft size={16} /> กลับหน้าหลัก
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                        กระดานติดตามการแก้ปัญหา
                    </h1>
                    <p className="text-lg text-brand-grey max-w-2xl font-body">
                        รวมทุกนโยบายและโครงการที่เคยถูกเสนอ กำลังดำเนินการ หรือล้มเหลว — เพื่อหยุดการวนลูปของปัญหาเดิมๆ และเริ่มเรียนรู้จากบทเรียนที่ผ่านมา
                    </p>
                </div>
            </div>

            {/* Tracker Stats Cards */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-smoke rounded-lg flex items-center justify-center text-brand-black">
                            <Database size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-brand-black font-heading">{totalPolicies} รายการ</div>
                            <div className="text-xs text-brand-grey font-medium uppercase tracking-wider">นโยบายที่ถูกบันทึก</div>
                        </div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-alert rounded-lg flex items-center justify-center text-brand-orange">
                            <Activity size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-brand-orange font-heading">{inProgress} โครงการ</div>
                            <div className="text-xs text-brand-grey font-medium uppercase tracking-wider">กำลังดำเนินการ</div>
                        </div>
                    </div>
                    <div className="bg-brand-white rounded-xl p-6 shadow-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-smoke rounded-lg flex items-center justify-center text-brand-black">
                            <Archive size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-brand-black font-heading">{lessons} บทเรียน</div>
                            <div className="text-xs text-brand-grey font-medium uppercase tracking-wider">ที่ล้มเหลวและต้องเรียนรู้</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Tracker Section */}
            <TrackerSection />
        </div>
    );
};

export default TrackerPage;
