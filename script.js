(function(){
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis;
if(!reduce && window.Lenis){lenis=new Lenis({duration:1.15,smoothWheel:true,touchMultiplier:1.1});function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf)}
if(window.gsap&&!reduce){gsap.registerPlugin(ScrollTrigger); if(lenis) lenis.on('scroll',ScrollTrigger.update);
 const hero=gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
 hero.to('.hero-copy',{y:-180,opacity:.15},0).to('.moon',{y:-100,scale:.65},0).to('.cloud.c1',{x:220},0).to('.cloud.c2',{x:-180},0).to('.mountains.back',{y:-120,scale:1.08},0).to('.mountains.front',{y:-65,scale:1.04},0).to('.hero-house',{x:150,y:100,scale:.7},0).to('.hero-road',{y:140,scale:1.2},0);
 gsap.fromTo('.manifesto-copy',{y:100,opacity:0},{y:0,opacity:1,duration:1,scrollTrigger:{trigger:'.manifesto',start:'top 75%',end:'top 25%',scrub:1}});
 gsap.to('.tiny-store',{y:-80,stagger:.12,scrollTrigger:{trigger:'.manifesto',start:'top bottom',end:'bottom top',scrub:1}});
 const craft=gsap.timeline({scrollTrigger:{trigger:'.craft',start:'top top',end:'bottom top',scrub:1}}); craft.fromTo('.physical-shop',{x:0,scale:1},{x:-220,scale:.6},0).fromTo('.process-word',{opacity:0,y:40},{opacity:1,y:0,stagger:.22},.1).fromTo('.browser-frame',{x:260,y:100,rotate:8,scale:.7},{x:0,y:0,rotate:-2,scale:1},.35);
 gsap.fromTo('.business-place',{y:70,opacity:.4},{y:-50,opacity:1,stagger:.08,scrollTrigger:{trigger:'.industries',start:'top 80%',end:'bottom 30%',scrub:1}});
 const gallery=gsap.timeline({scrollTrigger:{trigger:'.work',start:'top top',end:'bottom top',scrub:1}});gallery.to('.g1',{x:-120,y:-80,rotate:-3},0).to('.g2',{x:100,y:-30,rotate:5},0).to('.g3',{x:180,y:30,rotate:7},0);
 gsap.fromTo('.belief-lines h2',{x:-70,opacity:0},{x:0,opacity:1,stagger:.25,scrollTrigger:{trigger:'.belief',start:'top 70%',end:'top 15%',scrub:1}});
 gsap.fromTo('.why h2',{scale:.82,opacity:0},{scale:1,opacity:1,scrollTrigger:{trigger:'.why',start:'top 75%',end:'top 25%',scrub:1}});
 gsap.to('.quote-orbit',{rotation:20,scale:1.12,scrollTrigger:{trigger:'.testimonial',start:'top bottom',end:'bottom top',scrub:1}});
 gsap.fromTo('.final-copy',{y:100,opacity:0},{y:0,opacity:1,scrollTrigger:{trigger:'.final',start:'top 75%',end:'top 25%',scrub:1}});
}
const dot=document.querySelector('.cursor-dot');window.addEventListener('pointermove',e=>{if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}});
document.querySelectorAll('[data-open-form]').forEach(btn=>btn.addEventListener('click',()=>{openModal();if(btn.dataset.plan)document.querySelector('#plan').value=btn.dataset.plan}));
function openModal(){const m=document.querySelector('#modal');m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){const m=document.querySelector('#modal');m.classList.remove('open','success-state');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const business=document.querySelector('#business'),other=document.querySelector('#otherWrap');business.addEventListener('change',()=>other.classList.toggle('hidden',business.value!=='Other'));
document.querySelector('#projectForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target);const company=fd.get('company'),name=fd.get('name'),phone=fd.get('phone'),plan=fd.get('plan'),biz=fd.get('business'),otherText=fd.get('other');let text=`Hello NUVIO! I want to start a website project.%0A%0ACompany: ${company}%0AName: ${name}%0APhone: ${phone}%0APlan: ${plan}%0ABusiness type: ${biz}${biz==='Other'&&otherText?` (${otherText})`:''}`;document.querySelector('#whatsapp').href='https://wa.me/919037686996?text='+text;document.querySelector('#modal').classList.add('success-state')});
})();
