import { useState } from 'react';
import './MakingTest.css';

const MakingTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-100 p-4 md:p-6 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* шапка */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl text-violet-900 font-bold">Создание теста</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 text-violet-700 font-bold border-2 border-violet-300 rounded-xl hover:bg-violet-400 hover:text-white hover:border-violet-500 transition-all duration-200">
              Отмена
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-700 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200">
              Сохранить тест
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* левая колонка - основная информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* блок основной информации */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-violet-900 mb-6">Основная информация</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-semibold text-violet-800 mb-2">
                    Название теста *
                  </label>
                  <input
                    type="text"
                    placeholder="Введите название теста..."
                    className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-violet-800 mb-2">
                    Описание теста
                  </label>
                  <textarea
                    placeholder="Опишите ваш тест..."
                    className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-all duration-200 h-32"
                  />
                </div>

                {/* категории, потом поменяем */}
                <div>
                  <label className="block text-lg font-semibold text-violet-800 mb-2">
                    Категория
                  </label>
                  <select className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-all duration-200 bg-white">
                    <option value="Общий">Общий</option>
                    <option value="Математика">Математика</option>
                    <option value="История">История</option>
                    <option value="Развлечение">Развлечение</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>
              </div>
            </div>

            {/* редактор текущего вопроса */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-violet-900">
                  Вопрос 1
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-violet-700 font-medium">Баллов за вопрос:</span>
                  <input
                    type="number"
                    min="1"
                    value="1"
                    className="w-20 p-2 border-2 border-violet-200 rounded-lg text-center focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-violet-800 mb-3">
                  Текст вопроса *
                </label>
                <textarea
                  placeholder="Введите текст вопроса..."
                  className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl h-32 focus:border-violet-500 focus:outline-none transition-all duration-200"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-semibold text-violet-800">
                    Варианты ответов *
                  </label>
                  <button className="px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-all duration-200">
                    + Добавить вариант
                  </button>
                </div>

                <div className="space-y-4">
                  {/* вариант ответа 1 */}
                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 whitespace-nowrap">
                        ✓ Верный
                      </button>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Текст варианта 1..."
                          className="w-full p-4 text-lg border-2 border-green-500 bg-green-50 rounded-xl focus:outline-none transition-all duration-200"
                        />
                      </div>
                      <button className="mt-3 px-4 py-2 text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-all duration-200">
                        Удалить
                      </button>
                    </div>
                  </div>

                  {/* вариант ответа 2 */}
                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <button className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 whitespace-nowrap">
                        Отметить верным
                      </button>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Текст варианта 2..."
                          className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-all duration-200"
                        />
                      </div>
                      <button className="mt-3 px-4 py-2 text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-all duration-200">
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  <span className="text-red-500">*</span> Обязательные поля
                </p>
              </div>
            </div>
          </div>

          {/* правая колонка - панель управления */}
          <div className="space-y-6">
            {/* панель навигации по вопросам */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-violet-900">Вопросы (1)</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white font-medium rounded-xl hover:shadow-gray-400 hover:shadow-md transition-all duration-200">
                  + Добавить вопрос
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {/* Вопрос 1 */}
                <div className="p-4 rounded-xl border-2 bg-violet-100 border-violet-500 transition-all duration-200 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center">
                        1
                      </div>
                      <span className="font-medium text-violet-800 truncate">
                        Вопрос 1
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-violet-600">1 балл</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    1 верный ответ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakingTest;