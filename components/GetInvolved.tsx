import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Shovel, Users, ArrowRight, Shield } from 'lucide-react';
import { NewcomerContext } from '../App';

export const GetInvolved: React.FC = () => {
    const { isNewcomer } = useContext(NewcomerContext);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="involved" className="py-20 bg-brand-white px-6 scroll-mt-24">
            <div className="max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-brand-black mb-4 font-heading">
                        {isNewcomer ? 'เริ่มต้นลงมือทำ' : 'โปรเจกต์ที่กำลังดำเนินการ'}
                    </h2>
                    <p className="text-brand-grey max-w-2xl mx-auto font-body">
                        {isNewcomer
                            ? 'แม้คุณจะเพิ่งย้ายมา แต่คุณสามารถช่วยให้เชียงใหม่น่าอยู่ขึ้นได้ เลือกวิธีที่คุณถนัดที่สุด'
                            : 'เปลี่ยนความโกรธเป็นพลัง เลือกโปรเจกต์ที่คุณอยากสนับสนุน แล้วดูผลลัพธ์ที่จับต้องได้'}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-3 gap-4 md:gap-8 text-left"
                >
                    {/* Project 1 */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        className="bg-brand-alert p-5 md:p-8 rounded-xl shadow-lg border border-brand-orange/20 hover:shadow-xl transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                            {isNewcomer ? 'สำคัญมาก' : 'ด่วน'}
                        </div>
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                            <Shield className="text-brand-orange" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">สนับสนุนนักดับไฟป่า</h3>
                        <p className="text-brand-grey mb-6 text-sm leading-relaxed font-body">
                            {isNewcomer
                                ? 'สนับสนุนอุปกรณ์ป้องกันและสวัสดิการให้เจ้าหน้าที่และอาสาสมัครดับไฟป่าที่ต้องทำงานในพื้นที่เสี่ยง'
                                : 'ระดมทุนซื้อ "เครื่องเป่าลม" และ "หน้ากาก N95" ให้ชาวบ้านและเจ้าหน้าที่เพื่อใช้ในการทำแนวกันไฟและดับไฟป่า'}
                        </p>
                        <a
                            href="https://www.mirror.or.th/volunteers.php?m=vol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all font-heading text-sm inline-flex"
                        >
                            ดูความคืบหน้า <ArrowRight size={16} />
                        </a>
                    </motion.div>

                    {/* Project 2 */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        className="bg-brand-smoke p-5 md:p-8 rounded-xl shadow-lg border border-brand-black/10 hover:shadow-xl transition-all group"
                    >
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                            <Shovel className="text-brand-black" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">อาสาทำแนวกันไฟ</h3>
                        <p className="text-brand-grey mb-6 text-sm leading-relaxed font-body">
                            {isNewcomer
                                ? 'ร่วมเป็นส่วนหนึ่งในการทำ "แนวกันไฟ" เพื่อป้องกันไม่ให้ไฟป่าลุกลามเข้าสู่เขตชุมชนและพื้นที่ป่าชั้นใน'
                                : 'ต้องการอาสาสมัคร 50 คน ร่วมทำแนวกันไฟที่ดอยสุเทพ ช่วงเดือนธันวาคม-มกราคม ก่อนฤดูไฟจะมาถึง'}
                        </p>
                        <a
                            href="https://communityfire.fund/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all font-heading text-sm inline-flex"
                        >
                            ดูความคืบหน้า <ArrowRight size={16} />
                        </a>
                    </motion.div>

                    {/* Project 3 */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        className="bg-brand-smoke p-5 md:p-8 rounded-xl shadow-lg border border-brand-black/10 hover:shadow-xl transition-all group"
                    >
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                            <Users className="text-brand-black" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">ผลักดัน พ.ร.บ. อากาศสะอาด</h3>
                        <p className="text-brand-grey mb-6 text-sm leading-relaxed font-body">
                            {isNewcomer
                                ? 'ร่วมผลักดันกฎหมายที่จะช่วยให้เรามีอากาศสะอาดใช้อย่างยั่งยืน โดยการลงชื่อสนับสนุน พ.ร.บ. อากาศสะอาด'
                                : 'ร่วมลงชื่อและติดตามการพิจารณา พ.ร.บ. อากาศสะอาด ในสภาฯ เพื่อให้มั่นใจว่าสิทธิพื้นฐานของเราจะได้รับการคุ้มครอง'}
                        </p>
                        <a
                            href="https://c.org/x5wXxjdNLf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all font-heading text-sm inline-flex"
                        >
                            ดูความคืบหน้า <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
