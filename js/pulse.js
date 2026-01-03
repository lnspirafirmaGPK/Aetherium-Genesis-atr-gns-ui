/**
 * AETHERIUM GENESIS - Vital Pulse System
 * Role: Heartbeat & Emotional Waveform
 * Parent: core.js
 */

class VitalPulse {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.intensity = 10; // 0-100
        this.phase = 0;
        this.color = "0, 243, 255";
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = this.canvas.offsetWidth;
        this.height = this.canvas.height = this.canvas.offsetHeight;
    }

    // ฟังก์ชันสำหรับปรับความแรงของสัญญาณจากภายนอก
    setIntensity(val) {
        this.intensity = Math.max(0, Math.min(100, val));
        this.updateColor();
    }

    updateColor() {
        if (this.intensity < 30) this.color = "0, 243, 255";      // Cyan (Peace)
        else if (this.intensity < 70) this.color = "188, 19, 254"; // Purple (Thought)
        else this.color = "255, 40, 100";                         // Red (Passion)
    }

    animate() {
        const { ctx, width, height } = this;
        ctx.fillStyle = core.isLightMode ? 'rgba(245, 245, 247, 0.15)' : 'rgba(5, 5, 8, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgb(${this.color})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgb(${this.color})`;

        this.phase += 0.05 + (this.intensity / 500);

        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x += 5) {
            // คลื่น Sine ผสมกับสัญญาณรบกวนตามค่า Intensity
            const wave = Math.sin(x * 0.02 + this.phase) * (height * 0.3);
            const noise = (Math.random() - 0.5) * (this.intensity / 5);
            ctx.lineTo(x, (height / 2) + wave + noise);
        }
        ctx.stroke();

        requestAnimationFrame(() => this.animate());
    }
}

// เริ่มการทำงานเมื่อ DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    window.pulse = new VitalPulse('drawer-pulse');
});
