(function(){
  // Mobile-Menü
  var t=document.querySelector('.nav-toggle'),n=document.getElementById('hauptmenue');
  if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});}
  // Nach oben
  var tt=document.querySelector('.totop');
  if(tt){window.addEventListener('scroll',function(){tt.classList.toggle('show',window.scrollY>600)},{passive:true});
    tt.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});}
  // Testimonials
  var tr=document.querySelector('.testi-track');
  document.querySelectorAll('.testi-nav button').forEach(function(b){b.addEventListener('click',function(){
    if(tr) tr.scrollBy({left:(+b.dataset.dir)*(tr.clientWidth*0.8),behavior:'smooth'});});});
  // Kompass: Herausforderung -> mehrere Lösungen
  var grid=document.getElementById('sol-grid');
  if(grid){
    var btns=document.querySelectorAll('[data-filter]'),cards=grid.querySelectorAll('.sol-card'),
        infos=document.querySelectorAll('[data-info]'),cnt=document.getElementById('result-count'),lbl=document.getElementById('result-label');
    function apply(slug,push){
      if(!slug||!document.querySelector('[data-filter="'+slug+'"]')) slug='alle';
      var n=0;
      cards.forEach(function(c){var ok=slug==='alle'||(' '+c.dataset.challenges+' ').indexOf(' '+slug+' ')>-1;c.hidden=!ok;if(ok)n++;});
      btns.forEach(function(b){var a=b.dataset.filter===slug;b.classList.toggle('active',a);b.setAttribute('aria-pressed',a)});
      infos.forEach(function(i){i.classList.toggle('show',i.dataset.info===slug)});
      var ab=document.querySelector('[data-filter="'+slug+'"]');if(ab&&ab.parentElement&&ab.closest('.tags').scrollWidth>ab.closest('.tags').clientWidth){var tl=ab.closest('.tags');tl.scrollTo({left:ab.parentElement.offsetLeft-tl.offsetLeft-6,behavior:'smooth'});}
      cnt.textContent=n;
      lbl.textContent=slug==='alle'?'Alle Lösungen':'Passende Lösungen zur ausgewählten Herausforderung';
      if(push){history.replaceState(null,'',slug==='alle'?location.pathname:'#'+slug);
        if(window.innerWidth<900) document.querySelector('.result-meta').scrollIntoView({behavior:'smooth',block:'start'});}
    }
    btns.forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.filter,true)})});
    window.addEventListener('hashchange',function(){apply(location.hash.slice(1))});
    apply(decodeURIComponent(location.hash.slice(1)));
  }
  // YouTube 2-Klick
  document.querySelectorAll('.yt-consent').forEach(function(w){var b=w.querySelector('button');if(!b)return;
    b.addEventListener('click',function(){w.innerHTML='<div style="padding:56.25% 0 0;position:relative"><iframe style="position:absolute;inset:0;width:100%;height:100%;border:0" src="https://www.youtube-nocookie.com/embed/'+w.dataset.yt+'?autoplay=1" title="Aufzeichnung der Infoveranstaltung" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';});});
  // Zeeg-Einbettung (offizielles Inline-Embed, erst nach Klick)
  var zl=document.getElementById('zeeg-load'),ze=document.getElementById('zeeg-embed');
  if(zl&&ze){
    var ev='auslaufbesprechung-45min',loaded=false;
    function render(){ze.innerHTML='';if(window.Zeeg&&Zeeg.initInlineWidget){Zeeg.initInlineWidget({url:'https://zeeg.me/pm-tiefe/'+ev,parentElement:ze});}
      else{ze.innerHTML='<iframe src="https://zeeg.me/pm-tiefe/'+ev+'" style="width:100%;height:100%;border:0" title="Terminbuchung Zeeg"></iframe>';}}
    function load(){document.getElementById('zeeg-consent').hidden=true;ze.hidden=false;
      if(loaded){render();return;}
      var s=document.createElement('script');s.src='https://assets.zeeg.me/embed.min.js';s.async=true;
      s.onload=function(){loaded=true;render()};s.onerror=function(){loaded=true;render()};document.body.appendChild(s);}
    zl.addEventListener('click',load);
    document.querySelectorAll('.zeeg-tabs button').forEach(function(b){b.addEventListener('click',function(){
      document.querySelectorAll('.zeeg-tabs button').forEach(function(x){x.classList.toggle('active',x===b)});
      ev=b.dataset.event;if(!ze.hidden)load();});});
    if(location.hash==='#termin') load();
  }
})();
