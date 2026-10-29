(function(){
var ID='G-XM412C25FM',KEY='pluto-consent',st=null;
try{st=localStorage.getItem(KEY)}catch(e){}
function load(){
  if(window.__gaLoaded)return;window.__gaLoaded=true;
  var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};
  gtag('js',new Date());gtag('config',ID);
}
function save(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function css(){
  if(document.getElementById('cb-css'))return;
  var c=document.createElement('style');c.id='cb-css';
  c.textContent='.cb{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;padding:16px 18px;border-radius:14px;background:var(--card,#1d2026);color:var(--iv,#f1ece6);border:1px solid var(--ln,rgba(255,255,255,.18));box-shadow:0 8px 30px rgba(0,0,0,.35);font:14px/1.5 "Golos Text",system-ui,sans-serif}.cb p{margin:0 0 12px}.cb a{text-decoration:underline;color:inherit}.cb div{display:flex;gap:10px;flex-wrap:wrap}.cb button{font:inherit;font-weight:500;padding:9px 18px;border-radius:999px;cursor:pointer;border:1px solid var(--ln,rgba(255,255,255,.3));background:transparent;color:inherit}.cb button.y{background:var(--btn,#d9a07a);color:var(--on,#16181c);border-color:transparent}.cb button:focus-visible{outline:2px solid var(--ac,#d9a07a);outline-offset:2px}';
  document.head.appendChild(c);
}
function banner(){
  css();var old=document.getElementById('cb');if(old)old.remove();
  var b=document.createElement('div');b.className='cb';b.id='cb';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookie');
  b.innerHTML='<p>Сайт использует Google Analytics (cookie) для статистики посещений. Подробнее — в <a href="'+(location.pathname.indexOf('/privacy')===0||/privacy\.html$/.test(location.pathname)?'#':'/privacy.html')+'">политике конфиденциальности</a>.</p><div><button class="y" type="button">Принять</button><button type="button">Отклонить</button></div>';
  b.querySelector('.y').onclick=function(){save('granted');b.remove();load()};
  b.querySelectorAll('button')[1].onclick=function(){save('denied');b.remove()};
  document.body.appendChild(b);
}
if(st==='granted')load();else if(st!=='denied'){if(document.body)banner();else document.addEventListener('DOMContentLoaded',banner)}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-cookie-settings]');if(t){e.preventDefault();banner()}});
})();
