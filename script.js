(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const contactModal=$('#contactModal'), builderModal=$('#builderModal');
const open=m=>{if(!m)return;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const close=m=>{if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''};
$$('[data-open-contact]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.plan)$('#plan').value=b.dataset.plan;open(contactModal)}));
$$('[data-close-contact]').forEach(b=>b.addEventListener('click',()=>close(contactModal)));
$$('[data-open-builder]').forEach(b=>b.addEventListener('click',()=>{resetBuilder();open(builderModal)}));
$$('[data-close-builder]').forEach(b=>b.addEventListener('click',()=>close(builderModal)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close(contactModal);close(builderModal)}});
$('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const text=`Hello NUVIO! I want to start a website project.\n\nCompany: ${d.company}\nName: ${d.name}\nPhone: ${d.phone}\nPlan: ${d.plan}\nBusiness type: ${d.business}`;window.open('https://wa.me/919037686996?text='+encodeURIComponent(text),'_blank');close(contactModal)});
let step=1;const builderForm=$('#builderForm');
function show(n){step=n;$$('.builder-step').forEach(x=>x.classList.toggle('active',+x.dataset.step===n));$$('.builder-progress i').forEach((x,i)=>x.classList.toggle('on',i<n));updatePreview()}
function resetBuilder(){step=1;builderForm?.reset();show(1)}
$$('.next').forEach(b=>b.addEventListener('click',()=>{if(step===1&&!builderForm?.elements.businessName.value.trim()){builderForm.elements.businessName.focus();return}show(Math.min(3,step+1))}));
$$('.back').forEach(b=>b.addEventListener('click',()=>show(Math.max(1,step-1))));
function slug(v){return v.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'your-business'}
function updatePreview(){if(!builderForm)return;const f=new FormData(builderForm),name=f.get('businessName')||'YOUR BUSINESS',theme=f.get('theme')||'blue',p=$('#sitePreview');if(!p)return;p.className='site-preview '+theme+'-theme';p.querySelector('small').textContent=(name+' / NUVIO').toUpperCase();p.querySelector('h3').textContent=name.toUpperCase();p.querySelector('p').textContent=f.get('description')||'Clear, credible and ready for customers.';const bar=$('.browser-bar span');if(bar)bar.textContent=slug(name)+'.nuvio';const url=$('#urlPreview');if(url)url.textContent=slug(name)}
builderForm?.addEventListener('input',updatePreview);
builderForm?.addEventListener('change',updatePreview);
builderForm?.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),s=slug(d.businessName);localStorage.setItem('nuvio-starter-'+s,JSON.stringify({...d,slug:s,createdAt:new Date().toISOString()}));alert(`Starter draft saved locally.\n\nYour draft address: ${s}.nuvio\n\nThe publishing backend will be connected once Nuvio's Supabase project is set up.`);close(builderModal)});
if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.to('.progress i',{width:'100%',ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.2}});gsap.from('.hero-copy',{opacity:0,y:35,duration:1,ease:'power3.out'});gsap.from('.hero-product',{opacity:0,y:45,rotate:2,duration:1,delay:.12,ease:'power3.out'});$$('.reveal').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}))}else{$$('.reveal').forEach(x=>{x.style.opacity=1;x.style.transform='none'})}
const glow=$('.hero-glow');window.addEventListener('pointermove',e=>{if(!glow)return;const x=(e.clientX/innerWidth-.5)*24,y=(e.clientY/innerHeight-.5)*18;glow.style.transform=`translate(${x}px,${y}px)`},{passive:true});
updatePreview();
})();