/**
 * AETHERIUM GENESIS - System Integration
 * Role: Director / Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('user-input'); // ใช้ ID ให้ตรงกับ index.html
    const chatOutput = document.getElementById('chat-output');
    const statusDot = document.getElementById('status-dot');

    if (!inputField) return; // ป้องกัน Error หากหา Element ไม่เจอ

    // 1. ระบบดักจับการพิมพ์ (Input Interaction)
    inputField.addEventListener('input', (e) => {
        const text = e.target.value;
        const energy = Math.min(text.length * 2, 100);

        // กระตุ้น Spiritcloth และ Pulse พื้นฐาน
        if (window.spirit) window.spirit.pulseTrigger(energy);
        if (window.pulse) window.pulse.setIntensity(10 + (energy / 2));
        
        // --- ส่วนที่เพิ่มเข้ามา: อัปเดต Tension แบบ Real-time ---
        updateSystemTension(text);
    });

    // 2. ระบบส่งคำสั่ง
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && inputField.value.trim() !== "") {
            const message = inputField.value;
            renderMessage(message, 'user');
            processCommand(message);
            inputField.value = '';
        }
    });

    function renderMessage(text, type) {
        const align = type === 'user' ? 'items-end' : 'items-start';
        const bg = type === 'user' ? 'bg-white/5' : 'border border-white/10';
        const html = `
            <div class="flex flex-col ${align} animate-fade-in mb-4">
                <div class="${bg} p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm leading-relaxed shadow-sm">
                    ${text}
                </div>
            </div>`;
        chatOutput.insertAdjacentHTML('beforeend', html);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function processCommand(cmd) {
        statusDot.style.backgroundColor = '#ffaa40'; // Thinking...

        if (window.pulse) window.pulse.setIntensity(80); // หัวใจเต้นแรงขณะประมวลผล

        setTimeout(() => {
            const mode = window.guide ? window.guide.activeMode : 'GENESIS';
            const response = `[${mode}] ระบบได้รับเจตจำนง: "${cmd}" กำลังตรวจสอบผ่าน Patimokkha Checker...`;
            
            renderMessage(response, 'ai');

            statusDot.style.backgroundColor = '#22c55e'; // Ready
            if (window.pulse) window.pulse.setIntensity(15);
            if (window.spirit) window.spirit.pulseTrigger(100); // Bloom effect
        }, 1200);
    }
});

/**
 * ระบบวิเคราะห์ Tension (จำลอง EmotionalResilienceNode)
 */
function updateSystemTension(text) {
    const tensionBar = document.getElementById('tension-bar');
    const tensionPct = document.getElementById('tension-pct');
    if (!tensionBar || !tensionPct) return;

    let score = 0;
    const textLower = text.lower ? text.lower() : text.toLowerCase();
    
    // ดักจับ Keyword ตามที่คุณออกแบบไว้ใน Python
    if(textLower.includes("alien") || textLower.includes("conspiracy") || textLower.includes("secret")) {
        score = 0.85;
    } else if(text.length > 0) {
        score = Math.min(text.length * 0.01, 0.4); // Tension ปกติตามความยาวข้อความ
    }

    const pct = Math.round(score * 100);
    tensionBar.style.width = pct + "%";
    tensionPct.innerText = pct + "%";

    // เปลี่ยนสีตามระดับความตึงเครียด
    if(pct > 70) {
        tensionBar.style.backgroundColor = "#ef4444"; // Red (High Tension)
        if(window.pulse) window.pulse.color = "255, 40, 100"; 
    } else if(pct > 30) {
        tensionBar.style.backgroundColor = "#f59e0b"; // Orange
        if(window.pulse) window.pulse.color = "188, 19, 254";
    } else {
        tensionBar.style.backgroundColor = "#00f3ff"; // Cyan (Safe)
        if(window.pulse) window.pulse.color = "0, 243, 255";
    }
}
