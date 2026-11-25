(() => {
  const C = window.CONTEUDO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  // Igual ao portfólio Corleone: o PC de apresentação tem animações do Windows desligadas,
  // então o movimento fica sempre ligado e ?estatico=1 força a versão parada.
  const reduzido = params.has('estatico');
  if (reduzido) document.documentElement.classList.add('estatico');
  const celular = () => innerWidth <= 860;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const suave = (t) => t * t * (3 - 2 * t);
  // pausa em cada etapa: o valor 0..n vira uma escada suave
  const comPausas = (v, pausa = 0.2) => {
    const i = Math.floor(v), f = v - i;
    const t = clamp((f - pausa) / (1 - 2 * pausa), 0, 1);
    return i + suave(t);
  };
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  const carregada = (img) => (img.complete ? Promise.resolve() : new Promise((r) => { img.onload = img.onerror = r; }));

  gsap.registerPlugin(ScrollTrigger);
  // sempre começa pela splash, no topo
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ---------- conteúdo ---------- */
  $$('[data-link]').forEach((a) => { const u = C.links[a.dataset.link]; if (u) a.href = u; });

  const trilho = $('.jornada__trilho');
  const abas = $('.jornada__abas');
  C.jornada.forEach((j) => {
    const s = document.createElement('article');
    s.className = 'slide' + (j.fotos ? ' slide--fotos' : '');
    s.innerHTML = `
      <div class="slide__fundo" aria-hidden="true"><span>${j.fundo[0]}</span><span>${j.fundo[1]}</span></div>
      <div class="slide__miolo">
        <p class="slide__meta"><em>${j.periodo}</em><i></i><span>${j.area}</span><span class="pilula pilula--escura">${j.selo}</span></p>
        <h3 class="slide__titulo eco">${j.titulo[0]}<br>${j.titulo[1]}</h3>
        <div class="slide__linha">
          <p class="slide__texto">${j.texto}</p>
          ${j.logo ? `<img class="slide__logo" src="${j.logo.src}" alt="${j.logo.alt}" decoding="async">` : ''}
        </div>
        <div class="slide__marcos">${j.marcos.map(([t, p]) => `<div><small>${t}</small><p>${p}</p></div>`).join('')}</div>
      </div>
      ${j.fotos ? `<div class="slide__fotos">${j.fotos.map((f, k) => `
        <figure class="slide__foto slide__foto--${k}"><img src="${f.src}" alt="${f.alt}" decoding="async"><figcaption>${f.legenda}</figcaption></figure>`).join('')}
      </div>` : ''}`;
    trilho.appendChild(s);
    const a = document.createElement('span'); a.textContent = j.aba; abas.appendChild(a);
  });

  const tambor = $('.tambor');
  const lista = $('.trabalhos__lista');
  C.trabalhos.forEach((t) => {
    const f = document.createElement('figure');
    f.className = 'tcard';
    f.innerHTML = `
      <img src="${t.img}" alt="" loading="lazy" decoding="async">
      <figcaption>
        <small>${t.nome}</small>
        <h4>${t.titulo[0]} <em>${t.titulo[1]}</em></h4>
        <ul>${t.itens.map((i) => `<li>${i}</li>`).join('')}</ul>
      </figcaption>`;
    tambor.appendChild(f);
    const p = document.createElement('p'); p.textContent = t.nome; lista.appendChild(p);
  });

  const acordeao = $('.acordeao');
  C.servicos.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = 'serv' + (i === C.servicos.length - 1 ? ' aberto' : '');
    li.innerHTML = `
      <button class="serv__cab" aria-expanded="${i === C.servicos.length - 1}">
        <span class="serv__num">${i + 1}</span><span class="serv__nome">${s.nome}</span><span></span>
      </button>
      <div class="serv__corpo"><div><div class="serv__grade">
        <div class="serv__info">
          ${s.inclui ? `<span class="serv__inclui">TUDO DO ${s.inclui} +</span>` : '<span class="serv__inclui">O COMEÇO</span>'}
          <h3 class="serv__promessa">${s.promessa}</h3>
          <p class="serv__texto">${s.texto}</p>
          <ul class="serv__itens">${s.itens.map((t) => `<li><i aria-hidden="true"></i>${t}</li>`).join('')}</ul>
          <small>ENTREGÁVEIS: ${s.entregaveis}</small>
        </div>
        <div class="serv__visual" aria-hidden="true">
          <div class="serv__janela"><i></i><i></i><i></i></div>
          <img src="${s.visual}" alt="" loading="lazy" decoding="async">
          ${s.selos.map((t, k) => `<span class="serv__selo serv__selo--${k}">${t}</span>`).join('')}
        </div>
      </div></div></div>`;
    acordeao.appendChild(li);
  });

  /* ---------- rolagem suave ---------- */
  let lenis = null;
  if (!reduzido) {
    lenis = new Lenis({ lerp: 0.085 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const alvo = $(a.getAttribute('href'));
    if (!alvo) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(alvo, { duration: 1.6 }) : alvo.scrollIntoView();
  }));

  /* ---------- eco: cópias do texto que ficam para trás no movimento ---------- */
  const ecos = [];
  const ATRASOS = [3, 6, 9];
  $$('.eco').forEach((el) => {
    const html = el.innerHTML;
    el.innerHTML = `<span class="eco__txt">${html}</span>` +
      ATRASOS.map(() => `<span class="eco__f" aria-hidden="true">${html}</span>`).join('');
    ecos.push({ el, f: $$('.eco__f', el), hist: [], vis: false });
  });
  if (!reduzido) {
    const io = new IntersectionObserver((es) => es.forEach((x) => {
      const e = ecos.find((e) => e.el === x.target);
      e.vis = x.isIntersecting;
      if (!e.vis) { e.hist.length = 0; e.f.forEach((g) => { g.style.opacity = 0; }); }
    }), { rootMargin: '20% 0px' });
    ecos.forEach((e) => io.observe(e.el));
    gsap.ticker.add(() => {
      for (const e of ecos) {
        if (!e.vis) continue;
        const r = e.el.getBoundingClientRect();
        e.hist.unshift(r.left, r.top);
        if (e.hist.length > 24) e.hist.length = 24;
        e.f.forEach((g, k) => {
          const i = Math.min(e.hist.length / 2 - 1, ATRASOS[k]) * 2;
          let dx = (e.hist[i] - r.left) * 0.7, dy = (e.hist[i + 1] - r.top) * 0.7;
          let d = Math.hypot(dx, dy);
          const max = 90 * (k + 1);              // saltos grandes (âncoras) não espalham o texto pela tela
          if (d > max) { dx *= max / d; dy *= max / d; d = max; }
          const op = d < 1.5 ? 0 : Math.min(1, d / 50) * (0.5 - k * 0.14);
          g.style.opacity = op.toFixed(3);
          if (op) g.style.transform = `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0)`;
        });
      }
    });
  }

  /* ---------- splash e entrada ---------- */
  const retrato = $('.hero__retrato');
  function entradaHero(atraso = 0) {
    const tl = gsap.timeline({ delay: atraso });
    tl.from('.hero__l1', { y: 140, opacity: 0, duration: 1.3, ease: 'expo.out' })
      .from('.hero__l2', { y: 160, opacity: 0, duration: 1.3, ease: 'expo.out' }, 0.08)
      .from(retrato, { yPercent: 18, opacity: 0, duration: 1.5, ease: 'expo.out' }, 0.15)
      .from('.nav', { y: -24, opacity: 0, duration: 1, ease: 'expo.out' }, 0.3)
      .from(['.hero__esq', '.hero__dir'], { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.4);
    return tl;
  }

  async function abertura() {
    const splash = $('#splash');
    if (reduzido || params.has('direto')) { splash.remove(); entradaHero(0); return; }
    lenis && lenis.stop();
    await Promise.race([Promise.all([document.fonts.ready, carregada(retrato)]), espera(4000)]);
    const nome = $('.splash__nome'), ponto = $('.splash__ponto');
    const rastro = $('.splash__rastro'), cometa = $('.splash__cometa');
    const r = nome.getBoundingClientRect(), p = ponto.getBoundingClientRect();
    const cx = (r.left + p.right) / 2, cy = r.top + r.height / 2;
    const px = p.left + p.width / 2, py = p.bottom - p.height * 0.22;
    const R = Math.max(r.width * 0.62, 150);
    const a0 = Math.atan2(py - cy, px - cx), d0 = Math.hypot(px - cx, py - cy);
    const pts = [];
    const N = 260;
    for (let i = 0; i <= N; i++) {
      const s = i / N;
      const phi = a0 - s * Math.PI * 2;                       // sobe pela direita e dá a volta
      const rampa = suave(clamp(s / 0.14, 0, 1)) * suave(clamp((1 - s) / 0.14, 0, 1));
      const onda = R * (1 + 0.075 * Math.sin(phi * 8 + 0.6) + 0.03 * Math.sin(phi * 3));
      const raio = lerp(d0, onda, rampa);
      pts.push(`${(cx + Math.cos(phi) * raio).toFixed(1)} ${(cy + Math.sin(phi) * raio * 0.92).toFixed(1)}`);
    }
    rastro.setAttribute('d', 'M' + pts.join('L'));
    const L = rastro.getTotalLength();
    const st = { cabeca: 0, cauda: 0 };
    const pintar = () => {
      const c = st.cabeca * L, t = st.cauda * L;
      rastro.style.strokeDasharray = `${Math.max(0, c - t)} ${L * 2}`;
      rastro.style.strokeDashoffset = -t;
      const q = rastro.getPointAtLength(c);
      cometa.style.transform = `translate(${q.x}px, ${q.y}px)`;
    };
    pintar();
    await espera(350);
    const tl = gsap.timeline({ onUpdate: pintar });
    tl.set(ponto, { opacity: 0 })
      .set(cometa, { opacity: 1 })
      .to(st, { cabeca: 1, duration: 1.25, ease: 'power1.inOut' })
      .to(st, { cauda: 1, duration: 1.0, ease: 'power2.in' }, 0.3)
      .set(cometa, { opacity: 0 }, 1.28)
      .set(ponto, { opacity: 1 }, 1.25)
      .fromTo(ponto, { scale: 1.8 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' }, 1.25);
    await tl.then();
    await espera(380);
    gsap.to(splash, { opacity: 0, duration: 0.7, ease: 'power2.inOut', onComplete: () => splash.remove() });
    entradaHero(0.15);
    await espera(900);
    lenis && lenis.start();
  }

  /* ---------- 1. abertura: a rolagem leva título e retrato em velocidades diferentes ---------- */
  const hero = $('.hero');
  gsap.to('.hero__titulo', { y: () => -innerHeight * 0.32, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  gsap.to(retrato, { y: () => -innerHeight * 0.1, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });

  /* ---------- 2. sobre: o cartão sobe, abre até a tela inteira e "SOBRE MIM" se divide ---------- */
  const sobre = $('.sobre');
  const cartao = $('.sobre__cartao');
  // abertura do cartão: 0 = cartão pequeno no centro, 1 = tela inteira
  const abre = { k: 0 };
  const recortar = () => {
    const W = innerWidth, H = innerHeight;
    const w = celular() ? W * 0.6 : clamp(W * 0.22, 230, 400);
    const h = Math.min(w * 1.32, H * 0.62);
    const k = abre.k;
    const t = ((H - h) / 2) * (1 - k), l = ((W - w) / 2) * (1 - k), r = 18 * (1 - k);
    cartao.style.clipPath = `inset(${t.toFixed(1)}px ${l.toFixed(1)}px ${t.toFixed(1)}px ${l.toFixed(1)}px round ${r.toFixed(1)}px)`;
  };
  recortar();
  addEventListener('resize', recortar);
  gsap.set(['.sobre__frase', '.sobre__rodape'], { opacity: 0, y: 40 });
  // entrando: a arte sobe com a página, o cartão e o título sobem mais devagar
  gsap.fromTo(cartao, { y: () => innerHeight * 0.45 }, { y: 0, ease: 'none',
    scrollTrigger: { trigger: sobre, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true } });
  gsap.fromTo('.sobre__titulo', { y: () => innerHeight * 0.3 }, { y: 0, ease: 'none',
    scrollTrigger: { trigger: sobre, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true } });
  gsap.fromTo('.sobre__arte', { yPercent: -12, scale: 1.15 }, { yPercent: 0, scale: 1.05, ease: 'none',
    scrollTrigger: { trigger: sobre, start: 'top bottom', end: 'top top', scrub: true } });
  const tlSobre = gsap.timeline({
    scrollTrigger: { trigger: sobre, start: 'top top', end: () => '+=' + innerHeight * 2.6, pin: true, scrub: 0.6, invalidateOnRefresh: true },
  });
  tlSobre
    .to({}, { duration: 0.25 })
    .to(abre, { k: 1, duration: 1, ease: 'power2.inOut', onUpdate: recortar }, 0.25)
    // a figura fica em ~65% da largura: começa deslocada para caber no cartão e volta ao lugar
    .fromTo('.sobre__luz', { scale: 1.45, x: () => -(celular() ? 0.12 : 0.15) * 1.45 * innerWidth, y: () => -0.05 * 1.45 * innerHeight },
      { scale: 1, x: 0, y: 0, duration: 1, ease: 'power2.inOut' }, 0.25)
    .to('.sobre__arte', { scale: 1.2, duration: 1, ease: 'power2.in' }, 0.25)
    .to('.sobre__a', { x: () => -innerWidth * (celular() ? 1.3 : 0.85), duration: 0.9, ease: 'power2.in' }, 0.3)
    .to('.sobre__b', { x: () => innerWidth * (celular() ? 1.3 : 0.85), duration: 0.9, ease: 'power2.in' }, 0.3)
    .to('.sobre__frase', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 1.15)
    .to('.sobre__rodape', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 1.3)
    .to({}, { duration: 0.6 });

  /* ---------- 3. jornada: slides que passam na horizontal, com pausa em cada um ---------- */
  const jornada = $('.jornada');
  const slides = $$('.slide');
  const fundos = slides.map((s) => $('.slide__fundo', s));
  const fotosJ = slides.map((s) => $('.slide__fotos', s));
  // as fotos chegam um pouco atrasadas em relação ao texto (parallax leve)
  gsap.ticker.add(() => fotosJ.forEach((f, j) => { if (f) f.style.translate = `${((jPos - j) * innerWidth * 0.22).toFixed(1)}px 0`; }));
  const rotulo = $('.jornada__rotulo');
  const abasEl = $$('span', abas);
  const rotulos = ['ORIGEM & FUNDAMENTOS', ...C.jornada.map((j) => j.rotulo)];
  let jAlvo = 0, jPos = 0, jIdx = -1;
  ScrollTrigger.create({
    trigger: jornada, start: 'top top', end: () => '+=' + innerHeight * (slides.length - 1) * 1.15,
    pin: '.jornada__palco', onUpdate: (s) => { jAlvo = s.progress * (slides.length - 1); },
  });
  gsap.ticker.add((_, dt) => {
    const alvo = comPausas(jAlvo, 0.22);
    jPos += (alvo - jPos) * (1 - Math.exp(-dt / 90));
    if (Math.abs(alvo - jPos) < 0.0005) jPos = alvo;
    const W = innerWidth;
    trilho.style.transform = `translate3d(${(-jPos * W).toFixed(1)}px,0,0)`;
    // o texto de fundo anda mais devagar e some ao se afastar, para não encavalar com o do vizinho
    fundos.forEach((f, j) => {
      const d = jPos - j;
      f.style.transform = `translate3d(${(d * W * 0.35).toFixed(1)}px,0,0)`;
      f.style.opacity = clamp(1 - Math.abs(d) * 1.8, 0, 1).toFixed(3);
    });
    const idx = Math.round(jPos);
    if (idx !== jIdx) {
      jIdx = idx;
      rotulo.textContent = rotulos[idx];
      abasEl.forEach((a, i) => a.classList.toggle('ativo', i === idx - 1 || (idx === 0 && i === 0)));
    }
  });

  /* ---------- 4. projetos: carrossel em fita (WebGL), o cartão da esquerda se curva para baixo ---------- */
  const palcoP = $('.projetos__palco');
  const canvas = $('.fita');
  const legenda = $('.fita__legenda');
  const nL = C.landing.length;
  let fAlvo = 0, fPos = 0, fVel = 0, fIdx = -1;
  ScrollTrigger.create({
    trigger: palcoP, start: 'top top', end: () => '+=' + innerHeight * (nL - 1) * 0.85,
    pin: true, onUpdate: (s) => { fAlvo = s.progress * (nL - 1); },
  });
  const geoFita = () => {
    const W = palcoP.clientWidth, H = palcoP.clientHeight;
    // grande o bastante para apresentar pelo Meet
    const cw = celular() ? W * 0.8 : Math.min(W * 0.52, H * 0.62 / 0.5625, 1100);
    const ch = cw * 0.5625; // vídeos em 16:9
    return { W, H, cw, ch, gap: cw * 0.06, xc: celular() ? W * 0.5 : W * 0.56, yc: H * 0.45, R: cw * 1.25, tMax: 0.85 };
  };
  const atualizarLegenda = (g) => {
    legenda.style.left = g.xc + 'px';
    legenda.style.top = (g.yc + g.ch / 2 + 24) + 'px';
  };
  const trocarLegenda = (i) => {
    const it = C.landing[i];
    $('b', legenda).textContent = it.titulo;
    $('span', legenda).textContent = it.sub;
    $('small', legenda).textContent = `${String(i + 1).padStart(2, '0')} / ${String(nL).padStart(2, '0')}`;
    legenda.classList.remove('troca'); void legenda.offsetWidth; legenda.classList.add('troca');
  };
  const fita = criarFita(canvas, C.landing);
  if (!fita) {
    canvas.hidden = true;
    const est = $('.fita__estatica'); est.hidden = false;
    C.landing.forEach((l) => {
      const v = document.createElement('video');
      Object.assign(v, { muted: true, playsInline: true, preload: 'none', poster: l.img, src: l.video });
      v.setAttribute('aria-label', l.titulo); est.appendChild(v);
    });
  }
  // o vídeo do card do centro toca com o mouse em cima (no celular, com um toque)
  const dicaFita = $('.fita__dica');
  if (matchMedia('(pointer: coarse)').matches) dicaFita.lastChild.textContent = 'TOQUE PARA VER A ABERTURA';
  const barraFita = $('.fita__barra i');
  let sobreCard = false;
  const dentroDoCentro = (e) => {
    const r = palcoP.getBoundingClientRect(), g = geoFita();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    return Math.abs(x - g.xc) < g.cw / 2 && Math.abs(y - g.yc) < g.ch / 2;
  };
  const atualizarHover = (dentro) => {
    if (dentro === sobreCard) return;
    sobreCard = dentro;
    palcoP.classList.toggle('sobre-card', dentro);
    if (!fita) {
      $$('.fita__estatica video').forEach((v, i) => { if (dentro && i === fIdx) v.play().catch(() => {}); else { v.pause(); v.currentTime = 0; } });
      return;
    }
    if (dentro) fita.tocar(fIdx); else fita.parar();
  };
  palcoP.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') atualizarHover(dentroDoCentro(e)); });
  palcoP.addEventListener('pointerleave', () => atualizarHover(false));
  palcoP.addEventListener('click', (e) => { if (dentroDoCentro(e)) atualizarHover(!sobreCard); });
  gsap.ticker.add((_, dt) => {
    const alvo = comPausas(fAlvo, 0.2);
    const ant = fPos;
    fPos += (alvo - fPos) * (1 - Math.exp(-dt / 110));
    fVel += ((fPos - ant) / Math.max(dt, 1) * 16 - fVel) * 0.2;
    const g = geoFita();
    atualizarLegenda(g);
    const idx = clamp(Math.round(fPos), 0, nL - 1);
    if (idx !== fIdx) {
      fIdx = idx; trocarLegenda(idx);
      if (sobreCard) { sobreCard = false; palcoP.classList.remove('sobre-card'); fita && fita.parar(); }
    }
    // dica e barra de progresso presas ao card do centro
    const parado = Math.abs(fPos - idx) < 0.02;
    dicaFita.style.left = (g.xc - g.cw / 2 + 18) + 'px';
    dicaFita.style.top = (g.yc + g.ch / 2 - 52) + 'px';
    dicaFita.style.opacity = parado && !sobreCard ? 1 : 0;
    const barra = barraFita.parentElement;
    barra.style.left = (g.xc - g.cw / 2) + 'px'; barra.style.width = g.cw + 'px';
    barra.style.top = (g.yc + g.ch / 2 + 8) + 'px';
    barra.style.opacity = sobreCard ? 1 : 0;
    barraFita.style.transform = `scaleX(${fita ? fita.progresso().toFixed(4) : 0})`;
    if (fita) fita.desenhar(g, fPos, fVel);
    else $$('.fita__estatica video').forEach((im, i) => {
      Object.assign(im.style, { width: g.cw + 'px', height: g.ch + 'px', left: (g.xc - g.cw / 2 + (i - fPos) * (g.cw + g.gap)) + 'px', top: (g.yc - g.ch / 2) + 'px' });
    });
  });

  function criarFita(cv, fontes) {
    const gl = cv.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return null;
    const vs = `
      attribute vec2 aUv;
      uniform vec2 uTela; uniform float uCx, uCy, uW, uH, uXb, uXr, uR, uTMax;
      varying vec2 vUv; varying float vDobra;
      void main(){
        float x = uCx + (aUv.x - .5) * uW;
        float v = (aUv.y - .5) * uH;
        float y = uCy + v;
        float dobra = 0.;
        float d = uXb - x;
        if (d > 0.) {
          // a fita faz uma curva para baixo à esquerda e segue reta depois de ~49 graus
          float tMax = uTMax;
          float th = min(d / uR, tMax);
          float resto = max(d - uR * tMax, 0.);
          float px = uXb - uR * sin(th) - resto * cos(tMax);
          float py = uCy + uR * (1. - cos(th)) + resto * sin(tMax);
          // o eixo vertical do cartão gira junto com a curva
          x = px + v * sin(th);
          y = py + v * cos(th);
          dobra = th / tMax;
        }
        float e = x - uXr;
        if (e > 0.) {
          // chegada: a mesma curva, espelhada, à direita
          float tMax = uTMax;
          float th = min(e / uR, tMax);
          float resto = max(e - uR * tMax, 0.);
          float px = uXr + uR * sin(th) + resto * cos(tMax);
          float py = uCy + uR * (1. - cos(th)) + resto * sin(tMax);
          x = px - v * sin(th);
          y = py + v * cos(th);
          dobra = th / tMax;
        }
        vUv = aUv; vDobra = dobra;
        gl_Position = vec4(x / uTela.x * 2. - 1., 1. - y / uTela.y * 2., 0., 1.);
      }`;
    const fs = `
      precision highp float;
      uniform sampler2D uTex; uniform float uW, uH, uVel, uOk;
      varying vec2 vUv; varying float vDobra;
      void main(){
        vec2 p = (vUv - .5) * vec2(uW, uH);
        float raio = 10.;
        vec2 q = abs(p) - vec2(uW, uH) * .5 + raio;
        float dist = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - raio;
        float a = clamp(.5 - dist, 0., 1.);
        float o = clamp(uVel, -.06, .06) * .12;
        vec3 c;
        c.r = texture2D(uTex, vUv + vec2(o, 0.)).r;
        c.g = texture2D(uTex, vUv).g;
        c.b = texture2D(uTex, vUv - vec2(o, 0.)).b;
        c = mix(vec3(.86), c, uOk);
        c *= 1. - vDobra * .22;
        gl_FragColor = vec4(c * a, a);
      }`;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (e) { console.warn('fita sem WebGL:', e); return null; }
    gl.useProgram(prog);
    const COLS = 64;
    const dados = [];
    for (let i = 0; i <= COLS; i++) { const u = i / COLS; dados.push(u, 0, u, 1); }
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dados), gl.STATIC_DRAW);
    const aUv = gl.getAttribLocation(prog, 'aUv');
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
    const U = {};
    ['uTela', 'uCx', 'uCy', 'uW', 'uH', 'uXb', 'uXr', 'uR', 'uTMax', 'uVel', 'uOk', 'uTex'].forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const enviar = (t, fonte) => {
      gl.bindTexture(gl.TEXTURE_2D, t.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fonte);
      t.versao++;
    };
    // cada item: capa (imagem) e, se houver, o vídeo da abertura, criado só quando for tocar
    const texs = fontes.map((it) => {
      const t = { tex: gl.createTexture(), ok: false, versao: 0, capa: null, video: null, src: it.video };
      gl.bindTexture(gl.TEXTURE_2D, t.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([220, 220, 220, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const im = new Image();
      im.onload = () => { t.capa = im; if (!t.tocando) enviar(t, im); t.ok = true; };
      im.src = it.img;
      return t;
    });
    let tocando = null;
    const parar = () => {
      if (!tocando) return;
      const t = tocando; tocando = null; t.tocando = false;
      t.video.pause();
      try { t.video.currentTime = 0; } catch (e) { /* ainda sem dados */ }
      if (t.capa) enviar(t, t.capa);
    };
    const tocar = (i) => {
      const t = texs[i];
      if (!t || !t.src || tocando === t) return;
      parar();
      if (!t.video) {
        const v = document.createElement('video');
        Object.assign(v, { muted: true, playsInline: true, preload: 'auto', src: t.src });
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        t.video = v;
      }
      t.tocando = true; tocando = t;
      t.video.currentTime = 0;
      t.video.play().catch(() => {});
    };
    let visivel = true;
    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (!visivel) parar(); }).observe(cv);
    let ultimo = '';
    return {
      tocar, parar,
      progresso: () => (tocando && tocando.video.duration ? tocando.video.currentTime / tocando.video.duration : 0),
      tocandoAgora: () => !!tocando,
      desenhar(g, pos, vel) {
        if (!visivel) return;
        // quadro novo do vídeo vai para a textura
        if (tocando && tocando.video.readyState >= 2 && tocando.video.currentTime !== tocando.ultimoT) {
          tocando.ultimoT = tocando.video.currentTime;
          enviar(tocando, tocando.video);
        }
        const dpr = Math.min(devicePixelRatio || 1, 2);
        const w = Math.round(g.W * dpr), h = Math.round(g.H * dpr);
        if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
        const chave = [w, h, pos.toFixed(4), vel.toFixed(4), texs.map((t) => t.versao).join('.')].join('|');
        if (chave === ultimo) return;
        ultimo = chave;
        gl.viewport(0, 0, w, h);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(U.uTela, g.W, g.H);
        gl.uniform1f(U.uCy, g.yc);
        gl.uniform1f(U.uW, g.cw);
        gl.uniform1f(U.uH, g.ch);
        gl.uniform1f(U.uXb, g.xc - g.cw / 2 - g.gap / 2);
        gl.uniform1f(U.uXr, g.xc + g.cw / 2 + g.gap / 2);
        gl.uniform1f(U.uR, g.R);
        gl.uniform1f(U.uTMax, g.tMax);
        gl.uniform1f(U.uVel, vel);
        gl.uniform1i(U.uTex, 0);
        gl.activeTexture(gl.TEXTURE0);
        // de trás para a frente: a fita curvada fica atrás das retas
        for (let i = 0; i < texs.length; i++) {
          const cx = g.xc + (i - pos) * (g.cw + g.gap);
          if (cx - g.cw / 2 > g.W * 1.3 || cx + g.cw / 2 < -g.W * 0.3) continue;
          gl.bindTexture(gl.TEXTURE_2D, texs[i].tex);
          gl.uniform1f(U.uOk, texs[i].ok ? 1 : 0);
          gl.uniform1f(U.uCx, cx);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, (COLS + 1) * 2);
        }
      },
    };
  }

  /* ---------- 5. trabalhos: hexágono girando que vira um tambor vertical ---------- */
  const trab = $('.trabalhos');
  const palcoT = $('.trabalhos__palco');
  const cards = $$('.tcard');
  const centro = $('.trabalhos__centro');
  const nomes = $('.trabalhos__nomes');
  const dica = $('.trabalhos__dica');
  const nT = cards.length;
  let tAlvo = 0, tPos = 0;
  const stT = ScrollTrigger.create({
    trigger: trab, start: 'top top', end: () => '+=' + innerHeight * (nT + 1) * 0.75,
    pin: palcoT, onUpdate: (s) => { tAlvo = s.progress; },
  });
  const angulo = (a) => ((a + 180) % 360 + 360) % 360 - 180;
  gsap.ticker.add((_, dt) => {
    tPos += (tAlvo - tPos) * (1 - Math.exp(-dt / 100));
    const W = palcoT.clientWidth, H = palcoT.clientHeight;
    const cel = celular();
    const morf = suave(clamp((tPos - 0.06) / 0.2, 0, 1));
    const idx = comPausas(clamp((tPos - 0.3) / 0.66, 0, 1) * (nT - 1), 0.2);
    const scrollY = lenis ? lenis.scroll : window.scrollY;
    const giro = scrollY * 0.035 + tPos * 140;
    // hexágono
    // cards em paisagem, grandes para apresentar pelo Meet
    const PROP = cel ? 1.05 : 0.66;
    const R = Math.min(W, H) * (cel ? 0.17 : 0.2);
    const hw = 2 * R * Math.tan(Math.PI / 6) * 0.97;
    // tambor
    const dw = cel ? W * 0.84 : Math.min(W * 0.46, H * 0.64 / PROP, 860);
    const dh = dw * PROP;
    const Rd = dh * 1.45;
    const dx = cel ? 0 : W * 0.17, dy = cel ? H * 0.12 : 0;
    cards.forEach((c, i) => {
      c.style.width = dw + 'px'; c.style.height = dh + 'px';
      c.style.marginLeft = -dw / 2 + 'px'; c.style.marginTop = -dh / 2 + 'px';
      const a = (i * 60 - 90 + giro) * Math.PI / 180;
      const dist = R + hw * PROP / 2;
      const hx = Math.cos(a) * dist, hy = Math.sin(a) * dist, hrz = angulo(a * 180 / Math.PI + 90), hs = hw / dw;
      const th = (i - idx) * 40;
      const tr = th * Math.PI / 180;
      const tx = dx, ty = dy + Math.sin(tr) * Rd, tz = (Math.cos(tr) - 1) * Rd, trx = -th;
      const op = clamp(Math.cos(tr) * 3 + 0.2, 0, 1);
      const x = lerp(hx, tx, morf), y = lerp(hy, ty, morf), z = lerp(0, tz, morf);
      const rz = lerp(hrz, 0, morf), rx = lerp(0, trx, morf), s = lerp(hs, 1, morf);
      c.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateZ(${rz.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${s.toFixed(4)})`;
      c.style.opacity = lerp(1, op, morf).toFixed(3);
      c.style.zIndex = Math.round(100 + Math.cos(tr) * 50 * morf);
    });
    centro.style.opacity = clamp(1 - morf * 2.2, 0, 1).toFixed(3);
    centro.style.transform = `translate(calc(-50% - ${(morf * W * 0.2).toFixed(1)}px), -50%)`;
    nomes.style.opacity = clamp((morf - 0.5) * 2, 0, 1).toFixed(3);
    lista.style.transform = `translate3d(0,${(-idx * nomes.clientHeight).toFixed(1)}px,0)`;
    $$('p', lista).forEach((p, i) => { p.style.opacity = clamp(1 - Math.abs(i - idx) * 1.6, 0, 1).toFixed(3); });
    dica.style.opacity = (clamp((morf - 0.6) * 2.5, 0, 1) * clamp((1 - tPos) * 12, 0, 1)).toFixed(3);
  });
  // arrastar o tambor rola a página
  let arrasto = null;
  tambor.addEventListener('pointerdown', (e) => { arrasto = { y: e.clientY }; tambor.setPointerCapture(e.pointerId); });
  tambor.addEventListener('pointermove', (e) => {
    if (!arrasto) return;
    const dy = e.clientY - arrasto.y; arrasto.y = e.clientY;
    const atual = lenis ? lenis.targetScroll : window.scrollY;
    const alvo = clamp(atual - dy * 3, stT.start - innerHeight * 0.2, stT.end);
    lenis ? lenis.scrollTo(alvo, { immediate: false, lerp: 0.12 }) : window.scrollTo(0, alvo);
  });
  const soltar = () => { arrasto = null; };
  tambor.addEventListener('pointerup', soltar);
  tambor.addEventListener('pointercancel', soltar);

  /* ---------- 6. serviços: o item abre conforme a rolagem ou no clique ---------- */
  const servs = $$('.serv');
  const abrir = (i) => servs.forEach((s, k) => {
    s.classList.toggle('aberto', k === i);
    $('.serv__cab', s).setAttribute('aria-expanded', k === i);
  });
  servs.forEach((s, i) => $('.serv__cab', s).addEventListener('click', () => abrir(i)));
  let sIdx = -1;
  const escolher = (s) => { const i = clamp(Math.floor(s.progress * servs.length), 0, servs.length - 1); if (i !== sIdx) { sIdx = i; abrir(i); } };
  ScrollTrigger.matchMedia({
    // telas grandes: a seção fica presa e cabe inteira; a rolagem passa pelos três pacotes
    '(min-width: 861px)': () => {
      ScrollTrigger.create({
        trigger: '.servicos', start: 'top top', end: () => '+=' + innerHeight * 1.8,
        pin: true, onUpdate: escolher,
      });
    },
    // celular: faixa de tamanho fixo a partir do topo da lista. Abrir um item muda a altura
    // da lista, mas não o topo, então a escolha não oscila
    '(max-width: 860px)': () => {
      ScrollTrigger.create({ trigger: acordeao, start: 'top 80%', end: () => '+=' + innerHeight * 0.75, onUpdate: escolher });
    },
  });
  gsap.from('.servicos__titulo', { y: () => (celular() ? 0 : 90), ease: 'none',
    scrollTrigger: { trigger: '.servicos', start: 'top bottom', end: 'top top', scrub: true } });

  /* ---------- 7. contato ---------- */
  gsap.from('.contato__titulo', { yPercent: 60, ease: 'none',
    scrollTrigger: { trigger: '.contato', start: 'top bottom', end: 'top 15%', scrub: true } });
  gsap.from('.contato__pilulas > *', { y: 26, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'expo.out',
    scrollTrigger: { trigger: '.contato__pilulas', start: 'top 92%', toggleActions: 'play none none reverse' } });

  /* ---------- menu ativo ---------- */
  const links = $$('.nav__menu a');
  links.forEach((a) => {
    const alvo = $(a.getAttribute('href'));
    ScrollTrigger.create({ trigger: alvo, start: 'top center', end: 'bottom center',
      onToggle: (s) => { if (s.isActive) links.forEach((l) => l.classList.toggle('ativo', l === a)); } });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
  abertura();
})();
