const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const os = require('node:os');
const root = path.resolve(__dirname, '../twitch/estudos/texto-v1');
const cache = fs.mkdtempSync(path.join(os.tmpdir(), 'ivexi-text-qa-'));
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(root+'/index.html').href);
  await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
  assert.equal(await page.locator('article').count(),20);
  const sizes=await page.locator('.sizes img').evaluateAll(imgs=>imgs.map(i=>({actual:[i.naturalWidth,i.naturalHeight],shown:[i.width,i.height]})));
  assert(sizes.every(i=>i.actual.join()===i.shown.join()));
  assert.equal(await page.locator('.blocked').count(),7);
  for (const a of await page.locator('a[download]').evaluateAll(links=>links.map(a=>a.href))) {
   assert(fs.existsSync(new URL(a)),a);
  }
  await page.screenshot({path:path.join(cache, 'desktop.png')});
  await page.locator('#light').focus(); await page.keyboard.press('Enter');
  assert(await page.locator('body').evaluate(b=>b.classList.contains('light')));
  await page.locator('#motion').focus(); await page.keyboard.press('Space');
  assert.equal(await page.locator('img[src$=".gif"]').count(),0);
  await page.locator('#rip').screenshot({path:root+'/revisao-rip-claro.png'});
  await page.locator('#size').click();
  assert.equal(await page.locator('#size').getAttribute('aria-pressed'),'true');
  await page.locator('select[data-emote="gg"]').selectOption('full');
  await page.locator('select[data-emote="energiza"]').selectOption('short');
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#save').click()]);
  assert.equal(download.suggestedFilename(),'escolhas-texto-emotes.json');
  await download.saveAs(path.join(cache, 'escolhas-teste.json'));
  const decisions=JSON.parse(fs.readFileSync(path.join(cache, 'escolhas-teste.json'),'utf8'));
  assert.equal(decisions.choices.length,20);
  assert.equal(decisions.choices.find(c=>c.emote==='gg').variant,'full');
  assert.equal(decisions.choices.filter(c=>c.variant!=='pending').length,2);
  await page.locator('#size').click();
  for (const width of [375,320]) {
   await page.setViewportSize({width,height:850});
   const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(e=>({tag:e.tagName,text:e.textContent.slice(0,70),right:e.getBoundingClientRect().right}))}));
   assert(overflow.scroll<=width,JSON.stringify(overflow));
   await page.locator('#gg').screenshot({path:path.join(cache, `mobile-${width}.png`)});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload();
  assert(await page.locator('#motion').isDisabled());
  assert.equal(await page.locator('img[src$=".gif"]').count(),0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>!document.getElementById('motion').disabled);
  assert((await page.locator('img[src$=".gif"]').count())>0);
  assert.deepEqual(errors,[]);
  const result={status:'pass',emotes:20,nativeSizeImages:sizes.length,blockedSlots:7,downloadLinksExist:true,keyboard:true,choiceExport:true,reducedMotion:true,mobileWidths:[375,320],errors};
  fs.writeFileSync(root+'/browser-validation.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
