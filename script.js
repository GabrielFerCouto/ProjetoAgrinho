// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Formulário de Contato ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Em um site real, você enviaria esses dados para um servidor
            // Usaremos um simulação de sucesso/erro aqui

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;

            // Simula um envio assíncrono (como se estivesse enviando para um servidor)
            setTimeout(() => {
                const isSuccess = Math.random() > 0.3; // 70% de chance de sucesso

                if (isSuccess) {
                    formMessage.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
                    formMessage.className = 'success'; // Adiciona classe para estilização
                    contactForm.reset(); // Limpa o formulário
                } else {
                    formMessage.textContent = 'Houve um erro ao enviar sua mensagem. Tente novamente.';
                    formMessage.className = 'error'; // Adiciona classe para estilização
                }
                formMessage.classList.remove('hidden'); // Mostra a mensagem
            }, 1500); // Espera 1.5 segundos para simular o envio
        });
    }

    // --- 2. Animação de rolagem (Scroll Reveal) ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const animatedGridItems = document.querySelectorAll('.grid-item, .gallery-item'); // Seleciona itens de grid e galeria

    const observerOptions = {
        root: null, // Observa o viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear'); // Adiciona classe para fade-in
                entry.target.classList.add('visible'); // Adiciona classe para animação do grid
                observer.unobserve(entry.target); // Para de observar depois que aparece
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));
    animatedGridItems.forEach(el => observer.observe(el));


    // --- 3. Navegação Fixa (Sticky Nav) ---
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const navHeight = nav.offsetHeight;
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            nav.classList.add('sticky-nav');
            // Adiciona um padding ao body para o conteúdo não "pular"
            document.body.style.paddingTop = navHeight + 'px';
        } else {
            nav.classList.remove('sticky-nav');
            document.body.style.paddingTop = '0';
        }
    });

    // --- 4. Animação de rolagem suave para links da nav ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (navHeight + 20), // Ajusta para a altura da nav + um pouco
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. Adicionando classes de animação aos elementos existentes ---
    // Isso é útil para aplicar a animação aos elementos já presentes no HTML
    // que queremos que apareçam com scroll-reveal.
    // Faça isso logo no carregamento ou quando o elemento for gerado.
    document.querySelectorAll('.section h2, .section p, .btn').forEach(el => {
        el.classList.add('fade-in');
    });
});