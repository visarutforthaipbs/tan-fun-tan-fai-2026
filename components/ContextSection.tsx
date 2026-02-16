import React, { useContext, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend as _Legend } from 'recharts';
import { WokVisual } from './WokVisual';
import { NewcomerContext } from '../App';
import { Tooltip as _Tooltip } from './Tooltip';
import { Layers, ExternalLink, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { MediaArchive } from './MediaArchive';
import { TruthSection } from './TruthSection';

export const ContextSection: React.FC = () => {
    const { isNewcomer } = useContext(NewcomerContext);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeSourcePeriod, setActiveSourcePeriod] = useState<'smoke' | 'non-smoke'>('smoke');
    const [activeLayer, setActiveLayer] = useState<number | null>(1); // Default to first layer open

    const LAYER_DATA = [
        {
            id: 1,
            title: "1. ปัจจัยทางภูมิศาสตร์ (แอ่งกระทะ)",
            summary: "เชียงใหม่เหมือนก้นถ้วย ลมพัดผ่านไปข้างบน แต่ข้างล่างลมสงบ",
            content: `พื้นที่ภาคเหนือตอนบนมีลักษณะทางกายภาพเป็น "แอ่ง" (Basin) ที่ล้อมรอบด้วยเทือกเขาสูง เมื่อมีการเผาหรือเกิดมลพิษจากแหล่งต่างๆ ฝุ่นควันเหล่านี้จะถูกกักขังอยู่ในบริเวณก้นแอ่ง เนื่องจากลักษณะภูมิประเทศขัดขวางการไหลเวียนของลมในแนวราบ (Amnuaylojaroen & Parasin, 2024; Parasin & Amnuaylojaroen, 2024) ปรากฏการณ์นี้ทำให้ค่าความเข้มข้นของฝุ่นในเชียงใหม่และลำปางมักสูงกว่าพื้นที่ราบในภูมิภาคอื่นแม้จะมีปริมาณการเผาที่ใกล้เคียงกัน`,
            borderColor: "border-brand-black",
            hoverBg: "hover:bg-brand-smoke",
            activeBg: "bg-brand-smoke",
            textColor: "text-brand-black"
        },
        {
            id: 2,
            title: "2. ปัจจัยทางอุตุนิยมวิทยา (ฝาชีครอบ/อุณหภูมิผกผัน)",
            summary: "ความกดอากาศสูงกดทับอากาศเย็นไว้ เหมือนเอาฝาชีมาครอบควันไฟ",
            content: `ในช่วงฤดูหนาวและต้นฤดูร้อน (มกราคม - เมษายน) ภาคเหนือมักเกิดปรากฏการณ์ "อุณหภูมิผกผัน" (Temperature Inversion) ซึ่งปกติอากาศยิ่งสูงจะยิ่งเย็น แต่ในช่วงนี้ชั้นอากาศอุ่นจะไปทับอยู่บนอากาศเย็นที่อยู่ใกล้พื้นดิน ทำหน้าที่เป็น "ฝาชี" ที่มองไม่เห็น ปิดกั้นไม่ให้อากาศถ่ายเทในแนวดิ่ง ฝุ่นจึงไม่สามารถลอยตัวขึ้นสู่ชั้นบรรยากาศด้านบนได้และสะสมตัวจนเข้าขั้นวิกฤต (Amnuaylojaroen et al., 2023; Paluang et al., 2024)`,
            borderColor: "border-brand-orange",
            activeBg: "bg-brand-alert",
            hoverBg: "hover:bg-brand-alert",
            textColor: "text-brand-orange"
        },
        {
            id: 3,
            title: "3. แหล่งกำเนิด (เศรษฐศาสตร์ & การเผา)",
            summary: "พื้นที่เกษตรบนดอยสูง ไม่มีเครื่องจักรเข้าถึง ต้องใช้ไฟในการกำจัดซาก",
            content: `การเผาชีวมวล (Biomass Burning) คือแหล่งกำเนิดหลักของ PM2.5 ในภาคเหนือ โดยเฉพาะจากพื้นที่เกษตรบนที่สูงและไฟป่า (Khamkaew et al., 2016)\n\nทำไมต้องเผา? ในพื้นที่ภูเขาสูงชัน เครื่องจักรกลการเกษตรเข้าไม่ถึง ทำให้การใช้ "ไฟ" เป็นวิธีที่ประหยัดต้นทุนและแรงงานมากที่สุดสำหรับเกษตรกรในการเตรียมพื้นที่เพาะปลูกใหม่ (เช่น ข้าวโพดเลี้ยงสัตว์)\n\nข้อมูลล่าสุด (2024-2025): งานวิจัยระบุว่าการเผาข้าวโพด (Corn) มีค่าสัมประสิทธิ์การปล่อยฝุ่น PM2.5 สูงกว่าพืชชนิดอื่นอย่างข้าวหรือป่าไม้ (Paluang et al., 2024) นอกจากนี้ยังมีปัจจัยเรื่อง "ฝุ่นข้ามพรมแดน" จากประเทศเพื่อนบ้านซึ่งเผาในช่วงเวลาเดียวกัน ทำให้การแก้ปัญหาภายในประเทศเพียงอย่างเดียวทำได้ยาก`,
            borderColor: "border-brand-orange",
            activeBg: "bg-brand-alert",
            hoverBg: "hover:bg-brand-alert",
            textColor: "text-brand-orange"
        }
    ];

    const PM_SOURCES = {
        smoke: {
            title: "ช่วงวิกฤตฝุ่น (Smoke-Haze Period)",
            pmLevel: "116 ± 35 µg/m³",
            data: [
                { name: 'การเผาชีวมวล (Biomass Burning)', value: 51, color: '#F15A24' }, // Orange (primary)
                { name: 'ซัลเฟตทุติยภูมิ (Secondary Sulfate)', value: 23, color: '#1A1A1A' }, // Black
                { name: 'ฝุ่น (Dust)', value: 14, color: '#8C8C8C' }, // Grey
                { name: 'การจราจร (Traffic)', value: 13, color: '#D14010' }, // Active Orange
            ]
        },
        'non-smoke': {
            title: "ช่วงนอกวิกฤต (Non-Smoke-Haze Period)",
            pmLevel: "35 ± 6 µg/m³",
            data: [
                { name: 'การจราจร (Traffic)', value: 76, color: '#F15A24' }, // Orange (primary)
                { name: 'ฝุ่น (Dust)', value: 17, color: '#8C8C8C' }, // Grey
                { name: 'การเผาชีวมวล (Biomass Burning)', value: 7, color: '#1A1A1A' }, // Black
                { name: 'ซัลเฟตทุติยภูมิ (Secondary Sulfate)', value: 0, color: '#D14010' }, // Active Orange
            ]
        }
    };

    const currentSourceData = PM_SOURCES[activeSourcePeriod];

    return (
        <section id="context" className="py-16 px-6 max-w-5xl mx-auto space-y-16 scroll-mt-24">

            {/* Intro Header */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-black font-heading">
                    ทำไมฝุ่นไม่หายไป?
                </h2>
                <p className="text-brand-grey max-w-2xl mx-auto font-body">
                    นี่ไม่ใช่แค่เรื่อง "คนจุดไฟ" แต่เป็นกับดักทางภูมิศาสตร์และเศรษฐกิจ
                </p>
            </div>

            {/* Geography Module - The 3 Part Problem */}
            <div className="bg-brand-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 border-b bg-brand-smoke">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-brand-black font-heading">
                        <Layers className="text-brand-orange" />
                        ปัญหา 3 ชั้น
                    </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="p-4 md:p-8 space-y-4 md:space-y-6 flex flex-col justify-center font-body">
                        <div className="space-y-4">
                            {LAYER_DATA.map((layer) => (
                                <div
                                    key={layer.id}
                                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                                    className={`
                                        rounded-xl border-l-4 transition-all duration-300 cursor-pointer overflow-hidden
                                        ${layer.borderColor}
                                        ${activeLayer === layer.id ? layer.activeBg : `bg-white ${layer.hoverBg}`}
                                    `}
                                >
                                    <div className="p-4 flex justify-between items-center">
                                        <div>
                                            <h4 className={`font-bold ${layer.textColor} text-base`}>{layer.title}</h4>
                                            {/* Show summary only when closed */}
                                            {activeLayer !== layer.id && (
                                                <p className={`text-xs ${layer.textColor} opacity-80 mt-1 line-clamp-1`}>
                                                    {layer.summary}
                                                </p>
                                            )}
                                        </div>
                                        {activeLayer === layer.id ? (
                                            <ChevronUp size={20} className={layer.textColor} />
                                        ) : (
                                            <ChevronDown size={20} className={layer.textColor} />
                                        )}
                                    </div>

                                    {/* Collapsible Content */}
                                    <div className={`
                                        overflow-hidden transition-all duration-500 ease-in-out
                                        ${activeLayer === layer.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                                    `}>
                                        <div className="px-4 pb-4 pt-0">
                                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                                {layer.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Academic References - Collapsible or Small */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-[10px] text-gray-400 font-body mb-2 flex items-center gap-1">
                                <ExternalLink size={10} /> แหล่งอ้างอิงทางวิชาการ (References)
                            </p>
                            <ul className="text-[9px] text-gray-400 space-y-1 font-body opacity-70 hover:opacity-100 transition-opacity">
                                <li>• Amnuaylojaroen, T., Kaewkanchanawong, P., & Panpeng, P. (2023). <em>Atmosphere</em>.</li>
                                <li>• Amnuaylojaroen, T., & Parasin, N. (2024). <em>PeerJ</em>.</li>
                                <li>• Khamkaew, C., et al. (2016). <em>Aerosol and Air Quality Research</em>.</li>
                                <li>• Paluang, P., Thavorntam, W., & Phairuang, W. (2024). <em>Fire</em>.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-brand-smoke p-6 flex items-center justify-center">
                        <WokVisual />
                    </div>
                </div>
            </div>

            {/* Truth Section - Satellite Data */}
            <TruthSection />

            {/* Sources Chart - Research Based */}
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-brand-black flex items-center gap-2 font-heading">
                            <BarChart3 size={24} className="text-brand-orange" /> แหล่งกำเนิดฝุ่น PM2.5 ในเชียงใหม่
                        </h3>
                        <p className="text-sm text-brand-grey font-body mt-1">
                            ความแตกต่างระหว่าง "ช่วงวิกฤต" และ "ช่วงปกติ"
                        </p>
                    </div>

                    {/* Toggle Period */}
                    <div className="bg-gray-100 p-1 rounded-lg flex space-x-1 font-heading text-sm">
                        <button
                            onClick={() => setActiveSourcePeriod('smoke')}
                            className={`px-4 py-2 rounded-md transition-all ${activeSourcePeriod === 'smoke'
                                ? 'bg-white text-brand-orange shadow-sm font-bold'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            ช่วงหมอกควัน
                        </button>
                        <button
                            onClick={() => setActiveSourcePeriod('non-smoke')}
                            className={`px-4 py-2 rounded-md transition-all ${activeSourcePeriod === 'non-smoke'
                                ? 'bg-white text-brand-black shadow-sm font-bold'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            ช่วงปกติ
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Chart */}
                    {/* Chart Column */}
                    <div className="flex flex-col items-center w-full">
                        {/* PM2.5 Average Display (Moved out of chart to prevent overflow) */}
                        <div className="flex flex-col items-center justify-center mb-2 z-10">
                            <span className="text-sm text-gray-500 font-bold mb-1">PM2.5 เฉลี่ย</span>
                            <span className={`text-4xl font-bold ${activeSourcePeriod === 'smoke' ? 'text-brand-orange' : 'text-brand-black'}`}>
                                {currentSourceData.pmLevel}
                            </span>
                        </div>

                        {/* Chart */}
                        <div className="h-[250px] md:h-[300px] w-full font-body relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={currentSourceData.data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        dataKey="value"
                                        onClick={(_, index) => setActiveIndex(index)}
                                        cursor="pointer"
                                    >
                                        {currentSourceData.data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                                stroke="none"
                                            />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        formatter={(value: number) => [`${value}%`, 'สัดส่วน']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Legend & Analysis */}
                    <div className="space-y-6">
                        <div className="bg-brand-smoke p-4 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-3 font-heading text-lg">
                                {currentSourceData.title}
                            </h4>
                            <ul className="space-y-3 font-body text-sm">
                                {currentSourceData.data.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            ></span>
                                            <span className="text-gray-700 group-hover:text-black transition-colors">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.value}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-xs text-gray-400 font-body">
                            <p className="mb-1 italic">
                                * ข้อมูลจากการศึกษาองค์ประกอบทางเคมีและแหล่งกำเนิดฝุ่น PM2.5 ในจังหวัดเชียงใหม่
                            </p>
                            <a
                                href="https://www.sciencedirect.com/science/article/abs/pii/S1352231024001924?via%3Dihub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-orange hover:underline flex items-center gap-1"
                            >
                                อ้างอิง: Chemical characteristics and source apportionment of PM2.5 in Chiang Mai <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* Media Archive */}
            <MediaArchive />
        </section>
    );
};
