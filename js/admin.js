document.addEventListener('DOMContentLoaded', () => {
    const promptForm = document.getElementById('promptForm');
    const resourceForm = document.getElementById('resourceForm');
    const cardForm = document.getElementById('cardForm');
    let editMode = false;
    let editIndex = -1;
    let currentType = '';

    const resetForm = (form) => {
        form.reset();
        editMode = false;
        editIndex = -1;
    };

    const resetDepartmentsSelection = (selectElement) => {
        Array.from(selectElement.options).forEach(option => {
            option.selected = false;
        });
    };

    const loadData = (type) => {
        const url = type === 'prompt' ? '/data/prompts.json' :
                    type === 'resource' ? '/data/resources.json' :
                    '/data/cards.json';
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const list = type === 'prompt' ? document.getElementById('promptList') :
                             type === 'resource' ? document.getElementById('resourceList') :
                             document.getElementById('cardList');
                
                list.innerHTML = '';

                data.forEach((item, index) => {
                    if (!item) return;
                    
                    const departments = item.departments ? item.departments.join(', ') : 'undefined';
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${item.name || 'undefined'}</strong> 
                        <a href="${item.link || '#'}" target="_blank">${item.link ? 'Посилання' : ''}</a>
                        <span> (${departments}) </span>
                        <button class="edit" data-index="${index}" data-type="${type}">Редагувати</button>
                        <button class="delete" data-index="${index}" data-type="${type}">Видалити</button>`;

                    list.appendChild(li);
                });

                document.querySelectorAll('.delete').forEach(button => {
                    button.onclick = function () {
                        if (confirm('Ви впевнені, що хочете видалити цей елемент?')) {
                            const index = parseInt(this.getAttribute('data-index'), 10);
                            const type = this.getAttribute('data-type');
                            data.splice(index, 1);
                            saveData(data, type);
                        }
                    };
                });

                document.querySelectorAll('.edit').forEach(button => {
                    button.onclick = function () {
                        editIndex = parseInt(this.getAttribute('data-index'), 10);
                        currentType = this.getAttribute('data-type');
                        editMode = true;
                        const item = data[editIndex];
                        if (!item) {
                            console.error('Item to edit is undefined');
                            return;
                        }

                        if (currentType === 'prompt') {
                            document.getElementById('promptName').value = item.name || '';
                            document.getElementById('promptText').value = item.text || '';
                            document.getElementById('promptCategory').value = item.category || '';
                            const departments = document.getElementById('promptDepartments');
                            resetDepartmentsSelection(departments); // Сбрасываем выбранные отделы
                            Array.from(departments.options).forEach(option => {
                                option.selected = item.departments.includes(option.value);
                            });
                        } else if (currentType === 'resource') {
                            document.getElementById('resourceName').value = item.name || '';
                            document.getElementById('resourceDescription').value = item.description || '';
                            document.getElementById('resourceLink').value = item.link || '';
                            const departments = document.getElementById('resourceDepartments');
                            resetDepartmentsSelection(departments); // Сбрасываем выбранные отделы
                            Array.from(departments.options).forEach(option => {
                                option.selected = item.departments.includes(option.value);
                            });
                        } else if (currentType === 'card') {
                            document.getElementById('cardName').value = item.name || '';
                            document.getElementById('cardLink').value = item.link || '';
                            const departments = document.getElementById('cardDepartments');
                            resetDepartmentsSelection(departments); // Сбрасываем выбранные отделы
                            Array.from(departments.options).forEach(option => {
                                option.selected = item.departments.includes(option.value);
                            });
                        }
                    };
                });
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    };

    const saveData = (data, type) => {
        const url = type === 'prompt' ? '/save_prompt' :
                    type === 'resource' ? '/save_resource' :
                    '/save_cards';
                    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.status);
            }
            return response.json();
        })
        .then(responseData => {
            if (responseData.status === 'success') {
                alert('Дані успішно збережено');
                loadData(type);
                if (type === 'prompt') resetForm(promptForm);
                else if (type === 'resource') resetForm(resourceForm);
                else if (type === 'card') resetForm(cardForm);
            } else {
                alert('Помилка при збереженні даних');
            }
        })
        .catch(error => console.error('Помилка при збереженні даних:', error));
    };

    // Функции обработки форм для добавления/редактирования
    promptForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentType = 'prompt';

        let departments = Array.from(document.getElementById('promptDepartments').selectedOptions).map(option => option.value);
        if (departments.includes('all')) {
            departments = ['accounting', 'budget', 'development', 'tender', 'service', 'sales', 'pharmacy', 'marketing', 'external_service', 'procurement', 'finance', 'it', 'hr', 'quality_control', 'security', 'management'];
        }

        const promptData = {
            name: document.getElementById('promptName').value,
            text: document.getElementById('promptText').value,
            category: document.getElementById('promptCategory').value.trim(),
            departments: departments
        };

        fetch('/data/prompts.json')
            .then(response => response.json())
            .then(prompts => {
                if (editMode && editIndex !== -1) {
                    prompts[editIndex] = promptData;
                } else {
                    prompts.push(promptData);
                }

                saveData(prompts, 'prompt');
            })
            .catch(error => console.error('Ошибка:', error));
    });

    resourceForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentType = 'resource';

        let departments = Array.from(document.getElementById('resourceDepartments').selectedOptions).map(option => option.value);
        if (departments.includes('all')) {
            departments = ['accounting', 'budget', 'development', 'tender', 'service', 'sales', 'pharmacy', 'marketing', 'external_service', 'procurement', 'finance', 'it', 'hr', 'quality_control', 'security', 'management'];
        }

        const resourceData = {
            name: document.getElementById('resourceName').value,
            description: document.getElementById('resourceDescription').value,
            link: document.getElementById('resourceLink').value,
            departments: departments
        };

        fetch('/data/resources.json')
            .then(response => response.json())
            .then(resources => {
                if (editMode && editIndex !== -1) {
                    resources[editIndex] = resourceData;
                } else {
                    resources.push(resourceData);
                }

                saveData(resources, 'resource');
            })
            .catch(error => console.error('Ошибка:', error));
    });

    cardForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentType = 'card';

        let departments = Array.from(document.getElementById('cardDepartments').selectedOptions).map(option => option.value);
        if (departments.includes('all')) {
            departments = ['accounting', 'budget', 'development', 'tender', 'service', 'sales', 'pharmacy', 'marketing', 'external_service', 'procurement', 'finance', 'it', 'hr', 'quality_control', 'security', 'management'];
        }

        const cardData = {
            name: document.getElementById('cardName').value,
            link: document.getElementById('cardLink').value,
            departments: departments
        };

        fetch('/data/cards.json')
            .then(response => response.json())
            .then(cards => {
                if (editMode && editIndex !== -1) {
                    cards[editIndex] = cardData;
                } else {
                    cards.push(cardData);
                }

                saveData(cards, 'card');
            })
            .catch(error => console.error('Ошибка:', error));
    });

    loadData('prompt');
    loadData('resource');
    loadData('card');
});
