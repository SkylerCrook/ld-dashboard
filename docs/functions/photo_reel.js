const conveyorBelt = document.querySelector('.conveyor-belt');
        const scrollLeftBtn = document.getElementById('scroll-left-btn');
        const scrollRightBtn = document.getElementById('scroll-right-btn');
        const imageWidth = 300; // Width of each image, including margin
        let scrollPosition = 0;
        let intervalId;
        const scrollSpeed = 2; // Adjust for desired scroll speed

        function scrollLeft() {
            scrollPosition -= imageWidth;
            conveyorBelt.style.transform = `translateX(${-scrollPosition}px)`;
             checkButtonVisibility();
        }

        function scrollRight() {
            scrollPosition += imageWidth;
            conveyorBelt.style.transform = `translateX(${-scrollPosition}px)`;
            checkButtonVisibility();
        }

        function startAutoScroll() {
           intervalId = setInterval(() => {
                scrollPosition += scrollSpeed;
                conveyorBelt.style.transform = `translateX(${-scrollPosition}px)`;

                // If the scroll reaches the end, reset to the beginning
                if (scrollPosition > conveyorBelt.scrollWidth - conveyorBelt.clientWidth) {
                    scrollPosition = 0;
                    conveyorBelt.style.transform = `translateX(${-scrollPosition}px)`;
                }
                checkButtonVisibility();
            }, 50); // Adjust for speed
        }

        function stopAutoScroll() {
            clearInterval(intervalId);
        }

        function checkButtonVisibility() {
            // Logic to disable/enable buttons based on scroll position
            if (scrollPosition <= 0) {
                scrollLeftBtn.disabled = true;
            } else {
                scrollLeftBtn.disabled = false;
            }

            if (scrollPosition >= conveyorBelt.scrollWidth - conveyorBelt.clientWidth) {
                scrollRightBtn.disabled = true;
            } else {
                scrollRightBtn.disabled = false;
            }
        }

        // Event listeners for the scroll buttons
        scrollLeftBtn.addEventListener('click', () => {
            stopAutoScroll();
            scrollLeft();
            startAutoScroll();
        });
        scrollRightBtn.addEventListener('click', () => {
            stopAutoScroll();
            scrollRight();
            startAutoScroll();
        });

        // Start auto scroll
        startAutoScroll();
        checkButtonVisibility(); // Initial button state

        // Stop auto scroll on hover, restart on mouse leave
        conveyorBelt.addEventListener('mouseenter', stopAutoScroll);
        conveyorBelt.addEventListener('mouseleave', startAutoScroll);