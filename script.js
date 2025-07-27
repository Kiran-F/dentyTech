const images = Array.from(document.querySelectorAll('#main img'));
let removedCount = 0;

document.querySelector('#main').addEventListener('click', (e) => {
    if (e.target.tagName !== 'IMG' || removedCount >= images.length) return;

    // Move the topmost image out of view
    const topImage = images[images.length - 1 - removedCount];
    topImage.style.cssText = `transition: all 0.8s ease;
                              transform: translate(-50%, -230%) rotate(0deg);`;
    removedCount++;

    // Rotate remaining images +6°
    images.slice(0, images.length - removedCount).forEach(img => {
        const angle = getCurrentRotation(img) + 8;
        img.style.transition = 'transform 0.5s ease';
        img.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    });
});

// Helper: Get current rotation in degrees
function getCurrentRotation(el) {
    const transform = getComputedStyle(el).transform;
    if (transform === 'none') return 0;

    const values = transform.match(/matrix\(([^)]+)\)/)?.[1].split(', ');
    if (!values) return 0;

    const [a, b] = values.map(parseFloat);
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle;
}
