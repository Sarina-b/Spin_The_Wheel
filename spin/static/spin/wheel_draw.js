export function drawBlankCircle(ctx, radius, size) {
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();


    // Outer ring
    const lineWidth = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - lineWidth / 2, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#154c9c";
    ctx.stroke();

    // Dots
    const dots = 10;
    const dotRadius = radius - lineWidth / 2;
    for (let i = 0; i < dots; i++) {
        const dotAngle = (2 * Math.PI / dots) * i;
        const dotX = cx + Math.cos(dotAngle) * dotRadius;
        const dotY = cy + Math.sin(dotAngle) * dotRadius;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
    }

    // Center label
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();

    ctx.fillStyle = "#154c9c";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SPIN", cx, cy);

    // Pointer
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy - radius - 10);
    ctx.lineTo(cx + 20, cy - radius - 10);
    ctx.lineTo(cx, cy - radius + 30);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
}


export function drawWheel(ctx, segments, angle, radius, size, colors) {
    ctx.clearRect(0, 0, size, size);
    if (!segments.length) {
        drawBlankCircle(ctx, radius, size);
        return;
    }

    const sliceAngle = (2 * Math.PI) / segments.length;

    // Background
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#154c9c";
    ctx.fill();

    segments.forEach((segment, i) => {
        const start = angle + i * sliceAngle - Math.PI / 2;
        const end = start + sliceAngle;

        // Slice
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius - 20, start, end);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        // Separator
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.lineTo(radius + Math.cos(start) * (radius - 20),
            radius + Math.sin(start) * (radius - 20));
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${Math.floor(radius / 11)}px sans-serif`;
        let text = String(segment);
        const maxWidth = radius - 60;
        while (ctx.measureText(text + '...').width > maxWidth && text.length > 0) {
            text = text.slice(0, -1);
        }
        if (text !== segment) text += '...';
        ctx.fillText(text, radius - 50, 6);
        ctx.restore();
    });

    //dots
    const dots = 10;
    for (let i = 0; i < dots; i++) {
        const dotAngle = (2 * Math.PI / dots) * i;
        const dotX = radius + Math.cos(dotAngle) * (radius - 8);
        const dotY = radius + Math.sin(dotAngle) * (radius - 8);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
    }

    // Center circle and label
    ctx.beginPath();
    ctx.arc(radius, radius, 60, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.fillStyle = "#154c9c";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SPIN", radius, radius);

    // Pointer
    ctx.beginPath();
    ctx.moveTo(radius - 20, 0);
    ctx.lineTo(radius + 20, 0);
    ctx.lineTo(radius, 40);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
}

export function animateToIndex(targetIndex, segments, drawFn, angleObj, radius, onComplete) {
    if (!segments.length) {
        if (typeof onComplete === 'function') onComplete();
        return;
    }
    const sliceAngle = (2 * Math.PI) / segments.length;
    const spins = 6 + Math.floor(Math.random() * 3);
    const randomOffset = (Math.random() - 0.5) * (sliceAngle * 0.9);
    const finalAngle = (spins * 2 * Math.PI) - (targetIndex * sliceAngle + sliceAngle / 2 + randomOffset);
    const duration = 4200 + Math.floor(Math.random() * 800);
    const start = performance.now();

    function frame(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        angleObj.angle = finalAngle * easeOut;
        drawFn();
        if (progress < 1) requestAnimationFrame(frame);
        else if (typeof onComplete === 'function') onComplete();
    }

    requestAnimationFrame(frame);
}
