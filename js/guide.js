/**
 * AETHERIUM GENESIS - Soulful Guide System
 * Role: Creative Orchestrator & Prompt Synthesis
 * Parent: core.js
 */

class SoulfulGuide {
    constructor() {
        this.features = [
            { id: 'AUDIO', label: 'Audio Overview', icon: 'fa-headphones-simple' },
            { id: 'REPORT', label: 'Deep Report', icon: 'fa-file-lines' },
            { id: 'VISUAL', label: 'Visual Guide', icon: 'fa-chart-pie' }
        ];
        this.activeMode = 'AUDIO';
        this.init();
    }

    init() {
        console.log("Soulful Guide: Mapping creative dimensions...");
        // ค้นหา Element ใน Drawer เพื่อเตรียมพร้อม
        this.renderMenu();
    }

    // ฟังก์ชันเปลี่ยนโหมดการทำงาน
    setMode(modeId) {
        this.activeMode = modeId;
        console.log(`Guide Mode Switched to: ${modeId}`);
        // เมื่อเปลี่ยนโหมด ให้ Spiritcloth กระตุ้นแสงเล็กน้อย
        if (window.spirit) window.spirit.pulseTrigger(30);
    }

    // ฟังก์ชันสร้าง Steering Prompt (ตรรกะเบื้องหลังสำหรับ AI)
    generateSteeringPrompt(userInput, context = "") {
        const prompts = {
            AUDIO: `Act as a curious friend. Turn this into a warm conversation: ${userInput}`,
            REPORT: `Act as a strategic analyst. Synthesize this data: ${userInput}`,
            VISUAL: `Act as a creative designer. Visualize the core concepts: ${userInput}`
        };

        const finalPrompt = prompts[this.activeMode] || prompts.AUDIO;
        
        // ส่งสัญญาณให้ Pulse ทำงานหนักขึ้นเมื่อมีการประมวลผล
        if (window.pulse) window.pulse.setIntensity(75);
        
        return finalPrompt;
    }

    // จำลองการสร้างเมนูใน Drawer (หากยังไม่มีใน HTML)
    renderMenu() {
        const guidePanel = document.querySelector('.p-4.rounded-xl.border');
        if (guidePanel) {
            guidePanel.onclick = () => {
                const nextMode = this.features[(this.features.findIndex(f => f.id === this.activeMode) + 1) % this.features.length];
                this.setMode(nextMode.id);
                guidePanel.querySelector('span').innerText = nextMode.label;
                guidePanel.querySelector('i').className = `fas ${nextMode.icon} text-cyan-400`;
            };
        }
    }
}

// สร้าง Instance ไว้รอรับการสั่งการ
document.addEventListener('DOMContentLoaded', () => {
    window.guide = new SoulfulGuide();
});
