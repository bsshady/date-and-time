// Получаем ссылки на элементы DOM, с которыми будем взаимодействовать
const output = document.getElementById('output');
const fullBtn = document.getElementById('full');
const dateBtn = document.getElementById('date');
const timeBtn = document.getElementById('time');

// Класс для форматирования даты и времени
class DateTimeFormatter {
    constructor() {
        this.mode = 'full'; // Изначальный режим: полный формат
        this.intervalId = setInterval(this.update.bind(this), 1000); // Устанавливаем интервал обновления
        this.update(); // Обновляем вывод при инициализации
    }

    // Функция для связывания режима события с обработчиком
    bindMode(name) {
        return () => {
            this.mode = name; // Устанавливаем новый режим
            this.updateInterval(); // Обновляем интервал в зависимости от режима
            this.update(); // Обновляем вывод
        }
    }

    // Функция для обновления интервала в зависимости от режима
    updateInterval() {
        clearInterval(this.intervalId); // Очищаем предыдущий интервал
        // Устанавливаем новый интервал: 10 мс для режима 'time', 1000 мс (1 секунда) для остальных режимов
        this.intervalId = setInterval(this.update.bind(this), this.mode === 'time' ? 10 : 1000);
    }

    // Функция для обновления вывода
    update() {
        output.textContent = this.format(); // Обновляем текстовое содержимое элемента 'output'
    }

    // Функция для форматирования даты и времени в зависимости от режима
    format() {
        const nowTime = new Date();
        switch (this.mode) {
            case 'time':
                return `Время в данный момент - ${nowTime.toLocaleTimeString()}.${nowTime.getMilliseconds()}`;
            case 'date':
                return `Сегодняшняя дата - ${nowTime.toLocaleDateString()}`;
            case 'full':
                return `Дата - ${nowTime.toLocaleDateString()} Время - ${nowTime.toLocaleTimeString()}.${nowTime.getMilliseconds()}`;
            default:
                return nowTime.toLocaleTimeString();
        }
    }
}

// Создаем экземпляр класса для форматирования даты и времени
const formatter = new DateTimeFormatter();

// Назначаем обработчики событий для кнопок
fullBtn.addEventListener('click', formatter.bindMode('full'));
dateBtn.addEventListener('click', formatter.bindMode('date'));
timeBtn.addEventListener('click', formatter.bindMode('time'));
