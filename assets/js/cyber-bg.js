const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const nodes = [];
const COUNT = 90;

for (let i = 0; i < COUNT; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((n, i) => {
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      const dx = n.x - nodes[j].x;
      const dy = n.y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.strokeStyle = "rgba(56,189,248,0.12)";
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}

animate();
