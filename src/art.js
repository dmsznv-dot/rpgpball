const Art=(()=>{
'use strict';const W=480,H=800;let bg,biome=-1;const images={};for(const [id,svg] of Object.entries(ASSETS)){const im=new Image();im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);images[id]=im}
const THEMES=[['#50714c','#263f37','#be9c65'],['#697064','#333e42','#b5a58a'],['#293f4d','#142633','#988678']];
function oval(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function line(c,x,y,xx,yy,w,col){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke()}
function build(ch){biome=ch;bg=document.createElement('canvas');bg.width=960;bg.height=1600;let c=bg.getContext('2d');c.scale(2,2);let t=THEMES[ch],g=c.createLinearGradient(0,0,480,800);g.addColorStop(0,t[0]);g.addColorStop(1,t[1]);c.fillStyle=g;c.fillRect(0,0,480,800);
for(let branch of [85,240,395]){line(c,branch,0,240,320,46,'#203c3340');line(c,branch,0,240,320,34,t[2])}line(c,240,310,240,770,34,t[2]);for(let i=0;i<420;i++){let x=30+(Math.sin(i*91.7)*.5+.5)*420,y=(i*73.31)%780;oval(c,x,y,1.3,2,'#d3dea51c')}
for(let x of [12,468]){line(c,x,5,x,790,28,'#101c27');line(c,x-2,5,x-2,790,19,'#78838a');line(c,x-7,10,x-7,780,3,'#d8d6bc');for(let y=25;y<800;y+=54)oval(c,x,y,3,3,'#d8ba7d')}
for(let i=0;i<22;i++){let x=i%2?395:65,y=65+Math.floor(i/2)*55;oval(c,x+3,y+8,20,8,'#071c3040');oval(c,x,y,17,12,t[1]);oval(c,x-5,y-5,12,9,t[0])}
line(c,25,655,155,706,19,'#172832');line(c,25,655,155,706,12,'#b5bdba');line(c,455,655,325,706,19,'#172832');line(c,455,655,325,706,12,'#b5bdba');line(c,210,783,270,783,20,'#543c2a');for(let x=215;x<270;x+=9)line(c,x,773,x,795,4,'#cda86c');
line(c,430,610,430,742,30,'#162b36');line(c,418,610,418,735,3,'#c3b586');line(c,444,610,444,735,3,'#c3b586');}
function draw(c,s,input,fx,time){let ch=Core.waveInfo(s?.wave||1,s?.mode||'story').chapter;if(!bg||biome!==ch)build(ch);c.imageSmoothingEnabled=true;c.clearRect(0,0,W,H);c.drawImage(bg,0,0,W,H);
let charge=s.charge||0;for(let y=700-charge*26;y<739;y+=5)line(c,423,y,437,y+3,2,'#aab5ba');line(c,420,744+charge*12,440,744+charge*12,9,'#d7ad68');
const looks={orc:['orc-head','#8bb269'],runner:['bat','#baa388'],armored:['skull-mask','#94afc1'],brute:['ogre','#b29569'],healer:['skull-mask','#a991bf'],warden:['ogre','#d7b26d'],shaman:['skull-mask','#b7a1df'],chief:['dragon-head','#e3a079']};
for(const e of s.enemies||[]){let [,col]=looks[e.type],scale=e.boss?1.7:e.type==='brute'?1.3:1,bob=Math.sin(s.time*7+e.phase)*1.4;oval(c,e.x+2,e.y+20*scale,15*scale,5*scale,'#091c2970');c.save();c.translate(e.x,e.y+bob);c.scale(scale,scale);
const mage=['healer','shaman'].includes(e.type),armor=['armored','chief','warden'].includes(e.type),skin=e.type==='runner'?'#bfb6a0':e.type==='chief'?'#b2735e':'#91ad66',step=Math.sin(s.time*8+e.phase)*3;
// Full-body silhouettes: boots, legs, tunic/plate, arms, face and equipment.
line(c,-6,10,-7,22+step,7,'#343b3d');line(c,6,10,7,22-step,7,'#343b3d');oval(c,-8,24+step,6,3,'#253037');oval(c,8,24-step,6,3,'#253037');
let g=c.createLinearGradient(-12,-5,12,16);g.addColorStop(0,armor?'#c0c8c6':col);g.addColorStop(1,armor?'#46596b':'#414c48');c.fillStyle=g;c.beginPath();c.moveTo(-9,-5);c.quadraticCurveTo(0,-12,9,-5);c.lineTo(mage?15:11,16);c.quadraticCurveTo(0,20,mage?-15:-11,16);c.closePath();c.fill();line(c,-9,10,9,10,3,'#725437');oval(c,0,10,2,2,'#ebd08e');
line(c,-10,-2,-16,9+step*.4,6,skin);line(c,10,-2,15,7-step*.4,6,skin);
oval(c,-9,-13,5,3,skin);oval(c,9,-13,5,3,skin);let face=c.createLinearGradient(-7,-20,8,-6);face.addColorStop(0,'#c5d29a');face.addColorStop(1,skin);oval(c,0,-13,9,10,face);line(c,-5,-15,-2,-15,2,'#25342f');line(c,3,-15,6,-15,2,'#25342f');line(c,-4,-7,4,-7,2,'#3f4530');line(c,-4,-7,-4,-10,2,'#ffecd0');line(c,4,-7,4,-10,2,'#ffecd0');
if(armor){c.fillStyle='#788d9d';c.beginPath();c.arc(0,-16,10,Math.PI,Math.PI*2);c.lineTo(10,-13);c.lineTo(-10,-13);c.fill();line(c,0,-24,0,-13,3,'#d9d6be')}
if(mage){c.fillStyle='#8f79b0';c.beginPath();c.moveTo(-12,-18);c.lineTo(0,-35);c.lineTo(10,-18);c.closePath();c.fill();line(c,18,-19,18,21,3,'#8d6844');oval(c,18,-22,5,6,'#c6b2ed')}
else if(armor){oval(c,-17,8,7,10,'#718b9c');line(c,-17,1,-17,16,2,'#e6d6a9');line(c,17,-8,17,19,3,'#8e6743');line(c,12,-9,23,-9,6,'#b4c3c7')}
else{line(c,17,-4,17,18,3,'#795439');line(c,12,-5,22,-5,6,'#a5adb0')}
if(e.boss){c.fillStyle='#e6bf70';c.beginPath();c.moveTo(-10,-23);c.lineTo(-12,-33);c.lineTo(-4,-28);c.lineTo(0,-36);c.lineTo(5,-28);c.lineTo(12,-33);c.lineTo(10,-23);c.closePath();c.fill()}
if(e.flash>0){c.globalAlpha=e.flash*2;oval(c,0,0,13,24,'#fff2c9');c.globalAlpha=1}c.restore();if(e.slow>0)oval(c,e.x,e.y+23*scale,15*scale,3,'#a2e6f8aa');if(e.hp<e.maxHp||e.boss){let w=18*scale,y=e.y-39*scale;line(c,e.x-w,y,e.x+w,y,4,'#12232d');line(c,e.x-w,y,e.x-w+Math.max(.01,e.hp/e.maxHp)*2*w,y,2,col)}}

for(const b of s.balls||[]){for(let i=0;i<b.trail.length;i++){c.globalAlpha=.15*(1-i/7);oval(c,b.trail[i].x,b.trail[i].y,b.r,b.r,'#dce9ef')}c.globalAlpha=1;oval(c,b.x+3,b.y+5,b.r,3,'#06182780');let g=c.createRadialGradient(b.x-b.r*.4,b.y-b.r*.5,.2,b.x,b.y,b.r);g.addColorStop(0,'#ffffff');g.addColorStop(.3,'#d7e4e7');g.addColorStop(.65,'#8da2ae');g.addColorStop(1,'#24394d');oval(c,b.x,b.y,b.r,b.r,g)}
for(let side of [-1,1]){let key=side<0?'left':'right',a=s.flippers?.[key]||0,ax=side<0?162:318,angle=.341- .66*a,bx=ax+side*-Math.cos(angle)*80,by=715+Math.sin(angle)*80;line(c,ax+2,720,bx+2,by+5,22,'#10212ac0');line(c,ax,715,bx,by,19,'#805535');line(c,ax,712,bx,by-3,13,'#d9b879');line(c,ax,710,bx,by-5,3,'#f5e3ab');oval(c,ax,715,7,7,'#758d9d');oval(c,ax-2,712,3,3,'#eff4e5')}
for(const d of s.drops||[])oval(c,d.x,d.y,5,5,d.type==='heal'?'#e6a48d':'#f3d285');for(const f of fx){let a=Math.max(0,f.life/f.max);c.globalAlpha=a;if(f.type==='text'){c.fillStyle=f.color;c.font='bold 13px Georgia';c.fillText(f.text,f.x,f.y-(1-a)*25)}else if(f.type==='lightning')line(c,f.x,f.y,f.x2,f.y2,2,'#fff1b0');else if(f.type==='ring'){c.strokeStyle=f.color;c.lineWidth=2;c.beginPath();c.arc(f.x,f.y,(1-a)*65+5,0,7);c.stroke()}else oval(c,f.x,f.y,2,2,f.color)}c.globalAlpha=1;
if(s.phase==='playing'&&s.balls[0]?.ready){c.fillStyle='#f7e6b3';c.font='12px Georgia';c.fillText('Удержи пружину и отпусти',245,580)}}
return{draw,build,THEMES};})();
