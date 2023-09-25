// 648476afc6258b5f9eee415e тестовый пользователь
const express = require('express'); // импортируем библиотеку express
require('dotenv').config(); // импорт для работы с env
const bodyParser = require('body-parser'); // импортируем парсер json
const { errors } = require('celebrate'); // обработка ошибок от библиотеки celebrate (Валидация приходящих на сервер данных)
const mongoose = require('mongoose'); // подключаем mongoose
const cors = require('cors'); // подключаем бибилиотреку с работай ошибки cors
const cookieParser = require('cookie-parser'); // библиотека для работы с куками
const helmet = require('helmet'); // помогает защитить приложение Node.js от уязвимостей и кибератак
const rateLimit = require('express-rate-limit'); // баблиотека ограничения запросов защита от DoS-атак
const routes = require('./routes/index'); // импортируем модуль всех роутеров приложения
const hendlerErrors = require('./middlewares/errors'); // импортируем модуль обработки ошибок
const { requestLogger, errorLogger } = require('./middlewares/logger'); // импорт логеров

// переменные окружения
const { PORT, MONGO_URL } = process.env;

// подключение к БД
mongoose.connect(`${MONGO_URL}/mestodb`, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('connected to db');
  });

// настройка ограничения запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express(); // создаем приложение

// важно писать запуск middleware в определенной очередности запросов
// подключаем обработку запросов с других портов и доменов
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser()); // подключаем обработку куки

// Краш-тест сервера
// Не забудьте удалить этот код после успешного прохождения ревью.
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json()); // подключаем обработку json всех запросах к серверу
app.use(helmet()); // подключаем защиту от кибер атак
app.use(limiter); // ограничение запросов защита от DoS-атак

app.use(requestLogger); // подключаем логгер запросов(важно подключить до обработки роутов запросов)

// обработка запроса по адресу "/" методом get
app.get('/', (req, res) => {
  res.status(200);
  res.send('hello world2');
});

app.use(routes); // подключаем обработку всех роутеров
app.use(errorLogger); // подключаем логгер ошибок (Важно подключить до обработки ошибок)
app.use(errors()); // // обработка ошибок celebrate
app.use(hendlerErrors); // подключаем обработку ошибок после выполнения роутов

// запускаем сервер на порту 4000, с этого порта слушаем все входящие запросы
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
