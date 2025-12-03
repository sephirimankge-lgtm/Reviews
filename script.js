document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;

            stars.forEach((s, index) => {
                s.classList.toggle('active', index < rating);
            });
        });

        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                s.classList.toggle('hover', index < hoverRating);
            });
        });

        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });

    const reviewForm = document.getElementById('reviewForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    reviewForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // FIXED CHECK
        if (ratingInput.value === "0") {
            alert("Please select a star rating before submitting.");
            return;
        }

        const formData = {
            rating: ratingInput.value,
            review: document.getElementById('review').value,
            email: document.getElementById('email').value,
            timestamp: new Date().toISOString()
        };

        console.log('Sending data to Google Sheets:', formData);

        // ACTUALLY SEND DATA
        try {
            const result = await sendToGoogleSheets(formData);
            console.log("Google Sheets Response:", result);

            successModal.classList.remove('hidden');
            reviewForm.reset();
            ratingInput.value = '0';
            stars.forEach(s => s.classList.remove('active'));

        } catch (error) {
            alert("Error submitting review. Please try again.");
        }
    });

    closeModal.addEventListener('click', function() {
        successModal.classList.add('hidden');
    });
});

// Google Sheets sender
async function sendToGoogleSheets(formData) {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyJVOUGPZng6gvhrQLPvaWqYUuOurRw94qUXWgI-yonRo5mF_ecskQRGyNiVxfrLdU/exec';
    
    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
