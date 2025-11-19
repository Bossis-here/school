// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });
}

// Hero slider toggle
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

const slideToggle = document.getElementById('slideToggle');
if (slideToggle) {
  slideToggle.addEventListener('click', nextSlide);
  setInterval(nextSlide, 5000); // auto-switch every 5 seconds
}

// Top bar interaction
const contactToggle = document.getElementById('contactToggle');
const contactOptions = document.getElementById('contactOptions');

if (contactToggle && contactOptions) {
  contactToggle.addEventListener('click', (e) => {
    e.preventDefault();
    contactOptions.style.display = contactOptions.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!contactToggle.contains(e.target) && !contactOptions.contains(e.target)) {
      contactOptions.style.display = 'none';
    }
  });
}

// Form submission limit logic
const FORM_SUBMISSION_KEY = 'twinkleStarFormSubmission';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function checkFormSubmission() {
  const submissionTime = localStorage.getItem(FORM_SUBMISSION_KEY);
  const formMessage = document.getElementById('formMessage');
  const admissionForm = document.getElementById('admissionForm');
  const inquiryForm = document.getElementById('inquiryForm');
  
  if (submissionTime) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - parseInt(submissionTime);
    
    if (timeDiff < TWENTY_FOUR_HOURS) {
      // Show message and disable forms
      if (formMessage) {
        formMessage.textContent = 'Form was submitted. Waiting for reply...';
        formMessage.style.display = 'block';
      }
      
      if (admissionForm) admissionForm.style.display = 'none';
      if (inquiryForm) inquiryForm.style.display = 'none';
    } else {
      // Remove expired timestamp
      localStorage.removeItem(FORM_SUBMISSION_KEY);
    }
  }
}

function handleFormSubmission(formId) {
  const form = document.getElementById(formId);
  
  if (form) {
    form.addEventListener('submit', function(e) {
      // Store submission timestamp
      localStorage.setItem(FORM_SUBMISSION_KEY, new Date().getTime().toString());
      
      // Show success message immediately
      const formMessage = document.getElementById('formMessage');
      if (formMessage) {
        formMessage.textContent = 'Form was submitted. Waiting for reply...';
        formMessage.style.display = 'block';
      }
      
      // Hide the form
      form.style.display = 'none';
    });
  }
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', function() {
  checkFormSubmission();
  handleFormSubmission('admissionForm');
  handleFormSubmission('inquiryForm');
});