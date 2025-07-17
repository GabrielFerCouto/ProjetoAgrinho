// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Formulário de Contato ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nome = document.getElementById('nome').value;
            // ... (restante do código do formulário)
            
            // Simula um envio assíncrono (como se estivesse enviando para um servidor)
            setTimeout(() => {
                const isSuccess = Math.random() > 0.3; // 70% de chance de sucesso

                if (isSuccess) {
                    formMessage.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
                    formMessage.className = 'success';
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'Houve um erro ao enviar sua mensagem. Tente novamente.';
                    formMessage.className = 'error';
                }
                formMessage.classList.remove('hidden');
            }, 1500);
        });
    }

    // --- 2. Animação de rolagem (Scroll Reveal) ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const animatedGridItems = document.querySelectorAll('.grid-item, .gallery-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));
    animatedGridItems.forEach(el => observer.observe(el));


    // --- 3. Navegação Fixa (Sticky Nav) ---
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    let navHeight = nav.offsetHeight; // Captura a altura inicial da nav

    // Atualiza a altura da nav caso ela mude (por exemplo, em mobile onde ela quebra)
    const updateNavHeight = () => {
        navHeight = nav.offsetHeight;
        if (window.scrollY > header.offsetHeight) {
            document.body.style.paddingTop = navHeight + 'px';
        }
    };

    // Observa mudanças na altura da nav (ex: devido a media queries)
    const resizeObserver = new ResizeObserver(updateNavHeight);
    resizeObserver.observe(nav);


    window.addEventListener('scroll', () => {
        if (window.scrollY > header.offsetHeight) {
            nav.classList.add('sticky-nav');
            // Garante que o padding seja aplicado corretamente após a nav ficar sticky
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
                // Usa a altura atual da nav para o offset da rolagem
                const offsetTop = targetElement.offsetTop - navHeight - 20; // Ajusta para a altura da nav + um pouco
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. Adicionando classes de animação aos elementos existentes ---
    document.querySelectorAll('.section h2, .section p, .btn, #contact-form').forEach(el => {
        el.classList.add('fade-in');
    });
});