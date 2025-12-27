import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TestPage = () => {
  const { id } = useParams(); // получаем ID теста из URL
  const navigate = useNavigate();
  const [currQuestion, setCurrQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // данные
  const testData = {
    id: parseInt(id) || 1,
    title: 'Тест по математике',
    description: 'Проверьте свои знания в математике',
    questionsCount: 3,
    author: 'Математик',
    questions: [
      {
        id: 1,
        text: '2 + 2 = ?',
        points: 2,
        answers: [
          { id: 1, text: '4', isCorrect: true },
          { id: 2, text: '3', isCorrect: false },
          { id: 3, text: '5', isCorrect: false },
          { id: 4, text: '1', isCorrect: false }
        ]
      },
      {
        id: 2,
        text: '2 * 0 = ?',
        points: 2,
        answers: [
          { id: 1, text: '2', isCorrect: false },
          { id: 2, text: '0', isCorrect: true },
          { id: 3, text: '1', isCorrect: false },
          { id: 4, text: '20', isCorrect: false }
        ]
      },
      {
        id: 3,
        text: '3 * 3 * 0 = ?',
        points: 3,
        answers: [
          { id: 1, text: '0', isCorrect: true },
          { id: 2, text: '6', isCorrect: false },
          { id: 3, text: '9', isCorrect: false },
          { id: 4, text: '90', isCorrect: false }
        ]
      }
    ]
  };

  // обработчик выбора ответа
  const AnswerSelect = (answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currQuestion]: answerId
    }));
  };

  // переход к следующему вопросу
  const NextQuestion = () => {
    if (currQuestion < testData.questions.length - 1) {
      setCurrQuestion(prev => prev + 1);
    }
  };

  // переход к предыдущему вопросу
  const PrevQuestion = () => {
    if (currQuestion > 0) {
      setCurrQuestion(prev => prev - 1);
    }
  };

  // переход к конкретному вопросу
  const QuestionClick = (index) => {
    setCurrQuestion(index);
  };

  // завершение теста
  const FinishTest = () => {
    const confirmed = window.confirm('Вы уверены, что хотите завершить тест? После завершения изменить ответы будет невозможно.');
    if (confirmed) {
      navigate('/');
    }
  };

  // получение текущего вопроса
  const currQuestionData = testData.questions[currQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-100 p-4 md:p-6 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* шапка */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-50">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-violet-700 font-medium border-2 border-violet-300 rounded-xl hover:bg-violet-400 hover:text-white hover:border-violet-500 transition-all duration-200 flex items-center gap-2"
            >
              ← На главную
            </button>
            <h1 className="text-2xl md:text-3xl text-violet-900 font-bold">Прохождение теста</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* левая колонка - информация о тесте */}
          <div className="lg:col-span-3 space-y-6">
            {/* карточка теста */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-violet-700 font-bold">
                    {testData.id}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-violet-900 mb-1">{testData.title}</h2>
                  <p className="text-gray-600 text-sm">{testData.author}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm">{testData.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                  <span className="text-violet-700 font-medium text-sm">Вопросов:</span>
                  <span className="text-lg font-bold text-violet-900">{testData.questionsCount}</span>
                </div>
              </div>
            </div>

            {/* прогресс-бар */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-violet-900 mb-4">Прогресс</h3>
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currQuestion + 1) / testData.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center text-gray-600 text-sm">
                {currQuestion + 1} из {testData.questions.length}
              </div>
            </div>
          </div>

          {/* центральная колонка - вопросы */}
          <div className="lg:col-span-6 space-y-6">
            {/* блок текущего вопроса */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-violet-900">
                    Вопрос {currQuestion + 1}
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-4 py-2 bg-violet-100 text-violet-700 font-medium rounded-lg">
                       Баллов: {currQuestionData.points}
                    </span>
                    {/* <span className="text-gray-600">
                      ID: {currQuestionData.id}
                    </span> */}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-violet-700 font-medium">Статус:</span>
                  <span className={`px-4 py-2 rounded-lg ${selectedAnswers[currQuestion] ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {selectedAnswers[currQuestion] ? 'Отвечен' : 'Не отвечен'}
                  </span>
                </div>
              </div>

              {/* текст вопроса */}
              <div className="mb-5">
                <div className="p-4 bg-violet-50 rounded-xl border-2 border-violet-200">
                  <p className="text-2xl text-violet-800 font-medium">{currQuestionData.text}</p>
                </div>
              </div>

              {/* варианты ответов */}
              <div className="space-y-3">
                <h3 className="text-2xl font-medium text-violet-900 mb-4">Выберите ответ:</h3>
                
                {currQuestionData.answers.map((answer) => (
                  <div 
                    key={answer.id}
                    onClick={() => AnswerSelect(answer.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedAnswers[currQuestion] === answer.id
                      ? 'bg-gradient-to-r from-purple-50 to-violet-100 border-violet-500 shadow-lg'
                      : 'bg-white border-violet-200 hover:border-violet-300 hover:bg-violet-50'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${selectedAnswers[currQuestion] === answer.id
                        ? 'bg-violet-600 text-white'
                        : 'bg-violet-100 text-violet-700'
                      }`}>
                        <span className="text-xl font-bold">
                          {String.fromCharCode(64 + answer.id)} {/* A, B, C, D */}
                        </span>
                      </div>
                      <span className="text-xl">{answer.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* кнопки навигации */}
              <div className="flex justify-between mt-7 pt-8 border-t border-gray-200">
                <button
                  onClick={PrevQuestion}
                  disabled={currQuestion === 0}
                  className={`px-8 py-4 font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${currQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-violet-700 border-2 border-violet-300 hover:bg-violet-50 hover:shadow-md'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Предыдущий вопрос
                </button>

                {currQuestion === testData.questions.length - 1 ? (
                  <button
                    onClick={FinishTest}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-200"
                  >
                    Завершить тест
                  </button>
                ) : (
                  <button
                    onClick={NextQuestion}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-700 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-200"
                  >
                    Следующий вопрос
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* правая колонка - навигация и подсказки */}
          <div className="lg:col-span-3 space-y-6">
            {/* панель навигации по вопросам */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-violet-900 mb-4">Навигация</h3>
              
              <div className="grid grid-cols-4 gap-2">
                {testData.questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => QuestionClick(index)}
                    className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-200 ${index === currQuestion
                      ? 'bg-violet-600 text-white shadow-lg scale-105'
                      : selectedAnswers[index]
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-sm">{index + 1}</div>
                      <div className="text-xs mt-0.5">
                        {selectedAnswers[index] ? '✓' : '?'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gray-100"></div>
                  <span className="text-xs text-gray-600">Не отвечен</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-100"></div>
                  <span className="text-xs text-gray-600">Отвечен</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-violet-600"></div>
                  <span className="text-xs text-gray-600">Текущий</span>
                </div>
              </div>
            </div>

            {/* подсказки */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-violet-800 mb-2">Подсказки:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Выберите один вариант ответа</li>
                  <li>• Можно вернуться к предыдущим вопросам</li>
                  <li>• Используйте панель навигации для перехода</li>
                  <li>• После завершения нельзя изменить ответы</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;