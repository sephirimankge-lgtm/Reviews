document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons
    feather.replace();
    
    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingValue');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        // Hover effects
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                if (index < hoverRating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
    
    // Form submission
    const reviewForm = document.getElementById('reviewForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (rating === "0") {
            e.preventDefault();
            alert("Please select a star rating before submitting.");
            return;
        }
        
        // Get form data
        const formData = {
            rating: ratingInput.value,
            review: document.getElementById('review').value,
            email: document.getElementById('email').value,
            timestamp: new Date().toISOString()
        };
        
        // Here you would normally send data to Google Sheets
        // For demo purposes, we'll just show the success modal
        console.log('Form data to be sent to Google Sheets:', formData);
        
        // Show success modal
        successModal.classList.remove('hidden');
        
        // Reset form
        reviewForm.reset();
        ratingInput.value = '0';
        stars.forEach(s => s.classList.remove('active'));
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        successModal.classList.add('hidden');
    });
});