// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close');
    const form = document.querySelector('.form');
    const loadingElements = document.querySelectorAll('.loading');

    // Menu Mobile Toggle
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Event listeners para menu mobile
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Header scroll effect
    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll para links internos
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    smoothScroll();

    // Modal da Galeria
    function initGalleryModal() {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('.gallery-img');
                const overlay = this.querySelector('.gallery-overlay');
                
                if (img && modal) {
                    modal.style.display = 'block';
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    
                    if (overlay) {
                        const title = overlay.querySelector('h4');
                        const description = overlay.querySelector('p');
                        modalCaption.innerHTML = `
                            <h3>${title ? title.textContent : ''}</h3>
                            <p>${description ? description.textContent : ''}</p>
                        `;
                    }
                    
                    // Adicionar classe para animação
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                }
            });
        });

        // Fechar modal
        function closeGalleryModal() {
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        }

        if (closeModal) {
            closeModal.addEventListener('click', closeGalleryModal);
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeGalleryModal();
                }
            });
        }

        // Fechar modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeGalleryModal();
            }
        });
    }

    initGalleryModal();



    // Formulário de contato (apenas para simular envio, sem campos de input)
    function initContactForm() {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            // Seção de contato existe, mas sem formulário de input
            // Apenas para garantir que não haja erros de referência
            console.log("Seção de contato inicializada (sem formulário de input).");
        }
    }

    initContactForm();

    // Sistema de notificações (mantido para futuras funcionalidades)
    function showNotification(message, type = "info") {
        const existingNotification = document.querySelector(".notification");
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class=\"notification-content\">
                <span class=\"notification-message\">${message}</span>
                <button class=\"notification-close\">&times;</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-family: 'Poppins', sans-serif;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = "translateX(0)";
        }, 100);

        const closeBtn = notification.querySelector(".notification-close");
        closeBtn.addEventListener("click", () => {
            notification.style.transform = "translateX(100%)";
            setTimeout(() => notification.remove(), 300);
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = "translateX(100%)";
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Animações de scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-up");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animatedElements = document.querySelectorAll(".gallery-item, .about-text, .about-image, .contact-info");
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    initScrollAnimations();

    // Lazy loading para imagens
    function initLazyLoading() {
        const images = document.querySelectorAll("img[data-src]");
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    initLazyLoading();

    // Parallax effect para hero section
    function initParallax() {
        const heroSection = document.querySelector(".hero");
        const floatingElements = document.querySelectorAll(".floating-element");

        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }

            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    initParallax();

    // Contador de visitantes (simulado)
    function initVisitorCounter() {
        const counter = localStorage.getItem("visitorCount") || 0;
        const newCount = parseInt(counter) + 1;
        localStorage.setItem("visitorCount", newCount);
        
        // Você pode usar este contador para analytics
        console.log(`Visitante número: ${newCount}`);
    }

    initVisitorCounter();

    // Filtro da galeria (se necessário no futuro)
    function initGalleryFilter() {
        const filterButtons = document.querySelectorAll(".filter-btn");
        const galleryItems = document.querySelectorAll(".gallery-item");

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter;
                
                // Remover classe ativa de todos os botões
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                // Filtrar itens
                galleryItems.forEach(item => {
                    if (filter === "all" || item.dataset.category === filter) {
                        item.style.display = "block";
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 100);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.8)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 300);
                    }
                });
            });
        });
    }

    // Inicializar filtro se existirem botões
    if (document.querySelector(".filter-btn")) {
        initGalleryFilter();
    }

    // Loading animation
    function initLoadingAnimation() {
        loadingElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("loaded");
            }, index * 200);
        });
    }

    initLoadingAnimation();

    // Preloader (se necessário)
    function initPreloader() {
        const preloader = document.querySelector(".preloader");
        if (preloader) {
            window.addEventListener("load", () => {
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 500);
            });
        }
    }

    initPreloader();

    // Botão de voltar ao topo
    function initBackToTop() {
        const backToTopBtn = document.createElement("button");
        backToTopBtn.innerHTML = "<i class=\"fas fa-arrow-up\"></i>";
        backToTopBtn.className = "back-to-top";
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        `;

        document.body.appendChild(backToTopBtn);

        // Mostrar/esconder botão baseado no scroll
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = "1";
                backToTopBtn.style.visibility = "visible";
            } else {
                backToTopBtn.style.opacity = "0";
                backToTopBtn.style.visibility = "hidden";
            }
        });

        // Scroll suave para o topo
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        // Hover effect
        backToTopBtn.addEventListener("mouseenter", () => {
            backToTopBtn.style.transform = "scale(1.1)";
        });

        backToTopBtn.addEventListener("mouseleave", () => {
            backToTopBtn.style.transform = "scale(1)";
        });
    }

    initBackToTop();

    // Analytics simples (você pode integrar com Google Analytics)
    function trackPageView() {
        // Simular tracking
        console.log("Page view tracked:", window.location.pathname);
    }

    trackPageView();

    // Detectar dispositivo móvel
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Ajustar comportamentos para mobile
    if (isMobile()) {
        // Desabilitar parallax em mobile para melhor performance
        const heroSection = document.querySelector(".hero");
        if (heroSection) {
            heroSection.style.transform = "none";
        }
    }

    // Redimensionamento da janela
    window.addEventListener("resize", () => {
        // Fechar menu mobile se a tela ficar grande
        if (window.innerWidth > 768) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        }
    });

    console.log("🎀 Cantinho das Bonecas - Site carregado com sucesso!");
});

