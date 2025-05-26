// Tema değiştirici fonksiyonalitesi
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Kaydedilmiş tema tercihini kontrol et
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
}

// Tema değiştirme olayını dinle
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Sayfa yüklendiğinde smooth scroll için event listener'ları ekle
document.addEventListener('DOMContentLoaded', () => {
    // Tema değiştirici
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Kaydedilmiş tema tercihini kontrol et
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Tema değiştirme olayını dinle
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Animasyon efekti
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Tema ikonunu güncelle
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    // Sistem temasını kontrol et ve uygula
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    }
    
    // Sistem teması değişikliğini dinle
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });

    // Mobil menü elemanları
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const menuLinks = document.querySelectorAll('.nav-links a');

    // Hamburger menü tıklama olayı
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            toggleMenu();
        });

        // Menü linklerine tıklama
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Sayfa dışına tıklandığında menüyü kapat
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // Menüyü aç/kapat
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Menüyü kapat
    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Ekran boyutu değiştiğinde menüyü kapat
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Smooth scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animasyonları için Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Animasyon eklenecek elementleri seç
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Header scroll davranışı
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Aşağı scroll
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Yukarı scroll
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // İletişim formu gönderimi
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Normalde burada bir API'ye gönderim yapılır
            // Şimdilik console'a yazdıralım
            console.log('Form gönderildi:', data);
            
            // Kullanıcıya geri bildirim
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapılacaktır.');
            
            // Formu temizle
            contactForm.reset();
        });
    }
});
