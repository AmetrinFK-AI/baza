document.addEventListener('DOMContentLoaded', () => {
    const department = 'budget'; // Название текущего отдела

    
    // Загрузка и отображение промптов
    fetch('/data/prompts.json')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error('No data found in prompts.json');
                return;
            }

            const promptList = document.getElementById('promptList');

            if (!promptList) {
                console.error('Element with id "promptList" not found.');
                return;
            }
            
            data.forEach((prompt, index) => {
                // Добавляем проверку на наличие текущего отдела в списке отделов промпта
                if (prompt && prompt.text && prompt.departments.includes(department)) {
                    const li = document.createElement('li');
                    const title = prompt.name ? `<strong>${prompt.name}</strong>` : ''; // Добавляем заголовок
                    const textContent = prompt.text.replace(/\n/g, '<br>'); // Замена \n на <br>

                    // Создаем заголовок для промпта с кнопкой
                    const titleButton = document.createElement('button');
                    titleButton.innerHTML = title;
                    titleButton.classList.add('prompt-title-button');

                    // Создаем контейнер для текста промпта
                    const textDiv = document.createElement('div');
                    textDiv.innerHTML = textContent;
                    textDiv.classList.add('prompt-text');
                    if (index !== 0) {
                        textDiv.style.display = 'none'; // Скрываем все, кроме первого
                    }

                    // Добавляем обработчик на кнопку заголовка
                    titleButton.addEventListener('click', () => {
                        if (textDiv.style.display === 'none') {
                            textDiv.style.display = 'block'; // Показать текст
                        } else {
                            textDiv.style.display = 'none'; // Скрыть текст
                        }
                    });

                    // Добавляем заголовок и текст в элемент списка
                    li.appendChild(titleButton);
                    li.appendChild(textDiv);
                    promptList.appendChild(li);
                } else {
                    console.error('Prompt text is undefined or department does not match.');
                }
            });
        })
        .catch(error => console.error('Ошибка при загрузке промптов:', error));

    // Загрузка и отображение ресурсов
    fetch('/data/resources.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const resourceList = document.getElementById('resourceList');
            data.forEach(resource => {
                if (resource.departments.includes(department)) {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${resource.link}" target="_blank">${resource.name}</a><p>${resource.description}</p>`;
                    resourceList.appendChild(li);
                }
            });
        })
        .catch(error => console.error('Ошибка при загрузке ресурсов:', error));
        
    // Загрузка и отображение инструментов
    fetch('/data/cards.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const instrumentList = document.getElementById('instrumentList');
            data.forEach(card => {
                if (card.departments.includes(department) || card.departments.includes('all')) {
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    const cardLink = document.createElement('a');
                    cardLink.href = card.link;
                    cardLink.target = "_blank";  // Открывать ссылку в новой вкладке
                    cardLink.innerHTML = `<h2>${card.name}</h2>`;
                    cardLink.classList.add('card-link');  // Для стилизации ссылки

                    cardDiv.appendChild(cardLink);
                    instrumentList.appendChild(cardDiv);
                }
            });
        })
        .catch(error => console.error('Ошибка при загрузке инструментов:', error));
});