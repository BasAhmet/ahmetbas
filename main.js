        // Sayfa kaydırma kontrolü
        window.onscroll = function() {
            const btn = document.getElementById("scrollToTopBtn");
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            }
        };

        // TEMA YÖNETİMİ
        document.addEventListener("DOMContentLoaded", function() {
            let savedTheme = 'light';
            try {
                savedTheme = localStorage.getItem('site-theme') || 'light';
            } catch (e) {
                console.warn('LocalStorage erişimi kısıtlı.');
            }
            changeTheme(savedTheme);
            loadAndGenerateLinks();
            loadMotivationalQuote();
            loadBulmaca();
        });

        function toggleThemeDropdown() {
            const dropdown = document.getElementById('theme-dropdown');
            dropdown.classList.toggle('hidden');
        }

        function changeTheme(themeName) {
            document.body.setAttribute('data-theme', themeName);
            try {
                localStorage.setItem('site-theme', themeName);
            } catch (e) {}
            document.getElementById('theme-dropdown').classList.add('hidden');
        }

        window.addEventListener('click', function(e) {
            const btn = document.getElementById('theme-menu-btn');
            const dropdown = document.getElementById('theme-dropdown');
            if (btn && !btn.contains(e.target) && dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });

        // MODAL KONTROLLERİ
        function openContactModal() {
            document.getElementById('contact-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeContactModal() {
            document.getElementById('contact-modal').classList.add('hidden');
            document.body.style.overflow = '';
            document.getElementById('contact-message-area').value = "";
        }

        function openSocialModal() {
            document.getElementById('social-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeSocialModal() {
            document.getElementById('social-modal').classList.add('hidden');
            document.body.style.overflow = '';
        }

        function openOnlineCourseModal() {
            document.getElementById('online-course-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeOnlineCourseModal() {
            document.getElementById('online-course-modal').classList.add('hidden');
            document.body.style.overflow = '';
        }

        function triggerApplicationFromModal() {
            closeOnlineCourseModal();
            setTimeout(() => {
                openContactModal();
                document.getElementById('contact-message-area').value = "Merhaba Ahmet Hocam, birebir / online matematik dersi programınız hakkında detaylı bilgi ve ön görüşme randevusu almak istiyorum.";
            }, 300);
        }

        window.addEventListener('click', function(e) {
            const contactModal = document.getElementById('contact-modal');
            const socialModal = document.getElementById('social-modal');
            const courseModal = document.getElementById('online-course-modal');
            if (e.target === contactModal) closeContactModal();
            if (e.target === socialModal) closeSocialModal();
            if (e.target === courseModal) closeOnlineCourseModal();
        });

        // E-POSTA KOPYALAYICI FONKSİYON
        function copyMailToClipboard(btnElement) {
            const email = "ahba8184@gmail.com";
            
            const el = document.createElement('textarea');
            el.value = email;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            const originalHTML = btnElement.innerHTML;
            btnElement.className = "flex items-center justify-center space-x-1.5 p-3 bg-emerald-500 text-white rounded-2xl transition-all shadow-sm font-bold text-xs";
            btnElement.innerHTML = `<i class="fas fa-check text-sm"></i> <span>Kopyalandı!</span>`;
            
            setTimeout(() => {
                btnElement.className = "flex items-center justify-center space-x-1.5 p-3 bg-slate-500/5 hover:bg-slate-500/10 border theme-border theme-text-title rounded-2xl transition-all shadow-sm font-bold text-xs";
                btnElement.innerHTML = originalHTML;
            }, 2500);
        }

        // SEKME GEÇİŞLERİ (HOME <-> MATERIALS)
        function switchTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelectorAll('.sub-content').forEach(content => content.classList.remove('active'));
            hideAllFileLists();
            
            document.getElementById('tab-btn-home').className = 'px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all theme-text-muted hover:theme-text-title hover:bg-slate-100/50';
            document.getElementById('tab-btn-social').className = 'px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all theme-text-muted hover:theme-text-title hover:bg-slate-100/50';
            document.getElementById('tab-btn-materials').className = 'px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all theme-text-muted hover:theme-text-title hover:bg-slate-100/50';
            
            const targetTab = document.getElementById('tab-' + tabName);
            targetTab.classList.remove('hidden');
            targetTab.classList.add('active');
            
            const activeBtn = document.getElementById('tab-btn-' + tabName);
            activeBtn.className = 'px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all theme-accent-text theme-accent-soft';
        }

        function openSubPage(subName) {
            document.querySelectorAll('.sub-content').forEach(content => content.classList.remove('active'));
            hideAllFileLists();
            document.getElementById('sub-' + subName).classList.add('active');
            document.getElementById('sub-' + subName).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function hideAllFileLists() {
            document.querySelectorAll('.file-list-group').forEach(list => {
                list.style.display = 'none';
            });
        }

        function showFiles(className) {
            hideAllFileLists();
            const targetList = document.getElementById('list-' + className);
            if(targetList) {
                targetList.style.display = 'block';
                targetList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // LATEX DERLEYİCİ MOTORU
        let mathJaxRetries = 0;
        function typesetMath() {
            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise()
                    .catch(err => console.error("MathJax derleme hatası:", err));
            } else if (mathJaxRetries < 30) {
                mathJaxRetries++;
                setTimeout(typesetMath, 150);
            }
        }

        function isHTML(text) {
            const clean = text.trim().toLowerCase();
            return clean.startsWith('<!doctype html') || clean.startsWith('<html') || clean.includes('<body') || clean.includes('</div>');
        }

        // MOTİVASYON SÖZÜ MOTORU
async function loadMotivationalQuote() {
    // Sizin verdiğiniz motivasyon sözleri CSV linki
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCRYFI5C-6AxkSHMmh3BdfAJg3dVxwXt3nJ0hgzgwxuJWrlcS-J6rYKvfMNrfb7PuzqGV7aHcAYBp-/pub?gid=1922758547&single=true&output=csv';

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error('Yüklenemedi');
        
        const text = await response.text();
        const lines = text.split('\n');
        
        // CSV'deki verileri bir diziye alıyoruz (1. satır başlık olduğu için i=1'den başlıyoruz)
        const quotes = [];
        for (let i = 1; i < lines.length; i++) {
            const quote = lines[i].trim();
            if (quote) quotes.push(quote);
        }

        if (quotes.length > 0) {
	    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
	    randomQuote = randomQuote.replace(/^"|"$/g, '');
            document.getElementById('motivational-quote').innerText = `"${randomQuote}"`;
        } else {
            throw new Error('Dosya boş.');
        }
    } catch (err) {
        console.warn("Motivasyon sözü çekilemedi, yedek sözler kullanılıyor:", err);
        // Hata durumunda yedek sözler
        const fallbackQuotes = [
            "Bugün çözemediğin soru yarınki başarın olacak.",
            "Hatalar, matematiğin en güzel öğrenme yoludur."
        ];
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        document.getElementById('motivational-quote').innerText = `"${randomQuote}"`;
    }
}

        // AKILLI EN GÜNCEL BULMACA SEÇİCİ MOTOR
async function loadBulmaca() {
    // 1. ADIM: Linkin sonunu &output=csv yerine &output=tsv yapın
    const tsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCRYFI5C-6AxkSHMmh3BdfAJg3dVxwXt3nJ0hgzgwxuJWrlcS-J6rYKvfMNrfb7PuzqGV7aHcAYBp-/pub?gid=298081800&single=true&output=tsv';

    try {
        const response = await fetch(tsvUrl);
        if (!response.ok) throw new Error('Yüklenemedi');
        
        const text = await response.text();
        const lines = text.split('\n');
        const questions = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // 2. ADIM: BURAYI DEĞİŞTİRDİK
            // Virgül (,) yerine \t (tab) kullandık. Bu sayede soru içindeki virgüller karışmaz.
            const [soru, ipucu] = line.split('\t'); 
            
            if (soru) {
                questions.push({ 
                    soru: soru.trim(), 
                    ipucu: ipucu ? ipucu.trim() : null 
                });
            }
        }

        if (questions.length > 0) {
            const latest = questions[questions.length - 1];
            document.getElementById('bulmaca-soru').innerHTML = latest.soru;

            const ipucuEl = document.getElementById('bulmaca-ipucu');
            const whatsappMetni = `<p style="font-style: italic; text-align: right; max-width: 900px;"> Cevaplarınızı WhatsApp üzerinden bekliyorum.</p>`;
            
            ipucuEl.innerHTML = (latest.ipucu && latest.ipucu !== "null") ? latest.ipucu + "<br>" + whatsappMetni : "Bu hafta için bir ipucu eklenmemiş.<br>" + whatsappMetni;
        }
        
        if (typeof typesetMath === 'function') typesetMath();

    } catch (err) {
        console.error('Hata:', err);
    }
}

        // DÖKÜMAN LİNKLERİ MOTORU
        async function loadAndGenerateLinks() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCRYFI5C-6AxkSHMmh3BdfAJg3dVxwXt3nJ0hgzgwxuJWrlcS-J6rYKvfMNrfb7PuzqGV7aHcAYBp-/pub?gid=0&single=true&output=csv';

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error('Veri yüklenemedi');
        
        const text = await response.text();
        const lines = text.split('\n'); // Satırlara ayır
        const collections = {};

        // 1. satır başlık olduğu için i=1'den başlıyoruz
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // CSV olduğu için virgülle parçalıyoruz
            const [targetClass, title, url, size] = line.split(',');

            if (targetClass && title && url) {
                if (!collections[targetClass]) {
                    collections[targetClass] = [];
                }
                collections[targetClass].push({ 
                    title: title.trim(), 
                    url: url.trim(), 
                    fileSize: size ? size.trim() : 'Belirtilmedi' 
                });
            }
        }

        buildDOMLists(collections);
    } catch (err) {
        console.error("API'den veri alınamadı:", err);
        // İsterseniz buraya yedek verilerinizi ekleyebilirsiniz
    }
}

        function buildDOMLists(collections) {
            const classCodes = [
                { code: '5', name: '5. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
                { code: '6', name: '6. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
                { code: '7', name: '7. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
                { code: '8', name: '8. Sınıf (LGS)', target: 'harici-ortaokul-listesi', icon: 'fa-star text-amber-500 animate-pulse' },
                { code: '9', name: '9. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: '10', name: '10. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: '11', name: '11. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: '12', name: '12. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: 'lgs', name: 'LGS Matematik Hazırlık', target: 'harici-sinav-listesi', icon: 'fa-bullseye' },
                { code: 'tyt', name: 'TYT Matematik Hazırlık', target: 'harici-sinav-listesi', icon: 'fa-layer-group' },
                { code: 'ayt', name: 'AYT Matematik Hazırlık', target: 'harici-sinav-listesi', icon: 'fa-infinity' }
            ];

            classCodes.forEach(item => {
                const targetContainer = document.getElementById(item.target);
                if (!targetContainer) return;

                const existingList = document.getElementById('list-' + item.code);
                if (existingList) existingList.remove();

                const files = collections[item.code] || [];

                const listDiv = document.createElement('div');
                listDiv.id = 'list-' + item.code;
                listDiv.className = 'file-list-group theme-card border rounded-2xl p-6 space-y-4 shadow-sm animate-fadeIn';
                listDiv.style.display = 'none';

                const header = document.createElement('h4');
                header.className = 'font-bold theme-text-title border-b theme-border pb-2 flex items-center text-base';
                header.innerHTML = `<i class="fas ${item.icon} theme-accent-text mr-2"></i> ${item.name} Döküman Listesi`;
                listDiv.appendChild(header);

                if (files.length === 0) {
                    const emptyMsg = document.createElement('div');
                    emptyMsg.className = 'p-4 rounded-xl border theme-border theme-text-muted text-center text-sm font-semibold bg-slate-500/5';
                    emptyMsg.innerHTML = `<i class="fas fa-info-circle mr-1.5"></i> Bu kademeye ait dökümanlar çok yakında yüklenecektir.`;
                    listDiv.appendChild(emptyMsg);
                } else {
                    const container = document.createElement('div');
                    container.className = 'space-y-2.5';

                    files.forEach(file => {
                        const fileRow = document.createElement('div');
                        fileRow.className = 'file-item p-3 bg-slate-500/5 hover:bg-slate-500/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between border theme-border transition-all gap-3';
                        fileRow.innerHTML = `
                            <div class="flex items-start space-x-3">
                                <div class="text-red-500 text-lg mt-0.5"><i class="far fa-file-pdf"></i></div>
                                <div>
                                    <span class="text-sm font-bold theme-text-title block leading-tight">${file.title}</span>
                                    <span class="text-xs theme-text-muted font-medium">Dosya Boyutu: ${file.fileSize}</span>
                                </div>
                            </div>
                            <a href="${file.url}" target="_blank" onclick="gtag('event', 'file_download', {'file_name': '${file.title}'})" class="theme-btn-accent text-center py-2 px-4 rounded-xl text-xs font-bold transition shadow-sm whitespace-nowrap"><i class="fas fa-cloud-download-alt mr-1"></i> Görüntüle / İndir</a>
                        `;
                        container.appendChild(fileRow);
                    });
                    listDiv.appendChild(container);
                }

                targetContainer.appendChild(listDiv);
            });
            
            typesetMath();
        }

        function filterFiles() {
            const input = document.getElementById('fileSearch');
            const filter = input.value.toLowerCase();
            const fileItems = document.querySelectorAll('.file-item');
            const listGroups = document.querySelectorAll('.file-list-group');
        
            // Dosyaları filtrele
            fileItems.forEach(item => {
                if (item.textContent.toLowerCase().includes(filter)) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        
            // Eğer bir gruptaki tüm dosyalar gizlendiyse grubu da gizle (isteğe bağlı)
            listGroups.forEach(group => {
                const visibleItems = group.querySelectorAll('.file-item[style*="display: flex"]');
                group.style.display = (visibleItems.length > 0 || filter === "") ? 'block' : 'none';
            });
        }

        document.getElementById('tab-btn-home').addEventListener('click', () => {
            switchTab('home');
        });
        // main.js dosyasının en altına ekleyin:
        window.switchTab = switchTab;
        window.openSocialModal = openSocialModal;
        window.openOnlineCourseModal = openOnlineCourseModal;
        window.openContactModal = openContactModal;
        window.closeContactModal = closeContactModal;
        window.closeSocialModal = closeSocialModal;
        window.closeOnlineCourseModal = closeOnlineCourseModal;
        window.triggerApplicationFromModal = triggerApplicationFromModal;
        window.copyMailToClipboard = copyMailToClipboard;
        window.toggleThemeDropdown = toggleThemeDropdown;
        window.changeTheme = changeTheme;
        window.openSubPage = openSubPage;
        window.showFiles = showFiles;
        window.filterFiles = filterFiles;
