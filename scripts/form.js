// HN Enterprises Form Submission & Validation
// Complete flow: validation -> submission -> email -> response handling

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// DOM Elements
const form = document.getElementById('enquiry-form');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const countryInput = document.getElementById('country');
const flowerVarietySelect = document.getElementById('flowerVariety');
const enquiryTypeSelect = document.getElementById('enquiryType');
const quantityInput = document.getElementById('quantity');
const quantityUnitSelect = document.getElementById('quantityUnit');
const messageTextarea = document.getElementById('message');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const submitBtn = form ? form.querySelector('.btn-submit-enquiry') : null;

// Validation Functions
function isNotEmpty(value) {
  return value && value.trim() !== '';
}

function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

function isValidPhone(phone) {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7;
}

// Clear all errors
function clearAllErrors() {
  const errors = form.querySelectorAll('.inline-error');
  errors.forEach(e => e.remove());
}

// Show single field error
function showFieldError(fieldName, message) {
  const field = form.elements[fieldName];
  if (!field) return;

  // Remove existing error
  clearFieldError(fieldName);

  // Add new error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message inline-error';
  errorDiv.setAttribute('data-field', fieldName);
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

// Clear single field error
function clearFieldError(fieldName) {
  const existing = form.querySelector(`.inline-error[data-field="${fieldName}"]`);
  if (existing) existing.remove();
}

// Show message below button
function showMessage(type, text) {
  if (type === 'success') {
    successMessage.textContent = text;
    successMessage.className = 'success-message visible';
    errorMessage.textContent = '';
    errorMessage.className = 'error-message';
  } else if (type === 'error') {
    errorMessage.textContent = text;
    errorMessage.className = 'error-message visible';
    successMessage.textContent = '';
    successMessage.className = 'success-message';
  }
}

// Clear message
function clearMessage() {
  successMessage.textContent = '';
  successMessage.className = 'success-message';
  errorMessage.textContent = '';
  errorMessage.className = 'error-message';
}

// Validate entire form
function validateForm() {
  clearAllErrors();
  let isValid = true;

  // 1. Full Name
  if (!isNotEmpty(fullNameInput.value)) {
    showFieldError('fullName', 'Full Name is required');
    isValid = false;
  }

  // 2. Email
  if (!isNotEmpty(emailInput.value)) {
    showFieldError('email', 'Email Address is required');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // 3. Phone
  if (!isNotEmpty(phoneInput.value)) {
    showFieldError('phone', 'Phone Number is required');
    isValid = false;
  } else if (!isValidPhone(phoneInput.value)) {
    showFieldError('phone', 'Phone must have at least 7 digits');
    isValid = false;
  }

  // 4. Country
  if (!isNotEmpty(countryInput.value)) {
    showFieldError('country', 'Country is required');
    isValid = false;
  }

  // 5. Flower Variety
  if (!isNotEmpty(flowerVarietySelect.value)) {
    showFieldError('flowerVariety', 'Flower Variety is required');
    isValid = false;
  }

  // 6. Enquiry Type
  if (!isNotEmpty(enquiryTypeSelect.value)) {
    showFieldError('enquiryType', 'Enquiry Type is required');
    isValid = false;
  }

  // 8. Quantity
  if (!isNotEmpty(quantityInput.value)) {
    showFieldError('quantity', 'Quantity is required');
    isValid = false;
  } else if (parseInt(quantityInput.value, 10) < 1) {
    showFieldError('quantity', 'Quantity must be a positive number');
    isValid = false;
  }

  // 9. Unit
  if (!isNotEmpty(quantityUnitSelect.value)) {
    showFieldError('quantityUnit', 'Unit is required');
    isValid = false;
  }

  // 10. Message
  if (!isNotEmpty(messageTextarea.value)) {
    showFieldError('message', 'Message is required');
    isValid = false;
  }

  return isValid;
}

// Reset form
function resetForm() {
  form.reset();
  clearAllErrors();
  clearMessage();
}

// Handle flower variety change (for "Request Quote" button clicks)
function handleFlowerVarietyChange() {
  // No special handling needed anymore since all flowers are listed
}

// Main submit handler
async function handleSubmit(event) {
  event.preventDefault();

  // Clear previous messages
  clearMessage();

  // STEP 1: Validate
  if (!validateForm()) {
    showMessage('error', 'Please fill in all required details before submitting your enquiry.');
    return;
  }

  // STEP 2: Disable button and show sending state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // STEP 3: Prepare data
  const formDataObj = {
    fullName: fullNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    country: countryInput.value,
    flowerVariety: flowerVarietySelect.value,
    enquiryType: enquiryTypeSelect.value,
    quantity: quantityInput.value,
    quantityUnit: quantityUnitSelect.value,
    message: messageTextarea.value
  };

  try {
    // STEP 4: Submit to backend
    const response = await fetch('send-email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    const data = await response.json();

    // STEP 5: Handle response
    if (data.status === 'success') {
      // SUCCESS
      showMessage('success', 'Enquiry sent successfully!\nOur experts will review your requirements and reach out to you soon.');
      resetForm();
    } else {
      // ERROR from backend
      showMessage('error', "We couldn't send your enquiry right now. Please try again or contact us directly at hn.enterpriseexport@gmail.com.");
    }
  } catch (error) {
    // Network error
    console.error('Form submission error:', error);
    showMessage('error', "We couldn't send your enquiry right now. Please try again or contact us directly at hn.enterpriseexport@gmail.com.");
  } finally {
    // STEP 6: Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Enquiry →';
  }
}

// Initialize
function init() {
  if (!form) {
    console.error('Form not found');
    return;
  }

  // Attach submit handler
  form.addEventListener('submit', handleSubmit);

  // Flower variety change handler
  flowerVarietySelect.addEventListener('change', handleFlowerVarietyChange);

  // Enquire Now button handlers
  const enquireButtons = document.querySelectorAll('.btn-request-quote');
  enquireButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const variety = button.dataset.variety;
      if (variety) {
        flowerVarietySelect.value = variety;
        handleFlowerVarietyChange();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Start when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
