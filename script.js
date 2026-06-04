// ==========================================
// MENU MOBILE
// ==========================================

const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Fecha menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// ==========================================
// TEMA CLARO / ESCURO
// ==========================================

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    if (body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

});

// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==========================================
// ANIMAÇÕES AO ROLAR
// ==========================================

const animatedElements = document.querySelectorAll(
    ".tech-card, .timeline-item, .stat-card, .curiosity-card"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

animatedElements.forEach(item => {
    observer.observe(item);
});

// ==========================================
// BARRAS DE PROGRESSO
// ==========================================

const progressBars = document.querySelectorAll(".progress-fill");

const progressObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const width = entry.target.dataset.width;

            entry.target.style.width = width + "%";
        }

    });

}, {
    threshold: 0.4
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ==========================================
// CONTADORES
// ==========================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let current = 0;

        const increment = target / 80;

        const updateCounter = () => {

            if (current < target) {

                current += increment;

                counter.textContent = Math.ceil(current) + "%";

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target + "%";
            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ==========================================
// QUIZ AGROTECH
// ==========================================

const questions = [
    {
        question: "Qual tecnologia permite monitoramento aéreo das lavouras?",
        options: [
            "Satélites",
            "Drones",
            "Tratores",
            "Robôs"
        ],
        answer: 1
    },
    {
        question: "O que a Inteligência Artificial auxilia no agro?",
        options: [
            "Pintura de tratores",
            "Previsões e decisões",
            "Construção civil",
            "Produção de combustível"
        ],
        answer: 1
    },
    {
        question: "Qual tecnologia monitora solo e clima em tempo real?",
        options: [
            "Sensores Inteligentes",
            "Robôs",
            "Caminhões",
            "Drones"
        ],
        answer: 0
    },
    {
        question: "Agricultura de precisão ajuda a:",
        options: [
            "Aumentar desperdício",
            "Reduzir eficiência",
            "Otimizar recursos",
            "Eliminar tecnologia"
        ],
        answer: 2
    }
];

const quizBox = document.getElementById("quizBox");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartQuiz");
const result = document.getElementById("result");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {

    const q = questions[currentQuestion];

    quizBox.innerHTML = `
        <h3>${q.question}</h3>
        ${q.options.map((option, index) => `
            <div class="option" data-index="${index}">
                ${option}
            </div>
        `).join("")}
    `;

    selectedAnswer = null;

    document.querySelectorAll(".option").forEach(option => {

        option.addEventListener("click", () => {

            document.querySelectorAll(".option").forEach(op => {
                op.style.background = "";
            });

            option.style.background = "#22C55E";

            selectedAnswer = Number(option.dataset.index);

        });

    });

}

function showResult() {

    quizBox.innerHTML = "";

    result.innerHTML = `
        <h3>Você acertou ${score} de ${questions.length} perguntas!</h3>
    `;

    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {

    if (selectedAnswer === null) return;

    if (
        selectedAnswer ===
        questions[currentQuestion].answer
    ) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }

});

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    result.innerHTML = "";

    restartBtn.style.display = "none";
    nextBtn.style.display = "inline-block";

    loadQuestion();

});

loadQuestion();

// ==========================================
// PARTÍCULAS DE FUNDO
// ==========================================

const particlesContainer = document.getElementById("particles");

function createParticle() {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    const size = Math.random() * 8 + 3;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * window.innerWidth + "px";

    particle.style.background =
        Math.random() > 0.5
            ? "#22C55E"
            : "#0EA5E9";

    particle.style.animationDuration =
        Math.random() * 10 + 8 + "s";

    particlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 18000);

}

setInterval(createParticle, 300);

// ==========================================
// EFEITO HEADER AO ROLAR
// ==========================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.25)";

    } else {

        header.style.boxShadow = "none";
    }

});