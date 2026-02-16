import React, { useState, useEffect } from 'react';
import { MapPin, Fan, ShieldCheck, ExternalLink, Loader2, AlertCircle, RefreshCcw, Phone, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

interface SafePlace {
    id: string | number;
    name: string;
    lat: number;
    lng: number;
    type: 'free' | 'paid' | 'public';
    description: string;
    source: string;
    phone?: string;
    hours?: string;
}

// ข้อมูลสำรองกรณี API มีปัญหา
const FALLBACK_PLACES: SafePlace[] = [
    { id: 'f1', name: 'หอสมุด มช. (CMU Library)', lat: 18.8005, lng: 98.9515, type: 'public', description: 'ห้องสมุดปรับอากาศ มีระบบเติมอากาศสะอาด (Positive Pressure)', source: 'โครงการ Clean Room มช.' },
    { id: 'f2', name: 'โรงเรียนปรินส์รอยแยลส์วิทยาลัย', lat: 18.7935, lng: 99.0025, type: 'public', description: 'อาคารได้รับประกาศนียบัตรห้องปลอดฝุ่นเชียงใหม่', source: 'จังหวัดเชียงใหม่' },
    { id: 'f3', name: 'One Nimman (Clean Air Zone)', lat: 18.8000, lng: 98.9680, type: 'paid', description: 'พื้นที่ส่วนกลางที่มีการติดตั้งระบบกรองอากาศ', source: 'ภาคเอกชน' },
    { id: 'f4', name: 'โรงพยาบาลสันทราย', lat: 18.9212, lng: 98.9945, type: 'public', description: 'ห้องปลอดฝุ่นแผนกทันตกรรมและกุมารเวช', source: 'กระทรวงสาธารณสุข' },
];

const TARGET_URL = "/data/getFilterIndex.json";

// ตัวสร้างไอคอนแบบกำหนดเอง
const createCustomIcon = (type: 'paid' | 'public' | 'free') => {
    const color = type === 'paid' ? '#F15A24' : '#1A1A1A';
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 30px; height: 30px; display: block; left: -15px; top: -15px; position: relative; border-radius: 30px 30px 0; transform: rotate(45deg); border: 2px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
};

export const SurvivalSection: React.FC = () => {
    const [mapFilter, setMapFilter] = useState<'all' | 'free' | 'paid' | 'public'>('all');
    const [places, setPlaces] = useState<SafePlace[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            // ใช้ local proxy แทน api.allorigins.win
            const response = await fetch(TARGET_URL);
            const data = await response.json();

            // ไม่ต้องแกะ proxyData.contents เพราะได้ JSON โดยตรงจาก proxy
            // const proxyData = await response.json();
            // const data = JSON.parse(proxyData.contents);

            if (data && data.staff) {
                const chiangMaiPlaces: SafePlace[] = data.staff
                    .filter((item: any) => item.PROVINCE_NAME === "เชียงใหม่")
                    .map((item: any) => {
                        let details: any = {};
                        try { details = JSON.parse(item.room_obj); } catch (e) { }
                        let type: 'free' | 'paid' | 'public' = 'public';
                        if (item.room_type === "5") type = 'paid';
                        else if (["15", "1", "7", "14"].includes(item.room_type)) type = 'public';
                        else type = 'free';
                        return {
                            id: item.roomcode,
                            name: item.room_name,
                            lat: parseFloat(item.latitude),
                            lng: parseFloat(item.longitude),
                            type: type,
                            description: details.exam_name2 || "ห้องปลอดฝุ่นมาตรฐานกรมอนามัย",
                            source: item.AMPHUR_NAME ? `อ. ${item.AMPHUR_NAME}` : "กรมอนามัย",
                            phone: item.room_tel,
                            hours: details.member_time_start ? `${details.member_time_start} - ${details.member_time_end}` : undefined
                        };
                    });
                const merged = [...FALLBACK_PLACES];
                chiangMaiPlaces.forEach(p => {
                    if (!merged.find(m => m.name === p.name)) merged.push(p);
                });
                setPlaces(merged);
            } else {
                throw new Error("รูปแบบข้อมูลไม่ถูกต้อง");
            }
        } catch (err) {
            console.error("Error fetching clean room data:", err);
            setError(true);
            setPlaces(FALLBACK_PLACES);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredPlaces = mapFilter === 'all'
        ? places
        : places.filter(p => p.type === mapFilter || (mapFilter === 'free' && p.type === 'public'));

    return (
        <section id="survival" className="py-16 px-6 max-w-6xl mx-auto scroll-mt-24 font-body">
            <h2 className="text-3xl font-bold text-center mb-12 text-brand-black font-heading">คู่มือเอาตัวรอด</h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                {/* แผนที่อากาศสะอาด */}
                <div className="bg-brand-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full">
                    <div className="bg-brand-black p-4 text-brand-white">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <MapPin />
                                <div>
                                    <h3 className="font-bold text-lg leading-tight font-heading">แผนที่ "ห้องปลอดฝุ่น" (ข้อมูลล่าสุด)</h3>
                                    <span className="text-brand-grey text-xs font-medium uppercase tracking-wider">
                                        {error ? 'โหมดสำรอง: เชียงใหม่' : `เชียงใหม่: ${places.length} แห่ง`}
                                    </span>
                                </div>
                            </div>
                            {loading && <Loader2 className="animate-spin text-brand-orange" size={20} />}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <button onClick={() => setMapFilter('all')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${mapFilter === 'all' ? 'bg-brand-white text-brand-black' : 'bg-white/10 text-brand-white border border-white/20 hover:bg-brand-white hover:text-brand-black'}`}>
                                ทั้งหมด
                            </button>
                            <button onClick={() => setMapFilter('free')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${mapFilter === 'free' ? 'bg-brand-white text-brand-black' : 'bg-white/10 text-brand-white border border-white/20 hover:bg-brand-white hover:text-brand-black'}`}>
                                เข้าใช้ฟรี/สาธารณะ
                            </button>
                            <button onClick={() => setMapFilter('paid')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${mapFilter === 'paid' ? 'bg-brand-white text-brand-black' : 'bg-white/10 text-brand-white border border-white/20 hover:bg-brand-white hover:text-brand-black'}`}>
                                พื้นที่เอกชน
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[300px] md:h-[450px] z-0 bg-brand-smoke flex items-center justify-center">
                        {loading && places.length === 0 ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="animate-spin text-brand-orange" size={40} />
                                <p className="text-sm text-brand-grey font-medium font-body">กำลังโหลดพิกัด...</p>
                            </div>
                        ) : (
                            <MapContainer center={[18.79, 98.98]} zoom={11} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {filteredPlaces.map(place => (
                                    <Marker
                                        key={place.id}
                                        position={[place.lat, place.lng]}
                                        icon={createCustomIcon(place.type)}
                                    >
                                        <Popup>
                                            <div className="overflow-hidden bg-brand-white min-w-[220px]">
                                                {/* ส่วนหัวของป๊อปอัพ */}
                                                <div className={`px-4 py-3 text-white font-heading font-bold text-sm ${place.type === 'paid' ? 'bg-brand-orange' : 'bg-brand-black'}`}>
                                                    {place.name}
                                                </div>
                                                {/* เนื้อหาของป๊อปอัพ */}
                                                <div className="px-4 py-3 space-y-2">
                                                    <p className="text-[12px] text-brand-black font-bold leading-tight">
                                                        <MapPin size={12} className="inline-block mr-1" />{place.description}
                                                    </p>
                                                    <div className="space-y-1">
                                                        {place.phone && (
                                                            <div className="flex items-center gap-2 text-[11px] text-brand-grey">
                                                                <span className="font-bold flex items-center gap-1"><Phone size={10} /> โทร:</span> {place.phone}
                                                            </div>
                                                        )}
                                                        {place.hours && (
                                                            <div className="flex items-center gap-2 text-[11px] text-brand-grey">
                                                                <span className="font-bold flex items-center gap-1"><Clock size={10} /> เปิด:</span> {place.hours}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="pt-2 mt-2 border-t border-brand-smoke flex justify-between items-center">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${place.type === 'paid' ? 'bg-brand-alert text-brand-orange' : 'bg-brand-smoke text-brand-black'}`}>
                                                            {place.type === 'paid' ? 'เอกชน' : 'สาธารณะ'}
                                                        </span>
                                                        <span className="text-[10px] text-brand-grey italic">ที่มา: {place.source}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )}
                    </div>

                    <div className="p-4 bg-brand-white border-t border-brand-smoke flex flex-col gap-3">
                        {error && (
                            <div className="bg-brand-alert p-3 rounded-lg border border-brand-orange/20 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-brand-active text-xs">
                                    <AlertCircle size={14} />
                                    <span className="font-medium">ไม่สามารถเชื่อมต่อข้อมูลสดได้ กำลังใช้ข้อมูลสำรอง</span>
                                </div>
                                <button onClick={fetchData} className="text-brand-active hover:bg-white p-1 rounded transition-colors">
                                    <RefreshCcw size={14} />
                                </button>
                            </div>
                        )}
                        <p className="text-[10px] text-brand-grey italic font-body text-center leading-relaxed">
                            ข้อมูลห้องปลอดฝุ่นเชียงใหม่ {error ? 'รวบรวมโดยอาสาสมัคร' : 'เชื่อมต่อ API กรมอนามัย (Podfoon)'}
                        </p>
                        <a
                            href="https://podfoon.anamai.moph.go.th/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-brand-smoke hover:bg-brand-alert text-brand-orange text-xs font-bold py-2.5 rounded-lg transition-colors border border-brand-orange/20"
                        >
                            <ExternalLink size={14} /> ดูเว็บไซต์ทางการ "ห้องปลอดฝุ่น" (กรมอนามัย)
                        </a>
                    </div>
                </div>

                {/* โมดูลเครื่องฟอกอากาศ DIY */}
                <div className="space-y-6 flex flex-col h-full">
                    <div className="bg-brand-white rounded-xl shadow-xl p-8 border border-gray-100 flex-grow">
                        <div className="flex items-center gap-3 mb-4 text-brand-orange">
                            <Fan size={28} />
                            <h3 className="font-bold text-xl text-brand-black font-heading">เครื่องฟอกอากาศทำเอง (DIY)</h3>
                        </div>
                        <p className="text-brand-grey mb-6 font-body">
                            ไม่มีงบซื้อเครื่องฟอกราคาแพง? คุณสามารถทำเองได้ในราคาไม่ถึง 1,000 บาท ประสิทธิภาพเทียบเท่าระดับ HEPA (Corsi-Rosenthal Box)
                        </p>

                        <div className="space-y-4 font-body">
                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-brand-smoke transition-colors cursor-pointer group">
                                <span className="bg-brand-alert group-hover:bg-brand-orange group-hover:text-brand-white text-brand-orange w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-colors">1</span>
                                <div>
                                    <h4 className="font-bold text-brand-black font-heading">พัดลมตั้งโต๊ะ</h4>
                                    <p className="text-sm text-brand-grey">ใช้พัดลมทรงสี่เหลี่ยมหรือกลม ขนาด 12-16 นิ้ว</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-brand-smoke transition-colors cursor-pointer group">
                                <span className="bg-brand-alert group-hover:bg-brand-orange group-hover:text-brand-white text-brand-orange w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-colors">2</span>
                                <div>
                                    <h4 className="font-bold text-brand-black font-heading">แผ่นกรองอากาศ HEPA</h4>
                                    <p className="text-sm text-brand-grey">ซื้อแผ่นกรองอากาศ (เช่น ไส้กรองรถยนต์หรือแผ่นกรองแอร์)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-brand-smoke transition-colors cursor-pointer group">
                                <span className="bg-brand-alert group-hover:bg-brand-orange group-hover:text-brand-white text-brand-orange w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-colors">3</span>
                                <div>
                                    <h4 className="font-bold text-brand-black font-heading">ประกอบร่าง</h4>
                                    <p className="text-sm text-brand-grey">แปะแผ่นกรองด้านหลังพัดลม ปิดรอยรั่วด้วยเทปกาว เปิดใช้งาน!</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://www.thaipbs.or.th/news/content/278895"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 w-full bg-brand-orange hover:bg-brand-active text-brand-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 font-heading uppercase tracking-wide inline-flex"
                        >
                            ดูวิดีโอสอนทำ (5 นาที) <ExternalLink size={18} />
                        </a>
                    </div>

                    <div className="bg-brand-alert rounded-xl p-6 border border-brand-orange/20 flex items-start gap-4 shadow-sm font-body">
                        <ShieldCheck className="text-brand-orange flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-brand-black mb-1 font-heading uppercase text-sm tracking-tight">สิ่งที่ต้องตรวจสอบก่อนออกจากบ้าน</h4>
                            <ul className="text-sm text-brand-grey space-y-1 list-disc list-inside">
                                <li>เช็คค่าฝุ่น (ถ้าสีแดง/ส้ม ควรใส่หน้ากาก)</li>
                                <li>หน้ากาก N95 ต้องกดโครงลวดให้แนบจมูก</li>
                                <li>พกยาประจำตัวสำหรับผู้มีโรคภูมิแพ้/หอบหืด</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
