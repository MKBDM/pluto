/* Статьи блога: подсветка раздела в оглавлении, проверки и чек-листы. Без внешних библиотек. */
(function(){
  var links=[].slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  var heads=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1));}).filter(Boolean);
  function mark(id){links.forEach(function(a){var on=a.getAttribute('href')==='#'+id;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}
  /* Переход по оглавлению без смены адреса страницы: в предпросмотре панели ссылка «#…» уводила в саму панель */
  links.forEach(function(a){a.addEventListener('click',function(e){
    var t=document.getElementById(a.getAttribute('href').slice(1));if(!t)return;
    e.preventDefault();
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    t.setAttribute('tabindex','-1');try{t.focus({preventScroll:true});}catch(x){}
    mark(t.id);
  });});
  if(heads.length){
    var cur=heads[0].id;mark(cur);
    function upd(){var y=window.scrollY+140,id=heads[0].id;heads.forEach(function(h){if(h.offsetTop<=y)id=h.id;});
      if(window.innerHeight+window.scrollY>=document.body.scrollHeight-4)id=heads[heads.length-1].id;
      if(id!==cur){cur=id;mark(id);}}
    var tick=false;window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;upd();});}},{passive:true});
    window.addEventListener('resize',upd);upd();
  }
  [].forEach.call(document.querySelectorAll('.qz'),function(q){
    var out=q.querySelector('.qr'),bs=q.querySelectorAll('button');
    [].forEach.call(bs,function(b){b.addEventListener('click',function(){
      [].forEach.call(bs,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      out.textContent=b.getAttribute('data-r')||'';});});
  });
  [].forEach.call(document.querySelectorAll('[data-cl]'),function(box){
    var cs=box.querySelectorAll('input[type=checkbox]'),out=box.querySelector('.cnt');
    function r(){var n=0;[].forEach.call(cs,function(c){if(c.checked)n++;});out.textContent='Отмечено '+n+' из '+cs.length+(box.getAttribute('data-note')&&n<cs.length?'. '+box.getAttribute('data-note'):'');}
    [].forEach.call(cs,function(c){c.addEventListener('change',r);});r();
  });
})();
