/* Conteúdo editável do portfólio eco. O que está marcado com [EDITAR] é provisório. */
window.CONTEUDO = {
  nome: 'CORLEONE',
  links: {
    whatsapp: 'https://wa.me/5543996494154?text=Oi%20Daniel%2C%20vi%20seu%20portf%C3%B3lio',
    instagram: 'https://www.instagram.com/mazecode.io/',
    linkedin: 'https://www.linkedin.com/in/daniel-collione-fais-893602190/',
    github: 'https://github.com/danielcollione',
    site: 'https://mazecode.io',
  },

  // Linha do tempo (fonte: LinkedIn e certificados, os mesmos dados do portfólio Corleone)
  jornada: [
    {
      aba: 'ENGENHARIA', rotulo: 'FORMAÇÃO / UTFPR', periodo: '2015 — 2020', area: 'BACHARELADO', selo: 'ACADÊMICO',
      titulo: ['ENGENHEIRO DA', 'COMPUTAÇÃO'],
      texto: 'Bacharelado na UTFPR, com base sólida em algoritmos, sistemas e hardware: entender a máquina por dentro antes de construir em cima dela.',
      fundo: ['ENGENHARIA', '2015'],
      logo: { src: 'img/logos/utfpr-cor.svg', alt: 'UTFPR' },
      marcos: [
        ['BASE', 'Algoritmos, sistemas e hardware'],
        ['TCC', 'Biofeedback controlando um servomotor, na área de E-Health'],
        ['UTFPR', 'Universidade Tecnológica Federal do Paraná'],
      ],
    },
    {
      aba: 'PADO', rotulo: 'MOBILE / PADO', periodo: '2020 — 2021', area: 'DESENVOLVEDOR MOBILE', selo: 'IOT',
      titulo: ['CASA', 'CONECTADA'],
      texto: 'Na startup de automação residencial e IoT da PADO, a fabricante de cadeados: o app que leva a casa para o celular.',
      fundo: ['IOT', '2020'],
      logo: { src: 'img/logos/pado-cor.png', alt: 'PADO' },
      marcos: [
        ['IOT', 'App de automação residencial'],
        ['STARTUP', 'Produto novo dentro de uma marca de 1936'],
        ['STACK', 'Java e TypeScript no mobile'],
      ],
    },
    {
      aba: 'PÓS EM UX', rotulo: 'ESPECIALIZAÇÃO / UNESC', periodo: 'JUN/2021 — JAN/2022', area: 'PÓS-GRADUAÇÃO', selo: 'UX',
      titulo: ['DESIGN DE', 'EXPERIÊNCIAS'],
      texto: 'Especialização em UX e Design de Experiências na UNESC, feita junto com o trabalho nos apps: desenhar a partir de quem usa, não de quem constrói.',
      fundo: ['UX', '2021'],
      logo: { src: 'img/logos/unesc-cor.png', alt: 'UNESC' },
      marcos: [
        ['PESQUISA', 'Entender quem usa antes de desenhar'],
        ['JORNADA', 'Do primeiro contato à conversão'],
        ['PROTÓTIPO', 'Testar a ideia antes de construir'],
      ],
    },
    {
      aba: 'BRADESCO', rotulo: 'MOBILE / BRADESCO SEGUROS', periodo: '2021 — 2022', area: 'ANALISTA DESENVOLVEDOR', selo: 'APP',
      titulo: ['APP DO', 'CORRETOR'],
      texto: 'Na Bradesco Seguros, o app que os corretores usam no dia a dia, desenvolvido num time ágil com Scrum.',
      fundo: ['SEGUROS', '2021'],
      logo: { src: 'img/logos/bradesco-seguros-cor.svg', alt: 'Bradesco Seguros' },
      marcos: [
        ['CORRETORES', 'App de uso diário dos corretores de seguros'],
        ['SCRUM', 'Time ágil, entregas em sprints'],
        ['STACK', 'TypeScript no mobile'],
      ],
    },
    {
      aba: 'FULL-STACK', rotulo: 'FULL-STACK / TOTVS', periodo: '2022 — 2025', area: 'DESENVOLVIMENTO', selo: 'SÊNIOR',
      titulo: ['DESENVOLVEDOR', 'FULL-STACK'],
      texto: 'Do banco à tela num sistema de logística distribuído, com Java e TypeScript, entregando o que o time e o cliente precisavam.',
      fundo: ['FULL-STACK', '2022'],
      logo: { src: 'img/logos/totvs.svg', alt: 'TOTVS' },
      marcos: [
        ['LOGÍSTICA', 'Sistema distribuído usado de ponta a ponta na operação'],
        ['STACK', 'Java no back-end, TypeScript no front-end'],
        ['DESTAQUE DO ANO', 'Eleito pelos colegas como direcionador de cultura, 2024'],
      ],
    },
    {
      aba: 'PÓS EM IA', rotulo: 'ESPECIALIZAÇÃO / UTFPR', periodo: 'MAR/2025 — 2026', area: 'PÓS-GRADUAÇÃO', selo: 'IA',
      titulo: ['INTELIGÊNCIA', 'ARTIFICIAL'],
      texto: 'Especialização em Inteligência Artificial na UTFPR, concluída em 2026. É a base dos assistentes, das automações e do jeito como a mazecode cria sites.',
      fundo: ['IA', '2025'],
      logo: { src: 'img/logos/utfpr-cor.svg', alt: 'UTFPR' },
      marcos: [
        ['MODELOS', 'Aprendizado de máquina e modelos de linguagem'],
        ['APLICAÇÃO', 'Assistentes e automações com IA'],
        ['CONCLUÍDA', 'Especialização finalizada em 2026'],
      ],
    },
    {
      aba: 'TECH LEAD', rotulo: 'LIDERANÇA / TOTVS', periodo: '2025 — HOJE', area: 'TECHNICAL LEAD', selo: 'LÍDER',
      titulo: ['TECH', 'LEAD'],
      texto: 'Decisões técnicas e código no mesmo sistema de logística, agora puxando a arquitetura e o time junto com o produto.',
      fundo: ['LIDERANÇA', '2025'],
      logo: { src: 'img/logos/totvs.svg', alt: 'TOTVS' },
      fotos: [
        { src: 'img/fotos/palco.jpg', alt: 'Daniel com o Cielo no palco', legenda: 'NO PALCO, COM O CIELO' },
        { src: 'img/fotos/certificado.jpg', alt: 'Certificado de reconhecimento', legenda: 'CERTIFICADO' },
      ],
      marcos: [
        ['ARQUITETURA', 'Decisões técnicas do sistema distribuído'],
        ['DESTAQUE 2025', 'Medalha Conecta Segmentos Supply Chain'],
        ['REFERÊNCIA TÉCNICA', 'Prêmio recebido no palco, 2025'],
      ],
    },
    {
      aba: 'MAZECODE', rotulo: 'MAZECODE / FUNDADOR', periodo: '2026 — HOJE', area: 'AGÊNCIA', selo: 'IA',
      titulo: ['FUNDADOR DA', 'MAZECODE'],
      texto: 'Sites e landing pages feitos com IA para a marca vender mais: captam o contato, respondem rápido e medem tudo.',
      fundo: ['MAZECODE', '2026'],
      marcos: [
        ['PORTFÓLIO', 'Sites de imóveis e turismo'],
        ['MÓDULOS', 'Agenda, ingressos, assistente de IA e painel'],
        ['STACK', 'Next.js, React, WebGL e IA'],
      ],
    },
  ],

  // Fita de portfólios: um card por site. O vídeo é só a abertura e toca com o mouse em cima.
  landing: [
    { video: 'video/agua.mp4', img: 'video/agua.jpg', titulo: 'Aguamansa', sub: 'Resort · uma caminhada pela casa até a água' },
    { video: 'video/lume.mp4', img: 'video/lume.jpg', titulo: 'Lume Represa', sub: 'Resort residencial · da obra ao lago, na rolagem' },
    { video: 'video/pedra.mp4', img: 'video/pedra.jpg', titulo: 'Estância Pedra Viva', sub: 'Turismo e ingressos · um voo até a estância' },
    { video: 'video/cota.mp4', img: 'video/cota.jpg', titulo: 'Cota Zero', sub: 'Construtora · a casa nasce na areia' },
  ],

  // Hexágono e tambor: os casos de uso mais fortes, em cards desenhados na própria página
  trabalhos: [
    { img: 'img/casos/passeio.jpg', nome: 'PASSEIO 3D', titulo: ['Seu cliente entra', 'antes de visitar.'], itens: ['Caminhada na rolagem', 'Funciona no celular', 'Efeito de cinema'] },
    { img: 'img/casos/assistente.jpg', nome: 'ASSISTENTE DE IA', titulo: ['Uma atendente', 'que nunca dorme.'], itens: ['Nome e jeito da marca', 'Capta o contato', 'Marca a visita'] },
    { img: 'img/casos/whats.jpg', nome: 'IA NO WHATSAPP', titulo: ['Responde até', 'de madrugada.'], itens: ['Atende 24 horas', 'Mesma base do site', 'Passa para um humano'] },
    { img: 'img/casos/agenda.jpg', nome: 'AGENDA E RESERVA', titulo: ['O cliente marca', 'sozinho.'], itens: ['Horários livres', 'Confirmação no WhatsApp', 'Lembrete automático'] },
    { img: 'img/casos/venda.jpg', nome: 'VENDA ONLINE', titulo: ['Escolhe, paga', 'e recebe na hora.'], itens: ['Ingressos e reservas', 'Pix', 'Voucher com QR code'] },
    { img: 'img/casos/painel.jpg', nome: 'PAINEL E RELATÓRIO', titulo: ['Você sabe de onde', 'vêm as vendas.'], itens: ['Leads com status', 'Origem de cada contato', 'Relatório mensal'] },
  ],

  // Pacotes da mazecode (nucleo/pacotes.ts e CLAUDE.md)
  servicos: [
    { nome: 'PRESENÇA', promessa: 'Seu cliente te encontra e fala com você.',
      texto: 'O básico bem feito: um site rápido que aparece no Google, abre bem no celular e leva o visitante direto para a sua conversa.',
      itens: ['Site rápido e mobile-first', 'WhatsApp em todas as páginas', 'Formulário de lead curto', 'Prova social: avaliações e depoimentos', 'Analytics com a origem das visitas'],
      entregaveis: 'LAYOUT SOB MEDIDA, SEO LOCAL, BOTÃO DE WHATSAPP, FORMULÁRIO, ANALYTICS',
      visual: 'img/casos/presenca.jpg', selos: ['WhatsApp em todas as páginas', 'Aparece no Google'] },
    { nome: 'CONVERSÃO', inclui: 'PRESENÇA', promessa: 'Seu cliente fecha sem precisar te chamar.',
      texto: 'O site passa a fechar negócio: o cliente agenda, reserva ou compra sozinho, e cada passo vira dado para a próxima campanha.',
      itens: ['Agendamento ou reserva direto no site', 'Isca de captura: catálogo, cupom, avaliação', 'Pixel Meta e Google com eventos de conversão', 'Consentimento de cookies (LGPD)', 'Relatório mensal: leads, origem, conteúdo'],
      entregaveis: 'AGENDA E RESERVA, ISCA DE CAPTURA, PIXEL E API DE CONVERSÕES, RELATÓRIO',
      visual: 'img/casos/conversao.jpg', selos: ['Reserva feita sozinha', 'Pixel com eventos'] },
    { nome: 'CRESCIMENTO', inclui: 'CONVERSÃO', promessa: 'Seu site vende enquanto você dorme.',
      texto: 'Uma IA com o nome e o jeito da sua marca atende no site e no WhatsApp, a qualquer hora, e ninguém fica sem resposta.',
      itens: ['Assistente de IA no site, com nome e personalidade', 'Atendente com IA no WhatsApp 24h', 'Sequências automáticas para quem sumiu', 'Painel de leads com status', 'Testes A/B de título, oferta e CTA'],
      entregaveis: 'ASSISTENTE DE IA, WHATSAPP 24H, AUTOMAÇÕES, PAINEL, TESTES A/B',
      visual: 'img/casos/crescimento.jpg', selos: ['Assistente de IA 24h', 'Lead quente no painel'] },
  ],
};
