(function(){
const M={
 chest:["الصدر","مقدمة القفص الصدري (العضلة الصدرية)"],
 shoulders:["الأكتاف","رأس الكتف فوق الذراع (الدالية)"],
 biceps:["البايسبس","مقدمة الذراع بين الكتف والكوع"],
 triceps:["الترايسبس","خلفية الذراع بين الكتف والكوع"],
 abs:["البطن","وسط البطن من الصدر للحوض"],
 obliques:["الخواصر","جانبي البطن (العضلات المائلة)"],
 upperback:["أعلى الظهر","بين لوحي الكتف وجانبي الظهر (المربعة والظهرية العريضة)"],
 lowerback:["أسفل الظهر","على جانبي العمود الفقري فوق الحوض"],
 glutes:["الأرداف","المؤخرة وجانب الورك"],
 quads:["الفخذ الأمامي","مقدمة الفخذ فوق الركبة (الرباعية)"],
 hamstrings:["الفخذ الخلفي","خلفية الفخذ تحت المؤخرة"],
 adductors:["الفخذ الداخلي","الجهة الداخلية من الفخذ (المقرّبة)"],
 calves:["السمانة","خلفية الساق تحت الركبة (بطة الساق)"],
 full:["الجسم كامل","كل العضلات الكبيرة بنفس الوقت"]
};
const ORDER=["full","chest","shoulders","biceps","triceps","abs","obliques","upperback","lowerback","glutes","quads","hamstrings","adductors","calves"];
// front regions (x 0..60) and back regions (drawn shifted by 64)
const FRONT={
 shoulders:'<ellipse cx="15" cy="24.5" rx="4.5" ry="3.8"/><ellipse cx="45" cy="24.5" rx="4.5" ry="3.8"/>',
 chest:'<ellipse cx="24.5" cy="28.5" rx="5.8" ry="4.3"/><ellipse cx="35.5" cy="28.5" rx="5.8" ry="4.3"/>',
 biceps:'<ellipse cx="12.2" cy="34" rx="2.4" ry="6"/><ellipse cx="47.8" cy="34" rx="2.4" ry="6"/>',
 abs:'<rect x="25.5" y="35" width="9" height="19" rx="3"/>',
 obliques:'<ellipse cx="22.5" cy="44" rx="2.6" ry="7.5"/><ellipse cx="37.5" cy="44" rx="2.6" ry="7.5"/>',
 quads:'<ellipse cx="23" cy="71" rx="4.6" ry="11"/><ellipse cx="37" cy="71" rx="4.6" ry="11"/>',
 adductors:'<ellipse cx="28" cy="66" rx="1.6" ry="6"/><ellipse cx="32" cy="66" rx="1.6" ry="6"/>'
};
const BACK={
 shoulders:'<ellipse cx="15" cy="24.5" rx="4.5" ry="3.8"/><ellipse cx="45" cy="24.5" rx="4.5" ry="3.8"/>',
 upperback:'<path d="M20 22 L40 22 L38 38 L30 44 L22 38 Z"/>',
 triceps:'<ellipse cx="12.2" cy="34" rx="2.4" ry="6"/><ellipse cx="47.8" cy="34" rx="2.4" ry="6"/>',
 lowerback:'<rect x="24" y="46" width="12" height="8" rx="3"/>',
 glutes:'<ellipse cx="24" cy="61" rx="6.2" ry="5.5"/><ellipse cx="36" cy="61" rx="6.2" ry="5.5"/>',
 hamstrings:'<ellipse cx="23.5" cy="76" rx="4.2" ry="8.5"/><ellipse cx="36.5" cy="76" rx="4.2" ry="8.5"/>',
 calves:'<ellipse cx="23.5" cy="95" rx="3.3" ry="7"/><ellipse cx="36.5" cy="95" rx="3.3" ry="7"/>'
};
const BASE='<circle cx="30" cy="10" r="6.5"/><rect x="28" y="15" width="4" height="6"/>'+
 '<path d="M16 21 Q30 18 44 21 L42 31 Q38 38 39 44 Q43 50 44 57 L16 57 Q17 50 21 44 Q22 38 18 31 Z"/>'+
 '<rect x="9.5" y="22" width="5.5" height="21" rx="2.8"/><rect x="45" y="22" width="5.5" height="21" rx="2.8"/>'+
 '<rect x="8" y="41" width="5" height="18" rx="2.5"/><rect x="47" y="41" width="5" height="18" rx="2.5"/>'+
 '<rect x="17" y="54" width="12.5" height="34" rx="6"/><rect x="30.5" y="54" width="12.5" height="34" rx="6"/>'+
 '<rect x="19.5" y="86" width="8" height="22" rx="4"/><rect x="32.5" y="86" width="8" height="22" rx="4"/>';
const HAIR_F='<path class="hair" d="M23.3 11 Q23 3 30 3 Q37 3 36.7 11 Q35 6.5 30 6.5 Q25 6.5 23.3 11Z"/>';
const HAIR_B='<path class="hair" d="M23.5 10 Q23 3 30 3 Q37 3 36.5 10 Q36 16 30 16 Q24 16 23.5 10Z"/><path class="hair" d="M28 15 Q26 22 29 27 Q31 28 32 26 Q34 21 32 15Z"/>';
function regions(map,keys){return Object.keys(map).map(k=>'<g class="rg'+(keys.includes(k)?' on':'')+'">'+map[k]+'</g>').join('')}
function cat(cls){return '<svg class="cat '+(cls||'')+'" viewBox="0 0 44 44" aria-hidden="true"><path class="ctail" d="M30 38 Q42 36 40 24 Q39 18 35 17" fill="none" stroke="#6a2c56" stroke-width="3.6" stroke-linecap="round"/><ellipse cx="22" cy="33" rx="10" ry="9.5" fill="#6a2c56"/><ellipse cx="22" cy="35" rx="5" ry="6" fill="#8a3a70"/><path d="M13 13 L14 4 L19.5 9 Z M31 13 L30 4 L24.5 9 Z" fill="#6a2c56"/><path d="M14.6 10 L15 6.5 L17.5 9 Z M29.4 10 L29 6.5 L26.5 9 Z" fill="#ff5fae"/><circle cx="22" cy="15" r="8.5" fill="#6a2c56"/><g class="eyes"><ellipse cx="18.5" cy="14.5" rx="2" ry="2.4" fill="#ffd1e8"/><ellipse cx="25.5" cy="14.5" rx="2" ry="2.4" fill="#ffd1e8"/><ellipse cx="18.7" cy="14.8" rx=".9" ry="1.8" fill="#14060f"/><ellipse cx="25.3" cy="14.8" rx=".9" ry="1.8" fill="#14060f"/></g><path d="M21 18 L23 18 L22 19.2 Z" fill="#ff2d95"/><path d="M14 18.5 L8 17.5 M14 20 L8 21 M30 18.5 L36 17.5 M30 20 L36 21" stroke="#ffd1e8" stroke-width=".6" opacity=".7"/><ellipse cx="18" cy="42" rx="3" ry="1.6" fill="#8a3a70"/><ellipse cx="26" cy="42" rx="3" ry="1.6" fill="#8a3a70"/></svg>'}
function girl(type,label){
 const leg=(s,c1,c2)=>'<g class="th'+s+'"><line x1="50" y1="55" x2="50" y2="75" stroke="'+c1+'" stroke-width="8" stroke-linecap="round"/><g class="sh'+s+'"><line x1="50" y1="75" x2="50" y2="92" stroke="'+c1+'" stroke-width="6.5" stroke-linecap="round"/><path d="M47 91 Q47 96 50 96 L57 96 Q58 93 54 92 Z" fill="'+c2+'"/></g></g>';
 const arm=(s,c1,c2)=>'<g class="ua'+s+'"><line x1="50" y1="33" x2="50" y2="46" stroke="'+c1+'" stroke-width="5.5" stroke-linecap="round"/><g class="fa'+s+'"><line x1="50" y1="46" x2="50" y2="57" stroke="'+c2+'" stroke-width="4.6" stroke-linecap="round"/><circle cx="50" cy="59" r="2.4" fill="#f1c3a5"/></g></g>';
 return '<svg class="ch a-'+type+'" viewBox="-14 -6 128 106" role="img" aria-label="'+label+'"><g class="root">'+
 '<g class="tor">'+arm('B','#a3134c','#8f1043')+'</g>'+leg('B','#2a0a22','#c9a3b8')+
 '<g class="tor"><rect x="44.5" y="45" width="11" height="13" rx="5" fill="#3b1030"/><rect x="44" y="30" width="12" height="19" rx="5.5" fill="#d81b60"/><path d="M45 44 L55 44" stroke="#ff7cbf" stroke-width="1.4"/>'+
  '<g class="head"><rect x="48" y="26" width="4" height="5" fill="#f1c3a5"/><g class="pony"><path d="M44.5 17 Q36 17 37 30 Q39 25 44 22 Q41 27 42 31 Q46 24 46.5 19 Z" fill="#2a0f22"/><circle cx="45" cy="17.5" r="1.8" fill="#ff2d95"/></g>'+
  '<circle cx="51" cy="21" r="7.5" fill="#f1c3a5"/><path d="M43.3 22 Q42.5 12.5 51 13 Q58.5 13.4 58.6 19 Q55 15.5 50.5 17 Q48 18.5 47.8 23 Q45.5 22 43.3 22Z" fill="#2a0f22"/>'+
  '<ellipse class="eye" cx="55.2" cy="21.4" rx="1.4" ry="2.1" fill="#2a0f22"/><circle cx="55.6" cy="20.7" r=".55" fill="#fff"/><circle cx="56" cy="24.6" r="1.3" fill="#ff7cbf" opacity=".55"/><path d="M56.5 26.3 Q57.6 26.7 58.3 26" stroke="#9c3a5c" stroke-width=".7" fill="none" stroke-linecap="round"/></g></g>'+
 leg('F','#3b1030','#ffd1e8')+'<g class="tor">'+arm('F','#ff2d95','#e91e7a')+'</g></g></svg>';
}
function body(keys,label){
 const full=keys.includes('full');
 return '<svg viewBox="0 0 124 118" role="img" aria-label="مكان العضلة: '+label+'" class="'+(full?'full':'')+'">'+
  '<g class="fig">'+BASE+'</g>'+HAIR_F+regions(FRONT,keys)+
  '<g transform="translate(64 0)"><g class="fig">'+BASE+'</g>'+HAIR_B+regions(BACK,keys)+'</g>'+
  '<text class="vlab" x="30" y="116" text-anchor="middle">أمام</text><text class="vlab" x="94" y="116" text-anchor="middle">خلف</text></svg>';
}
const LV=["","مبتدئ","متوسط","متقدم"];
const data=window.EX.map((e,i)=>({i:i+1,ar:e[0],en:e[1],m:e[2].split(' '),d:e[3],l:e[4],a:e[5],s:!!e[6]}));
window.HANNO={girl:girl,cat:cat};
const grid=document.getElementById('grid');
grid.innerHTML=data.map(x=>{
 const names=x.m.map(k=>M[k][0]).join('، ');
 return '<article class="card" data-i="'+x.i+'"><span class="num">'+x.i+'</span><h3>'+x.ar+'</h3><div class="en">'+x.en+'</div>'+
 '<div class="vis">'+girl(x.a,'المدرّبة عم تعمل: '+x.ar)+'<div class="dia">'+body(x.m,names)+cat('mini')+'</div></div><p>'+x.d+'</p>'+
 '<div class="tags">'+x.m.map(k=>'<span class="tag" title="'+M[k][1]+'">'+M[k][0]+'</span>').join('')+(x.s?'<span class="st">إطالة</span>':'')+'</div>'+
 '<div class="lv">'+[1,2,3].map(n=>'<i class="'+(n<=x.l?'f':'')+'"></i>').join('')+' '+LV[x.l]+'</div></article>';
}).join('');
const cards=[...grid.children];
const cnt={};data.forEach(x=>x.m.forEach(k=>cnt[k]=(cnt[k]||0)+1));
const chips=document.getElementById('chips');
chips.innerHTML='<button class="chip on" data-k="">الكل <span>100</span></button>'+ORDER.map(k=>'<button class="chip" data-k="'+k+'">'+M[k][0]+' <span>'+cnt[k]+'</span></button>').join('')+'<button class="chip" data-k="stretch">إطالة <span>'+data.filter(x=>x.s).length+'</span></button>';
document.getElementById('muscleMap').innerHTML=ORDER.map(k=>'<button class="mm" data-k="'+k+'">'+body([k],M[k][0])+'<b>'+M[k][0]+'</b><small>'+M[k][1]+'</small></button>').join('');
let st={k:'',l:0,q:''};
const norm=s=>s.toLowerCase().replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[\u064B-\u0652]/g,'');
data.forEach(x=>x.t=norm(x.ar+' '+x.en+' '+x.d+' '+x.m.map(k=>M[k][0]+' '+M[k][1]).join(' ')+(x.s?' اطاله':'')));
function apply(){
 let n=0;const q=norm(st.q.trim());
 data.forEach((x,j)=>{const ok=(!st.k||(st.k==='stretch'?x.s:x.m.includes(st.k)))&&(!st.l||x.l==st.l)&&(!q||q.split(/\s+/).every(w=>x.t.includes(w)));cards[j].hidden=!ok;if(ok)n++;});
 document.getElementById('count').textContent=n;
 document.getElementById('empty').hidden=n>0;
 chips.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c.dataset.k===st.k));
 document.querySelectorAll('.mm').forEach(c=>c.classList.toggle('on',c.dataset.k===st.k));
}
chips.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;st.k=b.dataset.k;apply()});
document.getElementById('muscleMap').addEventListener('click',e=>{const b=e.target.closest('.mm');if(!b)return;st.k=b.dataset.k;apply();document.getElementById('exercises').scrollIntoView()});
document.querySelector('.levels').addEventListener('click',e=>{const b=e.target.closest('.lvl');if(!b)return;st.l=+b.dataset.l;document.querySelectorAll('.lvl').forEach(x=>x.classList.toggle('on',x===b));apply()});
document.getElementById('q').addEventListener('input',e=>{st.q=e.target.value;apply()});
})();
(function(){
const H=window.HANNO, g=document.getElementById('heroGirl');
document.getElementById('heroCat').innerHTML=H.cat('big');
document.getElementById('footCat').innerHTML=H.cat('foot');
const seq=[['sq','قرفصاء'],['ju','قفز النجمة'],['lu','طعنة'],['br','جسر الأرداف'],['st','إطالة']];
let i=0;function show(){g.innerHTML=H.girl(seq[i][0],'المدرّبة عم تعمل '+seq[i][1]);document.getElementById('moveName').textContent=seq[i][1];}
show();
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{i=(i+1)%seq.length;show()},6000);
})();
