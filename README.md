# 🛍️ E-Commerce Platform

Полнофункциональная платформа электронной коммерции на **NestJS + React + TypeScript**.

# 🚀 Основные возможности
- **Аутентификация**: JWT, роли (USER / ADMIN)  
- **Корзина**: Добавление/удаление товаров, синхронизация с бэкендом  
- **Управление товарами**: CRUD, фильтры, поиск, пагинация  
- **Админ-панель**: Управление категориями, заказами, аналитика  
- **Аналитика**: Выручка, средний чек, статистика заказов  
- **Загрузка файлов**: Поддержка мультипарт-запросов  

# 🛠️ Стек технологий
**Backend**: NestJS, PostgreSQL, Prisma, JWT, class-validator, multer  
**Frontend**: React 18, TypeScript, Redux Toolkit, React Router v6, Tailwind CSS, Axios  

# 📦 Установка
## 1. Клонирование
```bash
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform

# Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev

#Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev

# Backend .env
DATABASE_URL="postgresql://postgres:your_name@localhost:5432/db"
JWT_SECRET=my-very-secret-key-12345
JWT_EXPIRES_IN=3600
# для запуска:
для часть бэкенда : "http://localhost:3001"
для часть фронтенда: "http://localhost:3000"


