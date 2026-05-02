document.addEventListener("DOMContentLoaded", () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // --- 1. Dynamic Circle Spacing ASCII Art (Strictly KOTAG only) ---
    function setupAsciiInteractive() {
        const kotagEl = document.getElementById("interactive-kotag");
        if (!kotagEl) return;

        const rawText = kotagEl.textContent;
        kotagEl.innerHTML = ''; 

        const lines = rawText.split('\n');

        lines.forEach(line => {
            if (line.trim() === '' && line.length === 0) return; 

            const lineDiv = document.createElement('div');
            lineDiv.className = 'ascii-line';

            for (let i = 0; i < line.length; i++) {
                const span = document.createElement('span');
                span.textContent = line[i];
                span.className = 'char';
                lineDiv.appendChild(span);
            }
            kotagEl.appendChild(lineDiv);
        });

        const chars = kotagEl.querySelectorAll('.char');
        const hero = document.querySelector('.hero');

        // Dynamic Push Radius for Mobile vs Desktop
        const RADIUS = window.innerWidth <= 768 ? 40 : 75; 
        const MAX_PUSH = window.innerWidth <= 768 ? 8 : 15;

        hero.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            chars.forEach(span => {
                const rect = span.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const dx = charX - mouseX;
                const dy = charY - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < RADIUS && distance > 0) {
                    const force = (RADIUS - distance) / RADIUS;
                    const pushX = (dx / distance) * force * MAX_PUSH;
                    const pushY = (dy / distance) * force * MAX_PUSH;
                    
                    span.style.transform = `translate(${pushX}px, ${pushY}px)`;
                } else {
                    span.style.transform = `translate(0px, 0px)`;
                }
            });
        });

        hero.addEventListener('mouseleave', () => {
            chars.forEach(span => {
                span.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // --- 2. Hero Subtitle Typewriter Effect ---
    async function runSubtitleTyping() {
        const text = "building local AI, mobile apps & hardware logic from the terminal.";
        const targetElement = document.getElementById("typewriter");
        
        await sleep(500); 
        
        for (let i = 0; i < text.length; i++) {
            targetElement.innerHTML += text.charAt(i);
            await sleep(50);
        }

        const cursor = document.createElement('span');
        cursor.textContent = ' _';
        cursor.style.animation = 'blink 1s step-end infinite';
        targetElement.appendChild(cursor);
    }

    // --- 3. Terminal Interactive Sequence ---
    async function runTerminalSequence() {
        const actionLine = document.getElementById('term-action');
        const textToType = "./get_developer_email.sh";

        await sleep(1500);

        for (let i = 0; i < textToType.length; i++) {
            actionLine.textContent += textToType[i];
            await sleep(80); 
        }

        let revealed = false;
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !revealed) {
                revealed = true;
                const terminalBody = document.getElementById('terminal-body');
                
                const oldCursor = document.getElementById('term-cursor');
                oldCursor.style.animation = 'none';
                oldCursor.style.opacity = '1';

                const newLine = document.createElement('div');
                newLine.style.marginTop = '10px';
                newLine.innerHTML = `
                    <div><span class="prompt">></span> Resolving alias...</div>
                    <div><span class="prompt">></span> <a href="mailto:zahierrahman14@gmail.com">zahierrahman14@gmail.com</a></div>
                    <div style="margin-top: 15px;"><span class="prompt">kotag@local:~$</span> <span class="cursor">_</span></div>
                `;
                
                terminalBody.appendChild(newLine);
            }
        });
    }

    // --- 4. Harian Image Carousel Logic (2 Images Side-by-Side) ---
    function setupCarousel() {
        const track = document.querySelector('.carousel-track');
        const images = document.querySelectorAll('.carousel-track img');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (!track || images.length === 0) return;

        let currentIndex = 0;
        
        function getMaxIndex() {
            return window.innerWidth <= 768 ? images.length - 1 : Math.max(0, images.length - 2);
        }
        
        function getSlidePercentage() {
            return window.innerWidth <= 768 ? 100 : 50;
        }

        function updateCarouselPosition() {
            const percentage = getSlidePercentage();
            track.style.transform = `translateX(-${currentIndex * percentage}%)`;
        }

        nextBtn.addEventListener('click', () => {
            const maxIndex = getMaxIndex();
            currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
            updateCarouselPosition();
        });

        prevBtn.addEventListener('click', () => {
            const maxIndex = getMaxIndex();
            currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
            updateCarouselPosition();
        });

        window.addEventListener('resize', () => {
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateCarouselPosition();
        });
    }

    // --- 5. Image Modal (Lightbox) Logic ---
    function setupModal() {
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-img");
        const closeBtn = document.querySelector(".close-modal");
        const images = document.querySelectorAll(".carousel-track img");

        if (!modal || !modalImg || !closeBtn) return;

        images.forEach(img => {
            img.addEventListener("click", () => {
                modal.style.display = "flex";
                modalImg.src = img.src;
            });
        });

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            modalImg.src = ""; 
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                modalImg.src = "";
            }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.style.display === "flex") {
                modal.style.display = "none";
                modalImg.src = "";
            }
        });
    }

    // Initialize all functions
    setupAsciiInteractive();
    runSubtitleTyping();
    runTerminalSequence();
    setupCarousel();
    setupModal();
});