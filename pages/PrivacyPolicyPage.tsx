import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto min-h-screen">
            <Link to="/" className="inline-flex items-center gap-2 text-brand-grey hover:text-brand-orange transition-colors mb-8 font-medium">
                <ArrowLeft size={16} /> กลับหน้าหลัก
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-8">นโยบายความเป็นส่วนตัว</h1>

            <div className="prose prose-lg max-w-none font-body text-gray-700 space-y-6">
                <p>
                    <strong>Tan Fun Tan Fai (ทันฝุ่นทันไฟ)</strong> ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณ
                    เอกสารนี้อธิบายวิธีการที่เราเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของคุณ
                </p>

                <h3 className="text-xl font-bold text-brand-black font-heading mt-8">1. ข้อมูลที่เราเก็บรวบรวม</h3>
                <p>
                    เนื่องจากเว็บไซต์นี้เป็นโครงการ Open Source เพื่อการศึกษาและสาธิต (Demo Project)
                    เรา <strong>ไม่มีการเก็บรวบรวมข้อมูลส่วนบุคคล</strong> ที่สามารถระบุตัวตนได้โดยตรง (เช่น ชื่อ, อีเมล, เบอร์โทรศัพท์)
                    นอกเหนือจากข้อมูลทางเทคนิคที่จำเป็นต่อการใช้งานเว็บไซต์ตามปกติ (เช่น IP Address, Browser Data)
                </p>

                <h3 className="text-xl font-bold text-brand-black font-heading mt-8">2. การใช้คุกกี้ (Cookies)</h3>
                <p>
                    เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานเว็บไซต์ และเพื่อการวิเคราะห์ทางสถิติที่ไม่ระบุตัวตน
                    คุกกี้เหล่านี้ช่วยให้เราเข้าใจว่าผู้ใช้มีปฏิสัมพันธ์กับเว็บไซต์อย่างไร
                </p>

                <h3 className="text-xl font-bold text-brand-black font-heading mt-8">3. ลิงก์ไปยังเว็บไซต์ภายนอก</h3>
                <p>
                    เว็บไซต์ของเราอาจมีลิงก์ไปยังเว็บไซต์อื่น ๆ หากคุณคลิกลิงก์เหล่านั้น คุณจะถูกนำไปยังเว็บไซต์ภายนอก
                    เราขอแนะนำให้คุณอ่านนโยบายความเป็นส่วนตัวของเว็บไซต์เหล่านั้น เนื่องจากเราไม่สามารถควบคุมดูแลได้
                </p>

                <h3 className="text-xl font-bold text-brand-black font-heading mt-8">4. การเปลี่ยนแปลงนโยบาย</h3>
                <p>
                    เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงใด ๆ จะมีการประกาศในหน้านี้
                </p>

                <div className="mt-12 p-6 bg-brand-smoke rounded-xl border border-gray-200 text-sm md:text-base">
                    <p className="font-bold mb-2">ติดต่อเรา</p>
                    <p>หากมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัว สามารถติดต่อเราได้ที่ GitHub Repository ของโครงการ</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
