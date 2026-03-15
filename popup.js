function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const HEART_IMGS = ["items/heart.png", "items/heart_.png", "items/pink-heart.png"];

function spawnHearts() {
  const container = document.getElementById("hearts");
  const picWrap = container.parentElement;
  const w = picWrap.offsetWidth;
  const h = picWrap.offsetHeight;

  const count = 10;
  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.className = "heart";
    img.src = chrome.runtime.getURL(pickRandom(HEART_IMGS));

    const t = i / count; // 0..1
    const perimeter = 2 * (w + h);
    const dist = t * perimeter;
    let x, y;
    const pad = 10;
    if (dist < w) {
      x = dist; y = pad;
    } else if (dist < w + h) {
      x = w - pad; y = dist - w;
    } else if (dist < 2 * w + h) {
      x = w - (dist - w - h); y = h - pad;
    } else {
      x = pad; y = h - (dist - 2 * w - h);
    }

    img.style.left = `${x - 10}px`;
    img.style.top = `${y - 10}px`;
    img.style.animationDuration = `${0.7 + Math.random() * 0.8}s`;
    img.style.animationDelay = `${-Math.random() * 1.5}s`;
    const size = 16 + Math.floor(Math.random() * 10);
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;

    container.appendChild(img);
  }
}

Promise.all([
  fetch(chrome.runtime.getURL("messages.json")).then((r) => r.json()),
  fetch(chrome.runtime.getURL("pics.json")).then((r) => r.json()),
]).then(([messages, pics]) => {
  document.getElementById("message").textContent = pickRandom(messages);

  const picEl = document.getElementById("pic");
  if (pics.length > 0) {
    picEl.src = chrome.runtime.getURL(`pics/${pickRandom(pics)}`);
    picEl.onload = spawnHearts;
  }
});
