const chapters=[...document.querySelectorAll('.chapter')];
const bar=document.getElementById('progressBar');
const count=document.getElementById('currentChapter');
let current=0;

function updateLoveCounter(){
  const start=new Date(2025,4,29,0,0,0);
  const now=new Date();
  let years=now.getFullYear()-start.getFullYear();
  let months=now.getMonth()-start.getMonth();
  let days=now.getDate()-start.getDate();
  if(days<0){months--;days=new Date(now.getFullYear(),now.getMonth(),0).getDate()+days}
  if(months<0){years--;months+=12}
  const hours=now.getHours();
  document.getElementById('counterYears').textContent=Math.max(0,years);
  document.getElementById('counterMonths').textContent=Math.max(0,months);
  document.getElementById('counterDays').textContent=Math.max(0,days);
  document.getElementById('counterHours').textContent=Math.max(0,hours);
}

function showChapter(index){
  current=Math.max(0,Math.min(index,chapters.length-1));
  chapters.forEach((chapter,i)=>{chapter.classList.toggle('active',i===current);chapter.setAttribute('aria-hidden',i===current?'false':'true')});
  bar.style.width=`${((current+1)/chapters.length)*100}%`;
  count.textContent=current+1;
  window.scrollTo({top:0,behavior:'smooth'});
  const heading=chapters[current].querySelector('h1,h2');
  if(heading) setTimeout(()=>heading.focus?.({preventScroll:true}),100);
}

document.querySelectorAll('.next').forEach(button=>button.addEventListener('click',()=>showChapter(current+1)));
document.querySelectorAll('.prev').forEach(button=>button.addEventListener('click',()=>showChapter(current-1)));
document.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'&&current!==4) showChapter(current+1);
  if(event.key==='ArrowLeft') showChapter(current-1);
});

document.querySelectorAll('.love-note').forEach(note=>note.addEventListener('click',()=>{
  note.classList.toggle('open');
  note.setAttribute('aria-expanded',note.classList.contains('open'));
}));

const memoryDialog=document.getElementById('memoryDialog');
document.querySelectorAll('.memory').forEach(memory=>memory.addEventListener('click',()=>{
  document.getElementById('memoryCaption').textContent=memory.dataset.caption;
  memoryDialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>memoryDialog.close());
memoryDialog.addEventListener('click',event=>{if(event.target===memoryDialog) memoryDialog.close()});

const quizMessage=document.getElementById('quizMessage');
const quizNext=document.getElementById('quizNext');
function answerQuiz(message){quizMessage.textContent=message;quizNext.disabled=false;quizNext.focus()}
document.getElementById('muchButton').addEventListener('click',()=>answerQuiz('Casi… pero te quiero mucho más de lo que cabe en una sola respuesta. ♡'));
document.getElementById('moreButton').addEventListener('click',()=>answerQuiz('Esa era la respuesta: hoy, mañana y un poquito más cada día. ♡'));

const music=document.getElementById('music');
const soundButton=document.getElementById('soundButton');
soundButton.addEventListener('click',async()=>{
  if(music.paused){
    try{await music.play();soundButton.classList.add('playing');soundButton.setAttribute('aria-pressed','true');soundButton.querySelector('span').textContent='Sonando'}
    catch{soundButton.querySelector('span').textContent='Añade tu canción'}
  }else{music.pause();soundButton.classList.remove('playing');soundButton.setAttribute('aria-pressed','false');soundButton.querySelector('span').textContent='Música'}
});

document.getElementById('revealButton').addEventListener('click',event=>{
  document.getElementById('finalMessage').classList.add('revealed');
  document.getElementById('restartButton').classList.add('visible');
  event.currentTarget.style.display='none';
  for(let i=0;i<18;i++){
    const heart=document.createElement('span');heart.textContent=i%3?'♡':'✦';heart.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:100vh;color:#f1a6be;pointer-events:none;font-size:${12+Math.random()*18}px;z-index:10;animation:rise ${3+Math.random()*3}s ease-out forwards`;
    document.body.appendChild(heart);setTimeout(()=>heart.remove(),6500);
  }
});
const style=document.createElement('style');style.textContent='@keyframes rise{to{transform:translateY(-110vh) rotate(180deg);opacity:0}}.memory.photo-missing:before{content:"Añade tu foto aquí";display:grid;place-items:center;text-align:center;width:100%;aspect-ratio:4/3;border-radius:.65rem;background:linear-gradient(135deg,#75425d,#281421);color:#dcc4d0;font:1.1rem var(--serif)}';document.head.appendChild(style);
document.getElementById('restartButton').addEventListener('click',()=>showChapter(0));
showChapter(0);
updateLoveCounter();
setInterval(updateLoveCounter,60000);
