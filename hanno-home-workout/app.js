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
 shoulders:'<ellipse cx="14" cy="24" rx="5" ry="4"/><ellipse cx="46" cy="24" rx="5" ry="4"/>',
 chest:'<ellipse cx="24" cy="29" rx="6.5" ry="4.8"/><ellipse cx="36" cy="29" rx="6.5" ry="4.8"/>',
 biceps:'<ellipse cx="10.5" cy="34" rx="2.8" ry="6"/><ellipse cx="49.5" cy="34" rx="2.8" ry="6"/>',
 abs:'<rect x="25.5" y="35" width="9" height="19" rx="3"/>',
 obliques:'<ellipse cx="20.5" cy="44" rx="3" ry="8"/><ellipse cx="39.5" cy="44" rx="3" ry="8"/>',
 quads:'<ellipse cx="23" cy="71" rx="4.6" ry="11"/><ellipse cx="37" cy="71" rx="4.6" ry="11"/>',
 adductors:'<ellipse cx="28" cy="66" rx="1.6" ry="6"/><ellipse cx="32" cy="66" rx="1.6" ry="6"/>'
};
const BACK={
 shoulders:'<ellipse cx="14" cy="24" rx="5" ry="4"/><ellipse cx="46" cy="24" rx="5" ry="4"/>',
 upperback:'<path d="M19 22 L41 22 L40 40 L30 46 L20 40 Z"/>',
 triceps:'<ellipse cx="10.5" cy="34" rx="2.8" ry="6"/><ellipse cx="49.5" cy="34" rx="2.8" ry="6"/>',
 lowerback:'<rect x="24" y="46" width="12" height="8" rx="3"/>',
 glutes:'<ellipse cx="24.5" cy="61" rx="5.5" ry="5"/><ellipse cx="35.5" cy="61" rx="5.5" ry="5"/>',
 hamstrings:'<ellipse cx="23.5" cy="76" rx="4.2" ry="8.5"/><ellipse cx="36.5" cy="76" rx="4.2" ry="8.5"/>',
 calves:'<ellipse cx="23.5" cy="95" rx="3.3" ry="7"/><ellipse cx="36.5" cy="95" rx="3.3" ry="7"/>'
};
const BASE='<circle cx="30" cy="10" r="7"/><rect x="27" y="15" width="6" height="6"/>'+
 '<path d="M14 20 Q30 17 46 20 L44 40 Q43 50 42 56 L18 56 Q17 50 16 40 Z"/>'+
 '<rect x="7" y="21" width="7" height="22" rx="3.5"/><rect x="46" y="21" width="7" height="22" rx="3.5"/>'+
 '<rect x="5.5" y="41" width="6.5" height="19" rx="3.2"/><rect x="48" y="41" width="6.5" height="19" rx="3.2"/>'+
 '<rect x="18" y="54" width="11.5" height="34" rx="5"/><rect x="30.5" y="54" width="11.5" height="34" rx="5"/>'+
 '<rect x="19.5" y="86" width="8.5" height="22" rx="4"/><rect x="32" y="86" width="8.5" height="22" rx="4"/>';
function regions(map,keys){return Object.keys(map).map(k=>'<g class="rg'+(keys.includes(k)?' on':'')+'">'+map[k]+'</g>').join('')}
function body(keys,label){
 const full=keys.includes('full');
 return '<svg viewBox="0 0 124 118" role="img" aria-label="مكان العضلة: '+label+'" class="'+(full?'full':'')+'">'+
  '<g class="fig">'+BASE+'</g>'+regions(FRONT,keys)+
  '<g transform="translate(64 0)"><g class="fig">'+BASE+'</g>'+regions(BACK,keys)+'</g>'+
  '<text class="vlab" x="30" y="116" text-anchor="middle">أمام</text><text class="vlab" x="94" y="116" text-anchor="middle">خلف</text></svg>';
}
const LV=["","مبتدئ","متوسط","متقدم"];
const data=window.EX.map((e,i)=>({i:i+1,ar:e[0],en:e[1],m:e[2].split(' '),d:e[3],l:e[4],s:!!e[5]}));
const grid=document.getElementById('grid');
grid.innerHTML=data.map(x=>{
 const names=x.m.map(k=>M[k][0]).join('، ');
 return '<article class="card" data-i="'+x.i+'"><span class="num">'+x.i+'</span><h3>'+x.ar+'</h3><div class="en">'+x.en+'</div>'+
 '<div class="body">'+body(x.m,names)+'<p>'+x.d+'</p></div>'+
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
