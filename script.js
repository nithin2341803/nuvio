const progress = document.querySelector('.progress');
const revealEls = document.querySelectorAll('.service,.project,.step,.plan,.number-grid>div');

function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12, rootMargin:'0px 0px -8% 0px'});
revealEls.forEach(el=>observer.observe(el));

const form = document.getElementById('projectForm');
form?.addEventListener('submit',(event)=>{
  event.preventDefault();
  const data = new FormData(form);
  const business = data.get('business') === 'Other' && data.get('otherBusiness') ? `Other — ${data.get('otherBusiness')}` : data.get('business');
  const message = [
    'Hello Nuvio, I want to start a website project.',
    '',
    `Company Name: ${data.get('company')}`,
    `Your Name: ${data.get('name')}`,
    `Phone Number: ${data.get('phone')}`,
    `Website Plan: ${data.get('plan')}`,
    `Business Type: ${business}`
  ].join('\n');
  const url = `https://wa.me/919037686996?text=${encodeURIComponent(message)}`;
  const button = form.querySelector('.submit');
  button.textContent = 'Opening WhatsApp…';
  window.open(url,'_blank','noopener,noreferrer');
  setTimeout(()=>button.innerHTML='Sent — continue on WhatsApp ↗',700);
});

const menu = document.querySelector('.menu');
menu?.addEventListener('click',()=>{
  const nav = document.querySelector('.desktop-nav');
  nav.classList.toggle('mobile-open');
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',(e)=>{
    const target = document.querySelector(link.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});
