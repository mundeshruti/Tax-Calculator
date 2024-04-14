function showQuestion() {
    var explanationBox = document.createElement('div');
    explanationBox.classList.add('explanation-box');
    explanationBox.innerHTML = `
        <div class="explanation-content">
            <span class="close-explanation" onclick="closeExplanation()">&times;</span>
            <p>Gross Annual Income is your total salary in a year before any deductions.</p>
        </div>
    `;
    document.body.appendChild(explanationBox);
}

function closeExplanation() {
    var explanationBox = document.querySelector('.explanation-box');
    explanationBox.parentNode.removeChild(explanationBox);
}
function closeModal() {
    var modal = document.getElementById('taxResultModal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Show error icon on hover
    document.querySelectorAll('.form-control').forEach(function(input) {
        input.addEventListener('mouseover', function() {
            input.nextElementSibling.style.display = 'inline-block';
        });
        input.addEventListener('mouseout', function() {
            input.nextElementSibling.style.display = 'none';
        });
    });

    // Handle form submission
    document.getElementById('taxForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Reset error icons
        document.querySelectorAll('.error-icon').forEach(function(icon) {
            icon.style.display = 'none';
        });

        // Get form values
        var income = parseFloat(document.getElementById('income').value);
        var extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        var deductions = parseFloat(document.getElementById('deductions').value) || 0;
        var age = document.getElementById('age').value;

        // Validate age selection
        if (!age) {
            document.getElementById('ageError').style.display = 'inline-block';
            return;
        }

        // Calculate tax
        var tax = 0;
        var taxableIncome = income + extraIncome - deductions;
        if (taxableIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (age === '≥40 &lt;60') {
                tax = 0.4 * (taxableIncome - 800000);
            } else if (age === '≥60') {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }

        // Display result in modal
        var modal = document.getElementById('taxResultModal');
        var taxResultElement = document.getElementById('taxResult');
        taxResultElement.textContent = "Tax to be paid: " + tax.toFixed(2) + " Lakhs";
        modal.style.display = 'block';

        // Close modal when close button is clicked
        document.getElementsByClassName('close')[0].addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicked outside of it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    });
});
