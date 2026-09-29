// HN Enterprises Form Validation
// Implements inline validation, email/phone format checks, 
// form pre-population, and submission handling

// Email regex pattern: local-part@domain.tld
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone regex: digits only, minimum 7 digits
const PHONE_REGEX = /^\d{7,}$/;

// Required fields
const REQUIRED_FIELDS = [
  'fullName',
  'email',
  'phone',
  'country',
  'flowerVariety',
  'enquiryType',
  'quantity',
  'message'
];

// Form elements
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

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format (digits only, min 7 digits)
 */
function validatePhone(phone) {
  return PHONE_REGEX.test(phone);
}

/**
 * Validate required field is not empty
 * @param {string} value - Field value to check
 * @returns {boolean} - True if value is not empty
 */
function validateRequired(value) {
  return value && value.trim() !== '' && value !== 'Select a variety' && value !== 'Select type';
}

/**
 * Create inline error message element
 * @param {string} fieldName - Name of the field
 * @param {string} message - Error message text
 * @returns {HTMLElement} - Error message element
 */
function createErrorMessage(fieldName, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message inline-error';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.dataset.field = fieldName;
  errorDiv.textContent = message;
  return errorDiv;
}

/**
 * Remove inline error message for a field
 * @param {string} fieldName - Name of the field
 */
function removeErrorMessage(fieldName) {
  const existingError = form.querySelector(`.inline-error[data-field="${fieldName}"]`);
  if (existingError) {
    existingError.remove();
  }
}

/**
 * Show inline error message for a field
 * @param {string} fieldName - Name of the field
 * @param {string} message - Error message text
 */
function showInlineError(fieldName, message) {
  // Remove existing error first
  removeErrorMessage(fieldName);
  
  // Find the input/select element
  const field = form.elements[fieldName];
  if (field) {
    const errorDiv = createErrorMessage(fieldName, message);
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }
}

/**
 * Validate a single field
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field - Field to validate
 * @returns {boolean} - True if field is valid
 */
function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();
  
  removeErrorMessage(fieldName);
  
  switch (fieldName) {
    case 'email':
      if (!validateRequired(value)) {
        showInlineError(fieldName, 'Email address is required');
        return false;
      }
      if (!validateEmail(value)) {
        showInlineError(fieldName, 'Please enter a valid email address (e.g., name@example.com)');
        return false;
      }
      break;
      
    case 'phone':
      if (!validateRequired(value)) {
        showInlineError(fieldName, 'Phone number is required');
        return false;
      }
      if (!validatePhone(value)) {
        showInlineError(fieldName, 'Phone must be digits only, minimum 7 digits');
        return false;
      }
      break;
      
    case 'flowerVariety':
      if (!validateRequired(value)) {
        showInlineError(fieldName, 'Please select a flower variety');
        return false;
      }
      break;
      
    case 'enquiryType':
      if (!validateRequired(value)) {
        showInlineError(fieldName, 'Please select an enquiry type');
        return false;
      }
      break;
      
    case 'quantity':
      if (!validateRequired(value)) {
        showInlineError(fieldName, 'Quantity is required');
        return false;
      }
      if (parseInt(value) < 1) {
        showInlineError(fieldName, 'Quantity must be at least 1');
        return false;
      }
      break;
      
    case 'fullName':
    case 'country':
    case 'message':
      if (!validateRequired(value)) {
        showInlineError(fieldName, `${field.previousElementSibling.textContent.replace(' *', '')} is required`);
        return false;
      }
      break;
      
    default:
      if (!validateRequired(value)) {
        showInlineError(fieldName, 'This field is required');
        return false;
      }
      break;
  }
  
  return true;
}

/**
 * Validate all form fields
 * @returns {boolean} - True if all fields are valid
 */
function validateForm() {
  let isValid = true;
  
  // Validate each required field
  for (const fieldName of REQUIRED_FIELDS) {
    const field = form.elements[fieldName];
    if (field) {
      if (!validateField(field)) {
        isValid = false;
      }
    }
  }
  
  // Validate quantityUnit (hidden requirement from form structure)
  const quantityUnitValue = quantityUnitSelect.value;
  if (!quantityUnitValue) {
    showInlineError('quantityUnit', 'Please select a unit');
    isValid = false;
  } else {
    removeErrorMessage('quantityUnit');
  }
  
  return isValid;
}

/**
 * Clear all inline error messages
 */
function clearAllErrors() {
  const errorMessages = form.querySelectorAll('.inline-error');
  errorMessages.forEach(msg => msg.remove());
}

/**
 * Clear form fields
 */
function clearForm() {
  fullNameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  countryInput.value = '';
  flowerVarietySelect.value = '';
  enquiryTypeSelect.value = '';
  quantityInput.value = '';
  quantityUnitSelect.value = '';
  messageTextarea.value = '';
  
  clearAllErrors();
}

/**
 * Show success message
 * @param {string} message - Success message text
 */
function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.className = 'success-message';
  errorMessage.textContent = '';
  errorMessage.className = 'error-message';
}

/**
 * Show error message
 * @param {string} message - Error message text
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.className = 'error-message';
  successMessage.textContent = '';
  successMessage.className = 'success-message';
}

/**
 * Pre-populate flower variety field
 * @param {string} variety - Flower variety name to pre-populate
 */
function prepopulateFlowerVariety(variety) {
  flowerVarietySelect.value = variety;
}

/**
 * Pre-populate message field with flower variety
 * @param {string} variety - Flower variety name to add to message
 */
function prepopulateMessage(variety) {
  if (messageTextarea.value === '') {
    messageTextarea.value = `I would like to enquire about: ${variety}\n\n`;
  } else if (!messageTextarea.value.includes(variety)) {
    messageTextarea.value = `I would like to enquire about: ${variety}\n\n${messageTextarea.value}`;
  }
}

/**
 * Handle "Enquire Now" button click
 * @param {string} variety - Flower variety name
 */
function handleEnquireNow(variety) {
  prepopulateFlowerVariety(variety);
  prepopulateMessage(variety);
  
  // Scroll to form
  const formSection = document.getElementById('contact');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
function handleSubmit(event) {
  event.preventDefault();
  
  // Clear previous messages
  successMessage.textContent = '';
  errorMessage.textContent = '';
  successMessage.className = 'success-message';
  errorMessage.className = 'error-message';
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Compose email
  const to = 'hn.enterpriseexport@gmail.com';
  const subject = encodeURIComponent('Flower Enquiry from HN Enterprises Website');
  const body = encodeURIComponent(
    `Name: ${fullNameInput.value}\n` +
    `Email: ${emailInput.value}\n` +
    `Phone: ${phoneInput.value}\n` +
    `Country: ${countryInput.value}\n` +
    `Flower Variety: ${flowerVarietySelect.value}\n` +
    `Enquiry Type: ${enquiryTypeSelect.value}\n` +
    `Quantity: ${quantityInput.value} ${quantityUnitSelect.value}\n` +
    `Message: ${messageTextarea.value}`
  );
  
  // Compose mailto link
  const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
  
  try {
    // Attempt to open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showSuccess('Thank you! Your enquiry has been sent. We will respond shortly.');
    
    // Clear form after successful submission
    clearForm();
    
    // Note: If email client fails to open, the user will see the error
    // The mailto protocol doesn't provide a reliable way to detect failure
  } catch (e) {
    // Fallback error handling
    showError('There was an error sending your enquiry. Please contact us directly at hn.enterpriseexport@gmail.com');
    console.error('Email submission error:', e);
  }
}

/**
 * Add event listeners for field validation
 */
function addFieldListeners() {
  // Validate on blur (when field loses focus)
  [
    fullNameInput, emailInput, phoneInput, countryInput,
    flowerVarietySelect, enquiryTypeSelect, quantityInput, messageTextarea
  ].forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });
  
  // Clear error messages on input
  [
    fullNameInput, emailInput, phoneInput, countryInput,
    messageTextarea
  ].forEach(field => {
    field.addEventListener('input', () => {
      removeErrorMessage(field.name);
    });
  });
  
  // Clear error messages on selection change
  [flowerVarietySelect, enquiryTypeSelect, quantityUnitSelect].forEach(select => {
    select.addEventListener('change', () => {
      removeErrorMessage(select.name);
    });
  });
}

/**
 * Initialize form validation
 */
function init() {
  // Set up form submission handler
  form.addEventListener('submit', handleSubmit);
  
  // Add field validation listeners
  addFieldListeners();
  
  // Add event listeners to "Enquire Now" buttons (flower card buttons)
  const enquireButtons = document.querySelectorAll('.enquire-btn');
  enquireButtons.forEach(button => {
    button.addEventListener('click', () => {
      const variety = button.dataset.variety;
      if (variety) {
        handleEnquireNow(variety);
      }
    });
  });
  
  // Add event listeners to "Request Quote" buttons (new product card buttons)
  const requestQuoteButtons = document.querySelectorAll('.btn-request-quote');
  requestQuoteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const variety = button.dataset.variety;
      if (variety) {
        handleEnquireNow(variety);
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}