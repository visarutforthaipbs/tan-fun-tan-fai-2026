import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, Wind, Clock, RefreshCw, MapPin } from 'lucide-react';
import { MOCK_AQI, FORECAST_DATA as MOCK_FORECAST } from '../data';
import { NewcomerContext } from '../App';
import { Tooltip } from './Tooltip';
import { fetchAirQuality } from '../services/airQualityService';
import { AQIData, ForecastItem } from '../types';

export const Hero: React.FC = () => {
    const { isNewcomer } = useContext(NewcomerContext);
    const [aqiData, setAqiData] = useState<AQIData>(MOCK_AQI);
    const [forecast, setForecast] = useState<ForecastItem[]>(MOCK_FORECAST);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const { current, forecast: forecastData } = await fetchAirQuality();
                setAqiData(current);
                setForecast(forecastData);
                setError(false);
            } catch (err) {
                console.error("Failed to load real-time data", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const getStatusColor = (aqi: number) => {
        if (aqi <= 50) return 'bg-pmGreen text-brand-black';
        if (aqi <= 100) return 'bg-pmYellow text-brand-black';
        if (aqi <= 150) return 'bg-pmOrange text-brand-black';
        if (aqi <= 200) return 'bg-pmRed text-white';
        if (aqi <= 300) return 'bg-pmPurple text-white';
        return 'bg-pmMaroon text-white';
    };

    const getStatusText = (aqi: number) => {
        if (isNewcomer) {
            if (aqi > 200) return "อันตราย: ใส่ N95";
            if (aqi > 150) return "เริ่มแย่: งดวิ่ง";
            if (aqi > 100) return "พอไหว: ใส่หน้ากาก";
            return "อากาศดี: เปิดหน้าต่างได้";
        }
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Unhealthy for Sensitive';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Very Unhealthy';
        return 'Hazardous';
    };

    const statusColor = getStatusColor(aqiData.aqi);

    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Dynamic Background — changes based on user's province */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-smoke via-brand-grey to-brand-black transition-opacity duration-1000 pointer-events-none" style={{ opacity: Math.min(aqiData.aqi / 300, 0.9) }}></div>
            <div
                className="absolute inset-0 z-0 bg-cover bg-center mix-blend-overlay opacity-30 transition-all duration-1000"
                style={{ backgroundImage: `url('${aqiData.backgroundImageUrl}')` }}
            ></div>

            <div className="relative z-10 w-full max-w-md text-center space-y-6 pt-16">

                {/* Context Bar Hook */}
                <div className="bg-brand-alert border-l-4 border-brand-orange text-brand-active p-4 rounded-r shadow-md text-left mb-6 animate-fade-in-up">
                    <p className="font-bold flex items-center gap-2">
                        <Info size={16} />
                        {isNewcomer ? "เพิ่งเคยเจอฝุ่น? อย่าเพิ่งตระหนก" : "สถานการณ์ประจำวัน"}
                    </p>
                    <p className="text-sm mt-1">
                        {isNewcomer
                            ? "3 สิ่งที่คุณต้องรู้ก่อนบ่นลงโซเชียล: เราอยู่ในแอ่งกระทะ, ลมไม่พัด, และปัญหานี้ซับซ้อนกว่าแค่ 'จับคนเผา'"
                            : "ความกดอากาศสูงยังคงกดทับพื้นที่ ภาคเหนือตอนบนยังคงวิกฤตต่อเนื่องอีก 3 วัน"
                        }
                    </p>
                    {isNewcomer && <a href="/haze-101" className="text-xs font-bold underline mt-2 inline-block">อ่านสรุปจบใน 2 นาที</a>}
                </div>

                <div className="animate-fade-in-up delay-75">
                    {/* Location + Station Info */}
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-white backdrop-blur-sm text-sm mb-2">
                        {loading ? <RefreshCw size={14} className="animate-spin" /> : <MapPin size={14} />}
                        {aqiData.isGeolocated ? 'สถานีใกล้คุณ' : aqiData.city}
                        {loading ? " กำลังโหลด..." : ` • ${aqiData.lastUpdated}`}
                    </span>

                    {/* Station name (Thai) */}
                    {!loading && (
                        <p className="text-white/80 text-xs mb-3 drop-shadow">
                            {aqiData.isGeolocated
                                ? `${aqiData.stationName}, ${aqiData.city}`
                                : `${aqiData.stationName} (ค่าเริ่มต้น)`
                            }
                        </p>
                    )}

                    <motion.div
                        animate={{
                            scale: [1, 1.03, 1],
                            boxShadow: [
                                "0 0 20px rgba(255,255,255,0.1)",
                                "0 0 40px rgba(255,255,255,0.3)",
                                "0 0 20px rgba(255,255,255,0.1)"
                            ]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={`w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto rounded-full flex flex-col items-center justify-center shadow-2xl border-8 border-white/20 backdrop-blur-md ${statusColor} transition-colors duration-500 ${loading ? 'opacity-50' : ''}`}
                    >
                        <span className="text-base md:text-xl font-medium opacity-90">US AQI</span>
                        <span className="text-5xl md:text-7xl font-bold tracking-tighter">{aqiData.aqi}</span>
                        <span className="text-base md:text-xl font-semibold mt-2 px-4">{getStatusText(aqiData.aqi)}</span>
                    </motion.div>
                </div>

                {/* Stats Card with PM2.5, Temperature, Humidity */}
                <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-xl space-y-4 animate-fade-in-up delay-150">
                    <div className="flex justify-between items-center text-brand-black">
                        <span className="font-medium">
                            <Tooltip
                                active={isNewcomer}
                                text="PM2.5"
                                explanation="ฝุ่นขนาดจิ๋วที่ขนจมูกกรองไม่ได้ เข้าสู่กระแสเลือดได้โดยตรง"
                            >
                                ค่า PM2.5
                            </Tooltip>
                        </span>
                        <span className="font-bold text-xl">{aqiData.pm25} µg/m³</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-pmRed transition-all duration-1000" style={{ width: `${Math.min((aqiData.pm25 / 100) * 100, 100)}%` }}></div>
                    </div>

                    {/* Data source */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-xs text-brand-grey">
                        <span className="flex items-center gap-1">
                            <Wind size={12} /> ข้อมูลจาก GISTDA เช็คฝุ่น
                        </span>
                        <span>อัปเดต {aqiData.lastUpdated}</span>
                    </div>
                </div>

                {/* Breathing Forecast */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-lg animate-fade-in-up delay-200">
                    <h4 className="text-left font-bold text-brand-black text-sm mb-3 flex items-center gap-2">
                        <Clock size={16} /> ย้อนหลัง 24 ชั่วโมง
                    </h4>
                    <div className="flex justify-between gap-2 overflow-x-auto scrollbar-hide pb-2">
                        {forecast.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center min-w-[60px] p-2 rounded-lg bg-brand-smoke border border-gray-100">
                                <span className="text-xs text-brand-grey font-medium">{item.time}</span>
                                <span className={`text-lg font-bold ${item.aqi > 150 ? 'text-pmRed' : 'text-pmOrange'}`}>{item.aqi}</span>
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-xs text-brand-orange mt-2">ไม่สามารถดึงข้อมูลจริงได้ กำลังแสดงข้อมูลจำลอง</p>}
                    <p className="text-xs text-brand-grey text-left mt-2">
                        {isNewcomer ? "ช่วง 4 โมงเย็นอากาศจะถ่ายเทดีขึ้นเล็กน้อย" : "ค่าฝุ่นจะสูงขึ้นในช่วงค่ำจากปรากฏการณ์ Inversion"}
                    </p>
                </div>

                <div className="pt-4 pb-8">
                    <a href="/haze-101" className="inline-flex items-center gap-2 bg-brand-black text-white px-6 py-3 text-base md:px-8 md:py-4 md:text-lg rounded-lg font-bold shadow-lg hover:bg-brand-black/90 hover:scale-105 transition-all font-heading">
                        <AlertTriangle size={20} className="text-brand-orange" />
                        ทำไมรัฐบาลไม่ทำอะไร?
                    </a>
                </div>
            </div>
        </section>
    );
};