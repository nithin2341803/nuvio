(()=>{
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  if(location.pathname.endsWith('/') || location.pathname.endsWith('/index.html') || location.pathname===''){
    const link=document.createElement('link'); link.rel='stylesheet'; link.href='home-fix.css?v=2'; document.head.appendChild(link);
  }
  const safety=document.createElement('style'); safety.textContent='.reveal{opacity:1!important;transform:none!important}.hero-copy,.hero-product{opacity:1!important}'; document.head.appendChild(safety);
  const contactModal=$('#contactModal');
  const open=m=>{if(!m)return;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
  const close=m=>{if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''};
  $$('[data-open-builder]').forEach(b=>b.addEventListener('click',()=>location.href='builder.html'));
  $$('[data-open-contact]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.plan&&$('#plan'))$('#plan').value=b.dataset.plan;open(contactModal)}));
  $$('[data-close-contact]').forEach(b=>b.addEventListener('click',()=>close(contactModal)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close(contactModal)});
  const nav=$('.nav nav'),navActions=$('.nav-actions');
  if(nav&&!nav.querySelector('a[href="starter-projects.html"],a[href="projects.html"]')){const a=document.createElement('a');a.href='starter-projects.html';a.textContent='My Projects';nav.appendChild(a)}
  if(navActions){const projectLinks=navActions.querySelectorAll('a[href="starter-projects.html"],a[href="projects.html"]');projectLinks.forEach((a,i)=>{if(i>0)a.remove()});if(!navActions.querySelector('a[href="starter-projects.html"],a[href="projects.html"]')){const a=document.createElement('a');a.href='starter-projects.html';a.className='ghost';a.textContent='My Projects';navActions.insertBefore(a,navActions.firstChild)}}
  $('#projectForm')?.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const text=`Hello NUVIO! I want to start a website project.\n\nCompany: ${d.company}\nName: ${d.name}\nPhone: ${d.phone}\nPlan: ${d.plan}\nBusiness type: ${d.business}`;window.open('https://wa.me/919037686996?text='+encodeURIComponent(text),'_blank');close(contactModal)});
  if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);if($('.progress i'))gsap.to('.progress i',{width:'100%',ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.2}});gsap.from('.hero-copy',{opacity:0,y:35,duration:1,ease:'power3.out'});gsap.from('.hero-product',{opacity:0,y:45,rotate:2,duration:1,delay:.12,ease:'power3.out'});$$('.reveal').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}))}
  const glow=$('.hero-glow');window.addEventListener('pointermove',e=>{if(!glow)return;const x=(e.clientX/innerWidth-.5)*24,y=(e.clientY/innerHeight-.5)*18;glow.style.transform=`translate(${x}px,${y}px)`},{passive:true});
})();
