const captions = [
  'my favorite view','that smile!','a day to remember','little sunshine','you, being you',
  'my happy place','one for the album','sweetest moment','look at you!','our kind of magic',
  'a perfect day','soft little moments','my person','could stare forever','pretty girl energy',
  'best day, best girl','all the heart eyes','just us','golden hour glow','my favorite human',
  'this one ♡','the way you laugh','kept this one close','a little bit of magic','you make me smile',
  'another favorite','the cutest ever','memories with you','my whole heart','and many more ♡'
];
const grid = document.querySelector('#photoGrid');
const photos = captions.map((caption, i) => ({ src:`photos/${String(i+1).padStart(2,'0')}.jpg`, caption, n:i+1 }));
function makeImage(src, alt){const img=document.createElement('img');img.src=src;img.alt=alt;img.loading='lazy';img.addEventListener('load',()=>img.classList.add('loaded'));img.addEventListener('error',()=>img.remove());return img;}
photos.forEach((photo,i)=>{
  const card=document.createElement('article');card.className='memory-card';card.style.setProperty('--tilt',`${[-2,1.5,-1,2,-1.5][i%5]}deg`);card.style.animationDelay=`${(i%10)*35}ms`;
  const imageWrap=document.createElement('div');imageWrap.className='photo-image';imageWrap.dataset.placeholder=`♡  ${String(photo.n).padStart(2,'0')}  ♡`;
  imageWrap.append(makeImage(photo.src,photo.caption));
  const caption=document.createElement('div');caption.className='caption';caption.innerHTML=`<span>${photo.caption}</span><b>♡</b>`;
  card.append(imageWrap,caption);card.addEventListener('click',()=>showPhoto(i));grid.append(card);
});
const modal=document.querySelector('#letterModal');
function openLetter(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.close-modal').focus();}
function closeLetter(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelector('#openLetter').addEventListener('click',openLetter);document.querySelector('#openLetterBottom').addEventListener('click',openLetter);
modal.addEventListener('click',e=>{if(e.target.dataset.close)closeLetter()});
const lightbox=document.querySelector('#lightbox');let active=0;
function showPhoto(index){active=(index+photos.length)%photos.length;const photo=photos[active];const box=lightbox.querySelector('.lightbox-image');box.replaceChildren(makeImage(photo.src,photo.caption));lightbox.querySelector('figcaption').textContent=photo.caption;lightbox.querySelector('.lightbox-count').textContent=`${String(photo.n).padStart(2,'0')}  /  30`;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);lightbox.querySelector('.prev').addEventListener('click',()=>showPhoto(active-1));lightbox.querySelector('.next').addEventListener('click',()=>showPhoto(active+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLetter();closeLightbox()}if(lightbox.classList.contains('open')&&e.key==='ArrowRight')showPhoto(active+1);if(lightbox.classList.contains('open')&&e.key==='ArrowLeft')showPhoto(active-1)});
