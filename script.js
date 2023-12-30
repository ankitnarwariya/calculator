
// Selectors 
const display = document.querySelector('#display');
const error = document.querySelector('#error');
const buttons = document.querySelectorAll('input[type=button]');

let result = '';

buttons.forEach((button) => {

    button.addEventListener('click', (e) => {

        if (e.target.value === '=') {

            if (result === '' || isNaN(parseFloat(result))) {

                error.style.visibility = 'visible';
                error.innerHTML = 'Enter Values'; // Throw error

            } else {

                result = parseFloat(eval(result).toFixed(3)).toString();

                if (result.length <= 14) {

                    display.value = result;
                    error.style.visibility = 'hidden'; // Hide error

                } else {

                    display.value = result.substring(0, 14);
                    error.style.visibility = 'visible';
                    error.innerHTML = 'Character Limit Exceeded';

                };
            };
            
        } else if (e.target.value === 'RESET') {

            result = '';
            display.value = '0';
            error.style.visibility = 'hidden'; // Hide error

        } else if (e.target.value === 'DEL') {

            result = result.substring(0, result.length - 1);
            display.value = result;
            error.style.visibility = 'hidden'; // Hide error on DEL

        } else {

            error.style.visibility = 'hidden'; // Hide error

            if (result === '' && (e.target.value === '+' || e.target.value === '*' || e.target.value === '/')) {
                return;
            };

            if (result.includes('.') && e.target.value === '.') {
                return;
            };

            const currentNumber = parseFloat(result + e.target.value).toString();
            if (currentNumber.includes('.') && currentNumber.split('.')[1].length > 3) {
                return;
            };

            if (result.length <= 13) {

                result += e.target.value;
                display.value = result;

            } else {

                // If the result exceeds 14 characters, display the first 14 characters
                display.value = result.substring(0, 14);
                error.style.visibility = 'visible';
                error.innerHTML = 'Character Limit Exceeded';

            };
        };
    });
});