(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const contactModal=$('#contactModal');
const open=m=>{if(!m)return;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const close=m=>{if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''};

// Starter is now a real workspace flow instead of the tiny 3-field popup.
$$('[data-open-builder]').forEach(b=>b.addEventListener('click',()=>location.href='builder.html'));
$$('[data-open-contact]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.plan&&$('#plan'))$('#plan').value=b.dataset.plan;open(contactModal)}));
$$('[data-close-contact]').forEach(b=>b.addEventListener('click',()=>close(contactModal)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')close(contactModal)});

// Put the Projects destination directly into the main navigation.
const nav=$('.nav nav');
if(nav&&!nav.querySelector('[href="projects.html"]')){
  const a=document.createElement('a'); a.href='projects.html'; a.textContent='My Projects'; nav.appendChild(a);
}
const navActions=$('.nav-actions');
if(navActions&&!navActions.querySelector('[href="projects.html"]')){
  const a=document.createElement('a'); a.href='projects.html'; a.className='ghost'; a.textContent='My Projects'; navActions.insertBefore(a,navActions.firstChild);
}

$('#projectForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 const d=Object.fromEntries(new FormData(e.target));
 const text=`Hello NUVIO! I want to start a website project.\n\nCompany: ${d.company}\nName: ${d.name}\nPhone: ${d.phone}\nPlan: ${d.plan}\nBusiness type: ${d.business}`;
 window.open('https://wa.me/919037686996?text='+encodeURIComponent(text),'_blank');
 close(contactModal);
});

// Lightweight scroll motion for the marketing site.
if(window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 if($('.progress i'))gsap.to('.progress i',{width:'100%',ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.2}});
 gsap.from('.hero-copy',{opacity:0,y:35,duration:1,ease:'power3.out'});
 gsap.from('.hero-product',{opacity:0,y:45,rotate:2,duration:1,delay:.12,ease:'power3.out'});
 $$('.reveal').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
}else $$('.reveal').forEach(x=>{x.style.opacity=1;x.style.transform='none'});
const glow=$('.hero-glow');
window.addEventListener('pointermove',e=>{if(!glow)return;const x=(e.clientX/innerWidth-.5)*24,y=(e.clientY/innerHeight-.5)*18;glow.style.transform=`translate(${x}px,${y}px)`},{passive:true});
})();