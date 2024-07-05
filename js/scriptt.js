const currencyElementOne = document.getElementById('currency-one');
        const currencyElementTwo = document.getElementById('currency-two');
        const amountElementOne = document.getElementById('amount-one');
        const amountElementTwo = document.getElementById('amount-two');

        const rateElement = document.getElementById('rate');
        const convertButton = document.getElementById('convert');

        function calculate() {
            const currencyOne = 'USD'; // Always set to USD
            const currencyTwo = currencyElementTwo.value;

            fetch(`https://v6.exchangerate-api.com/v6/5c91d7ecfa05c833144c713a/latest/USD`)
                .then((res) => res.json())
                .then((data) => {
                    const rate = data.conversion_rates[currencyTwo];
                    rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
                    amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
                })
                .catch((error) => {
                    console.error('Error fetching exchange rates:', error);
                    rateElement.innerText = 'Error fetching rates';
                });
        }

        convertButton.addEventListener('click', calculate);

        calculate();