(function(){
  const APPS = {
    about:'Finder', contact:'Safari', skills:'Code', terminal:'Terminal',
    messages:'Messages', services:'Mail', projects:'Photos', education:'Credentials',
    settings:'System Settings', resume:'Preview', trash:'Trash'
  };
  const SPOT = [
    {q:'about finder jnnell who', id:'about', label:'About Me', kind:'Application'},
    {q:'safari contact email phone', id:'contact', label:'Safari — Contact', kind:'Application'},
    {q:'skills code legal research word excel bluebook pmlc digest lawphil', id:'skills', label:'Skills.js', kind:'Document'},
    {q:'terminal help shell', id:'terminal', label:'Terminal', kind:'Application'},
    {q:'messages email enquiry legal notes', id:'messages', label:'Messages', kind:'Application'},
    {q:'mail services offer', id:'services', label:'Mail — Services', kind:'Application'},
    {q:'photos projects gallery legal samples templates', id:'projects', label:'Photos — Projects', kind:'Application'},
    {q:'education credentials degree university makati simplex reference gersalia', id:'education', label:'Credentials', kind:'Document'},
    {q:'settings appearance dark light', id:'settings', label:'System Settings', kind:'Application'},
    {q:'resume pdf preview cv', id:'resume', label:'Resume.pdf', kind:'Document'},
    {q:'trash empty', id:'trash', label:'Trash', kind:'Application'}
  ];

  let zTop = 40, focused = null, termBooted = false;
  const openedOnce = {};
  const savedGeom = {};
  const termHistory = []; let histIdx = -1;

  function $(sel, root=document){ return root.querySelector(sel); }
  function $all(sel, root=document){ return [...root.querySelectorAll(sel)]; }

  /* Stars */
  function buildStars(){
    const layer = $('#stars');
    layer.innerHTML = '';
    const n = innerWidth < 780 ? 50 : 110;
    for(let i=0;i<n;i++){
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random()*2+1;
      s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*62}%;animation-delay:${Math.random()*4}s;animation-duration:${3+Math.random()*3}s`;
      layer.appendChild(s);
    }
  }
  buildStars();
  addEventListener('resize', buildStars);

  /* Clock */
  function tickClock(){
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'});
    const timeStr = now.toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'});
    $('#clock').textContent = dateStr + '  ' + timeStr;
    const sc = $('#sleep-clock');
    if(sc) sc.textContent = timeStr;
  }
  tickClock(); setInterval(tickClock, 15000);

  /* Calendar */
  function buildCalendar(){
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    $('#cal-month').textContent = now.toLocaleDateString('en-US', {month:'long'}).toUpperCase();
    const firstDay = new Date(y,m,1).getDay();
    const daysInMonth = new Date(y,m+1,0).getDate();
    let html = '<tr>', col = firstDay;
    for(let i=0;i<firstDay;i++) html += '<td></td>';
    for(let d=1; d<=daysInMonth; d++){
      if(col===7){ html += '</tr><tr>'; col=0; }
      html += d===now.getDate() ? `<td class="today"><span>${d}</span></td>` : `<td>${d}</td>`;
      col++;
    }
    html += '</tr>';
    $('#cal-body').innerHTML = html;
  }
  buildCalendar();

  /* Weather */
  async function loadWeather(){
    try{
      const lat=14.5547, lon=121.0244;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FManila&temperature_unit=fahrenheit`;
      const data = await (await fetch(url)).json();
      const t = Math.round(data.current.temperature_2m);
      const hum = data.current.relative_humidity_2m;
      const code = data.current.weather_code;
      const hi = Math.round(data.daily.temperature_2m_max[0]);
      const lo = Math.round(data.daily.temperature_2m_min[0]);
      const map = {0:['☀️','Clear'],1:['🌤','Mostly clear'],2:['⛅','Partly cloudy'],3:['☁️','Overcast'],45:['🌫','Foggy'],48:['🌫','Foggy'],51:['🌦','Drizzle'],61:['🌧','Rain'],63:['🌧','Rain'],65:['🌧','Heavy rain'],80:['🌦','Showers'],95:['⛈','Storm']};
      const [icon, desc] = map[code] || ['⛅','Partly cloudy'];
      $('#w-temp').textContent = t+'°';
      $('#w-icon').textContent = icon;
      $('#w-desc').textContent = desc;
      $('#w-extra').textContent = `H:${hi}°  L:${lo}°  ·  Humidity ${hum}%`;
    }catch(e){
      $('#w-temp').textContent = '—';
      $('#w-desc').textContent = 'Weather unavailable';
      $('#w-extra').textContent = '';
    }
  }
  loadWeather();



  /* ============================================================
     PROJECT GALLERY
     Each project gets a generated SVG "screenshot" mockup.
     To use a REAL screenshot instead: drop the file into
     assets/projects/ and set the `img` field. If the file loads,
     it replaces the mockup automatically; if it's missing, the
     mockup stays. Nothing breaks either way.
     ============================================================ */

  const SHOTS = { document: () => '<div class="sample-cover"><span>LEGAL WORKSPACE / DEMONSTRATION</span><b>Clear files.<br>Careful work.</b><small>J-Nnell Gualberto · Legal Virtual Assistant</small></div>' };

  const PROJECTS = [
    {
      "id": "case-index",
      "group": "flagship",
      "shot": "document",
      "badge": "demonstration",
      "title": "Case File Index",
      "short": "A fictional document index built around the résumé's Case File Organization & Management skill.",
      "meta": "Illustrative template · Not client work · Aligns with: Case File Organization & Management",
      "body": "A fictional document index with naming and review conventions drawn from the Case File Organization &amp; Management competency listed in my résumé. This sample was created for the portfolio; it is not a historical client engagement.",
      "problem": "Legal teams need information that is organized, traceable, and ready for review.",
      "approach": "A structured template separating source information, review status, and next actions — mapped to the document management and filing systems referenced in the résumé.",
      "outcome": "A downloadable demonstration you can inspect. No client results are claimed. <br><br><a class=\"cta-btn\" href=\"samples/case-file-index.md\" download>Download sample</a>",
      "tags": ["Case File Organization", "Document Management", "Filing Systems"]
    },
    {
      "id": "research-brief",
      "group": "flagship",
      "shot": "document",
      "badge": "demonstration",
      "title": "Research Brief Template",
      "short": "An issue-to-authority structure for attorney-reviewed research, built around Legal Research & Analysis.",
      "meta": "Illustrative template · Not client work · Aligns with: Legal Research & Analysis · Bluebook / PMLC citation",
      "body": "An issue-to-authority structure for attorney-reviewed research. This sample was created for the portfolio; it is not a historical client engagement. Reflects the Legal Research &amp; Analysis competency and the Legal Citation (Bluebook, PMLC) skill listed in my résumé.",
      "problem": "Legal teams need research that is organized, sourced, and ready for attorney review.",
      "approach": "A structured template separating the issue, the authorities, the citation format, and the reviewer's open questions — using Lawphil Project and Digest PH as the reference databases.",
      "outcome": "A downloadable demonstration you can inspect. No client results are claimed. <br><br><a class=\"cta-btn\" href=\"samples/research-brief-template.md\" download>Download sample</a>",
      "tags": ["Legal Research & Analysis", "Bluebook / PMLC", "Digest PH / Lawphil"]
    },
    {
      "id": "document-review",
      "group": "flagship",
      "shot": "document",
      "badge": "demonstration",
      "title": "Document Review Checklist",
      "short": "A checklist for formatting, version control, and approval handoff — built around Legal Document Preparation & Review.",
      "meta": "Illustrative template · Not client work · Aligns with: Legal Document Preparation & Review · Advanced Microsoft Word",
      "body": "A checklist for formatting, version control, and approval handoff. This sample was created for the portfolio; it is not a historical client engagement. Reflects the Legal Document Preparation &amp; Review competency and the Advanced Microsoft Word proficiency listed in my résumé.",
      "problem": "Legal teams need documents that are formatted, verified, and version-controlled before they leave the desk.",
      "approach": "A structured checklist covering formatting standards, track changes, template consistency, PDF conversion, and the approval handoff — matching the professional skills and computer proficiency in the résumé.",
      "outcome": "A downloadable demonstration you can inspect. No client results are claimed. <br><br><a class=\"cta-btn\" href=\"samples/document-review-checklist.md\" download>Download sample</a>",
      "tags": ["Legal Document Preparation", "Microsoft Word", "Confidentiality & Discretion"]
    }
  ];

  const GROUPS = ['flagship','self','earlier'];
  const ORDERED = GROUPS.flatMap(g => PROJECTS.filter(p => p.group === g));
  ORDERED.forEach((p, i)=>{ p.num = String(i + 1).padStart(2, '0'); });

  /* --- Render --- */
  /* `draft:true` on a project still renders an amber DRAFT badge and a
     warning banner in the detail view. No entry sets it at the moment. */
  /* Titles carry HTML entities; decode them for alt text and aria-labels. */
  function plain(html){
    const d = document.createElement('div');
    d.innerHTML = html;
    return d.textContent || '';
  }

  /* Covers total ~857KB. They are not fetched on page load - Photos starts
     closed, so a visitor who never opens it never pays for them. Each card
     parks a loader on the node and loadGalleryShots() runs them when the
     window first opens.
     Note: do NOT set loading="lazy" on a detached Image() - it has no layout
     box, so the browser never fetches it and onload never fires. */
  function loadGalleryShots(){
    $all('.gal-shot').forEach(host => {
      const run = host._loadShot;
      if(!run) return;
      host._loadShot = null;
      run();
    });
  }

  function addPills(host, p, big){
    if(big) return;
    if(p.badge){
      const b = document.createElement('span');
      b.className = 'shot-pill';
      b.textContent = p.badge;
      host.appendChild(b);
    }
    if(p.draft){
      const d = document.createElement('span');
      d.className = 'shot-pill is-draft';
      d.textContent = 'draft';
      host.appendChild(d);
    }
  }
  function mountShot(host, p, big){
    const uid = p.id + (big ? 'D' : 'T');
    host.innerHTML = (SHOTS[p.shot] || SHOTS.document)(uid);
    addPills(host, p, big);
    if(!p.img) return;
    const load = () => {
      const im = new Image();
      im.alt = plain(p.title) + ' — project cover';
      im.decoding = 'async';
      im.onload = ()=>{ host.innerHTML = ''; host.appendChild(im); addPills(host, p, big); };
      im.src = p.img;
    };
    // The detail view is user-triggered, so load it straight away.
    if(big) load();
    else host._loadShot = load;
  }
  function buildGallery(){
    GROUPS.forEach(group=>{
      const grid = $('#gal-' + group);
      grid.innerHTML = '';
      PROJECTS.filter(p=>p.group===group).forEach(p=>{
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'gal-card';
        card.dataset.proj = p.id;
        card.setAttribute('aria-label', 'Open project: ' + plain(p.title));
        const shot = document.createElement('span');
        shot.className = 'gal-shot';
        const meta = document.createElement('span');
        meta.className = 'gal-meta';
        meta.innerHTML = `<span class="gal-num">${p.num}</span><b>${p.title}</b><i>${p.short}</i>`;
        card.appendChild(shot);
        card.appendChild(meta);
        grid.appendChild(card);
        mountShot(shot, p, false);
        card.addEventListener('click', ()=> openProject(p.id));
      });
    });
  }
  function openProject(id, push){
    const i = ORDERED.findIndex(p=>p.id===id);
    if(i < 0) return;
    const p = ORDERED[i];
    mountShot($('#pd-shot'), p, true);
    $('#pd-title').innerHTML = p.title;
    $('#pd-sub').innerHTML = p.meta;
    $('#pd-draft').hidden = !p.draft;
    $('#pd-body').innerHTML = p.body;
    const CASE = [['problem','Problem'],['approach','Approach'],['outcome','Outcome']];
    $('#pd-case').innerHTML = CASE
      .filter(([k]) => p[k])
      .map(([k, lbl]) => `<div class="cs-block"><h5>${lbl}</h5><p>${p[k]}</p></div>`)
      .join('');
    $('#pd-tags').innerHTML = p.tags.map(t=>`<span class="tag">${t}</span>`).join('');
    $('#pd-prev').dataset.go = ORDERED[(i - 1 + ORDERED.length) % ORDERED.length].id;
    $('#pd-next').dataset.go = ORDERED[(i + 1) % ORDERED.length].id;
    $('#proj-gallery').hidden = true;
    $('#proj-detail').hidden = false;
    if(push !== false) syncURL(p.id);
    $('#win-projects .wbody').scrollTop = 0;
    $('.window#win-projects .wtitle').textContent = 'Photos — ' + p.num;
  }
  function backToGallery(push){
    $('#proj-detail').hidden = true;
    $('#proj-gallery').hidden = false;
    if(push !== false) syncURL(null);
    $('#win-projects .wbody').scrollTop = 0;
    $('.window#win-projects .wtitle').textContent = 'Photos — Selected Work';
  }
  /* Deep links: /?p=<id> opens one project, so a single piece of work can be
     shared on its own instead of "open the site and click around". */
  function syncURL(id){
    if(!history.pushState) return;
    const url = new URL(location.href);
    if(id) url.searchParams.set('p', id); else url.searchParams.delete('p');
    if(url.href !== location.href) history.pushState({ p: id || null }, '', url);
  }
  function routeFromURL(push){
    const id = new URLSearchParams(location.search).get('p');
    if(id && ORDERED.some(p => p.id === id)){ openWin('projects'); openProject(id, push); return true; }
    return false;
  }
  addEventListener('popstate', ()=>{
    const id = new URLSearchParams(location.search).get('p');
    if(id && ORDERED.some(p => p.id === id)) openProject(id, false);
    else if(!$('#proj-detail').hidden) backToGallery(false);
  });

  /* Real numbers, derived from the project data itself. */
  (function stats(){
    const tools = new Set();
    PROJECTS.forEach(p => (p.tags || []).forEach(t => tools.add(t)));
    const a = $('#st-projects'), b = $('#st-tools');
    if(a) a.textContent = PROJECTS.length;
    if(b) b.textContent = tools.size;
  })();

  buildGallery();
  $('#pd-back').addEventListener('click', ()=> backToGallery());
  $('#pd-prev').addEventListener('click', (e)=> openProject(e.currentTarget.dataset.go));
  $('#pd-next').addEventListener('click', (e)=> openProject(e.currentTarget.dataset.go));

  // Make every project findable in Spotlight
  PROJECTS.forEach(p=>{
    SPOT.push({
      q: (p.title + ' ' + p.tags.join(' ') + ' ' + p.short).toLowerCase(),
      id: 'projects', label: p.title, kind: 'Project', proj: p.id
    });
  });

  /* Menus */
  function hideMenus(){
    $all('.apple-btn.open, .menu-item.open, .status-btn.open').forEach(el=>el.classList.remove('open'));
    $('#cc').classList.remove('show');
  }
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.apple-btn, .menu-item, .status-btn');
    if(btn && btn.closest('#menubar')){
      const isCC = btn.id==='cc-toggle';
      const isSearch = btn.id==='search-toggle';
      const isClock = btn.id==='clock';
      if(isSearch){ hideMenus(); openSpotlight(); return; }
      if(isClock) return;
      if(isCC){
        const on = $('#cc').classList.toggle('show');
        $all('.apple-btn.open, .menu-item.open').forEach(el=>el.classList.remove('open'));
        btn.classList.toggle('open', on);
        return;
      }
      const was = btn.classList.contains('open');
      hideMenus();
      if(!was && btn.querySelector('.menu-panel')) btn.classList.add('open');
      return;
    }
    if(!e.target.closest('#cc') && !e.target.closest('.menu-panel')) hideMenus();
    if(!e.target.closest('.desk-icon')) $all('.desk-icon.selected').forEach(i=>i.classList.remove('selected'));
  });

  window.hideMenus = hideMenus;

  /* Window manager */
  function dockBtn(id){ return $(`.dock-btn[data-win="${id}"]`); }
  function refreshDock(){
    $all('.dock-btn[data-win]').forEach(btn=>{
      const id = btn.dataset.win;
      const win = $('#win-'+id);
      const running = win && (win.classList.contains('open') || win.classList.contains('minimized'));
      btn.classList.toggle('running', !!running);
    });
  }
  function focusWin(id){
    const el = $('#win-'+id);
    if(!el || !el.classList.contains('open')) return;
    $all('.window').forEach(w=>w.classList.remove('focused'));
    el.classList.add('focused');
    el.style.zIndex = ++zTop;
    focused = id;
    const name = el.dataset.app || APPS[id] || 'Finder';
    const label = $('#app-name');
    if(label) label.textContent = name;
  }
  window.openWin = function openWin(id){
    const el = $('#win-'+id);
    if(!el) return;
    hideMenus();
    const wasMin = el.classList.contains('minimized');
    el.classList.remove('minimized');
    el.classList.add('open');
    if(!openedOnce[id]){
      const offset = (Object.keys(openedOnce).length % 5) * 22;
      const w = el.offsetWidth || 640;
      el.style.left = Math.max(12, innerWidth/2 - w/2 + offset) + 'px';
      el.style.top = (46 + offset) + 'px';
      el.classList.add('anim');
      setTimeout(()=>el.classList.remove('anim'), 220);
      openedOnce[id] = true;
    }
    focusWin(id);
    refreshDock();
    const btn = dockBtn(id);
    if(btn && !wasMin){
      btn.classList.remove('bounce-on');
      void btn.offsetWidth;
      btn.classList.add('bounce-on');
      setTimeout(()=>btn.classList.remove('bounce-on'), 800);
    }
    if(id==='terminal'){
      if(!termBooted) bootTerminal();
      setTimeout(()=>$('#term-input').focus(), 50);
    }
    if(id==='messages') setTimeout(()=>{ const t=$('#msg-input'); if(t && $('#msg-form').style.display!=='none') t.focus(); }, 50);
    if(id==='projects') loadGalleryShots();
    if(id==='resume') showToast('Opened Resume.pdf');
  };
  window.closeWin = function closeWin(id){
    const el = $('#win-'+id);
    if(!el) return;
    el.classList.remove('open','minimized','focused','zoomed');
    if(focused===id) focused=null;
    refreshDock();
  };
  window.minimizeWin = function minimizeWin(id){
    const el = $('#win-'+id);
    if(!el) return;
    el.classList.add('minimized');
    el.classList.remove('focused');
    if(focused===id) focused=null;
    refreshDock();
  };
  window.zoomWin = function zoomWin(id){
    const el = $('#win-'+id);
    if(!el) return;
    if(el.classList.contains('zoomed')){
      el.classList.remove('zoomed');
      const g = savedGeom[id];
      if(g){ el.style.left=g.left; el.style.top=g.top; el.style.width=g.width; el.style.height=g.height; }
    } else {
      savedGeom[id] = {left:el.style.left, top:el.style.top, width:el.style.width||el.offsetWidth+'px', height:el.style.height||el.offsetHeight+'px'};
      el.classList.add('zoomed');
      el.style.left='8px';
      el.style.top='32px';
      el.style.width = (innerWidth-16)+'px';
      el.style.height = (innerHeight-32-80)+'px';
    }
    focusWin(id);
  };
  window.closeFocused = function(){ if(focused) closeWin(focused); };
  window.minimizeFocused = function(){ if(focused) minimizeWin(focused); };
  window.zoomFocused = function(){ if(focused) zoomWin(focused); };

  document.addEventListener('click', (e)=>{
    const open = e.target.closest('[data-open]');
    if(open){ hideMenus(); openWin(open.dataset.open); }
  });

  $all('.window').forEach(win=>{
    win.addEventListener('mousedown', ()=>{
      const id = win.id.replace('win-','');
      if(win.classList.contains('open')) focusWin(id);
    });
  });

  document.addEventListener('click', (e)=>{
    const tl = e.target.closest('.tl');
    if(!tl) return;
    e.stopPropagation();
    const id = tl.closest('.window').id.replace('win-','');
    if(tl.dataset.act==='close') closeWin(id);
    if(tl.dataset.act==='min') minimizeWin(id);
    if(tl.dataset.act==='zoom') zoomWin(id);
  });

  $all('.titlebar').forEach(bar=>{
    const id = bar.dataset.win;
    bar.addEventListener('dblclick', (e)=>{
      if(e.target.closest('.traffic')) return;
      zoomWin(id);
    });
    function startDrag(clientX, clientY){
      const win = $('#win-'+id);
      if(win.classList.contains('zoomed')) return;
      focusWin(id);
      const rect = win.getBoundingClientRect();
      const sl = rect.left, st = rect.top;
      function move(x,y){
        win.style.left = (sl + x - clientX)+'px';
        win.style.top = (st + y - clientY)+'px';
      }
      function onMouse(ev){ move(ev.clientX, ev.clientY); }
      function onTouch(ev){ const t=ev.touches[0]; move(t.clientX, t.clientY); }
      function up(){
        document.removeEventListener('mousemove', onMouse);
        document.removeEventListener('mouseup', up);
        document.removeEventListener('touchmove', onTouch);
        document.removeEventListener('touchend', up);
      }
      document.addEventListener('mousemove', onMouse);
      document.addEventListener('mouseup', up);
      document.addEventListener('touchmove', onTouch, {passive:true});
      document.addEventListener('touchend', up);
    }
    bar.addEventListener('mousedown', (e)=>{
      if(e.target.closest('.traffic') || e.button!==0) return;
      startDrag(e.clientX, e.clientY);
    });
    bar.addEventListener('touchstart', (e)=>{
      if(e.target.closest('.traffic')) return;
      const t=e.touches[0]; startDrag(t.clientX, t.clientY);
    }, {passive:true});
  });

  $all('.resize').forEach(h=>{
    h.addEventListener('mousedown', (e)=>{
      e.preventDefault();
      const id = h.dataset.win;
      const win = $('#win-'+id);
      const startX=e.clientX, startY=e.clientY;
      const startW=win.offsetWidth, startH=win.offsetHeight;
      function move(ev){
        win.style.width = Math.max(420, startW + ev.clientX - startX)+'px';
        win.style.height = Math.max(260, startH + ev.clientY - startY)+'px';
      }
      function up(){ document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); }
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
  });

  /* Dock */
  $all('.dock-btn[data-win]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.win;
      const win = $('#win-'+id);
      if(win.classList.contains('minimized')) openWin(id);
      else if(win.classList.contains('open') && win.classList.contains('focused')) minimizeWin(id);
      else openWin(id);
    });
  });
  const dock = $('#dock');
  dock.addEventListener('mousemove', (e)=>{
    if(document.body.classList.contains('reduce-motion')) return;
    $all('.dock-btn .glyph').forEach(g=>{
      const r = g.getBoundingClientRect();
      const dist = Math.abs(e.clientX - (r.left + r.width/2));
      const scale = 1 + Math.max(0, 1 - dist/90) * 0.55;
      g.style.setProperty('--scale', scale);
    });
  });
  dock.addEventListener('mouseleave', ()=>{
    $all('.dock-btn .glyph').forEach(g=> g.style.setProperty('--scale', 1));
  });

  /* Desktop icons */
  $all('.desk-icon').forEach(icon=>{
    icon.addEventListener('click', (e)=>{
      e.stopPropagation();
      $all('.desk-icon').forEach(i=>i.classList.remove('selected'));
      icon.classList.add('selected');
      openWin(icon.dataset.win);
    });
  });

  /* Toast */
  window.showToast = function(msg){
    $('#toast-msg').textContent = msg;
    $('#toast').classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=> $('#toast').classList.remove('show'), 3000);
  };

  /* Spotlight */
  window.openSpotlight = function(){
    hideMenus();
    $('#spotlight').classList.add('show');
    $('#spot-input').value='';
    renderSpot('');
    setTimeout(()=>$('#spot-input').focus(), 20);
  };
  function closeSpotlight(){ $('#spotlight').classList.remove('show'); }
  function renderSpot(q){
    const s = q.trim().toLowerCase();
    const items = SPOT.filter(x => !s || x.q.includes(s) || x.label.toLowerCase().includes(s));
    $('#spot-results').innerHTML = items.slice(0,7).map((x,i)=>
      `<button class="spot-row${i===0?' active':''}" data-open="${x.id}"${x.proj?` data-proj="${x.proj}"`:''}>${x.label}<small>${x.kind}</small></button>`
    ).join('') || `<div class="spot-row">No results</div>`;
  }
  function spotLaunch(row){
    if(!row) return;
    closeSpotlight();
    openWin(row.dataset.open);
    if(row.dataset.proj) openProject(row.dataset.proj);
  }
  $('#spot-input').addEventListener('input', ()=> renderSpot($('#spot-input').value));
  $('#spot-input').addEventListener('keydown', (e)=>{
    const rows = $all('.spot-row[data-open]');
    let i = rows.findIndex(r=>r.classList.contains('active'));
    if(e.key==='ArrowDown'){ e.preventDefault(); i=Math.min(rows.length-1, i+1); rows.forEach(r=>r.classList.remove('active')); rows[i]?.classList.add('active'); }
    if(e.key==='ArrowUp'){ e.preventDefault(); i=Math.max(0, i-1); rows.forEach(r=>r.classList.remove('active')); rows[i]?.classList.add('active'); }
    if(e.key==='Enter'){ e.preventDefault(); spotLaunch(rows.find(r=>r.classList.contains('active'))); }
    if(e.key==='Escape') closeSpotlight();
  });
  $('#spotlight').addEventListener('click', (e)=>{ if(e.target.id==='spotlight') closeSpotlight(); });
  $('#spot-results').addEventListener('click', (e)=>{
    const row = e.target.closest('[data-open]');
    if(row){ e.stopPropagation(); spotLaunch(row); }
  });

  /* Theme / settings */
  const store = {
    get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };
  function applyTheme(mode){
    const dark = matchMedia('(prefers-color-scheme: dark)').matches;
    const t = mode==='auto' ? (dark?'dark':'light') : mode;
    document.documentElement.dataset.theme = t;
    store.set('jnnell-theme', mode);
    $all('#theme-seg button').forEach(b=> b.classList.toggle('active', b.dataset.theme===mode));
  }
  applyTheme(store.get('jnnell-theme') || 'dark');
  const savedAccent = store.get('jnnell-accent');
  if(savedAccent) document.documentElement.style.setProperty('--accent', savedAccent);
  $('#theme-seg').addEventListener('click', (e)=>{
    const b = e.target.closest('[data-theme]'); if(b) applyTheme(b.dataset.theme);
  });
  $all('.swatch-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.documentElement.style.setProperty('--accent', btn.dataset.accent);
      store.set('jnnell-accent', btn.dataset.accent);
      $all('.swatch-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  $('#toggle-stars').addEventListener('change', (e)=>{ $('#stars').style.display = e.target.checked ? 'block' : 'none'; });
  $('#toggle-motion').addEventListener('change', (e)=>{ document.body.classList.toggle('reduce-motion', e.target.checked); });

  /* Control center */
  $all('#cc-wifi, #cc-bt, #cc-air, #cc-focus').forEach(t=>{
    t.addEventListener('click', ()=> t.classList.toggle('on'));
  });
  $('#cc-bright').addEventListener('input', (e)=>{
    $('#wallpaper').style.filter = `brightness(${e.target.value/100})`;
  });

  /* Sleep / shutdown */
  window.goSleep = function(){ hideMenus(); $('#sleep').classList.add('show'); };
  $('#sleep').addEventListener('click', ()=> $('#sleep').classList.remove('show'));
  window.showShutdown = function(){ hideMenus(); $('#shutdown').classList.add('show'); $('#shutdown-dialog').style.display='block'; $('#off-screen').style.display='none'; };
  window.hideOverlay = function(id){ $('#'+id).classList.remove('show'); };
  window.doShutdown = function(){ $('#shutdown-dialog').style.display='none'; $('#off-screen').style.display='block'; };
  $('#shutdown').addEventListener('click', (e)=>{
    if($('#off-screen').style.display==='block' && !e.target.closest('.dialog')){
      $('#shutdown').classList.remove('show');
    }
  });
  window.toggleWidgets = function(){
    const w = $('#widgets');
    w.style.display = w.style.display==='none' ? 'flex' : 'none';
  };

  function addMessage(side,text){const row=document.createElement('div');row.className='imsg-row '+side;const bubble=document.createElement('div');bubble.className='imsg-bubble';bubble.textContent=text;row.appendChild(bubble);$('#msg-scroll').appendChild(row);$('#msg-scroll').scrollTop=$('#msg-scroll').scrollHeight;}
  function renderThread(thread='jnnell'){$('#msg-scroll').innerHTML='';$('#msg-form').style.display=thread==='jnnell'?'flex':'none';$('#imsg-readonly').style.display=thread==='jnnell'?'none':'block';$('#imsg-name').textContent=thread==='jnnell'?'J-Nnell Gualberto':'Legal Support Notes';$('#imsg-face').textContent=thread==='jnnell'?'JG':'LS';$('#imsg-sub').textContent=thread==='jnnell'?'Email draft':'Workflow notes';$('#imsg-status').textContent='';if(thread==='jnnell'){addMessage('them','Hi! Tell me about your legal support needs. This window prepares an email draft; messages are not delivered here.');addMessage('them','Write your enquiry below, then open it in your email app to send.');}else{['Research: establish the question and jurisdiction, keep a source log, and flag issues for attorney review.','Documents: verify names and dates, preserve tracked changes, and obtain approval before sending.','Files: use consistent naming and index drafts separately from approved versions.'].forEach(t=>addMessage('them',t));}}
  $all('.imsg-conv').forEach(btn=>btn.addEventListener('click',()=>{$all('.imsg-conv').forEach(b=>b.classList.toggle('active',b===btn));renderThread(btn.dataset.thread);}));
  $('#msg-input').addEventListener('input',()=>{$('#imsg-send').disabled=!$('#msg-input').value.trim();$('#imsg-send').classList.toggle('on',!!$('#msg-input').value.trim());});
  $('#msg-form').addEventListener('submit',e=>{e.preventDefault();const text=$('#msg-input').value.trim();if(!text)return;addMessage('me',text);const link=document.createElement('a');link.className='cta-btn';link.textContent='Open email draft';link.href='mailto:jnnellg@gmail.com?subject='+encodeURIComponent('Legal VA enquiry')+'&body='+encodeURIComponent(text);$('#msg-scroll').appendChild(link);addMessage('them','Your draft is ready. Click Open email draft and send it from your email app. Nothing has been sent yet.');$('#imsg-status').textContent='Draft only — not sent';$('#msg-input').value='';$('#imsg-send').disabled=true;});
  renderThread();
  $('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('jnnellg@gmail.com');showToast('Email copied');}catch{showToast('Select and copy jnnellg@gmail.com');}});
  /* Terminal */
  const termScreen = $('#term-screen');
  const termInput = $('#term-input');
  function termPrint(html){
    const d=document.createElement('div'); d.className='line out'; d.innerHTML=html;
    termScreen.appendChild(d); termScreen.scrollTop=termScreen.scrollHeight;
  }
  function termPrompt(cmd){
    const d=document.createElement('div'); d.className='line';
    d.innerHTML = `<span class="prompt">jnnell@portfolio ~ %</span> ${cmd.replace(/</g,'&lt;')}`;
    termScreen.appendChild(d);
  }
  function bootTerminal(){
    termBooted = true;
    termPrint("GualbertoOS Darwin Kernel · type <b>help</b>");
  }
  const TERM_CMDS = {
    help: () => `Available commands:<br>  whoami · about · skills · projects · experience · services · education · contact · resume · clear · open · sudo make-coffee`,
    whoami: () => "J-Nnell Dustin A. Gualberto — Legal Virtual Assistant · Makati City, Philippines.",
    about: () => "Recent graduate with a BA in Political Science, major in Paralegal Studies. Strong research, analytical, and writing skills, with hands-on experience preparing legal documents. Highly detail-oriented; manages complex information while maintaining strict confidentiality. Open Finder for the full profile.",
    skills: () => "Legal research & analysis · Legal document preparation & review · Case file organization & management · Written & verbal communication · Confidentiality & discretion · Attention to detail · Time management & deadline adherence · Negotiable instruments. Tools: Advanced MS Word, Excel, PowerPoint, Google Workspace, Digest PH, Lawphil Project, Bluebook & PMLC citation, case management software. Typing: 70 WPM.",
    projects: () => ORDERED.map(p=>`  ${p.num}  ${p.title.replace(/&mdash;/g,'—')}${p.draft?'  (draft)':''}`).join('<br>') + `<br><br>Run <b>open photos</b> to browse them with screenshots.`,
    experience: () => "Legal Assistant Internship and Paralegal Internship — SIMPLEX PHILIPPINES MANAGEMENT INC. Reference: Ms. Lyka M. Gersalia, Legal Secretary.",
    services: () => "Legal research · Document preparation · Case file organization · Legal administrative support.",
    education: () => "BA Political Science — Major in Paralegal Studies, University of Makati. Senior High at University of Makati; Junior High at Makati High School; Grade School at Makati Elementary School.",
    contact: () => "Email: jnnellg@gmail.com<br>Phone: 09458812036<br>3163 A. Mabini Street, Poblacion, Makati City.",
    resume: () => `Opening Resume.pdf…`,
    open: () => `Usage: open finder|safari|photos|mail|messages|settings`,
    ls: () => `About.rtf  Resume.pdf  Projects/  Skills.js  Messages  Terminal.app`,
    pwd: () => `/Users/jnnell`,
    date: () => new Date().toString(),
    'sudo make-coffee': () => `Nice try — automating that one is still on the roadmap.`
  };
  termInput.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowUp'){
      e.preventDefault();
      if(!termHistory.length) return;
      histIdx = histIdx<0 ? termHistory.length-1 : Math.max(0, histIdx-1);
      termInput.value = termHistory[histIdx];
      return;
    }
    if(e.key==='ArrowDown'){
      e.preventDefault();
      if(histIdx<0) return;
      histIdx++;
      termInput.value = histIdx>=termHistory.length ? (histIdx=-1,'') : termHistory[histIdx];
      return;
    }
    if(e.key!=='Enter') return;
    const raw = termInput.value.trim();
    if(raw==='') return;
    termPrompt(raw); termInput.value=''; termHistory.push(raw); histIdx=-1;
    const key = raw.toLowerCase();
    if(key==='clear'){ termScreen.innerHTML=''; return; }
    if(key==='resume' || key==='open resume'){ termPrint(TERM_CMDS.resume()); openWin('resume'); return; }
    if(key.startsWith('open ')){
      const map={finder:'about',safari:'contact',photos:'projects',projects:'projects',mail:'services',messages:'messages',settings:'settings',terminal:'terminal',preview:'resume'};
      const t=map[key.slice(5).trim()];
      if(t){ termPrint('opening '+key.slice(5)+'…'); openWin(t); } else termPrint(TERM_CMDS.open());
      return;
    }
    if(TERM_CMDS[key]) termPrint(TERM_CMDS[key]());
    else termPrint(`zsh: command not found: ${raw.replace(/</g,'&lt;')} — type <b>help</b>`);
  });

  /* Keyboard */
  document.addEventListener('keydown', (e)=>{
    const meta = e.metaKey || e.ctrlKey;
    if(meta && e.key.toLowerCase()===' '){ e.preventDefault(); $('#spotlight').classList.contains('show') ? closeSpotlight() : openSpotlight(); }
    if(meta && e.key.toLowerCase()==='k'){ e.preventDefault(); openSpotlight(); }
    if(meta && e.key.toLowerCase()==='w'){ e.preventDefault(); closeFocused(); }
    if(meta && e.key.toLowerCase()==='m'){ e.preventDefault(); minimizeFocused(); }
    if(meta && e.key.toLowerCase()==='o'){ e.preventDefault(); openWin('resume'); }
    if(e.key==='Escape'){
      if(!$('#proj-detail').hidden && $('#win-projects').classList.contains('focused')) backToGallery();
      closeSpotlight(); hideMenus();
    }
  });

  /* Hide the resume Download button if Resume.pdf isn't deployed, so it can
     never 404. Skipped on file:// where HEAD requests aren't permitted. */
  (function checkResume(){
    const link = $('#resume-dl');
    if(!link || !/^https?:$/.test(location.protocol)) return;
    fetch(link.getAttribute('href'), { method:'HEAD' })
      .then(r => { if(!r.ok) link.remove(); })
      .catch(() => link.remove());
  })();

  /* Windows are dialog-like; name them for screen readers. */
  $all('.window').forEach(w => {
    w.setAttribute('role', 'dialog');
    const t = w.querySelector('.wtitle');
    if(t) w.setAttribute('aria-label', t.textContent.trim());
  });
  const st = $('#imsg-status');
  if(st){ st.setAttribute('role', 'status'); st.setAttribute('aria-live', 'polite'); }

  /* Open something on load on every screen size. Phones previously landed on
     a bare desktop with no indication that the icons were tappable. */
  if(!routeFromURL(false)) setTimeout(()=> openWin('about'), 380);
})();