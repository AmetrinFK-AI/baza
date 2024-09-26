const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3022;

app.use(express.json());
app.use(express.static(__dirname));

const promptsFile = path.join(__dirname, 'data', 'prompts.json');
const resourcesFile = path.join(__dirname, 'data', 'resources.json');
const cardsFile = path.join(__dirname, 'data', 'cards.json');

const ensureFileExists = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
    }
};

ensureFileExists(promptsFile);
ensureFileExists(resourcesFile);
ensureFileExists(cardsFile);

app.post('/save_prompt', (req, res) => {
    try {
        const newPrompts = req.body;
        JSON.stringify(newPrompts);
        
        fs.writeFile(promptsFile, JSON.stringify(newPrompts, null, 2), (err) => {
            if (err) {
                console.error('Ошибка при сохранении промптов:', err);
                return res.status(500).json({ status: 'error', message: 'Ошибка при сохранении данных.' });
            }
            res.json({ status: 'success' });
        });
    } catch (error) {
        console.error('Ошибка синтаксиса JSON:', error);
        res.status(400).json({ status: 'error', message: 'Неправильный формат данных JSON.' });
    }
});

app.post('/save_resource', (req, res) => {
    try {
        const newResources = req.body;
        JSON.stringify(newResources);
        
        fs.writeFile(resourcesFile, JSON.stringify(newResources, null, 2), (err) => {
            if (err) {
                console.error('Ошибка при сохранении ресурсов:', err);
                return res.status(500).json({ status: 'error', message: 'Ошибка при сохранении данных.' });
            }
            res.json({ status: 'success' });
        });
    } catch (error) {
        console.error('Ошибка синтаксиса JSON:', error);
        res.status(400).json({ status: 'error', message: 'Неправильный формат данных JSON.' });
    }
});

app.post('/save_cards', (req, res) => {
    try {
        const newCards = req.body;
        JSON.stringify(newCards);
        
        fs.writeFile(cardsFile, JSON.stringify(newCards, null, 2), (err) => {
            if (err) {
                console.error('Ошибка при сохранении карточек:', err);
                return res.status(500).json({ status: 'error', message: 'Ошибка при сохранении данных.' });
            }
            res.json({ status: 'success' });
        });
    } catch (error) {
        console.error('Ошибка синтаксиса JSON:', error);
        res.status(400).json({ status: 'error', message: 'Неправильный формат данных JSON.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
