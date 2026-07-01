import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Sadece POST istekleri desteklenir.' });
    }

    try {
        const { examTitle, students } = req.body;

        // Vercel Environment Variables'dan bilgileri çekme
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Dokümanı yükle
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        // Sınav adına göre yeni bir sayfa (Sheet) oluştur
        const sheet = await doc.addSheet({ 
            title: examTitle, 
            headerValues: ['Sıra', 'Öğrenci No', 'Adı Soyadı', 'Sınıf', 'Toplam Net', 'TYT Puanı'] 
        });

        // HTML'den gelen öğrenci datalarını Excel formatına çevir
        const rows = students.map((s, idx) => ({
            'Sıra': idx + 1,
            'Öğrenci No': s.numara,
            'Adı Soyadı': s.name,
            'Sınıf': s.sınıf,
            'Toplam Net': s.totalNet.toFixed(2),
            'TYT Puanı': s.tytPuan.toFixed(1)
        }));

        // Satırları Excel'e ekle
        await sheet.addRows(rows);
        
        return res.status(200).json({ success: true, message: 'Veriler başarıyla Google Sheets\'e yazıldı.' });
    } catch (error) {
        console.error("Sheet Kayıt Hatası:", error);
        return res.status(500).json({ error: error.message });
    }
}
