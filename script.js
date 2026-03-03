// ========== التنقل والواجهة ==========
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('show');
}

function toggleSearch() {
    document.getElementById('superSearch').classList.toggle('show');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
}

// ========== وظائف صفحة القرآن ==========
function toggleTafsir() {
    const sidebar = document.getElementById('tafsirSidebar');
    sidebar.classList.toggle('show');
}

function closeTafsirSidebar() {
    document.getElementById('tafsirSidebar').classList.remove('show');
}

function switchSidebarTab(tab) {
    // تغيير التبويبات النشطة
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // إظهار المحتوى المناسب
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tab + 'Content').classList.add('active');
}

function toggleTajweed() {
    const legend = document.getElementById('tajweedLegend');
    legend.style.display = legend.style.display === 'block' ? 'none' : 'block';
}

function closeTajweedLegend() {
    document.getElementById('tajweedLegend').style.display = 'none';
}

function bookmarkAyah() {
    // حفظ الآية في localStorage
    const surah = document.getElementById('surahName').textContent;
    const ayah = prompt("أدخل رقم الآية لحفظها:");
    if (ayah) {
        let bookmarks = JSON.parse(localStorage.getItem('quranBookmarks') || '[]');
        bookmarks.push({ surah, ayah, date: new Date().toISOString() });
        localStorage.setItem('quranBookmarks', JSON.stringify(bookmarks));
        alert('تم حفظ الآية في المفضلة');
    }
}

function shareAyah() {
    const surah = document.getElementById('surahName').textContent;
    const ayah = prompt("أدخل رقم الآية للمشاركة:");
    if (ayah) {
        const text = encodeURIComponent(`﴿ ${surah} - الآية ${ayah} ﴾\nمن موقع نور الإسلامي`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
}

// ========== مشغل الصوت ==========
let isPlaying = false;

function toggleAudioPlayback() {
    const icon = document.getElementById('playPauseIcon');
    
    if (isPlaying) {
        if (currentAudio) currentAudio.pause();
        icon.className = 'fas fa-play';
    } else {
        if (currentAudio) currentAudio.play();
        icon.className = 'fas fa-pause';
    }
    
    isPlaying = !isPlaying;
}

function nextAyah() {
    // الانتقال للآية التالية
    alert('الانتقال للآية التالية');
}

function previousAyah() {
    // الانتقال للآية السابقة
    alert('الانتقال للآية السابقة');
}

function repeatAyah() {
    // إعادة الآية
    if (currentAudio) {
        currentAudio.currentTime = 0;
        currentAudio.play();
    }
}

function changeVolume(value) {
    if (currentAudio) {
        currentAudio.volume = value / 100;
    }
}

function seekAudio(event) {
    const progressBar = event.currentTarget;
    const clickPosition = event.offsetX / progressBar.offsetWidth;
    
    if (currentAudio) {
        currentAudio.currentTime = clickPosition * currentAudio.duration;
    }
}

// ========== دوال إضافية ==========
function showQuickTafsir(surah, ayah) {
    toggleTafsir();
    switchSidebarTab('tafsir');
    // تحميل التفسير للآية المحددة
    document.getElementById('tafsirText').innerHTML = 
        `<p>تفسير الآية ${ayah} من سورة ${surah}...</p>`;
}

// تصدير الدوال للاستخدام العام
window.toggleMenu = toggleMenu;
window.toggleSearch = toggleSearch;
window.toggleTheme = toggleTheme;
window.toggleTafsir = toggleTafsir;
window.closeTafsirSidebar = closeTafsirSidebar;
window.switchSidebarTab = switchSidebarTab;
window.toggleTajweed = toggleTajweed;
window.closeTajweedLegend = closeTajweedLegend;
window.bookmarkAyah = bookmarkAyah;
window.shareAyah = shareAyah;
window.toggleAudioPlayback = toggleAudioPlayback;
window.nextAyah = nextAyah;
window.previousAyah = previousAyah;
window.repeatAyah = repeatAyah;
window.changeVolume = changeVolume;
window.seekAudio = seekAudio;
window.showQuickTafsir = showQuickTafsir;