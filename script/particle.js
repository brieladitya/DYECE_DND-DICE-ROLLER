const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1; // ukuran kecil
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.5 ? "gold" : "orange";
    this.alpha = Math.random() * 0.8 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size / 2);
    ctx.globalAlpha = 1;
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();