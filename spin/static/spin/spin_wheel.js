import {drawBlankCircle, drawWheel, animateToIndex} from './wheel_draw.js';

(function () {
    const canvas = document.getElementById('wheel');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const spin_Btn = document.getElementById('spinBtn');
    const update_Btn = document.getElementById('updateSegmentsBtn');
    const clear_Btn = document.getElementById('clearSegmentsBtn');
    const segment_Input = document.getElementById('segmentInput');
    const message = document.getElementById('messageEl');
    const modal = document.getElementById('resultModal');
    const modal_Result = document.getElementById('modalResult');
    const close_Modal = document.getElementById('closeModal');
    const remainingSpinsEl = document.getElementById("remainingSpins");
    const remainingSpinsCenterEl = document.getElementById("remainingSpinsCenter");
    let remaining = parseInt(remainingSpinsEl.innerText);

    const spin_Url = canvas.dataset.spinUrl || null;
    const csrf_Token = canvas.dataset.csrf || '';

    let segments = [];
    const colors = [
        "#b1d0f1",
        "#a3c7f3",
        "#8db6f1",
        "#75a4ee",
        "#5d90e4",
        "#487dd6",
        "#3568c0"
    ];


    const size = canvas.width;
    const radius = size / 2;
    const angleObj = {angle: 0};
    let spinning = false;

    function parseSegmentsFromInput() {
        const raw = segmentInput.value || '';
        const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        return lines;
    }

    function applySegments() {
        segments = parseSegmentsFromInput();
        angleObj.angle = 0;
        drawWheel(ctx, segments, angleObj.angle, radius, size, colors);
        message.innerText = segments.length ? `${segments.length} items applied.` : 'List is empty.';
    }

    function clearSegments() {
        segment_Input.value = '';
        segments = [];
        angleObj.angle = 0;
        drawBlankCircle(ctx, radius, size);
        message.innerText = 'Deleted';
    }

    async function requestServerChoice(segmentsArr) {
        if (!spin_Url) return {ok: false, reason: 'no-url'};
        try {
            const res = await fetch(spin_Url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf_Token,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({segments: segmentsArr}),
            });

            if (!res.ok) {
                return {ok: false, status: res.status, text: await res.text()};
            }

            const data = await res.json();
            if (data.status === "error") {
                return {ok: true, data};
            }
            if (typeof data.result_index === 'number') {
                return {ok: true, data};
            }
            return {ok: false, reason: 'no-index', data};

        } catch (err) {
            return {ok: false, err};
        }
    }


    async function handleSpin() {
        if (spinning) return;
        if (!segments.length) {
            message.innerText = "Please add items and click Apply.";
            return;
        }
        spinning = true;
        spin_Btn.disabled = true;
        message.innerText = "Requesting server...";

        const res = await requestServerChoice(segments);
        if (!res.ok) {
            console.error("Server choice failed:", res);
            message.innerText = "Server error: could not get result.";
            spinning = false;
            spin_Btn.disabled = false;
            return;
        }

        const data = res.data;

        if (data.status === "error") {
            message.innerText = "❌ No spins left for today. Come back tomorrow!";
            spin_Btn.disabled = true;
            remainingSpinsEl.textContent = 0;
            remainingSpinsCenterEl.textContent = 0;
            spinning = false;
            return;
        }

        const targetIndex = data.result_index;
        const label = data.result_label ?? segments[targetIndex];

        message.innerText = "Spinning...";
        animateToIndex(targetIndex, segments,
            () => drawWheel(ctx, segments, angleObj.angle, radius, size, colors),
            angleObj, radius,
            () => {
                modal_Result.innerHTML = `<p>🎉 Result: <strong>${label}</strong></p>`;
                modal.style.display = 'flex';
                startConfetti();
                message.innerText = `Result: ${label}`;
                remaining = data.remaining_spins_today;
                remainingSpinsEl.textContent = remaining;
                remainingSpinsCenterEl.textContent = remaining;
                spinning = false;
                spin_Btn.disabled = false;
            });
    }

    function startConfetti() {
        if (typeof confetti === "function") {
            const duration = 2500;
            const end = Date.now() + duration;
            (function frame() {
                confetti({particleCount: 6, spread: 70, origin: {y: 0.6}});
                if (Date.now() < end) requestAnimationFrame(frame);
            })();
        }
    }
    update_Btn.addEventListener('click', applySegments);
    clear_Btn.addEventListener('click', clearSegments);
    spin_Btn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSpin();
    });
    segment_Input.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            applySegments();
        }
    });
    close_Modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    document.addEventListener('DOMContentLoaded', () => {
        drawBlankCircle(ctx, radius, size);
    });
})();
document.addEventListener("DOMContentLoaded", function () {
    const userMenu = document.getElementById("userMenu");
    const dropdownMenu = document.getElementById("dropdownMenu");

    userMenu.addEventListener("click", function () {
        dropdownMenu.classList.toggle("show");
    });
});


