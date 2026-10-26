const form = document.querySelector("#form");
const color_name = document.querySelector("#color_name");
const color_type = document.querySelector("#color_palete"); // Исправлено под твой HTML (color_palete)
const color = document.querySelector("#color");
const field = document.querySelector("#color_container");

// Загружаем сохраненные цвета из Cookie при загрузке страницы
document.addEventListener("DOMContentLoaded", renderColors);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    try {
        const nameVal = color_name.value.trim();
        const typeVal = color_type.value;
        const colorVal = color.value.trim();
        const colorsList = getColorsFromCookie();

        // 1. Валидация названия
        if (nameVal === "") {
            throw new Error("Color name mustn't be empty!");
        }
        
        // Только буквы (включая кириллицу/украинские и латиницу)
        const lettersRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/;
        if (!lettersRegex.test(nameVal)) {
            throw new Error("Color name must contain only letters!");
        }

        // Уникальность (без учета регистра)
        const isDuplicate = colorsList.some(c => c.name.toLowerCase() === nameVal.toLowerCase());
        if (isDuplicate) {
            throw new Error("Color name must be unique!");
        }

        // 2. Валидация в зависимости от типа
        if (typeVal === "RGB") {
            const parts = colorVal.split(',').map(item => item.trim());
            if (parts.length !== 3) throw new Error("RGB must have 3 values!");
            for (let p of parts) {
                let num = Number(p);
                if (p === "" || isNaN(num) || num < 0 || num > 255) {
                    throw new Error("RGB numbers must be between 0 and 255!");
                }
            }
        } 
        else if (typeVal === "RGBA") {
            const parts = colorVal.split(',').map(item => item.trim());
            if (parts.length !== 4) throw new Error("RGBA must have 4 values!");
            for (let i = 0; i < 3; i++) {
                let num = Number(parts[i]);
                if (parts[i] === "" || isNaN(num) || num < 0 || num > 255) {
                    throw new Error("First 3 RGBA numbers must be between 0 and 255!");
                }
            }
            let alpha = Number(parts[3]);
            if (parts[3] === "" || isNaN(alpha) || alpha < 0 || alpha > 1) {
                throw new Error("Alpha channel must be between 0 and 1!");
            }
        } 
        else if (typeVal === "HSV") { // Если оставишь HSV в селекторе
            const parts = colorVal.split(',').map(item => item.trim());
            if (parts.length !== 3) throw new Error("HSV must have 3 values!");
        }

        // 3. Формируем CSS-значение цвета для отображения
        let cssColor = colorVal;
        if (typeVal === "RGB") cssColor = `rgb(${colorVal})`;
        if (typeVal === "RGBA") cssColor = `rgba(${colorVal})`;

        // 4. Добавляем в общий список и сохраняем в Cookie (на 3 часа = 10800 секунд)
        colorsList.push({ name: nameVal, type: typeVal, code: colorVal, css: cssColor });
        saveColorsToCookie(colorsList);

        // 5. Перерисовываем и очищаем форму
        renderColors();
        form.reset();

    } catch (error) {
        // Выводим ошибку (можно заменить на алерт или вывод в специальный блок)
        alert(error.message);
        console.error(error.message);
    }
});

// Функции для работы с Cookie
function saveColorsToCookie(colors) {
    const jsonString = JSON.stringify(colors);
    document.cookie = `colors=${encodeURIComponent(jsonString)}; max-age=10800; path=/`;
}

function getColorsFromCookie() {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'colors') {
            try {
                return JSON.parse(decodeURIComponent(value));
            } catch (e) {
                return [];
            }
        }
    }
    return [];
}

// Отрисовка всех цветов из Cookie
function renderColors() {
    field.innerHTML = "";
    const colorsList = getColorsFromCookie();

    colorsList.forEach(item => {
        let new_container = document.createElement('div');
        new_container.style.backgroundColor = item.css;
        new_container.style.padding = "15px";
        new_container.style.margin = "10px";
        new_container.style.border = "1px solid #000";
        new_container.style.display = "inline-block";
        new_container.style.minWidth = "120px";
        new_container.textContent = `${item.name} (${item.type})`;

        field.appendChild(new_container);
    });
}