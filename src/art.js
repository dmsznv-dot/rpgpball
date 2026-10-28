const Art=(()=>{
'use strict';const W=Core.W,H=Core.H;let bg=null,biome=-1;const sprites=new Map();
const THEMES=[{grass:'#6f9f55',light:'#a8c878',shade:'#4c7a45',path:'#b87545',pathL:'#d79a61',edge:'#3f653f',stone:'#596b7d',sky:'#9fb5ad'}, {grass:'#879b61',light:'#c1cd86',shade:'#667b4a',path:'#ad946d',pathL:'#d0b488',edge:'#5a6543',stone:'#6e7681',sky:'#c4c1a2'}, {grass:'#456d5d',light:'#739a76',shade:'#2f5548',path:'#8d7055',pathL:'#b49670',edge:'#29473f',stone:'#4e5e70',sky:'#8fa7b6'}];
const noise=(x,y)=>{let z=Math.sin(x*23.13+y*93.51)*47653.23;return z-Math.floor(z)};
function rect(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h)}
function path(y){if(y<180){let t=y/180;return[[72+t*104,116+t*104],[215,265],[364-t*104,408-t*104]]}if(y<305){let t=(y-180)/125;return[[176+t*39,304-t*39]]}return[[214,266]]}
function stone(c,x,y,w,h,t){rect(c,x+2,y+3,w,h,'#293345');rect(c,x,y,w,h,t.stone);rect(c,x+2,y+1,w-4,3,'#b6bfcb');rect(c,x+2,y+4,3,h-6,'#8d9db4');rect(c,x+w-3,y+4,3,h-4,'#46516c');rect(c,x+3,y+h-3,w-5,3,'#414d65');rect(c,x+w*.5,y+5,2,Math.max(2,h-10),'#53627d')}
function bush(c,x,y,scale=1,t=THEMES[0]){c.save();c.translate(x,y);c.scale(scale,scale);rect(c,-13,7,27,7,'#2a4f35');rect(c,-17,-4,32,13,t.shade);rect(c,-11,-12,22,22,t.grass);rect(c,-6,-16,12,5,t.grass);rect(c,-8,-11,13,4,t.light);rect(c,-14,-3,6,3,t.light);rect(c,6,1,7,5,t.shade);rect(c,-4,2,4,3,t.light);c.restore()}
function build(chapter){biome=chapter;let t=THEMES[chapter];bg=document.createElement('canvas');bg.width=W;bg.height=H;let c=bg.getContext('2d');c.imageSmoothingEnabled=false;rect(c,0,0,W,H,t.grass);
for(let y=0;y<H;y+=6)for(let [l,r] of path(y)){l=Math.round(l/6)*6;r=Math.round(r/6)*6;rect(c,l-3,y,r-l+6,6,t.edge);rect(c,l,y,r-l,6,t.path);rect(c,l+3,y,3,6,t.pathL)}
for(let y=22;y<780;y+=12)for(let x=26;x<454;x+=12){let n=noise(x,y),gx=x+Math.floor(noise(y,x)*8),gy=y+Math.floor(n*6);if(path(y).some(([l,r])=>gx>l-5&&gx<r+4)){if(n>.97){rect(c,gx,gy,2,2,'#a37950');rect(c,gx+2,gy,3,1,t.pathL)}continue}if(n<.7){rect(c,gx,gy,2,3,t.light);rect(c,gx+2,gy+3,2,2,t.light);rect(c,gx+4,gy+1,2,3,t.shade)}if(n>.95){rect(c,gx,gy+4,8,4,t.shade);rect(c,gx,gy,7,5,'#9aa58b');rect(c,gx+1,gy,4,2,'#d0ceb0')}if(n>.9&&n<.92){rect(c,gx,gy,2,5,t.shade);rect(c,gx-1,gy-2,4,3,chapter===2?'#a4b8cf':'#ead69b')}}
for(let side of [0,1]){let x=side?456:0;rect(c,x,0,24,H,'#30394b');for(let y=0;y<H;y+=20)stone(c,x+2,y,20,18,t);for(let y=30;y<H;y+=130){stone(c,x-2,y,28,14,t);rect(c,x+4,y+14,17,3,'#334056')}for(let y=70;y<620;y+=116){bush(c,side?451:26,y,.66,t);rect(c,side?450:24,y+10,2,23,t.shade)}}
for(let x=0;x<W;x+=24)stone(c,x,779,22,18,t);rect(c,211,779,58,21,t.path);rect(c,211,779,4,21,'#68472f');rect(c,265,779,4,21,'#68472f');rect(c,214,787,51,4,'#513f34');for(let x=216;x<265;x+=9)rect(c,x,784,3,10,'#906342');
for(let x of [4,448]){stone(c,x,0,28,26,t);stone(c,x-2,0,32,8,t);stone(c,x,754,28,25,t)}
// Intentionally decorative ruins stay outside the central shot lane.
for(let side of [0,1]){let x=side?437:39;for(let y of [200,410,575]){rect(c,x-6,y+4,14,6,t.shade);if(chapter===1){stone(c,x-5,y-16,12,22,t);rect(c,x-8,y-18,18,5,'#c1c6b5')}else bush(c,x,y,.52,t)}}
rect(c,27,741,426,1,chapter===2?'#b4a173':'#e0bc75');
}
const ORC=[
'......HHHHH......',
'....HHhhhhhHH....',
'...HhhhhhhhhhH...',
'..HHhHHHHHHHhHH..',
'.ggGggggggggGgg..',
'.gGGgGGGGGGgGGg..',
'..GGgkkGkkGgGG...',
'..GGgYkGkYGgGG...',
'...GGGgGgGGGG....',
'....GwgggwGG.....',
'.....GkkkG.......',
'...AAAbbbAAA.....',
'..AaaabBbaaaA....',
'.GgaaaBBbaaaGg...',
'.GgabbBBbbbaGg...',
'..GbbbbbBBBBG....',
'...bbbbbbbb......',
'...BBBBBBBB......',
'....bb..bb.......',
'...KKK..KKK......',
'...Kkk..Kkk......',
'..KKkk..kkKK.....'];
function sprite(type){if(sprites.has(type))return sprites.get(type);let c=document.createElement('canvas');c.width=40;c.height=49;let g=c.getContext('2d');let armored=type==='armored'||type==='chief',brute=type==='brute'||type==='warden',mage=type==='healer'||type==='shaman';let pal={H:'#323e45',h:armored?'#9aa4b8':mage?'#b28bba':'#8a7251',G:brute?'#527445':'#73994d',g:brute?'#a7b373':'#a9bd6d',k:'#283b35',Y:'#f6d993',w:'#f5e3b3',A:armored?'#35475c':mage?'#4c4e76':'#4e493b',a:armored?'#8999ac':mage?'#8d82ad':'#947550',b:armored?'#6b7c92':mage?'#76698d':'#7c603d',B:'#bfa477',K:'#343e3b'};ORC.forEach((row,y)=>[...row].forEach((v,x)=>{if(pal[v])rect(g,x*2+2,y*2+2,2,2,pal[v])}));if(mage){rect(g,29,10,3,33,'#4c3d32');rect(g,28,6,5,7,'#dac88d');rect(g,29,5,3,3,'#c8e6c5')}else if(armored){rect(g,27,23,10,15,'#344152');rect(g,29,24,7,11,'#9ca9bc');rect(g,30,25,2,8,'#d0d5ce')}else{rect(g,31,20,3,23,'#785d3e');rect(g,28,17,8,7,'#48535c');rect(g,28,17,7,2,'#c5cdc3')}sprites.set(type,c);return c}
function guide(c,ax,ay,bx,by){c.lineCap='square';c.beginPath();c.moveTo(ax,ay+4);c.lineTo(bx,by+4);c.lineWidth=15;c.strokeStyle='#344157';c.stroke();c.beginPath();c.moveTo(ax,ay);c.lineTo(bx,by);c.lineWidth=12;c.strokeStyle='#7185a3';c.stroke();c.lineWidth=3;c.strokeStyle='#bdc6d2';c.stroke();for(let t=.1;t<1;t+=.13)rect(c,ax+(bx-ax)*t,ay+(by-ay)*t,3,7,'#455571')}
function draw(c,s,input,fx,visualTime){let chapter=Core.waveInfo(s?.wave||1,s?.mode||'story').chapter;if(!bg||biome!==chapter)build(chapter);c.clearRect(0,0,W,H);c.drawImage(bg,0,0);let time=s?.time||0;
guide(c,25,655,155,706);guide(c,455,655,325,706);
// Heavy right-side plunger lane: a metal sleeve, spring and wooden release cap.
rect(c,414,604,35,142,'#293644');rect(c,418,608,27,134,'#8c9aa2');rect(c,422,612,19,126,'#42515c');for(let y=625;y<720;y+=13){rect(c,423,y,17,4,'#c0c7c4');rect(c,425,y+4,13,3,'#56636a')}rect(c,414,738,35,12,'#5c3d2e');rect(c,417,735,29,7,'#c78b4d');
for(let x of [40,440]){rect(c,x-5,635,10,14,'#495568');rect(c,x-7,632,14,4,'#aab6c3');rect(c,x-3,624,6,9,'#d49b50');rect(c,x-1,620-Math.floor(Math.sin(visualTime*8+x)*2),3,9,'#f5dc8c')}
for(let e of s?.enemies||[]){let bob=Math.sin(time*7+e.phase)>0?1:0,scale=e.boss?1.25:e.type==='brute'?.9:.68,w=40*scale,h=49*scale;c.fillStyle='#263c3970';c.beginPath();c.ellipse(e.x,e.y+e.r+4,e.r+3,5,0,0,7);c.fill();if(e.slow>0){c.fillStyle='#9ee7ef80';c.beginPath();c.ellipse(e.x,e.y+e.r+4,e.r+5,6,0,0,7);c.fill()}c.drawImage(sprite(e.type),Math.round(e.x-w/2),Math.round(e.y-h/2+bob),w,h);if(e.poison>0)rect(c,e.x-3,e.y-19,5,3,'#bfd975');if(e.flash>0){c.globalAlpha=e.flash*3;rect(c,e.x-e.r*.6,e.y-e.r,e.r*1.2,e.r*1.7,'#fff8d1');c.globalAlpha=1}if(e.hp<e.maxHp||e.boss){rect(c,e.x-e.r-1,e.y-e.r-10,e.r*2+2,4,'#2d3a43');rect(c,e.x-e.r,e.y-e.r-9,e.r*2*Math.max(0,e.hp/e.maxHp),2,e.boss?'#dda37d':'#d9d38f')}if(e.boss){c.fillStyle='#fff1cb';c.textAlign='center';c.font='9px monospace';c.fillText(e.type==='warden'?'СТРАЖ':e.type==='shaman'?'ШАМАН':'ВОЖДЬ',e.x,e.y-e.r-15);c.textAlign='left'}}
for(let d of s?.drops||[]){rect(c,d.x-4,d.y+2,9,5,'#4b704b');rect(c,d.x-4,d.y-4,8,8,d.type==='heal'?'#e8b18b':'#e6c46f');rect(c,d.x-2,d.y-3,2,5,'#fff0b2')}
for(let b of s?.balls||[]){let col=Core.has(s,'ember')?'#efae6d':Core.has(s,'frost')?'#b2e3e7':Core.has(s,'venom')?'#c6d77d':'#e9dfb0';b.trail.forEach((p,i)=>{c.globalAlpha=.25*(1-i/7);rect(c,p.x-b.r*.6,p.y-b.r*.6,b.r*1.2,b.r*1.2,col)});c.globalAlpha=1;c.fillStyle='#2c43396b';c.beginPath();c.ellipse(b.x+2,b.y+6,b.r+2,3,0,0,7);c.fill();c.beginPath();c.arc(b.x,b.y,b.r+1,0,7);c.fillStyle='#46516a';c.fill();c.beginPath();c.arc(b.x,b.y,b.r,0,7);c.fillStyle=col;c.fill();rect(c,b.x-b.r*.4,b.y-b.r*.65,Math.max(2,b.r*.7),2,'#ffffff');rect(c,b.x+1,b.y+2,3,2,'#8899ad')}
for(let side of [-1,1]){let active=side===-1?input.left:input.right,ax=side===-1?162:318,bx=side===-1?238:242,by=active?690:742;c.lineCap='round';c.beginPath();c.moveTo(ax+1,719);c.lineTo(bx+1,by+4);c.lineWidth=20;c.strokeStyle='#38433d';c.stroke();c.beginPath();c.moveTo(ax,715);c.lineTo(bx,by);c.lineWidth=18;c.strokeStyle='#72513a';c.stroke();c.lineWidth=13;c.strokeStyle=active?'#e2b36d':'#cb9858';c.stroke();c.lineWidth=3;c.strokeStyle='#f2d79c';c.stroke();c.fillStyle='#515e74';c.beginPath();c.arc(ax,715,6,0,7);c.fill();rect(c,ax-2,712,3,3,'#d7dece')}
for(let f of fx){let alpha=Math.max(0,Math.min(1,f.life/f.max));c.globalAlpha=alpha;if(f.type==='lightning'){c.beginPath();c.moveTo(f.x,f.y);c.lineTo((f.x+f.x2)/2+8,(f.y+f.y2)/2-9);c.lineTo(f.x2,f.y2);c.strokeStyle='#fff1b0';c.lineWidth=3;c.stroke()}else if(f.type==='ring'){c.beginPath();c.arc(f.x,f.y,(1-alpha)*80+8,0,7);c.strokeStyle=f.color;c.lineWidth=3;c.stroke()}else if(f.type==='text'){c.fillStyle=f.color;c.font=f.crit?'bold 16px monospace':'12px monospace';c.textAlign='center';c.fillText(f.text,f.x,f.y-(1-alpha)*28);c.textAlign='left'}else rect(c,f.x,f.y,3,3,f.color);c.globalAlpha=1}
if(s?.phase==='playing'&&s.balls[0]?.ready){let charge=s.charge||0;c.fillStyle='#ead28e';c.font='9px monospace';c.textAlign='center';c.fillText('ОТТЯНИ И ОТПУСТИ',430,590);c.fillStyle='#2a3540';c.fillRect(426,688-charge*34,8,6);c.fillStyle='#f3d18a';c.fillRect(427,689-charge*34,6,3);c.textAlign='left'}
}
return{draw,build,sprite,THEMES};
})();
