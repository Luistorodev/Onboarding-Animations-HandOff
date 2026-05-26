document.addEventListener('DOMContentLoaded', () => {
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3')
    ];
    let currentStepIndex = 0;
    const progress = document.getElementById('su-progress');
    const backBtn = document.getElementById('su-back');
    const continueBtn = document.getElementById('su-continue');

    // Update Progress Bar
    function updateProgress() {
        const percentage = ((currentStepIndex + 1) / steps.length) * 100;
        progress.style.width = `${percentage}%`;
    }

    // Validation
    function validateCurrentStep() {
        let isValid = false;
        if (currentStepIndex === 0) {
            // OTP check
            const otpInputs = document.querySelectorAll('.su-otp-input');
            const allFilled = Array.from(otpInputs).every(input => input.value.trim().length > 0);
            isValid = allFilled;
        } else if (currentStepIndex === 1) {
            // Country check
            const countrySelect = document.getElementById('country-select');
            isValid = countrySelect.value !== '';
        } else if (currentStepIndex === 2) {
            // Worker type check
            const radio = document.querySelector('input[name="worker_type"]:checked');
            isValid = radio !== null;
        }

        continueBtn.disabled = !isValid;
    }

    // Step 1: OTP Logic
    const otpInputs = document.querySelectorAll('.su-otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const val = e.target.value;
            // Clean non-numbers
            e.target.value = val.replace(/[^0-9]/g, '');
            if (e.target.value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            validateCurrentStep();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // Step 2: Country Select Logic
    const countrySelect = document.getElementById('country-select');
    const countryValDisplay = document.querySelector('.su-select-placeholder');
    const selectWrap = document.getElementById('country-select-wrap');

    countrySelect.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        if (e.target.value) {
            countryValDisplay.innerHTML = selectedOption.text;
            countryValDisplay.style.color = 'white'; // Change color when selected
        }
        validateCurrentStep();
    });

    countrySelect.addEventListener('focus', () => selectWrap.classList.add('focused'));
    countrySelect.addEventListener('blur', () => selectWrap.classList.remove('focused'));

    // Step 3: Worker Type Logic
    const radios = document.querySelectorAll('input[name="worker_type"]');
    radios.forEach(radio => {
        radio.addEventListener('change', validateCurrentStep);
    });

    // Navigation
    function goToStep(newIndex) {
        if (newIndex < 0) {
            // Go back to login
            window.location.href = 'login.html';
            return;
        }
        if (newIndex >= steps.length) {
            // Finish flow -> Show Success Animation, then Dashboard
            const overlay = document.getElementById('su-success-overlay');
            if (overlay) {
                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                window.location.href = 'dashboard.html';
            }
            return;
        }

        const currentStep = steps[currentStepIndex];
        const newStep = steps[newIndex];

        if (newIndex > currentStepIndex) {
            currentStep.classList.remove('active');
            currentStep.classList.add('exit-left');
            newStep.classList.remove('exit-left');
        } else {
            currentStep.classList.remove('active');
            newStep.classList.remove('exit-left');
        }

        // Trigger reflow
        void newStep.offsetWidth;

        newStep.classList.add('active');

        currentStepIndex = newIndex;
        updateProgress();
        validateCurrentStep();
    }

    continueBtn.addEventListener('click', () => {
        if (!continueBtn.disabled) {
            // Simulate a brief loading state on Continue button (like the Figma design shows)
            if (currentStepIndex === 0) {
                const originalText = continueBtn.innerHTML;
                continueBtn.innerHTML = '<i class="ph ph-spinner-gap ph-spin"></i> Continue';
                setTimeout(() => {
                    continueBtn.innerHTML = originalText;
                    goToStep(currentStepIndex + 1);
                }, 800);
            } else {
                goToStep(currentStepIndex + 1);
            }
        }
    });

    backBtn.addEventListener('click', () => {
        goToStep(currentStepIndex - 1);
    });

    // Initial setup
    updateProgress();
    validateCurrentStep();
});
