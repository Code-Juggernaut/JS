//task1
function fetchAdviceByKeyword(keyword) {
    const xhr = new XMLHttpRequest();
    const url = `https://api.adviceslip.com/advice/search/${encodeURIComponent(keyword)}`;
    
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        let resultContainer = document.getElementById('advice-container');
        if (!resultContainer) {
            resultContainer = document.createElement('div');
            resultContainer.id = 'advice-container';
            document.body.appendChild(resultContainer);
        }
        resultContainer.innerHTML = ''; 

        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                
                if (data.slips) {
                    const ul = document.createElement('ul');
                    data.slips.forEach(adviceObj => {
                        const li = document.createElement('li');
                        li.textContent = adviceObj.advice;
                        ul.appendChild(li);
                    });
                    resultContainer.appendChild(ul);
                } else {
                    resultContainer.innerHTML = `<p>Tips by "${keyword}" not found.</p>`; } } catch (e) { resultContainer.innerHTML = `<p>error parsing data.</p>`; } } else { resultContainer.innerHTML = `<p> Request error: state ${xhr.status}</p>`;
        }
    };
    
    xhr.onerror = function() {
        let resultContainer = document.getElementById('advice-container');
        if (!resultContainer) {
            resultContainer = document.createElement('div');
            resultContainer.id = 'advice-container';
            document.body.appendChild(resultContainer);
        }
        resultContainer.innerHTML = `<p>Network error.</p>`;
    };
    
    xhr.send();
}

//task2

function fetchDogBreeds() {
    const xhr = new XMLHttpRequest();
    const url = 'https://dog.ceo/api/breeds/list/all';
    
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                const breedsObj = data.message; 
                
                const breedListElement = document.getElementById('breed-list');
                if (!breedListElement) {
                    console.error('Element <ul id="breed-list"> not found.');
                    return;
                }
                
                breedListElement.innerHTML = ''; 

                for (const breed in breedsObj) {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    
                    if (breedsObj[breed].length > 0) {
                        li.textContent += ` (${breedsObj[breed].join(', ')})`;
                    }
                    
                    breedListElement.appendChild(li);
                }
            } catch (e) {
                console.error(' JSON parsing error:', e);
            }
        } else {
            console.error(`Request error: state ${xhr.status}`);
        }
    };
    
    xhr.onerror = function() {
        console.error('Network error.');
    };
    
    xhr.send();
}

//task3

async function fetchRandomQuote() {
    const apiKey = 'MyAWESOME_APIkey1234'; 
    const url = 'https://api.api-ninjas.com/v1/quotes';
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const quoteText = data[0].quote;
            const quoteAuthor = data[0].author;
            
            const container = document.getElementById('quote-container');
            if (container) {
                container.innerHTML = `
                    <blockquote style="font-style: italic;">"${quoteText}"</blockquote>
                    <p style="text-align: right; font-weight: bold;">— ${quoteAuthor}</p>
                `;
            } else {
                console.error('Element <div id="quote-container"> not found.');
            }
        } else {
            console.warn('Quotation Not found.');
        }
    } catch (error) {
        console.error('Error while searching quotations:', error);
    }
}

//task4

async function fetchCountryByName(countryName) {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;
    const container = document.getElementById('country-info');
    
    if (!container) {
        console.error('Element <div id="country-info"> not found.');
        return;
    }
    
    container.innerHTML = 'Loading...';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                container.innerHTML = 'Country not found';
                return;
            }
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const country = data[0];
            
            const name = country.name.common;
            const capital = country.capital ? country.capital[0] : 'Немає столиці';
            const region = country.region;
            const population = country.population.toLocaleString();
            const flagUrl = country.flags.svg || country.flags.png;
            
            container.innerHTML = `
                <h2>${name}</h2>
                <img src="${flagUrl}" alt="Flag ${name}" width="150" style="border: 1px solid #ccc;">
                <p><strong>Capital:</strong> ${capital}</p>
                <p><strong>Region:</strong> ${region}</p>
                <p><strong>population:</strong> ${population} осіб</p>
            `;
        } else {
            container.innerHTML = 'country not found';
        }
    } catch (error) {
        container.innerHTML = 'country not found';
        console.error('Request error:', error);
    }
}