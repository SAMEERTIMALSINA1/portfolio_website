/* ===================================
   JavaScript for Portfolio Website
   ================================== */
   if (window.trustedTypes && trustedTypes.createPolicy) {
    trustedTypes.createPolicy('default', {
        createHTML: string => string
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // DOM CACHE
    // ========================================
    const dom = {
        mobileToggle:       document.getElementById('mobile-toggle'),
        mobileMenu:         document.getElementById('mobile-menu'),
        menuIcon:           document.getElementById('menu-icon'),
        typed:              document.getElementById('typed'),
        skillsSection:      document.querySelector('#skills'),
        searchInput:        document.getElementById('searchInput'),
        yearElement:        document.getElementById('year'),
        currentYearElement: document.getElementById('current-year'),
        projectsContainer:  document.getElementById('projects-container'),
        sections:           document.querySelectorAll('section[id]'),
        navLinks:           document.querySelectorAll('.nav-link'),
        mobileNavLinks:     document.querySelectorAll('.mobile-nav-link'),
        slideUpElements:    document.querySelectorAll('.slide-up'),
    };


    // ========================================
    // MOBILE MENU HELPER
    // ========================================
    function closeMobileMenu() {

        if (dom.mobileMenu && !dom.mobileMenu.classList.contains('hidden')) {

            dom.mobileMenu.classList.add('hidden');

            if (dom.mobileToggle) {

                dom.mobileToggle.setAttribute('aria-expanded', 'false');

            }

        }

    }


    // ========================================
    // CUSTOM SMOOTH SCROLLING
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            closeMobileMenu();

            const navHeight = 80;
            const targetPosition =
                targetElement.offsetTop - navHeight;

            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;

            let start = null;

            function easeInOutCubic(t) {

                return t < 0.5
                    ? 4 * t * t * t
                    : (t - 1) *
                    (2 * t - 2) *
                    (2 * t - 2) + 1;

            }

            function animation(currentTime) {

                if (start === null) start = currentTime;

                const timeElapsed = currentTime - start;

                const progress =
                    Math.min(timeElapsed / duration, 1);

                const ease = easeInOutCubic(progress);

                window.scrollTo(
                    0,
                    startPosition + (distance * ease)
                );

                if (timeElapsed < duration) {

                    requestAnimationFrame(animation);

                }

            }

            requestAnimationFrame(animation);

        });

    });


    // ========================================
    // 1. MOBILE MENU TOGGLE
    // ========================================
    if (dom.mobileToggle && dom.mobileMenu) {

        dom.mobileToggle.setAttribute(
            'aria-expanded',
            'false'
        );

        dom.mobileToggle.addEventListener('click', () => {

            const isHidden =
                dom.mobileMenu.classList.toggle('hidden');

            dom.mobileToggle.setAttribute(
                'aria-expanded',
                !isHidden
            );

            if (dom.menuIcon) {

                dom.menuIcon.classList.toggle('rotate-90');

            }

        });

        dom.mobileMenu.querySelectorAll('a').forEach(link => {

            link.addEventListener('click', () => {

                closeMobileMenu();

            });

        });

    }


    // ========================================
    // 2. REAL TYPING ANIMATION EFFECT
    // ========================================
    const roles = [
        'System Administrator',
        'IT Specialist',
        'Problem Solver',
        'Tech Enthusiast'
    ];

    if (dom.typed) {

        const TYPING_SPEED    = 100;
        const DELETING_SPEED  = 50;
        const PAUSE_DURATION  = 1500;
        const NEXT_WORD_DELAY = 300;

        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting       = false;
        let typingTimeoutId  = null;

        function typeEffect() {

            const currentText =
                roles[currentRoleIndex];

            if (isDeleting) {

                currentCharIndex--;

                dom.typed.textContent =
                    currentText.substring(
                        0,
                        currentCharIndex
                    );

            } else {

                currentCharIndex++;

                dom.typed.textContent =
                    currentText.substring(
                        0,
                        currentCharIndex
                    );

            }

            let typingSpeed =
                isDeleting
                ? DELETING_SPEED
                : TYPING_SPEED;

            if (
                !isDeleting &&
                currentCharIndex === currentText.length
            ) {

                typingSpeed = PAUSE_DURATION;
                isDeleting  = true;

            } else if (
                isDeleting &&
                currentCharIndex === 0
            ) {

                isDeleting = false;

                currentRoleIndex =
                    (currentRoleIndex + 1) %
                    roles.length;

                typingSpeed = NEXT_WORD_DELAY;

            }

            typingTimeoutId = setTimeout(typeEffect, typingSpeed);

        }

        typeEffect();

        // Safety: pause animation when tab is hidden, resume when visible
        document.addEventListener('visibilitychange', () => {

            if (document.hidden) {

                clearTimeout(typingTimeoutId);

            } else {

                typeEffect();

            }

        });

    }


    // ========================================
    // 3. PROGRESS BAR ANIMATION
    // ========================================
    if (dom.skillsSection) {

        const progressObserver =
            new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const progressBars =
                            document.querySelectorAll(
                                '.progress > div'
                            );

                        progressBars.forEach(bar => {

                            const targetWidth =
                                bar.getAttribute(
                                    'data-width'
                                );

                            if (targetWidth) {

                                requestAnimationFrame(() => {

                                    bar.style.width =
                                        targetWidth;

                                });

                            }

                        });

                        progressObserver.unobserve(
                            entry.target
                        );

                    }

                });

            }, { threshold: 0.6 });

        progressObserver.observe(dom.skillsSection);

    }


    // ========================================
    // 4. SCROLL ANIMATIONS
    // ========================================
    if (dom.slideUpElements.length > 0) {

        const scrollObserver =
            new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = '1';

                        entry.target.style.transform =
                            'translateY(0)';

                    }

                });

            }, { threshold: 0.1 });

        dom.slideUpElements.forEach(element => {

            element.style.opacity = '0';

            element.style.transform =
                'translateY(30px)';

            element.style.transition =
                'all 0.7s ease-out';

            scrollObserver.observe(element);

        });

    }


    // ========================================
    // 5. ACTIVE NAV LINK HIGHLIGHTING
    // ========================================

    // Cache section positions; update on resize to stay accurate
    let sectionPositions = [];

    function cacheSectionPositions() {

        sectionPositions = Array.from(dom.sections).map(section => ({
            id:  section.getAttribute('id'),
            top: section.offsetTop,
        }));

    }

    function highlightNav() {

        let current = '';

        sectionPositions.forEach(({ id, top }) => {

            if (window.scrollY >= (top - 150)) {

                current = id;

            }

        });

        [...dom.navLinks, ...dom.mobileNavLinks]
            .forEach(link => {

                link.classList.remove('active');

                if (
                    link.getAttribute('href') ===
                    `#${current}`
                ) {

                    link.classList.add('active');

                }

            });

    }

    let navThrottle = false;

    function throttledHighlightNav() {

        if (!navThrottle) {

            window.requestAnimationFrame(() => {

                highlightNav();

                navThrottle = false;

            });

            navThrottle = true;

        }

    }

    if (dom.sections.length > 0) {

        cacheSectionPositions();

        window.addEventListener(
            'scroll',
            throttledHighlightNav,
            { passive: true }
        );

        // Recache positions when viewport is resized
        window.addEventListener(
            'resize',
            cacheSectionPositions,
            { passive: true }
        );

        highlightNav();

    }


    // ========================================
    // 6. PROJECT SEARCH/FILTER FUNCTION
    // ========================================

    function debounce(func, delay = 300) {

        let timeout;

        return function (...args) {

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);

        };

    }

    function filterProjects() {

        if (!dom.searchInput) return;

        // Value is already lowercased once here, not per-card
        const filter =
            dom.searchInput.value.toLowerCase();

        const projectCards =
            document.querySelectorAll('.project-card');

        if (projectCards.length === 0) return;

        projectCards.forEach(project => {

            // Use precomputed search string stored in data-search
            const searchContent =
                project.dataset.search || '';

            if (searchContent.includes(filter)) {

                project.classList.remove('hidden');

            } else {

                project.classList.add('hidden');

            }

        });

    }

    if (dom.searchInput) {

        const debounceFilter =
            debounce(filterProjects, 250);

        dom.searchInput.addEventListener(
            'input',
            debounceFilter
        );

    }
    
    // ========================================
    // 7. DYNAMIC YEAR
    // ========================================
    const currentYear = new Date().getFullYear();

    if (dom.yearElement) {

        dom.yearElement.textContent = currentYear;

    }

    if (dom.currentYearElement) {

        dom.currentYearElement.textContent =
            currentYear;

    }


    // ========================================
    // 8. SANITIZE HELPERS
    // ========================================
    function sanitizeText(str = '') {

        const div = document.createElement('div');

        div.textContent = str;

        return div.innerHTML;

    }

    function sanitizeURL(url) {
    // Allow relative paths directly
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return url;
    }
    try {
        const parsed = new URL(url, window.location.origin);
        if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
            return '#';
        }
        return parsed.href;
    } catch {
        return '#';
    }
}


    // ========================================
    // 9. COLOR CLASS MAPS
    // ========================================
    const colorMap = {

    blue: {
        tag: 'bg-blue-100 text-blue-700',
        button: 'bg-blue-700 hover:bg-blue-800',
        text: 'text-blue-700'
    },

    purple: {
        tag: 'bg-purple-100 text-purple-700',
        button: 'bg-purple-700 hover:bg-purple-800',
        text: 'text-purple-700'
    },

    green: {
        tag: 'bg-green-100 text-green-700',
        button: 'bg-green-700 hover:bg-green-800',
        text: 'text-green-700'
    },

    orange: {
        tag: 'bg-orange-100 text-orange-700',
        button: 'bg-orange-700 hover:bg-orange-800',
        text: 'text-orange-700'
    },

    indigo: {
        tag: 'bg-indigo-100 text-indigo-700',
        button: 'bg-indigo-700 hover:bg-indigo-800',
        text: 'text-indigo-700'
    },

    red: {
        tag: 'bg-red-100 text-red-700',
        button: 'bg-red-700 hover:bg-red-800',
        text: 'text-red-700'
    },

    pink: {
        tag: 'bg-pink-100 text-pink-700',
        button: 'bg-pink-700 hover:bg-pink-800',
        text: 'text-pink-700'
    },

    gray: {
        tag: 'bg-gray-200 text-gray-800',
        button: 'bg-gray-700 hover:bg-gray-800',
        text: 'text-gray-700'
    },

    yellow: {
        tag: 'bg-yellow-100 text-yellow-800',
        button: 'bg-yellow-700 hover:bg-yellow-800',
        text: 'text-yellow-700'
    },

    violet: {
        tag: 'bg-violet-100 text-violet-700',
        button: 'bg-violet-700 hover:bg-violet-800',
        text: 'text-violet-700'
    },

    navy: {
        tag: 'bg-slate-200 text-slate-800',
        button: 'bg-slate-800 hover:bg-slate-900',
        text: 'text-slate-800'
    },

    silver: {
        tag: 'bg-zinc-200 text-zinc-800',
        button: 'bg-zinc-700 hover:bg-zinc-800',
        text: 'text-zinc-700'
    },

    brown: {
        tag: 'bg-amber-100 text-amber-800',
        button: 'bg-amber-700 hover:bg-amber-800',
        text: 'text-amber-800'
    }

};

// ========================================
    // 10. RENDER PROJECTS
    // ========================================
    function renderProjects(projects) {

        if (!dom.projectsContainer) return;

        if (!Array.isArray(projects)) {
            dom.projectsContainer.innerHTML =
                `<p class="text-gray-500">Invalid project data.</p>`;
            return;
        }

        if (projects.length === 0) {
            dom.projectsContainer.innerHTML =
                `<p class="text-gray-500">No projects found.</p>`;
            return;
        }

        const htmlParts = projects.map(project => {

            const safeTitle = sanitizeText(project.title);
            const safeCategory = sanitizeText(project.category);
            const safeDescription = sanitizeText(project.description);
            const safeImage = sanitizeURL(project.image);
            const safeFile = sanitizeURL(project.file);
            const safeColor = colorMap[project.color] ? project.color : 'indigo';
            const styles = colorMap[safeColor];
            const safeTags = Array.isArray(project.tags) ? project.tags : [];

            const searchContent = [
                safeTitle, safeDescription, safeTags.join(' ')
            ].join(' ').toLowerCase().trim();

            const tagsHTML = safeTags.map(tag => `
                <span class="px-3 py-1 ${styles.tag} text-xs rounded-full font-medium">
                    ${sanitizeText(tag)}
                </span>
            `).join('');

            const actionHTML = project.runnable
                ? (project.runType === 'gui'
                    ? `
                    <a
                        href="${sanitizeURL(project.repoUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                    >
                        View on GitHub
                    </a>
                    `
                    : `
                    <button
                        onclick="runProject('${project.runPage}', '${project.runId}')"
                        class="inline-flex items-center px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                    >
                        Run
                    </button>
                    `)
                : '';

            return `
            <article
                class="project-card bg-white shadow-lg rounded-xl overflow-hidden"
                data-title="${safeTitle.toLowerCase()}"
                data-description="${safeDescription.toLowerCase()}"
                data-tags="${safeTags.join(' ').toLowerCase()}"
                data-search="${searchContent}"
            >
                <div class="md:flex">
                    <div class="md:w-1/4 overflow-hidden">
                        <img
                            src="${safeImage}"
                            alt="${safeTitle}"
                            loading="lazy"
                            decoding="async"
                            class="w-full h-full object-cover"
                        >
                    </div>
                    <div class="p-6 md:w-3/4">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">${safeTitle}</h2>
                        <p class="text-sm ${styles.text} mb-3 font-medium">${safeCategory}</p>
                        <p class="text-gray-600 mb-4 leading-relaxed">${safeDescription}</p>
                        <div class="flex flex-wrap gap-2 mb-4">${tagsHTML}</div>
                            <a
                            href="${safeFile}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center px-5 py-2.5 ${styles.button} text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                        >
                            View Documentation
                        </a>
                        ${actionHTML}
                    </div>
                </div>
            </article>
            `;

        });

        // Single DOM write for all projects
        dom.projectsContainer.innerHTML = htmlParts.join('');

    }


    // ========================================
    // 10b. RUN PROJECT HANDLER
    // ========================================
    window.runProject = function(runPage, projectId) {
        window.location.href = `${runPage}?project=${encodeURIComponent(projectId)}`;
    };
    
    // ========================================
    // 11. LOAD PROJECTS
    // ========================================
    function loadProjects(category) {

        if (
            typeof allProjects === 'undefined' ||
            !Array.isArray(allProjects)
        ) {

            console.error(
                'allProjects is missing or invalid.'
            );

            return;

        }

        const filteredProjects =
            allProjects.filter(project =>
                project.category === category
            );

        renderProjects(filteredProjects);

    }


    // ========================================
    // 12. PAGE DETECTION
    // ========================================
    const page =
        window.location.pathname.toLowerCase();

    if (
        page.includes(
            'project_of_system_admin'
        )
    ) {

        loadProjects('system-administration');

    }

    if (
        page.includes(
            'project_of_python'
        )
    ) {

        loadProjects('python');

    }

    if (
        page.includes(
            'project_of_network'
        ) ||
        page.includes(
            'project_of_virtualization'
        )
    ) {

        loadProjects('network-infrastructure');

    }

});