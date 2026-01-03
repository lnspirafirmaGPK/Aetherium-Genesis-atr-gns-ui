/**
 * AETHERIUM GENESIS - System Integration
 * Role: Director / Orchestrator
 * Finalizes the connection between all modules.
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('input[type="text"]');
    const chatOutput = document.getElementById('chat-output');
    const statusDot = document.getElementById('status-dot');

    // 1. ระบบดักจับการพิมพ์ (Input Interaction)
    inputField.addEventListener('input', (e) => {
        const energy = Math.min(e.target.value.length * 2, 100);
        
        // กระตุ้น Spiritcloth ให้เรืองแสงตามจำนวนตัวอักษร
        if (window.spirit) window.spirit.pulseTrigger(energy);
        
        // ทำให้หัวใจเต้นเร็วขึ้นเล็กน้อยตามการพิมพ์
        if (window.pulse) window.pulse.setIntensity(10 + (energy / 2));
    });

    // 2. ระบบส่งคำสั่ง (Command Dispatcher)
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && inputField.value.trim() !== "") {
            const message = inputField.value;
            
            // สร้างการโต้ตอบในหน้าจอ
            renderMessage(message, 'user');
            
            // จำลองการประมวลผลของ AI
            processCommand(message);
            
            inputField.value = '';
        }
    });

    function renderMessage(text, type) {
        const align = type === 'user' ? 'items-end' : 'items-start';
        const bg = type === 'user' ? 'bg-white/5' : 'border border-white/10';
        const html = `
            <div class="flex flex-col ${align} animate-fade-in">
                <div class="${bg} p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm leading-relaxed">
                    ${text}
                </div>
            </div>`;
        chatOutput.insertAdjacentHTML('beforeend', html);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function processCommand(cmd) {
        // เปลี่ยนสถานะเป็น "กำลังคิด" (Processing)
        statusDot.style.backgroundColor = '#ffaa40'; // Orange
        
        if (window.pulse) window.pulse.setIntensity(60); // หัวใจเต้นแรงขึ้นขณะคิด
        
        setTimeout(() => {
            const response = `[${window.guide.activeMode}] Genesis รับทราบเจตจำนงของคุณ: "${cmd}" กำลังประมวลผลผ่านข่ายใยอีเธอร์...`;
            renderMessage(response, 'ai');
            
            statusDot.style.backgroundColor = '#22c55e'; // Back to Green
            if (window.pulse) window.pulse.setIntensity(15); // กลับสู่สภาวะสงบ
            if (window.spirit) window.spirit.pulseTrigger(100); // ระเบิดแสงเมื่อตอบเสร็จ
        }, 1500);
    }
});
