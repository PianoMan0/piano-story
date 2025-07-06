// Btw, I promise this isn't ai generated, I just write a lot of comments in my code lol

const canvas = document.getElementById('pianoStory');
const ctx = canvas.getContext('2d');

let frame = 0;

function drawPiano(x, y, color = "#222") {
  // Body
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 120, 60);
  // White Keys
  ctx.fillStyle = "#fff";
  ctx.fillRect(x + 10, y + 45, 100, 15);
  // Black keys
  ctx.fillStyle = "#000";
  for (let i = 0; i < 7; i++) {
    if (i !== 2 && i !== 6) // skip for realism
      ctx.fillRect(x + 15 + i * 13, y + 45, 8, 10);
  }
  // Legs
  ctx.fillStyle = color;
  ctx.fillRect(x + 10, y + 60, 10, 20);
  ctx.fillRect(x + 100, y + 60, 10, 20);
}

function drawNotes(x, y, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.8;
  for (let i = 0; i < 5; i++) {
    let phase = t / 20 + i;
    let noteY = -phase * 8 + (i * 12);
    let noteX = Math.sin(phase) * 16;
    ctx.beginPath();
    ctx.ellipse(noteX, noteY, 6, 10, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = "#444";
    ctx.fill();
    // Stem
    ctx.beginPath();
    ctx.moveTo(noteX + 5, noteY);
    ctx.lineTo(noteX + 5, noteY - 18);
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();
}

function drawSun(x, y, r, t) {
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#FFD700";
  ctx.fill();
  // Rays
  for (let i = 0; i < 12; i++) {
    let angle = (i / 12) * Math.PI * 2 + t / 100;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.cos(angle) * (r + 12),
      y + Math.sin(angle) * (r + 12)
    );
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  ctx.restore();
}

function drawSadFace(x, y) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#f2e2b3";
  ctx.fill();
  // Eyes
  ctx.fillStyle = "#222";
  ctx.beginPath(); ctx.arc(x - 4, y - 3, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 4, y - 3, 1.5, 0, Math.PI * 2); ctx.fill();
  // Sad mouth
  ctx.beginPath();
  ctx.arc(x, y + 2, 4, Math.PI * 0.2, Math.PI * 0.8, false);
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function drawHappyFace(x, y) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#f2e2b3";
  ctx.fill();
  // Eyes
  ctx.fillStyle = "#222";
  ctx.beginPath(); ctx.arc(x - 4, y - 3, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 4, y - 3, 1.5, 0, Math.PI * 2); ctx.fill();
  // Happy mouth
  ctx.beginPath();
  ctx.arc(x, y + 3, 4, Math.PI * 0.2, Math.PI * 0.8, true);
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Scene 1
  if (frame < 200) {
    // Night sky
    ctx.fillStyle = "#0b223b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Moon
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(700, 60, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.restore();

    drawPiano(340, 250);
    drawSadFace(400, 320);

    // Caption
    ctx.fillStyle = "#fff";
    ctx.font = "20px serif";
    ctx.fillText("A lonely piano sits in the quiet night...", 220, 80);

  // Scene 2
  } else if (frame < 400) {
    // Dawn sky
    let grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#FFDD99");
    grad.addColorStop(1, "#94b6e7");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sun rising
    let sunY = 320 - (frame - 200) * 0.6;
    drawSun(700, sunY, 35, frame);

    drawPiano(340, 250);

    // Musician "walking" in (ok maybe not walking, but I did my best *heavy sob*)
    let personX = 150 + (frame - 200) * 0.9;
    drawSadFace(Math.min(personX, 380), 330);

    // Caption
    ctx.fillStyle = "#222";
    ctx.font = "20px serif";
    ctx.fillText("Morning comes, and a musician arrives...", 220, 80);

  // Scene 3
  } else if (frame < 600) {
    // Day sky
    ctx.fillStyle = "#cbe8ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSun(700, 120, 40, frame);

    drawPiano(340, 250, "#7b4d1c");
    drawHappyFace(380, 320);

    drawHappyFace(420, 330);

    drawNotes(400, 240, frame);

    // Caption
    ctx.fillStyle = "#233";
    ctx.font = "20px serif";
    ctx.fillText("Together, they make beautiful music!", 240, 80);

  // Scene 4
  } else if (frame < 800) {
    // Day sky
    ctx.fillStyle = "#eaf7ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSun(700, 110, 40, frame);

    drawPiano(340, 250, "#7b4d1c");
    drawHappyFace(420, 330);

    // New pianos appear
    let t = frame - 600;
    if (t > 20) drawPiano(100, 290, "#444");
    if (t > 50) drawPiano(600, 290, "#444");
    if (t > 80) drawPiano(220, 320, "#333");
    if (t > 110) drawPiano(500, 320, "#333");

    // Notes from all pianos
    if (t > 20) drawNotes(160, 280, frame - 50);
    if (t > 50) drawNotes(660, 280, frame - 120);
    if (t > 80) drawNotes(280, 310, frame - 190);
    if (t > 110) drawNotes(560, 310, frame - 260);
    drawNotes(400, 240, frame);

    // Caption
    ctx.fillStyle = "#233";
    ctx.font = "20px serif";
    ctx.fillText("Soon, the music spreads and more pianos join!", 180, 80);

  // Scene 5
  } else if (frame < 1000) {
    // Celebration sky
    let grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#ffe5fa");
    grad.addColorStop(1, "#b8f7ff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawSun(700, 100, 40, frame);

    // All pianos, all notes
    drawPiano(340, 250, "#f39c12");
    drawHappyFace(420, 330);
    drawPiano(100, 290, "#d35400");
    drawPiano(600, 290, "#8e44ad");
    drawPiano(220, 320, "#27ae60");
    drawPiano(500, 320, "#3498db");
    drawNotes(400, 240, frame);
    drawNotes(160, 280, frame - 50);
    drawNotes(660, 280, frame - 120);
    drawNotes(280, 310, frame - 190);
    drawNotes(560, 310, frame - 260);

    // Caption
    ctx.fillStyle = "#b03a2e";
    ctx.font = "22px serif";
    ctx.fillText("From one lonely piano, a symphony was born!", 160, 80);

  // Ending
  } else {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222";
    ctx.font = "28px serif";
    ctx.fillText("Thank you for listening to my piano story!", 120, 200);
    ctx.font = "18px serif";
    ctx.fillText("by PianoMan0", 340, 240);
  }

  frame++;
  requestAnimationFrame(animate);
}

animate();
