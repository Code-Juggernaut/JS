const form = document.querySelector('#login');

const first = document.forms[0];

form.elements
console.log(form.elements.length);

const username = form.elements.namedItem("username");
console.log(username.value);

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("submitted");
});

const pswwd = document.querySelector("#password");
const toggle = document.querySelector("#toggle-pswd");
toggle.addEventListener("toggle",(event)=>{
    const show = psswd.type === "password";
    psswd.type=show?"text":"password";
    toggle.textContent = show?"show" :"hide";
    toggle.setAttribute("aria-pressed",String(show));
})


const form = document.getElementById('#buy');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  console.log('Выбранные фрукты:', formData.getAll('fruits'));
});


const form = document.getElementById('consultationForm');
        const summaryText = document.getElementById('summaryText');
        const descriptionInput = document.getElementById('query');
        const charCountSpan = document.getElementById('charCount');
        const fileInput = document.getElementById('file');
        const fileNameDiv = document.getElementById('fileName');

        const maxLength = descriptionInput.getAttribute('maxlength');

        
        descriptionInput.addEventListener('input', () => {
            const currentLength = descriptionInput.value.length;
            charCountSpan.textContent = maxLength - currentLength;
        });

        
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileNameDiv.textContent = `file: ${fileInput.files[0].name}`;
            } else {
                fileNameDiv.textContent = 'file not found';
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const formData = new FormData(form);
            
            const name = formData.get('name');
            const email = formData.get('email');
            const description = formData.get('description') || 'Не вказано';
            const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Файл не додано';
            const consultationType = formData.get('consultation_type');
            const format = formData.get('format');
            const services = formData.getAll('services');
            const servicesStr = services.length > 0 ? services.join(', ') : 'Не обрано';

            const summaryString = 
                `name: ${name}
                Email: ${email}
                consult: ${consultationType}
                format: ${format}
                query: ${description}
                document: ${fileName}
                additionals: ${servicesStr}`;
            summaryText.textContent = summaryString;
        });

        form.addEventListener('reset', () => {
            setTimeout(() => {
                summaryText.textContent = 'Форму ще не надіслано.';
                charCountSpan.textContent = maxLength;
                fileNameDiv.textContent = 'Файл не вибрано';
            }, 0);
        });