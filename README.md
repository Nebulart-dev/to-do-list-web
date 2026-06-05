# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 📝 Веб-приложение "To-Do List" (React + Vite)

Проект представляет собой клиентское одностраничное приложение (SPA) для управления списком задач, интегрированное с тремя внешними REST API (курсы валют, погода и финансовый рейтинг) для демонстрации работы с асинхронными запросами.

---

## 🚀 Основной функционал
* **Менеджер задач:** Добавление, удаление и динамическое переключение статуса выполнения задач.
* **Локальное хранилище (LocalStorage):** Синхронизация списка задач. Данные автоматически сохраняются в браузере и не пропадают при перезагрузке страницы.
* **Интеграция с API Валют:** Автоматический запрос актуального курса USD и EUR к Центробанку РФ при старте приложения.
* **Интеграция с API Погоды:** Динамический запрос к OpenWeatherMap на основе реальной геолокации пользователя через Geolocation API браузера.
* **Интеграция со сторонним REST API (Рейтинг богатейших людей):** Асинхронное получение структуры пользователей и вывод интерактивного финансового топа.

---

## 🛠 Техническая спецификация и Документация API

Обмен данными в приложении между клиентом и внешними серверами происходит в текстовом формате **JSON**.

### 1. Модуль «Мировой рейтинг богатейших людей» (Внешнее API)
* **Эндпоинт:** `https://jsonplaceholder.typicode.com/users`
* **HTTP Метод:** `GET`
* **Формат данных:** `application/json`
* **Реализация:** Запрос отправляется внутри хука `useEffect` в компоненте `Billionaires.jsx` с использованием встроенного метода `fetch`. Полученный JSON-массив обрабатывается и рендерится методом `.map()`.

### 2. Модуль «Курсы валют ЦБ РФ»
* **Эндпоинт:** `https://www.cbr-xml-daily.ru/daily_json.js`
* **HTTP Метод:** `GET`
* **Реализация:** Используется библиотека `axios`. Данные парсятся на лету, извлекаются значения `Value` для USD и EUR и выводятся в шапку сайта.

### 3. Модуль «Погода по геолокации»
* **Эндпоинт:** `https://api.openweathermap.org/data/2.5/weather`
* **HTTP Метод:** `GET`
* **Параметны:** `lat` (широта), `lon` (долгота), `appid` (токен доступа).
* **Реализация:** Координаты определяются на стороне клиента через браузер, после чего `axios` делает запрос к OpenWeatherMap, переводя температуру из Кельвинов в Цельсии.

---

## 📊 Структура данных (JSON-схемы)

### 1. Модель задачи внутри LocalStorage
```json
{
  "id": "9-значный уникальный хэш",
  "task": "Текст задачи, введенный пользователем",
  "complete": false
}
