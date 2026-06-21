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
        function loadMotivationalQuote() {
            fetch('motivasyon.txt')
                .then(response => {
                    if (!response.ok) throw new Error('Yüklenemedi');
                    return response.text();
                })
                .then(text => {
                    if (isHTML(text)) throw new Error('Geçersiz TXT formatı.');
                    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('#'));
                    if (lines.length > 0) {
                        const randomLine = lines[Math.floor(Math.random() * lines.length)];
                        document.getElementById('motivational-quote').innerText = `"${randomLine}"`;
                    } else {
                        throw new Error('Dosya boş.');
                    }
                })
                .catch(err => {
                    const fallbackQuotes = [
                        "Bugün çözemediğin soru yarınki başarın olacak.",
                        "Hatalar, matematiğin en güzel öğrenme yoludur.",
                        "Bugünkü azmin, yarınki netlerini belirler!",
                        "Matematikle aranı iyi tut, o seni yarı yolda bırakmaz."
                    ];
                    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
                    document.getElementById('motivational-quote').innerText = `"${randomQuote}"`;
                });
        }

        // AKILLI EN GÜNCEL BULMACA SEÇİCİ MOTOR
        function loadBulmaca() {
            fetch('bulmaca.txt')
                .then(response => {
                    if (!response.ok) throw new Error('Yüklenemedi');
                    return response.text();
                })
                .then(text => {
                    if (isHTML(text)) throw new Error('Geçersiz TXT formatı.');
                    
                    const lines = text.split('\n');
                    const questions = [];
                    let currentQuestion = null;
                    let currentIpucu = null;

                    lines.forEach(line => {
                        const trimmed = line.trim();
                        if (!trimmed || trimmed.startsWith('#')) return;

                        if (trimmed.startsWith('SORU |')) {
                            // Eğer yeni bir soru satırı geldiyse ve önceki soru yarım kaldıysa kaydet
                            if (currentQuestion) {
                                questions.push({ soru: currentQuestion, ipucu: currentIpucu });
                            }
                            currentQuestion = trimmed.replace('SORU |', '').trim();
                            currentIpucu = null;
                        } else if (trimmed.startsWith('IPUCU |')) {
                            currentIpucu = trimmed.replace('IPUCU |', '').trim();
                        }
                    });

                    // En son taranan soruyu da listeye ekle
                    if (currentQuestion) {
                        questions.push({ soru: currentQuestion, ipucu: currentIpucu });
                    }

                    if (questions.length > 0) {
                    // HER ZAMAN EN SONDAKİ (EN GÜNCEL) SORUYU SEÇER
                    const latest = questions[questions.length - 1];
                    document.getElementById('bulmaca-soru').innerHTML = latest.soru;
                
                    // YENİ İPUCU MANTIĞI
                        const ipucuEl = document.getElementById('bulmaca-ipucu');
                    // flex-col (dikey dizilim) ve items-end (içeriği sağa yasla) kullanıyoruz
                    // !text-right ve !important kullanarak tüm hizalama kurallarını eziyoruz
                    const whatsappMetni = `<p style="font-style: italic; text-align: right; max-width: 900px;"> Cevaplarınızı WhatsApp üzerinden bekliyorum.</p>`;
                    
                    if (latest.ipucu) {
                        ipucuEl.innerHTML = latest.ipucu + "<br>" + whatsappMetni;
                    } else {
                        ipucuEl.innerHTML = "Bu hafta için bir ipucu eklenmemiş. Kendine güveniyorsan çözmeye başla!<br>" + whatsappMetni;
                    }
            } 
                    typesetMath();
                })
                .catch(err => {
                    console.warn('Bulmaca dosyası okunamadı, gömülü soru yükleniyor:', err.message);
                    const fallbackSoru = "Bir çiftçi pazar yerine gitmek üzere yola çıkıyor. Yolun $\\frac{1}{3}$'ünü gittikten sonra mola veriyor. Moladan sonra kalan yolun yarısını gittiğinde geriye $12\\text{ km}$ yolu kaldığını fark ediyor. Çiftçinin toplam yolu kaç kilometredir?";
                    const fallbackIpucu = `<i class="fas fa-lightbulb mr-2 text-sm text-amber-500"></i> Çiftçinin toplam yoluna $x$ km diyerek rasyonel sayılarla denklem kurmayı deneyin! Cevabınızı bana WhatsApp üzerinden ulaştırabilirsiniz.`;
                    
                    document.getElementById('bulmaca-soru').innerHTML = fallbackSoru;
                    document.getElementById('bulmaca-ipucu').innerHTML = fallbackIpucu;
                    
                    typesetMath();
                });
        }

        // DÖKÜMAN LİNKLERİ MOTORU
        function loadAndGenerateLinks() {
            fetch('linkler.txt')
                .then(response => {
                    if (!response.ok) throw new Error('Yüklenemedi');
                    return response.text();
                })
                .then(text => {
                    if (isHTML(text)) throw new Error('Geçersiz TXT formatı.');
                    const lines = text.split('\n');
                    const collections = {};

                    lines.forEach(line => {
                        if (!line.trim() || line.startsWith('#')) return;
                        const parts = line.split('|').map(p => p.trim());
                        if (parts.length >= 3) {
                            const [targetClass, title, url, size] = parts;
                            const fileSize = size || 'Belirtilmedi';

                            if (!collections[targetClass]) {
                                collections[targetClass] = [];
                            }
                            collections[targetClass].push({ title, url, fileSize });
                        }
                    });

                    buildDOMLists(collections);
                })
                .catch(err => {
                    const fallbackData = {
                        'class8': [
                            { title: '2026 LGS Matematik Soruları ve Çözümleri', url: 'https://drive.google.com/file/d/17SrsxuWtvDVo_6AyL6BOdgQVEn6Io0Gw/view?usp=sharing', fileSize: '2.1 MB' }
                        ]
                    };
                    buildDOMLists(fallbackData);
                });
        }

        function buildDOMLists(collections) {
            const classCodes = [
                { code: 'class5', name: '5. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
                { code: 'class6', name: '6. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
                { code: 'class7', name: '7. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
                { code: 'class8', name: '8. Sınıf (LGS)', target: 'harici-ortaokul-listesi', icon: 'fa-star text-amber-500 animate-pulse' },
                { code: 'class9', name: '9. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: 'class10', name: '10. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: 'class11', name: '11. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: 'class12', name: '12. Sınıf', target: 'harici-lise-listesi', icon: 'fa-folder-open' },
                { code: 'lgs_prep', name: 'LGS Matematik Hazırlık', target: 'harici-sinav-listesi', icon: 'fa-bullseye' },
                { code: 'tyt_prep', name: 'TYT Matematik Hazırlık', target: 'harici-sinav-listesi', icon: 'fa-layer-group' },
                { code: 'ayt_prep', name: 'AYT Matematik Hazırlık', target: 'harici-sinav-listesi', icon: 'fa-infinity' }
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
        window.filterFiles = filterFiles;        // Sayfa kaydırma kontrolü
        window.onscroll = function() {
            const btn = document.getElementById("scrollToTopBtn");
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            }
        };
        // main.js dosyasına ekleyin
        window.loadLinksForClass = function(classCode) {
            loadClassLinks(classCode);
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
        function loadMotivationalQuote() {
            fetch('motivasyon.txt')
                .then(response => {
                    if (!response.ok) throw new Error('Yüklenemedi');
                    return response.text();
                })
                .then(text => {
                    if (isHTML(text)) throw new Error('Geçersiz TXT formatı.');
                    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('#'));
                    if (lines.length > 0) {
                        const randomLine = lines[Math.floor(Math.random() * lines.length)];
                        document.getElementById('motivational-quote').innerText = `"${randomLine}"`;
                    } else {
                        throw new Error('Dosya boş.');
                    }
                })
                .catch(err => {
                    const fallbackQuotes = [
                        "Bugün çözemediğin soru yarınki başarın olacak.",
                        "Hatalar, matematiğin en güzel öğrenme yoludur.",
                        "Bugünkü azmin, yarınki netlerini belirler!",
                        "Matematikle aranı iyi tut, o seni yarı yolda bırakmaz."
                    ];
                    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
                    document.getElementById('motivational-quote').innerText = `"${randomQuote}"`;
                });
        }

        // AKILLI EN GÜNCEL BULMACA SEÇİCİ MOTOR
        function loadBulmaca() {
            fetch('bulmaca.txt')
                .then(response => {
                    if (!response.ok) throw new Error('Yüklenemedi');
                    return response.text();
                })
                .then(text => {
                    if (isHTML(text)) throw new Error('Geçersiz TXT formatı.');
                    
                    const lines = text.split('\n');
                    const questions = [];
                    let currentQuestion = null;
                    let currentIpucu = null;

                    lines.forEach(line => {
                        const trimmed = line.trim();
                        if (!trimmed || trimmed.startsWith('#')) return;

                        if (trimmed.startsWith('SORU |')) {
                            // Eğer yeni bir soru satırı geldiyse ve önceki soru yarım kaldıysa kaydet
                            if (currentQuestion) {
                                questions.push({ soru: currentQuestion, ipucu: currentIpucu });
                            }
                            currentQuestion = trimmed.replace('SORU |', '').trim();
                            currentIpucu = null;
                        } else if (trimmed.startsWith('IPUCU |')) {
                            currentIpucu = trimmed.replace('IPUCU |', '').trim();
                        }
                    });

                    // En son taranan soruyu da listeye ekle
                    if (currentQuestion) {
                        questions.push({ soru: currentQuestion, ipucu: currentIpucu });
                    }

                    if (questions.length > 0) {
                    // HER ZAMAN EN SONDAKİ (EN GÜNCEL) SORUYU SEÇER
                    const latest = questions[questions.length - 1];
                    document.getElementById('bulmaca-soru').innerHTML = latest.soru;
                
                    // YENİ İPUCU MANTIĞI
                        const ipucuEl = document.getElementById('bulmaca-ipucu');
                    // flex-col (dikey dizilim) ve items-end (içeriği sağa yasla) kullanıyoruz
                    // !text-right ve !important kullanarak tüm hizalama kurallarını eziyoruz
                    const whatsappMetni = `<p style="font-style: italic; text-align: right; max-width: 900px;"> Cevaplarınızı WhatsApp üzerinden bekliyorum.</p>`;
                    
                    if (latest.ipucu) {
                        ipucuEl.innerHTML = latest.ipucu + "<br>" + whatsappMetni;
                    } else {
                        ipucuEl.innerHTML = "Bu hafta için bir ipucu eklenmemiş. Kendine güveniyorsan çözmeye başla!<br>" + whatsappMetni;
                    }
            } 
                    typesetMath();
                })
                .catch(err => {
                    console.warn('Bulmaca dosyası okunamadı, gömülü soru yükleniyor:', err.message);
                    const fallbackSoru = "Bir çiftçi pazar yerine gitmek üzere yola çıkıyor. Yolun $\\frac{1}{3}$'ünü gittikten sonra mola veriyor. Moladan sonra kalan yolun yarısını gittiğinde geriye $12\\text{ km}$ yolu kaldığını fark ediyor. Çiftçinin toplam yolu kaç kilometredir?";
                    const fallbackIpucu = `<i class="fas fa-lightbulb mr-2 text-sm text-amber-500"></i> Çiftçinin toplam yoluna $x$ km diyerek rasyonel sayılarla denklem kurmayı deneyin! Cevabınızı bana WhatsApp üzerinden ulaştırabilirsiniz.`;
                    
                    document.getElementById('bulmaca-soru').innerHTML = fallbackSoru;
                    document.getElementById('bulmaca-ipucu').innerHTML = fallbackIpucu;
                    
                    typesetMath();
                });
        }

        // DÖKÜMAN LİNKLERİ MOTORU
// İstenen sınıfa özel dosyayı yükleyen fonksiyon
function loadClassLinks(classCode) {
    const fileName = `${classCode}.txt`;
    
    fetch('class_document/' + fileName)
        .then(response => {
            if (!response.ok) throw new Error('Dosya bulunamadı');
            return response.text();
        })
        .then(text => {
            const lines = text.split('\n');
            const files = [];

            lines.forEach(line => {
                if (!line.trim() || line.startsWith('#')) return;
                const parts = line.split('|').map(p => p.trim());
                if (parts.length >= 3) {
                    const [title, url, size] = parts;
                    files.push({ title, url, fileSize: size || 'Belirtilmedi' });
                }
            });

            // Gelen veriyi ilgili sınıfın koduna atayarak buildDOM fonksiyonuna gönder
            const collections = {};
            collections[classCode] = files;
            
            // Sadece ilgili sınıfı oluştur
            buildSingleDOMList(classCode, files);
        })
        .catch(err => {
            console.error(classCode + " dosyası yüklenirken hata:", err);
            buildSingleDOMList(classCode, []); // Hata durumunda boş liste göster
        });
}

// Tek bir sınıfı render eden düzeltilmiş fonksiyon
function buildSingleDOMList(classCode, files) {

        const classInfo = {
            'class05': { name: '5. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'class06': { name: '6. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'class07': { name: '7. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'class08': { name: '8. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'class09': { name: '9. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'class10': { name: '10. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'class11': { name: '11. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'class12': { name: '12. Sınıf', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'lgs': { name: 'LGS Sınıfı', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'tyt': { name: 'TYT Sınıfı', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
            'ayt': { name: 'AYT Sınıfı', target: 'harici-ortaokul-listesi', icon: 'fa-folder-open' },
        };

    const item = classInfo[classCode];
    if (!item) return; // Hatalı classCode gelirse durdur

    const targetContainer = document.getElementById(item.target);
    const existingList = document.getElementById('list-' + classCode);
    if (existingList) existingList.remove();

    const listDiv = document.createElement('div');
    listDiv.id = 'list-' + classCode;
    listDiv.className = 'file-list-group theme-card border rounded-2xl p-6 space-y-4 shadow-sm animate-fadeIn';

    let htmlContent = '<ul class="space-y-2">';
    files.forEach(file => {
        htmlContent += `
        <li class="file-item flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
            <span class="text-sm font-medium theme-text-body">${file.title}</span>
            <a href="${file.url}" target="_blank" class="text-blue-600 font-bold text-xs hover:underline">İndir</a>
        </li>`;
    });
    htmlContent += '</ul>';
    
    listDiv.innerHTML = htmlContent;
    targetContainer.appendChild(listDiv);
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

        window.loadClassLinks = loadClassLinks; 
        window.loadLinksForClass = loadClassLinks; // HTML'deki ismiyle eşleşmesi için
