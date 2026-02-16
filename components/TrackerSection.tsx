import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { POLICY_DATA } from '../data';
import { PolicyStatus } from '../types';
import { AlertOctagon, Clock, ListTodo } from 'lucide-react';
import { NewcomerContext } from '../App';

export const TrackerSection: React.FC = () => {
    const { isNewcomer } = useContext(NewcomerContext);

    const columnDefinitions = [
        { 
            id: 'proposed', 
            title: '1. ข้อเสนอและแนวคิด', 
            subtitle: 'รายการที่อยากให้เกิดขึ้น',
            statuses: ['todo'] as PolicyStatus[],
            bgColor: 'bg-brand-white',
            borderColor: 'border-brand-grey/20',
            icon: <ListTodo className="text-brand-grey" size={20} /> 
        },
        { 
            id: 'progress', 
            title: '2. กำลังดำเนินการ', 
            subtitle: 'โครงการนำร่องและการทดสอบ',
            statuses: ['doing'] as PolicyStatus[],
            bgColor: 'bg-brand-alert',
            borderColor: 'border-brand-orange/30',
            icon: <Clock className="text-brand-orange" size={20} /> 
        },
        { 
            id: 'archive', 
            title: '3. บทเรียนและผลลัพธ์', 
            subtitle: 'โครงการที่ทำแล้วและบทเรียน',
            statuses: ['done', 'failed'] as PolicyStatus[],
            bgColor: 'bg-brand-smoke',
            borderColor: 'border-brand-grey/20',
            icon: <AlertOctagon className="text-brand-black" size={20} />
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <section id="tracker" className="py-20 bg-brand-smoke px-6 scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-black font-heading">
                        กระดานติดตามการแก้ปัญหา
                    </h2>
                    <p className="text-brand-grey max-w-2xl mx-auto text-lg font-body">
                        เลิกบ่นวนลูป แล้วมาดูกันว่าเราลองทำอะไรไปแล้วบ้าง อันไหนเวิร์ค อันไหนพัง เพราะอะไร?
                    </p>
                </div>

                {/* Kanban Board Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {columnDefinitions.map((col) => {
                        const items = POLICY_DATA.filter(p => col.statuses.includes(p.status));
                        return (
                            <motion.div 
                                key={col.id} 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={containerVariants}
                                className={`flex flex-col rounded-xl p-6 border-2 ${col.borderColor} ${col.id === 'progress' ? 'shadow-lg' : ''}`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    {col.icon}
                                    <h3 className="font-bold text-xl text-brand-black font-heading">{col.title}</h3>
                                </div>
                                <p className="text-xs text-brand-grey mb-6 font-medium uppercase tracking-wider">{col.subtitle}</p>

                                <div className="space-y-5">
                                    {items.map(item => (
                                        <motion.div 
                                            key={item.id} 
                                            variants={cardVariants}
                                            whileHover={{ y: -4, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                                            className="bg-brand-white p-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 transition-shadow duration-300"
                                        >
                                            <div className="flex justify-between items-start gap-2 mb-3">
                                                <h4 className="font-bold text-brand-black leading-tight text-base font-heading">{item.title}</h4>
                                                <span className="text-[10px] font-bold bg-brand-smoke px-2 py-1 rounded-md text-brand-grey whitespace-nowrap">
                                                    {item.year}
                                                </span>
                                            </div>
                                            <p className="text-sm text-brand-grey mb-4 font-body leading-relaxed">{item.description}</p>

                                            {item.outcome && (
                                                <div className={`text-xs p-3 rounded-lg border flex flex-col gap-1 ${
                                                    item.status === 'failed'
                                                        ? 'bg-brand-alert border-brand-orange/20 text-brand-active'
                                                        : 'bg-brand-smoke border-brand-black/10 text-brand-black'
                                                }`}>
                                                    <span className="font-bold uppercase text-[10px]">ผลลัพธ์ / บทเรียน:</span>
                                                    <p className="font-body">{item.outcome}</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                    {items.length === 0 && (
                                        <div className="text-center py-12 text-brand-grey/40 text-sm border-2 border-dashed border-brand-grey/10 rounded-xl bg-white/50">
                                            ยังไม่มีข้อมูลในส่วนนี้
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
