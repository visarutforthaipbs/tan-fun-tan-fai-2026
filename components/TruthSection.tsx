import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExternalLink, Info, Filter, BarChart3 } from 'lucide-react';

interface BurnRecord {
    name: string;
    rice: number;
    corn: number;
    sugar: number;
    other: number;
    region: string;
}

const BURN_DATA: BurnRecord[] = [
    // Top Burners (Central/Lower North)
    { name: 'นครราชสีมา', rice: 333429, corn: 53044, sugar: 366588, other: 0, region: 'อีสาน' },
    { name: 'ลพบุรี', rice: 95290, corn: 82347, sugar: 520038, other: 8375, region: 'ภาคกลาง' },
    { name: 'นครสวรรค์', rice: 296640, corn: 65720, sugar: 314535, other: 699, region: 'ภาคเหนือตอนล่าง' },
    { name: 'เพชรบูรณ์', rice: 74780, corn: 56426, sugar: 305261, other: 1004, region: 'ภาคเหนือตอนล่าง' },
    { name: 'อุดรธานี', rice: 177450, corn: 42, sugar: 148194, other: 2, region: 'อีสาน' },
    // Northern Provinces (High Impact / Problem Area)
    { name: 'ตาก', rice: 30890, corn: 152550, sugar: 56258, other: 139, region: 'ภาคเหนือ' },
    { name: 'เชียงราย', rice: 69023, corn: 51784, sugar: 1867, other: 8, region: 'ภาคเหนือ' },
    { name: 'เชียงใหม่', rice: 23713, corn: 52071, sugar: 328, other: 11533, region: 'ภาคเหนือ' },
    { name: 'น่าน', rice: 11942, corn: 35762, sugar: 55, other: 1, region: 'ภาคเหนือ' },
    { name: 'แม่ฮ่องสอน', rice: 8881, corn: 10331, sugar: 5, other: 309, region: 'ภาคเหนือ' },
];

const REGIONS = ['ทั้งหมด', 'ภาคเหนือ', 'ภาคเหนือตอนล่าง', 'ภาคกลาง', 'อีสาน'] as const;

export const TruthSection: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<string>('ทั้งหมด');
    const [selectedProvinces, setSelectedProvinces] = useState<Set<string>>(new Set());

    const filteredData = useMemo(() => {
        if (selectedRegion === 'ทั้งหมด' && selectedProvinces.size === 0) return BURN_DATA;
        if (selectedProvinces.size > 0) return BURN_DATA.filter(d => selectedProvinces.has(d.name));
        return BURN_DATA.filter(d => d.region === selectedRegion);
    }, [selectedRegion, selectedProvinces]);

    const provinces = useMemo(() => {
        if (selectedRegion === 'ทั้งหมด') return BURN_DATA.map(d => d.name);
        return BURN_DATA.filter(d => d.region === selectedRegion).map(d => d.name);
    }, [selectedRegion]);

    const toggleProvince = (name: string) => {
        setSelectedProvinces(prev => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    };

    const clearFilters = () => {
        setSelectedRegion('ทั้งหมด');
        setSelectedProvinces(new Set());
    };

    return (
        <div className="bg-brand-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-brand-black flex items-center gap-2 font-heading">
                    <BarChart3 size={24} className="text-brand-orange" /> รอยเผาไหม้ในพื้นที่เกษตร (พ.ย. 66 - เม.ย. 67)
                </h3>
                <p className="text-sm text-brand-grey font-body mt-2 max-w-2xl">
                    ภาคกลางเผาหนักที่ "อ้อย" แต่ภาคเหนือหนักที่ "ข้าวโพด"
                </p>
            </div>

            {/* Filters */}
            <div className="mb-6 space-y-4">
                {/* Region Filter */}
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-sm text-brand-grey font-medium mr-2">
                        <Filter size={14} /> ภูมิภาค:
                    </div>
                    {REGIONS.map((region) => (
                        <button
                            key={region}
                            onClick={() => {
                                setSelectedRegion(region);
                                setSelectedProvinces(new Set());
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedRegion === region && selectedProvinces.size === 0
                                ? 'bg-brand-orange text-white'
                                : 'bg-brand-smoke text-brand-grey border border-gray-200 hover:border-brand-orange hover:text-brand-orange'
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                {/* Province Chips */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-brand-grey font-medium mr-1">จังหวัด:</span>
                    {provinces.map((name) => (
                        <button
                            key={name}
                            onClick={() => toggleProvince(name)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${selectedProvinces.has(name)
                                ? 'bg-brand-black text-white'
                                : 'bg-brand-smoke text-brand-grey border border-gray-200 hover:border-brand-black hover:text-brand-black'
                                }`}
                        >
                            {name}
                        </button>
                    ))}
                    {selectedProvinces.size > 0 && (
                        <button
                            onClick={clearFilters}
                            className="px-2.5 py-1 rounded-full text-[11px] font-bold text-brand-orange hover:bg-brand-alert transition-all"
                        >
                            ล้างตัวกรอง
                        </button>
                    )}
                </div>
            </div>

            {/* Chart Info Bar */}
            <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-brand-grey">
                    <Info size={14} />
                    <span className="font-body">หน่วย: ไร่ (Rai) | แสดง {filteredData.length} จังหวัด</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-heading">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8C8C8C]"></span> ข้าว
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]"></span> อ้อย
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F15A24]"></span> ข้าวโพด
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D14010]"></span> อื่นๆ
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] md:h-[400px] w-full font-body text-xs md:text-sm">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={filteredData}
                        margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                        layout="horizontal"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#8C8C8C"
                            tick={{ fill: '#1A1A1A', fontSize: 12 }}
                            axisLine={{ stroke: '#F5F5F5' }}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#8C8C8C"
                            tick={{ fill: '#8C8C8C', fontSize: 11 }}
                            axisLine={{ stroke: '#F5F5F5' }}
                            tickLine={false}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#F5F5F5',
                                color: '#1A1A1A',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            }}
                            itemStyle={{ color: '#1A1A1A' }}
                            cursor={{ fill: 'rgba(241,90,36,0.05)' }}
                            formatter={(value: number) => [`${value.toLocaleString()} ไร่`, undefined]}
                        />
                        <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
                        <Bar dataKey="rice" name="ข้าว" stackId="a" fill="#8C8C8C" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="sugar" name="อ้อย" stackId="a" fill="#1A1A1A" />
                        <Bar dataKey="corn" name="ข้าวโพด" stackId="a" fill="#F15A24" />
                        <Bar dataKey="other" name="อื่นๆ/ผสม" stackId="a" fill="#D14010" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="mt-6 text-xs text-brand-grey flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-gray-100 pt-4">
                <p className="font-body italic">
                    * ข้อมูลรอยเผาไหม้ในพื้นที่เกษตรกรรม (Burn Scar) รวบรวมจากดาวเทียม Sentinel-2
                </p>
                <a
                    href="https://tamroypao.hii.or.th/openburn/index.jsp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-smoke hover:bg-brand-alert text-brand-orange px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold border border-brand-orange/20"
                >
                    ดูข้อมูลฉบับเต็ม <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};
