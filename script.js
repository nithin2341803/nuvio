(()=>{
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const contactModal=$('#contactModal');
  const open=m=>{if(!m)return;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
  const close=m=>{if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''};

  $$('[data-open-builder]').forEach(b=>b.addEventListener('click',()=>{location.href='builder.html'}));
  $$('[data-open-contact]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.plan&&$('#plan'))$('#plan').value=b.dataset.plan;open(contactModal)}));
  $$('[data-close-contact]').forEach(b=>b.addEventListener('click',()=>close(contactModal)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close(contactModal)});

  $('#projectForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const d=Object.fromEntries(new FormData(e.target));
    const text=`Hello NUVIO! I want to start a website project.\n\nCompany: ${d.company}\nName: ${d.name}\nPhone: ${d.phone}\nPlan: ${d.plan}\nBusiness type: ${d.business}`;
    window.open('https://wa.me/919037686996?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
    close(contactModal);
  });

  const progress=$('.progress i');
  const updateProgress=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?Math.min(100,(window.scrollY/max)*100):0)+'%'};
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress,{passive:true});
  updateProgress();

  const revealEls=$$('.reveal');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
    revealEls.forEach(el=>observer.observe(el));
  }else revealEls.forEach(el=>el.classList.add('is-visible'));

  const glow=$('.hero-glow');
  if(glow && matchMedia('(hover:hover) and (pointer:fine)').matches){
    window.addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5)*20,y=(e.clientY/innerHeight-.5)*14;glow.style.transform=`translate3d(${x}px,${y}px,0)`},{passive:true});
  }
})();
