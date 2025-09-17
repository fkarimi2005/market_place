import React, { useState } from 'react';

const Footer: React.FC = () => {
    const [modalContent, setModalContent] = useState<string | null>(null);
    const [modalTitle, setModalTitle] = useState<string>('');

    const openModal = (content: string, title: string) => {
        setModalContent(content);
        setModalTitle(title);
    };

    const closeModal = () => {
        setModalContent(null);
        setModalTitle('');
    };

    // Функция для открытия Telegram чата
    const openTelegramChat = () => {
        window.open('https://t.me/store_tj', '_blank');
    };

    // Функция для отправки email
    const sendEmail = () => {
        window.location.href = 'mailto:info@store.tj?subject=Вопрос о магазине Store';
    };

    // Функция для совершения звонка
    const makeCall = () => {
        window.location.href = 'tel:+992900000000';
    };

    // Функция для открытия адреса на карте
    const openMap = () => {
        window.open('https://yandex.ru/maps/10335/dushanbe/?text=г. Душанбе, пр. Рудаки, 1', '_blank');
    };

    // Контент для модальных окон
    const modalContents = {
        howToOrder: `Как заказать товар в нашем магазине:
        
        1. Выберите понравившийся товар в каталоге
        2. Нажмите кнопку "Добавить в корзину"
        3. Перейдите в корзину, нажав на иконку корзины в правом верхнем углу
        4. Заполните форму заказа вашими контактными данными
        5. Выберите удобный способ доставки и оплаты
        6. Подтвердите заказ
        
        После оформления заказа с вами свяжется наш менеджер для подтверждения.`,

        delivery: `Условия доставки и оплаты по Таджикистану:
        
        • Доставка по Душанбе - бесплатно при заказе от 300 сомони
        • Доставка в регионы:
          - Худжанд, Бохтар, Куляб - 50 сомони
          - Хорог, Пенджикент, Турсунзаде - 70 сомони
          - Другие города - от 80 сомони
        • Курьерская доставка - 30 сомони
        • Самовывоз: г. Душанбе, пр. Рудаки, 1 (с 9:00 до 18:00)
        
        Способы оплаты:
        • Наличными курьеру
        • Перевод на карту
        • Оплата через терминал`,

        returns: `Условия возврата товара:
        
        • Возврат товара возможен в течение 14 дней с момента покупки
        • Товар должен быть в оригинальной упаковке без повреждений
        • Должны быть сохранены все ярлыки и бирки
        • Необходимо предоставить чек или иное подтверждение покупки
        • Технически сложные товары возврату не подлежат
        
        Для оформления возврата свяжитесь с нами по телефону или через Telegram.`,

        rights: `Все права защищены.
        
        © 2024 Store. Весь материал на сайте является интеллектуальной собственностью интернет-магазина.
        Копирование и использование материалов без письменного разрешения запрещено.`
    };

    return (
        <>
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">Store TJ</h3>
                            <p className="text-gray-300 mb-4">
                                Ваш надежный интернет-магазин в Таджикистане с широким ассортиментом товаров
                                по выгодным ценам. Доставляем по всему Таджикистану!
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={openTelegramChat}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                    </svg>
                                    Написать в Telegram
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Покупателям</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => openModal(modalContents.howToOrder, "Как заказать")}
                                        className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                                    >
                                        Как заказать
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => openModal(modalContents.delivery, "Доставка и оплата")}
                                        className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                                    >
                                        Доставка и оплата
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => openModal(modalContents.returns, "Возврат товара")}
                                        className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                                    >
                                        Возврат товара
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={sendEmail}
                                        className="text-gray-300 hover:text-white transition-colors cursor-pointer flex items-start"
                                    >
                                        <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                                        </svg>
                                        <span>info@store.tj</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={makeCall}
                                        className="text-gray-300 hover:text-white transition-colors cursor-pointer flex items-start"
                                    >
                                        <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.458 1.467-1.395 1.14-2.264 1.902-3.236 1.766-1.175-.164-2.631-1.036-3.482-1.786-1.924-1.678-3.595-4.534-4.303-6.797-.998-2.707.286-4.189 1.411-4.189.359 0 .707.119 1.038.343.646.438 1.460 1.07 2.021 1.363.359.183.753.275 1.158.275.533 0 1.036-.208 1.41-.576 1.382-1.379 2.766-2.758 4.146-4.141.509-.508.946-.942 1.342-1.363.403-.428.92-.654 1.435-.654.265 0 .516.052.758.155.466.199.842.67 1.021 1.153l2.105 6.086c.162.468.247 1 .247 1.515 0 1.495-.679 2.914-1.639 3.855-.673.672-1.301 1.318-1.959 1.958-.202.193-.419.380-.645.552-.715.544-1.466 1.015-2.173 1.015-.222 0-.439-.034-.650-.101-.655-.211-1.330-.634-1.952-1.057-.472-.323-.915-.668-1.354-1.008-.131-.101-.279-.206-.432-.306.021.037.049.071.075.107l3.576 6.902z"/>
                                        </svg>
                                        <span>+992 (900) 00-00-00</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={openTelegramChat}
                                        className="text-gray-300 hover:text-white transition-colors cursor-pointer flex items-start"
                                    >
                                        <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                        </svg>
                                        <span>@store_tj</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={openMap}
                                        className="text-gray-300 hover:text-white transition-colors cursor-pointer flex items-start"
                                    >
                                        <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                                        </svg>
                                        <span>г. Душанбе, пр. Рудаки, 1</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <button
                            onClick={() => openModal(modalContents.rights, "Правовая информация")}
                            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                        >
                            &copy; 2024 Store TJ. Все права защищены.
                        </button>
                    </div>
                </div>
            </footer>

            {/* Модальное окно */}
            {modalContent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{modalTitle}</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="text-gray-600 whitespace-pre-line">
                            {modalContent}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;