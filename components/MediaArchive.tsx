import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Search, Filter, ExternalLink, Loader2, FileText, Video, MonitorPlay, Image as ImageIcon, Newspaper, Users } from 'lucide-react';

interface NewsItem {
    id: string;
    format: string;
    category: string;
    title: string;
    thumbnail: string;
    url: string;
}

interface CsvRow {
    ลำดับ: string;
    รูปแบบสื่อ: string;
    หมวดหมู่: string;
    ชิ้นงาน: string;
    thumnail: string;
    ลิงก์: string;
}

export const MediaArchive: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterFormat, setFilterFormat] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCount, setDisplayCount] = useState(12);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/news-thaipbs.csv');
                if (!response.ok) throw new Error('Failed to fetch news data');

                const csvText = await response.text();

                Papa.parse<CsvRow>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const parsedNews = results.data
                            .filter(row => row.ชิ้นงาน && row.ลิงก์) // Filter out empty rows
                            .map((row, index) => ({
                                id: row.ลำดับ || `item-${index}`,
                                format: row.รูปแบบสื่อ?.trim() || 'General',
                                category: row.หมวดหมู่?.trim() || 'Uncategorized',
                                title: row.ชิ้นงาน?.trim(),
                                thumbnail: row.thumnail?.trim(),
                                url: row.ลิงก์?.trim()
                            }));
                        setNews(parsedNews);
                        setLoading(false);
                    },
                    error: (err: Error) => {
                        console.error('CSV Parse Error:', err);
                        setError('Failed to parse news data');
                        setLoading(false);
                    }
                });
            } catch (err) {
                console.error('Fetch Error:', err);
                setError('Failed to load news archive');
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Get unique formats and categories for filter dropdowns
    const formats = Array.from(new Set(news.map(item => item.format))).filter(Boolean);
    const categories = Array.from(new Set(news.map(item => item.category))).filter(Boolean);

    const filteredNews = news.filter(item => {
        const matchesFormat = filterFormat === 'all' || item.format === filterFormat;
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFormat && matchesCategory && matchesSearch;
    });

    const displayedNews = filteredNews.slice(0, displayCount);

    const getIcon = (format: string) => {
        const lower = format.toLowerCase();
        if (lower.includes('video') || lower.includes('วีดีโอ')) return <Video size={14} />;
        if (lower.includes('interactive') || lower.includes('หน้าจอ')) return <MonitorPlay size={14} />;
        return <FileText size={14} />;
    };

    if (loading) return (
        <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-brand-orange" size={32} />
        </div>
    );

    if (error) return (
        <div className="text-center p-8 text-brand-orange bg-brand-alert rounded-xl border border-brand-orange/20">
            <p>{error}</p>
        </div>
    );

    return (
        <div className="bg-brand-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 border-b bg-brand-smoke flex flex-col gap-4">
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                    <div>
                        <h3 className="text-xl font-bold text-brand-black font-heading flex items-center gap-2">
                            <Newspaper size={20} className="text-brand-orange" /> คลังข่าวและสื่อประชาสัมพันธ์
                        </h3>
                        <p className="text-sm text-brand-grey font-body mt-1">
                            รวมบทความ วิดีโอ และสื่อ Interactive ย้อนหลังเกี่ยวกับปัญหาฝุ่นควัน
                        </p>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="ค้นหาหัวข้อ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-64 font-body focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                            value={filterFormat}
                            onChange={(e) => setFilterFormat(e.target.value)}
                            className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm w-full font-body appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange cursor-pointer"
                        >
                            <option value="all">ทุกรูปแบบสื่อ</option>
                            {formats.map(fmt => (
                                <option key={fmt} value={fmt}>{fmt}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative flex-1">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm w-full font-body appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange cursor-pointer"
                        >
                            <option value="all">ทุกหมวดหมู่</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Media Resources & Action Block */}
                <div className="mb-8 grid md:grid-cols-3 gap-4">
                    <div className="bg-brand-smoke rounded-xl p-5 border border-brand-black/10 flex flex-col justify-between">
                        <div>
                            <h4 className="font-heading font-bold text-brand-black flex items-center gap-2 mb-2">
                                <FileText className="text-brand-orange" size={20} />
                                เข้าถึงข้อมูลเปิด (Open Data)
                            </h4>
                            <p className="text-sm text-brand-grey font-body mb-3">
                                ดูข้อมูลคุณภาพอากาศและชุดข้อมูลดิบจากเซ็นเซอร์ตรวจวัดทั่วประเทศ ผ่านระบบ Envilink
                            </p>
                        </div>
                        <a
                            href="https://envilink.go.th/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:underline"
                        >
                            ไปยังเว็บไซต์ Envilink <ExternalLink size={14} />
                        </a>
                    </div>

                    <div className="bg-brand-smoke rounded-xl p-5 border border-brand-orange/10 flex flex-col justify-between">
                        <div>
                            <h4 className="font-heading font-bold text-brand-black flex items-center gap-2 mb-2">
                                <Video className="text-brand-orange" size={20} />
                                ขอใช้ฟุตเทจข่าว (Footage Request)
                            </h4>
                            <p className="text-sm text-brand-grey font-body mb-3">
                                หากต้องการภาพข่าวหรือวิดีโอต้นฉบับเพื่อการใช้งาน สามารถส่งคำขอมาที่รายการองศาเหนือ
                            </p>
                        </div>
                        <a
                            href="mailto:thenorththaipbs@gmail.com"
                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:underline"
                        >
                            ติดต่อ: thenorththaipbs@gmail.com <ExternalLink size={14} />
                        </a>
                    </div>

                    <div className="bg-brand-smoke rounded-xl p-5 border border-brand-black/10 flex flex-col justify-between">
                        <div>
                            <h4 className="font-heading font-bold text-brand-black flex items-center gap-2 mb-2">
                                <Users className="text-brand-orange" size={20} />
                                นักข่าวพลเมือง
                            </h4>
                            <p className="text-sm text-brand-grey font-body mb-3">
                                ดูว่านักข่าวพลเมืองรายงานและบอกเล่าสถานการณ์นี้อย่างไร
                            </p>
                        </div>
                        <a
                            href="https://legacy.csitereport.com/pm25noclus"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:underline"
                        >
                            ดูรายงานจากพลเมือง <ExternalLink size={14} />
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {displayedNews.map((item, index) => (
                        <a
                            key={`${item.id}-${index}`}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-white border border-gray-100 rounded-xl hover:border-brand-orange/30 hover:shadow-lg transition-all overflow-hidden flex flex-col h-full"
                        >
                            {/* Thumbnail Area */}
                            <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                                {item.thumbnail ? (
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e0e0e0/a0a0a0?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ImageIcon size={48} />
                                    </div>
                                )}

                                {/* Format Badge */}
                                <div className="absolute top-2 left-2">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1 shadow-sm
                                        ${item.format.includes('วีดีโอ') || item.format.includes('Video') ? 'bg-brand-orange text-white' : 'bg-brand-black text-white'}
                                    `}>
                                        {getIcon(item.format)}
                                        {item.format}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                {/* Category */}
                                <div className="mb-2">
                                    <span className="text-[10px] bg-brand-smoke text-brand-grey px-2 py-0.5 rounded-full font-bold">
                                        {item.category}
                                    </span>
                                </div>

                                <h4 className="font-bold text-brand-black group-hover:text-brand-orange transition-colors line-clamp-2 font-heading text-sm mb-2 flex-grow">
                                    {item.title}
                                </h4>

                                <div className="pt-3 border-t border-gray-50 flex justify-end">
                                    <ExternalLink size={14} className="text-gray-300 group-hover:text-brand-orange transition-colors" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {displayedNews.length === 0 && (
                    <div className="text-center py-12 text-gray-400 font-body">
                        ไม่พบข้อมูลที่ค้นหา
                    </div>
                )}

                {filteredNews.length > displayCount && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setDisplayCount(prev => prev + 12)}
                            className="px-6 py-2 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white text-sm font-bold rounded-lg transition-all font-heading uppercase tracking-wide"
                        >
                            โหลดเพิ่มเติม (Load More)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
