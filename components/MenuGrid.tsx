import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Activity, Heart, LifeBuoy, ArrowRight } from 'lucide-react';

export const MenuGrid: React.FC = () => {
    const MENU_ITEMS = [
        {
            title: 'รู้ทันฝุ่น',
            description: 'เข้าใจที่มาและต้นตอของปัญหา',
            icon: <BookOpen className="text-white" size={32} />,
            link: '/haze-101',
            color: 'bg-brand-black',
            textColor: 'text-white'
        },
        {
            title: 'ติดตามนโยบาย',
            description: 'เกาะติดการแก้ปัญหาจากภาครัฐ',
            icon: <Activity className="text-brand-black" size={32} />,
            link: '/tracker',
            color: 'bg-brand-orange',
            textColor: 'text-brand-black'
        },
        {
            title: 'คู่มือเอาตัวรอด',
            description: 'ดูแลตัวเองและคนที่คุณรัก',
            icon: <Heart className="text-white" size={32} />,
            link: '/survival',
            color: 'bg-brand-active',
            textColor: 'text-white'
        },
        {
            title: 'ช่วยกันทำ',
            description: 'รวมพลังพลเมืองแก้ปัญหาฝุ่น',
            icon: <LifeBuoy className="text-brand-black" size={32} />,
            link: '/action',
            color: 'bg-brand-smoke',
            textColor: 'text-brand-black'
        }
    ];

    return (
        <section className="py-12 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-black font-heading mb-3">
                    สำรวจข้อมูล
                </h2>
                <p className="text-brand-grey font-body">เข้าถึงข้อมูลที่คุณสนใจได้โดยตรง</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MENU_ITEMS.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className={`
                            group relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                            ${item.color}
                        `}
                    >
                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[10rem] md:min-h-[12rem]">
                            <div>
                                <div className="mb-4 opacity-90">{item.icon}</div>
                                <h3 className={`text-xl font-bold font-heading mb-1 ${item.textColor}`}>
                                    {item.title}
                                </h3>
                                <p className={`text-sm opacity-80 font-body ${item.textColor}`}>
                                    {item.description}
                                </p>
                            </div>

                            <div className={`mt-4 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${item.textColor}`}>
                                ไปที่หน้า <ArrowRight size={16} />
                            </div>
                        </div>

                        {/* Decorate Circle */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white opacity-10 group-hover:scale-150 transition-transform duration-500"></div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
