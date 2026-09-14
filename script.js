document.addEventListener('DOMContentLoaded',()=>{
 const root=document.documentElement, logo=document.querySelector('.heroLogo'), ghost=document.querySelector('.ghostLogo'), enter=document.querySelector('.enterLogo'), pin=document.querySelector('.methodPin'), why=document.querySelector('.whyLogo'), worlds=[...document.querySelectorAll('.world')], words=[...document.querySelectorAll('.transformWord')], bar=document.querySelector('.scrollbar span'), counter=document.querySelector('.counter b'), dot=document.querySelector('.cursorDot');
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
 const range=(y,start,end)=>clamp((y-start)/(end-start));
 function frame(){
  const y=scrollY,h=innerHeight,max=document.documentElement.scrollHeight-h,p=clamp(y/max); bar.style.transform=`scaleY(${p})`; counter.textContent=String(Math.floor(p*10)).padStart(2,'0');
  if(!reduce){
   let q=range(y,0,h*2.3); if(logo){logo.style.transform=`translate(-50%,-50%) scale(${1+q*12}) rotate(${q*18}deg)`;logo.style.opacity=String(1-clamp(q/.72));logo.style.filter=`blur(${q*2}px)`}
   let g=range(y,h*2.4,h*4.1); if(ghost)ghost.style.transform=`translate(${g*18}vw,${g*-8}vh) scale(${.75+g*.5}) rotate(${g*20}deg)`;
   let e=range(y,h*4.1,h*5.8); if(enter)enter.style.transform=`translateY(${-e*12}vh) scale(${1+e*.15}) rotate(${e*-8}deg)`;
   let m=range(y,h*5.8,h*8); if(pin){pin.style.transform=`translate(${m*55}vw,${m*85}vh) rotate(${m*720}deg)`;pin.style.borderRadius=`${20-m*18}px`}
   worlds.forEach((w,i)=>{const q=range(y,h*(8+i*2.25),h*(10.4+i*2.25));w.style.transform=`translateY(${(1-q)*100}px) scale(${.88+q*.12}) rotate(${(1-q)*(i?2:-2)}deg)`;w.style.opacity=String(.35+q*.65)});
   words.forEach((w,i)=>{const q=range(y,h*(12+i*.55),h*(13+i*.55));w.style.transform=`translate3d(${Math.sin(y/500+i)*22}px,${(1-q)*110}px,0) rotateX(${(1-q)*35}deg) scale(${.9+q*.1})`;w.style.opacity=String(.22+q*.78)});
   let wy=range(y,h*16,h*18.5);if(why)why.style.transform=`translate(${wy*-7}vw,${wy*5}vh) scale(${1+wy*.18}) rotate(${wy*8}deg)`;
  }
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
 addEventListener('mousemove',e=>{if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:reduce?'auto':'smooth'})}}));
 const form=document.getElementById('projectForm');
 form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=['Hello Nuvio, I want to start a website project.','',`Company Name: ${d.get('company')}`,`Your Name: ${d.get('name')}`,`Phone Number: ${d.get('phone')}`,`Website Plan: ${d.get('plan')}`,`Business Type: ${d.get('type')}${d.get('other')?' — '+d.get('other'):''}`].join('\n');form.hidden=true;document.querySelector('.success').hidden=false;setTimeout(()=>window.open('https://wa.me/919037686996?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer'),450)});
});