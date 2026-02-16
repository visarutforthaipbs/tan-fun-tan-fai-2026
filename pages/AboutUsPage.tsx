import React from 'react';
import { ArrowLeft, Github, Database, Code2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUsPage: React.FC = () => {
    return (
        <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto min-h-screen">
            <Link to="/" className="inline-flex items-center gap-2 text-brand-grey hover:text-brand-orange transition-colors mb-8 font-medium">
                <ArrowLeft size={16} /> กลับหน้าหลัก
            </Link>

            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">เกี่ยวกับเรา</h1>
                <p className="text-xl text-brand-grey max-w-2xl mx-auto font-body">
                    เราเชื่อว่า "ข้อมูล" คืออาวุธที่ทรงพลังที่สุดในการต่อสู้กับฝุ่นควัน
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6 font-body text-gray-700 text-lg">
                    <p>
                        <strong>Tan Fun Tan Fai (ทันฝุ่นทันไฟ)</strong> คือแพลตฟอร์มสื่อสารข้อมูลฝุ่น PM2.5
                        ที่มุ่งเน้นการนำเสนอความจริงที่เข้าใจง่าย ไม่ซับซ้อน และกระตุ้นให้เกิดการลงมือทำ
                    </p>
                    <p>
                        โครงการนี้เกิดขึ้นจากความตั้งใจที่จะเปลี่ยน "ข้อมูลทางวิชาการที่ซับซ้อน"
                        ให้กลายเป็นเรื่องเล่าที่เข้าถึงคนทั่วไป เพื่อให้ชาวเชียงใหม่และคนไทยทุกคน
                        ตระหนักถึงรากเหง้าของปัญหาและร่วมกันหาทางออกที่ยั่งยืน
                    </p>
                </div>
                <div className="bg-brand-black text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange opacity-20 blur-[100px]"></div>
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                <Database className="text-brand-orange" />
                            </div>
                            <div>
                                <h3 className="font-bold font-heading text-xl">Data-Driven</h3>
                                <p className="text-sm text-gray-400">ขับเคลื่อนด้วยข้อมูลจริงและงานวิจัยที่น่าเชื่อถือ</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                <Code2 className="text-brand-active" />
                            </div>
                            <div>
                                <h3 className="font-bold font-heading text-xl">Open Source</h3>
                                <p className="text-sm text-gray-400">โปร่งใส ตรวจสอบได้ และเปิดให้ทุกคนร่วมพัฒนา</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                <Heart className="text-pink-500" />
                            </div>
                            <div>
                                <h3 className="font-bold font-heading text-xl">For Impact</h3>
                                <p className="text-sm text-gray-400">ทำเพื่อสร้างการเปลี่ยนแปลง ไม่ใช่แค่แสดงผล</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team / Contact Section */}
            <div className="bg-brand-white border border-gray-100 rounded-xl p-8 md:p-12 text-center shadow-lg">
                <h2 className="text-3xl font-bold font-heading mb-6">ร่วมเป็นส่วนหนึ่งกับเรา</h2>
                <p className="text-brand-grey font-body mb-8 max-w-2xl mx-auto">
                    โปรเจกต์นี้เป็น Open Source บน GitHub หากคุณเป็นนักพัฒนา นักออกแบบ หรือผู้เชี่ยวชาญด้านข้อมูล
                    คุณสามารถมาร่วม Contrubute เพื่อพัฒนาเครื่องมือนี้ให้ดียิ่งขึ้นได้
                </p>
                <a
                    href="https://github.com/visarut-sankham/tan-fun-tan-fai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all font-bold"
                >
                    <Github size={20} /> ไปที่ GitHub Repository
                </a>
            </div>
        </div>
    );
};

export default AboutUsPage;
