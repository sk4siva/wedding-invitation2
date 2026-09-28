const wedding={bride:"Surendar",groom:"Agila",shortDate:"12 · DECEMBER · 2026",day:"12",month:"DECEMBER",year:"2026",message:"With the blessings of our families, we invite you to celebrate our special day with us.",venue:"RV Mahall",address:"Your venue address goes here",mapUrl:"https://maps.google.com/",events:[{name:"Reception",date:"22 November 2026",time:"6:30 PM onwards",place:"RV Mahall"},{name:"Wedding",date:"13 December 2026",time:"9:00 AM – 10:30 AM",place:"RV Mahall"}]};document.querySelectorAll("[data-field]").forEach(e=>{let k=e.dataset.field;if(wedding[k]!=null)e.textContent=wedding[k]});document.getElementById("mapBtn").href=wedding.mapUrl;const box=document.getElementById("events");wedding.events.forEach(e=>box.insertAdjacentHTML("beforeend",`<article class="event"><div><h3>${e.name}</h3></div><div><p>${e.date}</p><p>${e.time}</p><p>${e.place}</p></div></article>`));const intro=document.getElementById("doorIntro"),audio=document.getElementById("music"),musicBtn=document.getElementById("musicBtn");document.getElementById("openInvite").onclick=async()=>{intro.classList.add("open");document.body.classList.remove("lock");musicBtn.style.display="block";try{await audio.play();musicBtn.textContent="Ⅱ"}catch(e){}setTimeout(()=>intro.remove(),1600)};musicBtn.onclick=async()=>{if(audio.paused){await audio.play();musicBtn.textContent="Ⅱ"}else{audio.pause();musicBtn.textContent="♪"}};const ob=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.15});document.querySelectorAll(".reveal").forEach(e=>ob.observe(e));
// Countdown target: change this date/time for each customer.
// Format: YYYY-MM-DDTHH:MM:SS
const weddingDate = new Date("2026-12-12T09:00:00").getTime();
function updateCountdown(){
  const now = Date.now();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = String(days).padStart(3,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

// Scratch-to-reveal countdown.
// IMPORTANT: the countdown interval is NOT started until the scratch card is revealed.
const scratchWrap = document.querySelector(".scratch-wrap");
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const scratchHint = document.querySelector(".scratch-hint");
const scratchNote = document.getElementById("scratchNote");
const weddingDate = new Date("2026-12-12T09:00:00").getTime();
let scratching = false;
let revealed = false;
let countdownStarted = false;

function setupScratch(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = scratchWrap.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);

  // Warm metallic scratch layer
  const grad = ctx.createLinearGradient(0,0,rect.width,rect.height);
  grad.addColorStop(0,"#8c745e");
  grad.addColorStop(.45,"#b89c7a");
  grad.addColorStop(1,"#665342");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,rect.width,rect.height);

  ctx.fillStyle = "rgba(255,255,255,.18)";
  ctx.font = "600 12px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("SCRATCH TO REVEAL", rect.width/2, rect.height/2 + 4);
}
function scratchAt(clientX, clientY){
  const r = canvas.getBoundingClientRect();
  const x = clientX-r.left, y = clientY-r.top;
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x,y,24,0,Math.PI*2);
  ctx.fill();
  checkScratch();
}
function checkScratch(){
  if(revealed) return;
  const pixels = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let transparent=0, total=0;
  for(let i=3;i<pixels.length;i+=16){ total++; if(pixels[i] < 80) transparent++; }
  if(transparent/total > .48) revealScratch();
}
function revealScratch(){
  revealed=true;
  scratchWrap.classList.add("revealed");
  scratchNote.textContent="Date revealed — countdown started.";
  startCountdown();
}
function startCountdown(){
  if(countdownStarted) return;
  countdownStarted=true;
  updateCountdown();
  setInterval(updateCountdown,1000);
}
function updateCountdown(){
  let diff=Math.max(0,weddingDate-Date.now());
  const days=Math.floor(diff/86400000);
  const hours=Math.floor((diff%86400000)/3600000);
  const minutes=Math.floor((diff%3600000)/60000);
  const seconds=Math.floor((diff%60000)/1000);
  document.getElementById("days").textContent=String(days).padStart(3,"0");
  document.getElementById("hours").textContent=String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");
}
canvas.addEventListener("pointerdown",e=>{scratching=true;canvas.setPointerCapture(e.pointerId);scratchAt(e.clientX,e.clientY)});
canvas.addEventListener("pointermove",e=>{if(scratching)scratchAt(e.clientX,e.clientY)});
canvas.addEventListener("pointerup",()=>scratching=false);
canvas.addEventListener("pointercancel",()=>scratching=false);
window.addEventListener("resize",()=>{if(!revealed)setupScratch()});
setupScratch();
