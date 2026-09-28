const wedding={bride:"Surendar",groom:"Agila J",shortDate:"12 · DECEMBER · 2026",day:"12",month:"DECEMBER",year:"2026",message:"With the blessings of our families, we invite you to celebrate our special day with us.",venue:"RV Mahall",address:"Your venue address goes here",mapUrl:"https://maps.google.com/",events:[{name:"Reception",date:"22 November 2026",time:"6:30 PM onwards",place:"Prem Hall"},{name:"Wedding",date:"12 December 2026",time:"9:00 AM – 10:30 AM",place:"Prem Hall"},{name:"Lunch",date:"23 November 2026",time:"12:30 PM onwards",place:"Family Gathering"}]};document.querySelectorAll("[data-field]").forEach(e=>{let k=e.dataset.field;if(wedding[k]!=null)e.textContent=wedding[k]});document.getElementById("mapBtn").href=wedding.mapUrl;const box=document.getElementById("events");wedding.events.forEach(e=>box.insertAdjacentHTML("beforeend",`<article class="event"><div><h3>${e.name}</h3></div><div><p>${e.date}</p><p>${e.time}</p><p>${e.place}</p></div></article>`));const intro=document.getElementById("doorIntro"),audio=document.getElementById("music"),musicBtn=document.getElementById("musicBtn");document.getElementById("openInvite").onclick=async()=>{intro.classList.add("open");document.body.classList.remove("lock");musicBtn.style.display="block";try{await audio.play();musicBtn.textContent="Ⅱ"}catch(e){}setTimeout(()=>intro.remove(),1600)};musicBtn.onclick=async()=>{if(audio.paused){await audio.play();musicBtn.textContent="Ⅱ"}else{audio.pause();musicBtn.textContent="♪"}};const ob=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.15});document.querySelectorAll(".reveal").forEach(e=>ob.observe(e));
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
