// api/save.js
async function saveActiveExamToDB(reportData) {
    // Kendi URL'niz
    const webAppUrl = "https://script.google.com/macros/s/AKfycbzq_AUX-Ep0NM10bP-Yol83ODOWVehBqsXLW5BxnqjG8QJQn5h81CbzAPx0J9s85V68zA/exec";
    
    const btn = document.getElementById("btnSaveToDB");
    if (btn) btn.innerText = "⏳ Gönderiliyor...";
    
    try {
        const response = await fetch(webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ students: reportData })
        });
        
        alert("✅ Başarılı! Veriler Google Sheets'e eklendi/güncellendi.");
    } catch (error) {
        console.error("Kayıt hatası:", error);
        alert("❌ Kayıt sırasında bir hata oluştu.");
    } finally {
        if (btn) btn.innerText = "💾 Google Sheets'e Kaydet";
    }
}
