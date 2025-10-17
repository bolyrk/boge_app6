// 获取元素
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const secondsElement = document.getElementById('seconds');
const themeBtn = document.getElementById('themeBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const themeSelector = document.getElementById('themeSelector');
const themeOptions = document.querySelectorAll('.theme-option');

// 初始化主题
let currentTheme = localStorage.getItem('clockTheme') || 'default';
document.body.setAttribute('data-theme', currentTheme);

// 更新时钟
function updateClock() {
    const now = new Date();
    
    // 格式化日期
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];
    
    // 格式化时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 更新显示
    dateElement.textContent = `${year}年${month}月${day}日 ${weekday}`;
    timeElement.textContent = `${hours}:${minutes}`;
    secondsElement.textContent = seconds;
}

// 主题切换按钮
themeBtn.addEventListener('click', () => {
    themeSelector.classList.toggle('active');
});

// 点击外部关闭主题选择器
document.addEventListener('click', (e) => {
    if (!themeBtn.contains(e.target) && !themeSelector.contains(e.target)) {
        themeSelector.classList.remove('active');
    }
});

// 主题选项点击
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('clockTheme', theme);
        themeSelector.classList.remove('active');
    });
});

// 全屏切换
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('无法进入全屏模式:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// 监听全屏变化
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
        `;
    } else {
        fullscreenBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
        `;
    }
});

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // F11 或 F 切换全屏
    if (e.key === 'F11' || e.key === 'f') {
        e.preventDefault();
        fullscreenBtn.click();
    }
    // T 切换主题选择器
    if (e.key === 't' || e.key === 'T') {
        themeBtn.click();
    }
    // ESC 关闭主题选择器
    if (e.key === 'Escape') {
        themeSelector.classList.remove('active');
    }
});

// 初始化时钟
updateClock();
// 每秒更新
setInterval(updateClock, 1000);

// 添加加载动画
window.addEventListener('load', () => {
    document.querySelector('.clock-wrapper').style.opacity = '1';
});

