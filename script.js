 // Three.js 3D Background with Binary Rain
        let scene, camera, renderer, binaryDigits = [];

        function initCyberBackground() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ 
                canvas: document.getElementById('cyber-canvas'), 
                alpha: true,
                antialias: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            // Create 3D Binary Digits
            createBinaryDigits();

            camera.position.z = 50;
            animate();
        }

        function createBinaryDigits() {
            const digitCount = 600;
            
            for (let i = 0; i < digitCount; i++) {
                // Create canvas for each digit
                const canvas = document.createElement('canvas');
                canvas.width = 128;
                canvas.height = 128;
                const context = canvas.getContext('2d');
                
                // Random binary digit
                const digit = Math.random() > 0.5 ? '1' : '0';
                
                // Style the digit
                context.fillStyle = digit === '1' ? '#0066ff' : '#006600';
                context.font = 'bold 80px Orbitron';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.shadowColor = digit === '1' ? '#0066ff' : '#006600';
                context.shadowBlur = 20;
                context.fillText(digit, 64, 64);
                
                // Create 3D text geometry
                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.SpriteMaterial({ 
                    map: texture, 
                    transparent: true,
                    opacity: 0.7
                });
                
                const sprite = new THREE.Sprite(material);
                sprite.scale.set(8, 8, 1);
                
                // Random 3D position
                sprite.position.set(
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 100
                );
                
                // Store animation properties
                sprite.userData = {
                    originalY: sprite.position.y,
                    speed: Math.random() * 0.02 + 0.01,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    pulseOffset: Math.random() * Math.PI * 2
                };
                
                binaryDigits.push(sprite);
                scene.add(sprite);
            }
        }

        function animate() {
            requestAnimationFrame(animate);

            // Animate binary digits
            binaryDigits.forEach((sprite, index) => {
                // Floating motion
                sprite.position.y += Math.sin(Date.now() * 0.001 + sprite.userData.pulseOffset) * sprite.userData.speed;
                sprite.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.01;
                
                // 3D rotation
                sprite.rotation.z += sprite.userData.rotationSpeed;
                
                // Pulsing opacity
                sprite.material.opacity = 0.4 + Math.sin(Date.now() * 0.003 + sprite.userData.pulseOffset) * 0.3;
                
                // Reset position if too far
                if (sprite.position.y > 100) {
                    sprite.position.y = -100;
                }
                if (sprite.position.y < -100) {
                    sprite.position.y = 100;
                }
            });

            renderer.render(scene, camera);
        }

        // Scroll animations
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Form submission
        function handleFormSubmission() {
            const form = document.querySelector('form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Welcome to the Hackit Club! Your application has been submitted. 🚀');
                form.reset();
            });
        }

        // Smooth scrolling
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Window resize handler
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            initCyberBackground();
            handleFormSubmission();
            initSmoothScrolling();
            
            window.addEventListener('scroll', handleScrollAnimations);
            window.addEventListener('resize', handleResize);
            
            // Initial scroll check
            handleScrollAnimations();
        });