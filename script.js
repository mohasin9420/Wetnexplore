// Wet'nexplore - Main JS for animation and feedback

document.addEventListener('DOMContentLoaded', function() {
    // Feedback form handler
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackMsg = document.getElementById('feedback-message');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            feedbackMsg.textContent = 'Thank you for your feedback!';
            feedbackForm.reset();
            setTimeout(() => feedbackMsg.textContent = '', 3000);
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Simple fade-in animation for sections on scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));

    // Countdown timer for next trip date
    function getNextTripDate() {
        const dates = [
            new Date('2025-01-17T20:30:00'),
            new Date('2025-01-24T20:30:00'),
            new Date('2025-01-31T20:30:00')
        ];
        const now = new Date();
        return dates.find(date => date > now);
    }
    function updateCountdown() {
        const timer = document.getElementById('countdown-timer');
        if (!timer) return;
        const nextTrip = getNextTripDate();
        if (!nextTrip) {
            timer.textContent = 'All trips completed!';
            return;
        }
        const now = new Date();
        const diff = nextTrip - now;
        if (diff <= 0) {
            timer.textContent = 'Trip is starting!';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        timer.textContent = `Next trip in ${days}d ${hours}h ${mins}m`;
    }
    setInterval(updateCountdown, 60000);
    updateCountdown();

    // Plan modal logic
    const viewPlanBtn = document.getElementById('viewPlanBtn');
    const planModal = document.getElementById('plan-details-modal');
    const closePlanModal = document.getElementById('closePlanModal');
    if (viewPlanBtn && planModal && closePlanModal) {
        viewPlanBtn.addEventListener('click', () => {
            planModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closePlanModal.addEventListener('click', () => {
            planModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        planModal.addEventListener('click', (e) => {
            if (e.target === planModal) {
                planModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
