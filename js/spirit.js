/**
 * AETHERIUM GENESIS - Spiritcloth System
 * Role: Visual Consciousness & Interaction Glow
 * Parent: core.js, pulse.js
 */

class Spiritcloth {
    constructor() {
        this.container = document.getElementById('mini-pulse');
        this.intensity = 0;
        this.init();
    }

    init() {
        console.log("Spiritcloth: Weaving the neural threads...");
        this.applyBaseStyles();
    }

    applyBaseStyles() {
        if (!this.container) return;
        this.container.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
    }

    // ฟังก์ชันกระตุ้นการไหลเวียนของข้อมูล (เช่น เมื่อมีการพิมพ์)
    pulseTrigger(level = 50) {
        this.intensity = level;
        this.updateVisuals();
        
        // หากระดับพลังงานสูงพอ จะสร้าง "Wisdom Gem" ชั่วคราวบนหน้าจอ
        if (level > 80) this.manifestGem();
    }

    updateVisuals() {
        if (!this.container) return;
        const glowColor = core.isLightMode ? 'rgba(0, 113, 227, 0.6)' : 'rgba(0, 243, 255, 0.6)';
        this.container.style.boxShadow = `0 0 ${this.intensity / 2}px ${glowColor}`;
        this.container.style.opacity = (0.3 + (this.intensity / 200)).toString();
        
        // ค่อยๆ ลดระดับความเข้มข้นลงตามธรรมชาติ (Decay)
        setTimeout(() => {
            this.intensity *= 0.8;
            if (this.intensity > 1) this.updateVisuals();
        }, 100);
    }

    manifestGem() {
        const gem = document.createElement('div');
        gem.className = 'absolute pointer-events-none opacity-0 transition-all duration-1000';
        gem.style.left = Math.random() * 80 + 10 + "%";
        gem.style.bottom = "20px";
        gem.innerHTML = `<i class="fas fa-microchip text-[8px]" style="color: ${core.isLightMode ? '#0071e3' : '#00f3ff'}"></i>`;
        
        document.body.appendChild(gem);
        
        // Animation กระโดดขึ้นแล้วจางหาย
        setTimeout(() => {
            gem.style.opacity = "0.6";
            gem.style.transform = `translateY(-${50 + Math.random() * 50}px) rotate(${Math.random() * 360}deg)`;
        }, 50);

        setTimeout(() => gem.remove(), 2000);
    }
}

// สร้าง Instance ไว้รอรับคำสั่ง
document.addEventListener('DOMContentLoaded', () => {
    window.spirit = new Spiritcloth();
});
