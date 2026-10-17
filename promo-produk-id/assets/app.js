(()=>{
// Ganti dengan nomor WhatsApp bisnis (format internasional tanpa +), contoh: 6281234567890
const WA='0000000000';
const link=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
document.querySelectorAll('[data-wa]').forEach(a=>a.href=link(a.dataset.wa));
// countdown sampai tengah malam
const pad=n=>String(n).padStart(2,'0');
const tick=()=>{const now=new Date(),end=new Date(now);end.setHours(24,0,0,0);let s=Math.max(0,Math.floor((end-now)/1000));
 const t=`${pad(Math.floor(s/3600))}:${pad(Math.floor(s%3600/60))}:${pad(s%60)}`;['cd','cd2'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=t})};
tick();setInterval(tick,1000);
document.getElementById('order').addEventListener('submit',e=>{e.preventDefault();const f=e.target;if(!f.reportValidity())return;
 window.open(link(`Halo Kopi Senja, saya mau pesan.\nNama: ${f.nama.value}\nKota: ${f.kota.value}\nPaket: ${f.paket.value}`),'_blank','noopener')});
document.getElementById('yr').textContent=new Date().getFullYear();
})();
