# Задание 1.2 — Оплата через Robokassa (React)

React-приложение, которое формирует подписанную платёжную ссылку и вызывает
API Robokassa. Использует тестовый режим демо-магазина — регистрация не нужна.

## Как работает
1. Пользователь вводит сумму, номер заказа и описание.
2. Приложение считает подпись `SignatureValue = MD5(MerchantLogin:OutSum:InvId:Пароль#1)`.
3. Формируется ссылка на `https://auth.robokassa.ru/Merchant/Index.aspx` с параметром
   `IsTest=1` (тестовый режим, реальные деньги не списываются).
4. Кнопка «Оплатить» переадресует на платёжную страницу Robokassa,
   кнопка «Показать ссылку» выводит готовый URL.

Реквизиты демо-магазина (`demo` / `password_1`) взяты из официальной документации
Robokassa и заданы в `src/App.jsx`. Для своего магазина их нужно заменить.

## Стек
- React 18
- Vite (сборка и dev-сервер)
- crypto-js (расчёт MD5-подписи в браузере)

## Запуск
```bash
npm install
npm run dev
```
Приложение откроется на `http://localhost:5173/`.

## Сборка
```bash
npm run build
```

## Публикация на GitHub
```bash
git init
git add .
git commit -m "Задание 1.2: оплата через Robokassa на React"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/НАЗВАНИЕ_РЕПО.git
git push -u origin main
```
