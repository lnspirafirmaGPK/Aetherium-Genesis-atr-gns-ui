/**
 * AETHERIUM GENESIS - Core Linkage System
 * Role: Central Nervous System (CNS)
 * Version: 4.0.0
 */

class GenesisCore {
    constructor() {
        this.isLightMode = false;
        this.language = 'TH'; // Default Language
        this.init();
    }

    init() {
        console.log("Genesis Core: Initializing Sector 9...");
        this.bindEvents();
    }

    // สลับภาษา TH/EN
    toggleLanguage() {
        this.language = this.language === 'TH' ? 'EN' : 'TH';
        this.updateUIStrings();
        return this.language;
    }

    // สลับโหมด แสง/มืด
    toggleTheme() {
        this.isLightMode = !this.isLightMode;
        document.body.classList.toggle('light-mode', this.isLightMode);
        localStorage.setItem('genesis_theme', this.isLightMode ? 'light' : 'dark');
    }

    // อัปเดตข้อความใน UI ตามภาษาที่เลือก
    updateUIStrings() {
        const strings = {
            TH: {
                placeholder: "พิมพ์คำสั่งหรือความรู้สึก...",
                status: "ระบบทำงานปกติ",
                modules: "โมดูลควบคุม"
            },
            EN: {
                placeholder: "Type a command or feeling...",
                status: "System Online",
                modules: "Control Modules"
            }
        };

        const current = strings[this.language];
        document.querySelector('input').placeholder = current.placeholder;
        document.querySelector('h1').innerText = `Aetherium Genesis // ${current.status}`;
        document.querySelector('#drawer h2').innerText = current.modules;
    }

    bindEvents() {
        // จัดการ Drawer
        window.toggleDrawer = () => {
            document.getElementById('drawer').classList.toggle('open');
        };

        // จัดการ Theme
        window.toggleTheme = () => this.toggleTheme();
    }
}

// สร้าง Instance ของระบบ
const core = new GenesisCore();
