const progress=document.querySelector('.progress');
const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');revealObserver.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8%'});
document.querySelectorAll('.case-screen,.solution-panel,.dashboard,.audience-card,.timeline-step,.plan-table article,.review-card').forEach(el=>revealObserver.observe(el));

const solutionData={
 website:{no:'01',title:'WEBSITE',text:'A sharp, responsive home for your business. Structure, content and design built around what customers need to know.',cards:[['BUSINESS','Clear positioning','What you do · Who you serve'],['EXPERIENCE','Easy to navigate','Mobile · Fast · Responsive'],['ACTION','Ready to enquire','Call · WhatsApp · Forms']]},
 presence:{no:'02',title:'DIGITAL PRESENCE',text:'Turn your name, offer and proof into a consistent digital presence that feels established across every customer touchpoint.',cards:[['IDENTITY','Look established','Typography · Layout · Visual system'],['TRUST','Show the proof','Work · Reviews · Credentials'],['RECALL','Be remembered','Clear message · Consistent presence']]},
 conversion:{no:'03',title:'ENQUIRIES',text:'Give interested customers an obvious next step. Calls, WhatsApp and enquiry flows are placed where intent happens.',cards:[['ATTENTION','Clear CTA','One obvious next action'],['FRICTION','Easy contact','Fast · Simple · Mobile'],['FOLLOW-THROUGH','Better leads','Relevant information upfront']]}
};
const panel=document.querySelector('#solutionPanel');
document.querySelectorAll('.solution-tab').forEach(tab=>tab.addEventListener('click',()=>{
 document.querySelectorAll('.solution-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');
 const d=solutionData[tab.dataset.solution];
 panel.classList.add('switching');
 setTimeout(()=>{panel.innerHTML=`<div><span class="panel-no">${d.no}</span><h3>${d.title}</h3><p>${d.text}</p><a href="#contact">Build this ↗</a></div><div class="panel-stack">${d.cards.map((c,i)=>`<div class="stack-card ${i===1?'offset':''}"><small>${c[0]}</small><b>${c[1]}</b><span>${c[2]}</span></div>`).join('')}</div>`;panel.classList.remove('switching')},180);
}));

const form=document.querySelector('#projectForm');
form?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const business=data.get('business')==='Other'&&data.get('otherBusiness')?`Other — ${data.get('otherBusiness')}`:data.get('business');const message=['Hello Nuvio, I want to start a website project.','',`Company Name: ${data.get('company')}`,`Your Name: ${data.get('name')}`,`Phone Number: ${data.get('phone')}`,`Website Plan: ${data.get('plan')}`,`Business Type: ${business}`].join('\n');const url=`https://wa.me/919037686996?text=${encodeURIComponent(message)}`;const button=form.querySelector('.submit');button.innerHTML='Opening WhatsApp…';window.open(url,'_blank','noopener,noreferrer');setTimeout(()=>{button.innerHTML='Continue on WhatsApp ↗';form.querySelector('.form-success').textContent='Your details are ready. Continue the conversation on WhatsApp.'},700)});

const menu=document.querySelector('.menu');menu?.addEventListener('click',()=>{const links=document.querySelector('.nav-center');links.classList.toggle('mobile-open')});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}}));

let ticking=false;addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{document.querySelectorAll('.hero-console').forEach(el=>{const y=Math.min(scrollY*.035,22);el.style.transform=`translateY(${y}px)`});ticking=false});ticking=true}},{passive:true});
