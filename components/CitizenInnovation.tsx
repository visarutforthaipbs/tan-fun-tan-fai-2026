import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { User, Tag, Lightbulb, ArrowRight, Loader2 } from 'lucide-react';

interface Innovation {
    name: string;
    category: string;
    description: string;
    image: string;
    author: string;
    link: string;
    province: string;
    status: string;
}

export const CitizenInnovation: React.FC = () => {
    const [innovations, setInnovations] = useState<Innovation[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchCSV = async () => {
            try {
                // Use the new CSV file
                const response = await fetch('/data/new-citizen-inno.csv');
                const reader = response.body?.getReader();
                const result = await reader?.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value);

                Papa.parse(csv, {
                    header: true,
                    complete: (results) => {
                        const parsedData = results.data.map((item: any) => ({
                            name: item['Name'],
                            category: item['Category'],
                            description: item['Description'],
                            image: item['Image_url'], // Updated column
                            author: item['Organization / Author'],
                            link: item['Source_url'], // Updated column
                            province: item['Province'],
                            status: item['Implementation Status']
                        })).filter((item: Innovation) => item.name); // Filter out empty rows

                        setInnovations(parsedData);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error fetching CSV:', error);
                setLoading(false);
            }
        };

        fetchCSV();
    }, []);

    const categories = ['All', ...Array.from(new Set(innovations.map(i => i.category))).filter(c => c && c !== 'ทั้งหมด')];

    const filteredInnovations = filter === 'All'
        ? innovations
        : innovations.filter(i => i.category === filter);

    // Helper to determine status color based on Thai status text
    const getStatusColor = (status: string) => {
        if (!status) return 'bg-brand-smoke text-brand-grey';

        const normalizedStatus = status.trim();

        if (normalizedStatus.includes('ยังทำอยู่') || normalizedStatus.includes('Active')) {
            return 'bg-brand-smoke text-brand-black'; // Active
        } else if (normalizedStatus.includes('กำลังทดลอง') || normalizedStatus.includes('Pilot')) {
            return 'bg-brand-alert text-brand-orange'; // Pilot/Testing
        } else if (normalizedStatus.includes('เสร็จสิ้น') || normalizedStatus.includes('Completed')) {
            return 'bg-brand-smoke text-brand-black'; // Completed
        } else if (normalizedStatus.includes('ข้อเสนอ') || normalizedStatus.includes('Proposal')) {
            return 'bg-brand-smoke text-brand-grey'; // Proposal
        }

        return 'bg-brand-smoke text-brand-grey';
    };

    return (
        <section className="py-16 px-6 max-w-6xl mx-auto font-body">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-black font-heading mb-4">นวัตกรรมสู้ฝุ่นจากประชาชน</h2>
                <p className="text-brand-grey max-w-2xl mx-auto">
                    รวมพลังนวัตกรรมจากภาคประชาชนและหน่วยงานต่างๆ ที่ร่วมกันคิดค้นวิธีรับมือกับปัญหาฝุ่นควัน
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat
                            ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                            : 'bg-white text-brand-grey border border-gray-200 hover:border-brand-orange hover:text-brand-orange'
                            }`}
                    >
                        {cat === 'All' ? 'ทั้งหมด' : cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-brand-orange" size={48} />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredInnovations.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col h-full group">
                            {/* Card Header / Image */}
                            <div className="h-40 md:h-48 bg-brand-smoke relative overflow-hidden flex items-center justify-center">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            // Fallback if image fails to load
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement?.classList.add('fallback-active');
                                        }}
                                    />
                                ) : null}

                                {/* Fallback Placeholder - Visible if no image or image error */}
                                <div className={`absolute inset-0 flex items-center justify-center bg-brand-smoke -z-10 ${!item.image ? 'z-0' : ''}`}>
                                    <Lightbulb size={48} className="text-brand-grey/30 group-hover:text-brand-orange/50 transition-colors" />
                                </div>

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-brand-black shadow-sm flex items-center gap-1 z-10">
                                    <Tag size={12} /> {item.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-brand-black font-heading mb-2 line-clamp-2 min-h-[3.5rem]">
                                    {item.name}
                                </h3>

                                <div className="flex items-center gap-2 text-xs text-brand-grey mb-4">
                                    <User size={14} />
                                    <span className="truncate">{item.author || 'ไม่ระบุผู้พัฒนา'}</span>
                                </div>

                                <p className="text-sm text-brand-grey mb-6 line-clamp-3 flex-grow">
                                    {item.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                                        {item.status || 'Active'}
                                    </span>

                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-orange hover:text-brand-active font-bold text-sm flex items-center gap-1 transition-colors"
                                        >
                                            ดูข้อมูล <ArrowRight size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
