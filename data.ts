import { AQIData, PolicyItem, Rumor, AirSource, ForecastItem } from './types';

export const LOCATION_IMAGES: Record<string, string> = {
  'เชียงใหม่': "https://files-locals.thaipbs.or.th/prod//1/001_5680093082.jpg",
  'เชียงราย': "https://files.wp.thaipbs.or.th/theactive/2023/04/BCDFC9F2-E923-4AD4-A0F6-68AE8A84DFF2-1024x768.jpeg",
  'แม่ฮ่องสอน': "https://files-locals.thaipbs.or.th/prod//1/Chat_GPT_Image_Jan_27_2026_05_48_32_PM_bf95ba5e6f.png",
  'ลำพูน': "https://localsthaipbs.net/wp-content/uploads/2025/02/398188290_1320650178621378_1481606053619016118_n-1536x864-1-1024x576.jpg",
  'ลำปาง': "https://www.thaipbs.or.th/thecitizen/wp-content/uploads/2022/06/LINE_ALBUM_2022.6.25_%E0%B9%92%E0%B9%92%E0%B9%90%E0%B9%96%E0%B9%92%E0%B9%97_136-1-1024x683.jpg",
  'พะเยา': "https://www.thaipbs.or.th/thecitizen/wp-content/uploads/2023/01/IMG_3024-1024x768-1.jpg",
  'น่าน': "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQngw5TGQg-xcpb9VlYZajXXBKFYKpsvYvebG11JqxHVoTQ5r8e8TLXgAlOIN4PEgNYV4jirW7bUm16LADzv--96eA&s=19",
  'แพร่': "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepj-R6cRulSVVQFbAU1d9tqeucpowkZ4v7nx9doL00pPuvEB2BtQHlzOTMVwLcMnfgHyjz4Ho4e7MSQGcBR2npoICjemZkiKska-Dg_y4ZisrIekIjUNRAVJqLBvsJjJbWlWf99=w1188-h686-n-k-no",
  'default': "https://files-locals.thaipbs.or.th/prod//1/001_5680093082.jpgp"
};

export const MOCK_AQI: AQIData = {
  aqi: 182,
  city: "เชียงใหม่",
  stationName: "ศาลากลางเชียงใหม่",
  status: "Unhealthy",
  pm25: 115.4,
  pm10: 91,
  temperature: 17,
  humidity: 82,
  lastUpdated: "10 นาทีที่แล้ว",
  backgroundImageUrl: "https://files-locals.thaipbs.or.th/prod//1/001_5680093082.jpg",
  isGeolocated: false
};

export const FORECAST_DATA: ForecastItem[] = [
  { time: '14:00', aqi: 175, status: 'Unhealthy' },
  { time: '16:00', aqi: 150, status: 'Unhealthy' },
  { time: '18:00', aqi: 190, status: 'Very Unhealthy' },
  { time: '20:00', aqi: 210, status: 'Very Unhealthy' },
];

export const SOURCES_DATA: AirSource[] = [
  { name: 'การเกษตร (ข้าวโพด/ข้าว)', value: 45, color: '#F15A24', details: 'การเผาเตรียมพื้นที่เกษตรพันธสัญญา' },
  { name: 'ไฟป่า (หาของป่า)', value: 30, color: '#D14010', details: 'การเผาเพื่อล่าสัตว์และเก็บเห็ดถอบ' },
  { name: 'หมอกควันข้ามพรมแดน', value: 15, color: '#8C8C8C', details: 'พัดพามาจากประเทศเพื่อนบ้าน' },
  { name: 'การจราจร/เมือง', value: 10, color: '#1A1A1A', details: 'เครื่องยนต์ดีเซลและการก่อสร้าง' },
];

export const POLICY_DATA: PolicyItem[] = [
  {
    id: '1',
    title: 'Zero Burn Policy (ห้ามเผาเด็ดขาด)',
    year: '2018-2022',
    status: 'failed',
    description: 'นโยบายห้ามเผาโดยสิ้นเชิงในช่วง 60 วันอันตราย',
    outcome: 'ล้มเหลว: ชาวบ้านแอบเผาตอนกลางคืนเพื่อหลบดาวเทียม ทำให้ไฟลามควบคุมยากกว่าเดิม'
  },
  {
    id: '2',
    title: 'Managed Burning (ชิงเผา)',
    year: '2023-2024',
    status: 'doing',
    description: 'การบริหารจัดการเชื้อเพลิง: อนุญาตให้เผาในพื้นที่จำกัดภายใต้การควบคุม ก่อนช่วงวิกฤต',
    outcome: 'กำลังดำเนินการ: ลดปริมาณเชื้อเพลิงสะสมในป่า'
  },
  {
    id: '3',
    title: 'พ.ร.บ. อากาศสะอาด',
    year: '2024',
    status: 'doing',
    description: 'กฎหมายแม่บทเพื่อให้อำนาจจัดการข้ามหน่วยงาน',
    outcome: 'อยู่ในชั้นกรรมาธิการสภาฯ'
  },
  {
    id: '4',
    title: 'รถดับไฟป่าสมรรถนะสูง',
    year: '2021',
    status: 'done',
    description: 'อนุมัติงบซื้ออุปกรณ์ดับไฟให้เจ้าหน้าที่',
    outcome: 'ใช้งานแล้ว: ช่วยระงับเหตุได้ไวขึ้น แต่ไม่แก้ที่ต้นเหตุ'
  },
  {
    id: '5',
    title: 'เปลี่ยนไร่ข้าวโพดเป็นกาแฟ',
    year: '2019',
    status: 'todo',
    description: 'ขยายพื้นที่ปลูกพืชยืนต้นแทนพืชล้มลุก',
    outcome: 'ชะลอตัว: ตลาดกาแฟเริ่มล้น ต้องการการแปรรูปเพิ่มมูลค่า'
  }
];

export const RUMORS: Rumor[] = [
  {
    id: 'r1',
    title: 'ฉีดน้ำขึ้นฟ้าช่วยลด PM2.5 ได้',
    verdict: 'False',
    explanation: 'ละอองน้ำจากหัวฉีดทั่วไปมีขนาดใหญ่กว่าฝุ่น PM2.5 มาก ไม่สามารถจับฝุ่นได้จริง เป็นการสิ้นเปลืองน้ำโดยใช่เหตุ'
  },
  {
    id: 'r2',
    title: 'หน้ากากอนามัยธรรมดากันฝุ่นได้',
    verdict: 'Misleading',
    explanation: 'หน้ากากอนามัยทางการแพทย์กันได้เพียงเล็กน้อย ควรใช้หน้ากาก N95 หรือ KN95 ที่แนบสนิทกับใบหน้า'
  }
];