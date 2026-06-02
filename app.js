const CONFIG = {
  checkoutUrl: "https://pay.cakto.com.br/r5zrbb2_910214",
};

const icon = (name) => {
  const paths = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    leaf: '<path d="M20 4C11 3 5 7 5 13c0 3 2 5 5 5 6 0 10-6 10-14Z"/><path d="M4 20c3-5 7-8 12-10"/>',
    lock: '<rect width="15" height="11" x="4.5" y="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
    gift: '<path d="M20 12v10H4V12m-2-5h20v5H2zM12 22V7m0 0H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
};

const questions = [
  { id: "idade", title: "Qual é a sua idade?", options: ["45 a 50 anos", "51 a 55 anos", "56 a 60 anos", "Mais de 60 anos"] },
  { id: "tempo_diabetes", title: "Há quanto tempo você convive com o diabetes?", options: ["Menos de 1 ano", "Entre 1 e 5 anos", "Mais de 5 anos"] },
  { id: "motivacao", title: "Qual é o maior motivo que te faz querer encontrar sobremesas que não prejudiquem sua saúde?", options: ["Quero voltar a aproveitar os almoços e festas de família sem me sentir diferente de todo mundo", "Quero parar de me sentir culpada toda vez que como algo doce", "Quero provar pra mim mesma que dá pra viver bem mesmo tendo diabetes", "Quero voltar a ser a pessoa que cozinha e compartilha comida com quem amo"] },
  { id: "sentimento", title: "Como você se sente em relação às sobremesas desde que descobriu o diabetes?", options: ["Cortei tudo completamente, mas não me conformo com isso até hoje", "Como escondida e me sinto péssima depois", "Tento adaptar receitas mas nunca fica com gosto de verdade", "Fingi que me acostumei, mas toda vez que vejo alguém comer doce a vontade volta"] },
  { id: "obstaculo", title: "O que te impediu de encontrar sobremesas boas para diabéticos até hoje?", options: ["Tudo que tentei tinha gosto de remédio ou de papelão", "As receitas eram complicadas demais ou cheias de ingredientes esquisitos", "Tentei mas a glicose subia do mesmo jeito — parecia que não adiantava nada", "Nunca encontrei algo que parecesse feito de verdade pra mim"] },
  { id: "desejo", title: "Imagina poder comer sobremesa todo dia, sem se preocupar com a glicose e sem se sentir culpada. Como você se sentiria?", options: ["Aliviada — finalmente poderia sentar à mesa de igual para igual com a família", "Feliz — sentiria que minha vida voltou ao normal depois do diagnóstico", "Livre — pararia de me sentir punida por uma doença que eu não escolhi ter", "As três coisas ao mesmo tempo — é exatamente o que eu quero"] },
  { id: "familia", title: "Se você pudesse levar uma sobremesa feita por você para o próximo aniversário da família, como se sentiria?", options: ["Orgulhosa — finalmente poderia contribuir igual a todo mundo", "Emocionada — seria como voltar a ser quem eu era antes do diagnóstico", "Feliz — ninguém precisaria saber que é sobremesa para diabético", "Tudo isso junto"] },
  { id: "favoritas", title: "Quais sobremesas você mais sente falta desde o diagnóstico?", options: ["Brigadeiro e chocolate", "Bolo e torta", "Pudim e mousse", "Sinto falta de tudo — qualquer coisa doce que eu pudesse comer sem medo"] },
  { id: "nivel", title: "Qual é o seu nível na cozinha?", options: ["Iniciante — prefiro receitas bem simples e rápidas", "Intermediário — consigo seguir uma receita sem dificuldade", "Avançado — gosto de preparações mais elaboradas"] },
  { id: "tempo_preparo", title: "Quanto tempo você tem disponível para preparar uma sobremesa?", options: ["Até 15 minutos", "Entre 15 e 30 minutos", "Tenho tempo, não me importo"] },
];

// Pauses: chaves = índice da pergunta APÓS a qual a pausa aparece (0-based, antes do avanço)
// Pause após Q4 (sentimento, índice 3) — valida dor
// Pause após Q6 (desejo, índice 5) — valida desejo
// Pause após Q8 (favoritas, índice 7) — personalização
const pauses = {
  3: ["Faz todo sentido. Você não está sozinha.", "Milhares de mulheres acima dos 45 anos passam exatamente por isso — e a culpa não é sua. O problema nunca foi falta de força de vontade. O problema foi não ter receitas feitas de verdade pra você.", "Continuar", "./assets/pudim-baunilha.jpg", "Pudim cremoso do Diabético Guloso"],
  5: ["É possível voltar a aproveitar", "Mais de 12.000 mulheres já encontraram o caminho de volta para a mesa. Com as receitas certas — gostosas, simples e com ingredientes de mercado — a vida com diabetes pode ser muito mais leve do que parece.", "Continuar", "./assets/hero-brigadeiro.jpg", "Brigadeiros do Diabético Guloso"],
  7: ["Tem receita para o seu perfil", "Brigadeiros, bolos, pudins, mousses e tortas: estamos selecionando as opções que mais combinam com o que você sente falta e com o seu jeito de cozinhar.", "Continuar", "./assets/cheesecake-frutas.jpg", "Cheesecake de frutas do Diabético Guloso"],
};

// Prova social exibida logo após perguntas básicas (índice da pergunta, 0-based)
const socialProof = {
  // Após Q1 (idade, índice 0)
  0: "Mais de 12.000 mulheres acima dos 45 anos já usaram o Diabético Guloso para voltar a comer sobremesa de verdade.",
  // Após Q6 (desejo, índice 5) — confirma que outras pessoas chegaram lá
  5: "\"Fiz o brigadeiro na primeira semana e no aniversário do meu marido levei o bolo. Todo mundo comeu junto.\" — Dona Aparecida, 58 anos",
};

const state = {
  screen: "intro",
  current: 0,
  answers: {},
  history: [],
  transitioning: false,
};

const app = document.querySelector("#app");
const logo = (light = false) => `<img class="logo ${light ? "light" : ""}" src="./assets/logo-diabetico-guloso.svg" alt="Diabético Guloso" />`;
const checkItem = (text) => `<li>${icon("check")}<span>${text}</span></li>`;
const STORAGE_KEY = "dbg_quiz_progress";
const VALID_SCREENS = ["intro", "question", "pause", "loading", "result", "sales"];

function getSnapshot() {
  return {
    screen: state.screen,
    current: state.current,
    answers: state.answers,
    history: state.history,
  };
}

function applySnapshot(saved) {
  if (!saved || !VALID_SCREENS.includes(saved.screen)) return false;
  state.screen = saved.screen;
  state.current = Math.min(Math.max(Number(saved.current) || 0, 0), questions.length - 1);
  state.answers = saved.answers && typeof saved.answers === "object" ? saved.answers : {};
  state.history = Array.isArray(saved.history) ? saved.history : [];
  state.transitioning = false;
  return true;
}

function saveSession() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getSnapshot()));
  } catch {
    // The quiz remains usable when browser storage is unavailable.
  }
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    applySnapshot(saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function syncBrowserState(method = "replaceState") {
  window.history[method]({ dbgQuiz: getSnapshot() }, "", window.location.href);
}

function quizFrame(content, progress = 0, label = "") {
  return `
    <main class="quiz-page">
      <header class="quiz-header">
        <div class="shell quiz-header-inner">${logo()}<span class="step-label">${label}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
      </header>
      <section class="stage"><div class="shell">${content}</div></section>
    </main>`;
}

function show(screen, addHistory = true) {
  if (addHistory) state.history.push({ screen: state.screen, current: state.current });
  state.screen = screen;
  state.transitioning = false;
  saveSession();
  syncBrowserState(addHistory ? "pushState" : "replaceState");
  window.scrollTo({ top: 0, behavior: "instant" });
  render();
}

function goBack() {
  if (state.history.length && window.history.length > 1) {
    window.history.back();
    return;
  }
  const previous = state.history.pop();
  if (!previous) return show("intro", false);
  state.screen = previous.screen;
  state.current = previous.current;
  state.transitioning = false;
  saveSession();
  syncBrowserState();
  render();
}

function renderIntro() {
  app.innerHTML = `
    <main class="intro">
      <img class="intro-bg" src="./assets/hero-brigadeiro.jpg" alt="" />
      <div class="intro-overlay"></div>
      <div class="wide intro-inner">
        ${logo()}
        <section class="intro-content">
          <p class="eyebrow">${icon("spark")} Mais de 12.000 mulheres já descobriram</p>
          <h1>Volte a comer sobremesa sem medo e sem culpa.</h1>
          <p class="intro-lead">Responda 10 perguntas rápidas e descubra quais receitas do Diabético Guloso combinam com o seu perfil — feitas para quem quer viver bem, não se privar.</p>
          <ul class="intro-points">
            <li>${icon("check")} Leva menos de 2 minutos</li>
            <li>${icon("check")} Resultado 100% personalizado</li>
            <li>${icon("check")} Acesso pelo celular</li>
          </ul>
          <div><button class="btn" data-action="start">Quero descobrir meu plano ${icon("arrow")}</button></div>
          <p class="micro">Questionário gratuito • Suas respostas ficam protegidas</p>
        </section>
      </div>
    </main>`;
}

function renderQuestion() {
  const question = questions[state.current];
  const progress = Math.round(((state.current + 1) / questions.length) * 100);
  const options = question.options.map((option, index) => `
    <button class="answer" data-answer="${index}">
      <span class="answer-index">${String.fromCharCode(65 + index)}</span>
      <span class="answer-text">${option}</span>
    </button>`).join("");

  const proof = socialProof[state.current]
    ? `<div class="social-proof-inline">${icon("star")}<span>${socialProof[state.current]}</span></div>`
    : "";

  app.innerHTML = quizFrame(`
    <section class="panel">
      <p class="eyebrow">${icon("spark")} Seu perfil de receitas</p>
      <h2>${question.title}</h2>
      ${proof}
      <p class="question-copy">Escolha a opção que mais combina com você.</p>
      <div class="answers">${options}</div>
      <button class="back" data-action="back">${icon("back")} Voltar</button>
    </section>`, progress, `Pergunta ${state.current + 1} de ${questions.length}`);
}

function advanceAfterAnswer() {
  if (pauses[state.current]) return show("pause");
  if (state.current === questions.length - 1) return show("loading");
  state.current += 1;
  show("question");
}

function answerQuestion(index, answerElement) {
  if (state.transitioning) return;
  const question = questions[state.current];
  state.answers[question.id] = question.options[index];
  saveSession();
  state.transitioning = true;
  document.querySelectorAll(".answer").forEach((option) => option.disabled = true);
  if (answerElement) {
    answerElement.classList.add("selected");
    answerElement.querySelector(".answer-index").innerHTML = icon("check");
  }
  document.querySelector(".panel")?.classList.add("leaving");
  setTimeout(() => advanceAfterAnswer(), 360);
}

function renderPause() {
  const [title, text, button, image, alt] = pauses[state.current];
  const progress = Math.round(((state.current + 1) / questions.length) * 100);
  app.innerHTML = quizFrame(`
    <section class="panel message">
      <img class="pause-image" src="${image}" alt="${alt}" />
      <span class="message-icon">${icon(state.current === 5 ? "heart" : "leaf")}</span>
      <p class="eyebrow" style="justify-content:center">${icon("spark")} Uma pausa importante</p>
      <h2>${title}</h2>
      <p>${text}</p>
      <button class="btn green" data-action="continue">${button} ${icon("arrow")}</button>
    </section>`, progress, `Pergunta ${state.current + 1} de ${questions.length}`);
}

function continueQuiz() {
  if (state.current === questions.length - 1) return show("loading");
  state.current += 1;
  show("question");
}

function renderLoading() {
  app.innerHTML = quizFrame(`
    <section class="panel message">
      <span class="message-icon">${icon("spark")}</span>
      <h2>Montando seu plano personalizado...</h2>
      <p id="loader-copy">Analisando suas respostas...</p>
      <div class="loader-wrap">
        <div class="loader-track"><div class="loader-bar" id="loader-bar" style="width:0%"></div></div>
        <p class="loader-percent" id="loader-percent">0%</p>
      </div>
    </section>`, 100, "Análise em andamento");
  const lines = ["Analisando suas respostas...", "Selecionando as receitas certas para o seu perfil...", "Montando seu plano personalizado Diabético Guloso..."];
  let value = 0;
  const timer = setInterval(() => {
    value += 2;
    document.querySelector("#loader-bar").style.width = `${value}%`;
    document.querySelector("#loader-percent").textContent = `${value}%`;
    document.querySelector("#loader-copy").textContent = lines[Math.min(2, Math.floor(value / 34))];
    if (value >= 100) {
      clearInterval(timer);
      setTimeout(() => show("result"), 300);
    }
  }, 100);
}

function getPlan() {
  const favorite = state.answers.favoritas || "Sinto falta de tudo";
  const level = state.answers.nivel || "Iniciante — prefiro receitas bem simples e rápidas";
  const time = state.answers.tempo_preparo || "Até 15 minutos";
  const motivacao = state.answers.motivacao || "";
  const desejo = state.answers.desejo || "";
  const familia = state.answers.familia || "";

  // Resumo personalizado baseado nas sobremesas favoritas
  let summary = "Seu plano foi montado com todas as categorias — brigadeiros, bolos, pudins, mousses e tortas — para você nunca ficar sem opção.";
  if (favorite.includes("Brigadeiro")) summary = "Seu plano foi montado com brigadeiros, bombons e chocolates práticos para matar a vontade de doce com mais leveza.";
  if (favorite.includes("Bolo")) summary = "Seu plano foi montado com bolos e tortas simples, com ingredientes que você encontra com facilidade.";
  if (favorite.includes("Pudim")) summary = "Seu plano foi montado com pudins e mousses cremosos para variar as sobremesas da semana.";

  // Frase de motivação personalizada para o resultado
  let motivacaoFrase = "Você quer voltar a aproveitar sobremesas com a família.";
  if (motivacao.includes("culpada")) motivacaoFrase = "Você quer parar de se sentir culpada toda vez que come algo doce.";
  else if (motivacao.includes("provar")) motivacaoFrase = "Você quer provar pra si mesma que dá pra viver bem com diabetes.";
  else if (motivacao.includes("cozinha")) motivacaoFrase = "Você quer voltar a ser a pessoa que cozinha e compartilha comida com quem ama.";

  // Frase de desejo personalizada
  let desejoFrase = "Você quer se sentir livre para comer o que gosta.";
  if (desejo.includes("Aliviada")) desejoFrase = "Você quer sentar à mesa de igual para igual com a família.";
  else if (desejo.includes("Feliz")) desejoFrase = "Você quer sentir que sua vida voltou ao normal.";
  else if (desejo.includes("Livre")) desejoFrase = "Você quer parar de se sentir punida por uma doença que não escolheu ter.";
  else if (desejo.includes("três")) desejoFrase = "Você quer alívio, normalidade e liberdade — as três coisas de uma vez.";

  // Frase de família personalizada
  let familiaFrase = "Você quer voltar a contribuir e se sentir parte dos momentos especiais.";
  if (familia.includes("Orgulhosa")) familiaFrase = "Você quer se sentir orgulhosa de levar uma sobremesa para a família.";
  else if (familia.includes("Emocionada")) familiaFrase = "Você quer voltar a ser quem era antes do diagnóstico.";
  else if (familia.includes("ninguém")) familiaFrase = "Você quer que a família curta sem saber que é sobremesa para diabético.";

  // Nível simplificado para exibição
  let levelLabel = "Iniciante";
  if (level.includes("Intermediário")) levelLabel = "Intermediário";
  if (level.includes("Avançado")) levelLabel = "Avançado";

  return { favorite, level: levelLabel, time, summary, motivacaoFrase, desejoFrase, familiaFrase };
}

function renderResult() {
  const plan = getPlan();
  app.innerHTML = `
    <main class="result-page">
      <header class="result-hero">
        <div class="shell">${logo(true)}
          <h1>Seu plano Diabético Guloso está pronto.</h1>
          <p>Analisamos suas respostas e encontramos o ponto de partida ideal para a sua rotina.</p>
        </div>
      </header>
      <section class="result-body shell">
        <div class="compare-intro">
          <p class="eyebrow">${icon("spark")} Comparação ilustrativa</p>
          <h2>O pudim pode ter um impacto diferente na sua glicemia.</h2>
          <p>Receitas adaptadas priorizam escolhas com menor impacto glicêmico. A resposta real varia por pessoa e deve ser acompanhada com a sua medição.</p>
        </div>
        <div class="compare">
          <div class="compare-card"><span>Pudim convencional</span><strong>Tendência a um pico glicêmico maior</strong><div class="compare-meter"><i style="width:92%"></i></div></div>
          <div class="compare-card after"><span>Pudim do seu plano</span><strong>Níveis glicêmicos estáveis</strong><div class="compare-meter"><i style="width:43%"></i></div></div>
        </div>
        <section class="result-card">
          <p class="eyebrow">${icon("spark")} Sua seleção personalizada</p>
          <h2>Um plano pensado para você</h2>
          <p class="question-copy">${plan.summary}</p>
          <ul class="result-list">
            ${checkItem(plan.motivacaoFrase)}
            ${checkItem(plan.desejoFrase)}
            ${checkItem(plan.familiaFrase)}
            ${checkItem(`Você sente mais falta de: ${plan.favorite}.`)}
            ${checkItem(`Receitas para o seu tempo disponível: ${plan.time}.`)}
            ${checkItem(`Compatíveis com o seu nível na cozinha: ${plan.level}.`)}
          </ul>
        </section>
        <section class="result-card">
          <p class="eyebrow">${icon("gift")} O que você vai encontrar</p>
          <h3>Receitas gostosas, simples e organizadas</h3>
          <ul class="check-list">
            ${checkItem("Mais de 50 receitas para explorar")}
            ${checkItem("Ingredientes acessíveis de mercado")}
            ${checkItem(`Opções alinhadas ao seu tempo: ${plan.time}`)}
            ${checkItem("Acesso imediato pelo celular")}
          </ul>
          <button class="btn full result-cta" data-action="sales">Quero ver meu plano ${icon("arrow")}</button>
        </section>
      </section>
    </main>`;
}

const testimonials = [
  ["Faz quatro anos que eu não comia sobremesa de verdade. Fiz o brigadeiro na primeira semana e no aniversário do meu marido levei o bolo. Todo mundo comeu junto.", "Dona Aparecida, 58 anos, São Paulo"],
  ["Eu sou péssima na cozinha. O pudim de chocolate foi a primeira receita que fiz. Minha filha provou e perguntou onde eu tinha comprado.", "Maria Lúcia, 52 anos, Belo Horizonte"],
  ["Passei dois anos me sentindo punida. Na última festa de família eu levei a torta e todo mundo adorou.", "Rosângela, 61 anos, Curitiba"],
  ["Em uma semana já tinha feito cinco receitas diferentes. Simples, gostosas e práticas.", "Cleide, 55 anos, Rio de Janeiro"],
  ["Minha neta pediu o brigadeiro de novo. Ela não sabe que é receita para diabético. Isso já diz tudo.", "Nair, 63 anos, Porto Alegre"],
];

const testimonialsShort = [
  ["Nunca pensei que fosse conseguir comer brigadeiro de novo. Fiz em 15 minutos.", "Sandra, 57 anos, Goiânia"],
  ["Os ingredientes são todos do mercado. Fiz na primeira semana sem dificuldade nenhuma.", "Vera, 53 anos, Fortaleza"],
  ["Pedi reembolso? Nem precisei. Na primeira semana já tinha valido o dobro do que paguei.", "Irene, 60 anos, Manaus"],
];

function buyButton(label = "Quero meu plano por R$19,90") {
  return `<a class="btn pulse" href="${CONFIG.checkoutUrl}">${label} ${icon("arrow")}</a>`;
}

function renderSales() {
  const testimonialsHtml = testimonials.map(([text, author]) => `<article class="testimonial"><div class="stars">★★★★★</div><p>"${text}"</p><strong>${author}</strong></article>`).join("");
  const testimonialsShortHtml = testimonialsShort.map(([text, author]) => `<article class="testimonial"><div class="stars">★★★★★</div><p>"${text}"</p><strong>${author}</strong></article>`).join("");

  app.innerHTML = `
    <main class="sales-page">
      <header class="sales-top">
        <div class="wide sales-top-inner">
          ${logo(true)}
          ${buyButton("Quero meu plano por R$19,90")}
        </div>
      </header>
      <section class="sales-hero"><div class="wide"><p class="eyebrow" style="justify-content:center">${icon("spark")} Oferta personalizada liberada</p><h1>Volte a ter sobremesas gostosas na sua rotina.</h1><p>Receitas simples, organizadas por categoria e prontas para acessar diretamente no celular.</p></div></section>
      <section class="sales-section"><div class="wide"><div class="story"><img src="./assets/bolo-chocolate.jpg" alt="Bolo de chocolate do Diabético Guloso" /><div class="story-copy"><p class="eyebrow">${icon("heart")} Uma nova experiência à mesa</p><div class="story-grid"><div class="story-block"><strong>Antes</strong><p>"Quatro anos sem comer sobremesa. Sentada na mesa de família olhando todo mundo comer bolo enquanto fingia que estava bem."</p></div><div class="story-block after"><strong>Depois</strong><p>"Hoje faço brigadeiro, bolo e pudim toda semana. Minha família come junto e pede mais."</p></div></div><cite>Dona Aparecida, 58 anos</cite></div></div></div></section>
      <section class="sales-section alt"><div class="wide"><div class="price-card"><p class="today">Oferta válida apenas hoje</p><span class="old-price">Valor total: R$131,00</span><strong class="price">R$19,90</strong><p class="discount">Você economiza R$111,10 • 85% de desconto</p><p class="question-copy">Pagamento único. Acesso imediato ao conteúdo.</p>${buyButton()}</div></div></section>
      <section class="sales-section"><div class="wide"><div class="section-head"><p class="eyebrow" style="justify-content:center">${icon("gift")} Seu pacote completo</p><h2>Tudo o que você recebe hoje</h2></div><div class="deliverables">
        <div class="deliverable"><div>${icon("check")}<span><strong>Diabético Guloso</strong>Mais de 50 receitas organizadas</span></div><span class="included">R$67 incluso</span></div>
        <div class="deliverable"><div>${icon("check")}<span><strong>Bônus 1</strong>Lista de compras para diabéticos</span></div><span class="included">R$17 incluso</span></div>
        <div class="deliverable"><div>${icon("check")}<span><strong>Bônus 2</strong>Acesso ao app Diabético Guloso</span></div><span class="included">R$47 incluso</span></div>
      </div></div></section>
      <section class="sales-section alt"><div class="wide"><div class="section-head"><p class="eyebrow" style="justify-content:center">${icon("heart")} Histórias reais</p><h2>Quem experimentou conta assim</h2></div><div class="testimonials">${testimonialsHtml}</div></div></section>
      <section class="sales-section"><div class="wide"><div class="section-head"><h2>Feito para caber na sua rotina</h2></div><div class="benefits">
        ${["Sem açúcar refinado nas receitas selecionadas","Ingredientes acessíveis que você encontra no mercado","Opções práticas para dias corridos","Simples o suficiente para qualquer nível na cozinha","Receitas para compartilhar com toda a família"].map(text => `<div class="benefit">${icon("check")}<span>${text}</span></div>`).join("")}
      </div></div></section>
      <section class="sales-section alt"><div class="wide"><div class="guarantee">${icon("shield")}<div><h3>Garantia incondicional de 7 dias</h3><p>Se por qualquer motivo você não gostar, devolvemos 100% do seu dinheiro. Sem perguntas e sem burocracia.</p></div></div></div></section>
      <section class="sales-section"><div class="wide"><div class="price-card"><p class="today">Comece hoje</p><span class="old-price">Valor total: R$131,00</span><strong class="price">R$19,90</strong><p class="discount">Economize R$111,10 hoje</p>${buyButton()}</div></div></section>
      <section class="sales-section alt"><div class="wide"><div class="section-head"><p class="eyebrow" style="justify-content:center">${icon("heart")} Mais histórias reais</p><h2>Elas já deram o primeiro passo</h2></div><div class="testimonials">${testimonialsShortHtml}</div></div></section>
      <section class="sales-section"><div class="wide"><div class="section-head"><h2>Perguntas frequentes</h2></div><div class="faq">
        <details><summary>Preciso saber cozinhar?</summary><p>Não. Há receitas para qualquer nível, inclusive para quem prefere preparos simples e rápidos.</p></details>
        <details><summary>Os ingredientes são difíceis de encontrar?</summary><p>Não. As receitas priorizam ingredientes encontrados em mercados comuns, sem nada exótico.</p></details>
        <details><summary>Funciona para qualquer tipo de diabetes?</summary><p>As receitas são adaptadas para reduzir o impacto glicêmico. Ainda assim, monitore sua glicemia conforme orientação do seu médico.</p></details>
        <details><summary>Como vou acessar as receitas?</summary><p>Após a compra, você recebe acesso ao conteúdo do Diabético Guloso diretamente pelo celular — sem app para instalar.</p></details>
        <details><summary>E se eu não gostar?</summary><p>Você tem 7 dias de garantia incondicional. Pediu, devolvemos 100% do valor. Sem perguntas, sem burocracia.</p></details>
      </div></div></section>
      <footer class="footer"><div class="wide">Diabético Guloso • Receitas gostosas para uma rotina mais leve.<br />Visual comparativo, não uma previsão clínica. Monitore sua glicemia conforme a orientação do seu profissional de saúde.</div></footer>
    </main>`;
}

function render() {
  if (state.screen === "intro") renderIntro();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "pause") renderPause();
  if (state.screen === "loading") renderLoading();
  if (state.screen === "result") renderResult();
  if (state.screen === "sales") renderSales();
}

document.addEventListener("click", (event) => {
  const answer = event.target.closest("[data-answer]");
  if (answer) return answerQuestion(Number(answer.dataset.answer), answer);
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "start") { state.current = 0; show("question"); }
  if (action === "continue") continueQuiz();
  if (action === "back") goBack();
  if (action === "sales") show("sales");
});

restoreSession();
syncBrowserState();
render();

window.addEventListener("popstate", (event) => {
  if (!applySnapshot(event.state?.dbgQuiz)) return;
  saveSession();
  window.scrollTo({ top: 0, behavior: "instant" });
  render();
});
