const btn4 = document.querySelector('.card5');
const card6 = document.querySelector('.card6');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const quizModal = document.getElementById('quizModal');
const quizCloseBtn = document.querySelector('.quiz-close-btn');

if (quizCloseBtn) {
    quizCloseBtn.addEventListener('click', () => {
        quizModal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === quizModal) {
        quizModal.style.display = 'none';
    }
});

if (btn4) {
    btn4.addEventListener('click', () => {
        // Открываем страницу в новой вкладке
        window.open('prompt/prompt.html', '_blank');
    });
}

if (card6) {
    card6.addEventListener('click', () => {
        modal.style.display = 'block';
    });
}
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const card6 = document.querySelector('.card6'); // Шестая карточка
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content ul');
    const closeBtn = document.querySelector('.close-btn');

    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Закрытие модального окна при клике вне его области
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Открытие модального окна при нажатии на шестую карточку
    if (card6) {
        card6.addEventListener('click', () => {
            // Очистка модального контента перед загрузкой
            modalContent.innerHTML = '';

            // Загрузка ресурсов из JSON файла
            fetch('../data/resources.json')
                .then(response => response.json())
                .then(resources => {
                    resources.forEach(resource => {
                        // Добавляем все ресурсы в модальное окно
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <h3>${resource.name}</h3>
                            <p>${resource.description}</p>
                            <a href="${resource.link}" target="_blank">Посилання на ресурс</a>
                        `;
                        modalContent.appendChild(li);
                    });

                    // Открыть модальное окно, если ресурсы найдены
                    if (modalContent.children.length > 0) {
                        modal.style.display = 'block';
                    }
                })
                .catch(error => console.error('Ошибка при загрузке ресурсов:', error));
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cardWrapper = document.querySelector('.card_wrapper');

    // Загрузка данных из JSON файла
    fetch('../data/cards.json')
        .then(response => response.json())
        .then(cards => {
            cards.forEach(card => {
                // Создание новой карточки
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.innerHTML = `<h2>${card.name}</h2>`;
                
                // Добавляем обработчик события для перехода по ссылке
                cardElement.addEventListener('click', () => {
                    window.open(card.link, '_blank');
                });

                // Добавление карточки в контейнер
                cardWrapper.appendChild(cardElement);
            });

            // Создаем карточку "В розробці..." и добавляем её в конце
            const developingCard = document.createElement('div');
            developingCard.classList.add('card');
            developingCard.classList.add('card-developing');
            developingCard.innerHTML = `<h2>В розробці...</h2>`;
            
            cardWrapper.appendChild(developingCard);
        })
        .catch(error => console.error('Ошибка при загрузке карточек:', error));
});
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cardsContainer');
    const currentDepartment = 'Название отдела'; // Название текущего отдела, например, 'accounting'

    const loadCards = () => {
        fetch('/data/cards.json')
            .then(response => response.json())
            .then(cards => {
                cardsContainer.innerHTML = ''; // Очистка контейнера

                cards.forEach(card => {
                    if (card.departments.includes(currentDepartment) || card.departments.includes('all')) {
                        const cardElement = document.createElement('div');
                        cardElement.classList.add('card');
                        cardElement.innerHTML = `<h2>${card.name}</h2>`;
                        cardElement.addEventListener('click', () => {
                            window.open(card.link, '_blank');
                        });
                        cardsContainer.appendChild(cardElement);
                    }
                });
            })
            .catch(error => console.error('Ошибка при загрузке карточек:', error));
    };

    loadCards();
});
