
   const preloader=document.querySelector('.preloader');
window.addEventListener('load', ()=>setTimeout(()=>preloader.classList.add('hide'), 450));
const menuBtn=document.querySelector('.menu-btn'), navLinks=document.querySelector('.nav-links');
menuBtn.addEventListener('click', ()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(l=>l.addEventListener('click', ()=>navLinks.classList.remove('open')));
const progress=document.querySelector('.progress-bar'), toTop=document.querySelector('.to-top'), waCard=document.querySelector('.whatsapp-card');
function onScroll() {
    const total=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width= total>0 ? `${(scrollY/total)*100}%`:'0%';
    toTop.classList.toggle('show', scrollY>520);
    waCard.classList.toggle('show', scrollY>420)
}
window.addEventListener('scroll', onScroll,  {
    passive:true
});
toTop.addEventListener('click', ()=>scrollTo( {
    top:0, behavior:'smooth'
}));
const observer=new IntersectionObserver(es=> {
    es.forEach(e=> {
        if(e.isIntersecting) {
            e.target.classList.add('active');
            observer.unobserve(e.target)
        }
    })
},  {
threshold:.12, rootMargin:'0px 0px -40px 0px'
});
document.querySelectorAll('.reveal').forEach(i=>observer.observe(i));
const counters=document.querySelectorAll('[data-count]');
let started=false;
const cObs=new IntersectionObserver(es=> {
    if(es[0].isIntersecting&&!started) {
        started=true;
        counters.forEach(c=> {
            const target=parseFloat(c.dataset.count);
            let v=0;
            const decimal=String(target).includes('.');
            const step=target/60;
            const up=()=> {
                v+=step;
                if(v>=target)c.textContent=decimal?target.toFixed(1)+'★':Math.round(target)+'+';
                else {
                    c.textContent=decimal?v.toFixed(1):Math.round(v);
                    requestAnimationFrame(up)
                }
            };
            up()
        })
    }
},  {
threshold:.4
});
if(counters.length)cObs.observe(counters[0]);
const lightbox=document.querySelector('.lightbox'), lightboxImg=lightbox.querySelector('img'), closeBtn=lightbox.querySelector('button');
document.querySelectorAll('.gallery-item img').forEach(img=>img.addEventListener('click', ()=> {
    lightbox.classList.add('active');
    lightboxImg.src=img.src.replace('w=700', 'w=1200');
    lightboxImg.alt=img.alt
}));
closeBtn.addEventListener('click', ()=>lightbox.classList.remove('active'));
lightbox.addEventListener('click', e=> {
    if(e.target===lightbox)lightbox.classList.remove('active')
});
document.addEventListener('keydown', e=> {
    if(e.key==='Escape')lightbox.classList.remove('active')
});
document.querySelectorAll('.package-btn').forEach(btn=>btn.addEventListener('click', ()=>setTimeout(()=> {
    document.getElementById('service').value=btn.dataset.service
}, 250)));
document.getElementById('bookingForm').addEventListener('submit', e=> {
    e.preventDefault();
    const name=document.getElementById('name').value.trim(), phone=document.getElementById('phone').value.trim(), service=document.getElementById('service').value, location=document.getElementById('location').value.trim(), date=document.getElementById('date').value, msg=document.getElementById('message').value.trim();
    const text=`Hi Zenz Studio, I want to book a photoshoot.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0ALocation: ${encodeURIComponent(location||'Not mentioned')}%0ADate: ${encodeURIComponent(date||'Not fixed')}%0AMessage: ${encodeURIComponent(msg||'')}`;
    window.open(`https://wa.me/918340096039?text=${text}`, '_blank')
});
const sections=document.querySelectorAll('section[id],header[id]'), navItems=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', ()=> {
    let current='home';
    sections.forEach(sec=> {
        if(scrollY>=sec.offsetTop-140)current=sec.id
    });
    navItems.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+current))
},  {
passive:true
});