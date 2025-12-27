import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './MakingTest.css';

const TestResult = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  // данные для результатов теста
  const [testResult, setTestResult] = useState({
    testId: parseInt(testId),
    testTitle: 'Математика: основы',
    totalQuestions: 3,
    correctAnswers: 2,
    wrongAnswers: 1,
    dateCompleted: '15-12-2025',
    
    // детализация по вопросам (без explanation)
    questionDetails: [
      {
        id: 1,
        question: 'Сколько будет 2 + 2?',
        userAnswer: '4',
        correctAnswer: '4',
        isCorrect: true
      },
      {
        id: 2,
        question: 'Сколько будет 5 × 3?',
        userAnswer: '20',
        correctAnswer: '15',
        isCorrect: false
      },
      {
        id: 3,
        question: 'Сколько будет 12 ÷ 4?',
        userAnswer: '3',
        correctAnswer: '3',
        isCorrect: true
      }
    ],
    
    // сравнение с другими пользователями
    comparisonData: {
      highestScore: 100,
      totalParticipants: 1250,
      scoreDistribution: [
        { range: '0-20%', count: 50 },
        { range: '21-40%', count: 180 },
        { range: '41-60%', count: 350 },
        { range: '61-80%', count: 420 },
        { range: '81-100%', count: 250 }
      ]
    }
  });

  // рассчитываем проценты на основе правильных ответов
  const calculateScore = () => {
    const userScore = Math.round((testResult.correctAnswers / testResult.totalQuestions) * 100);
    const totalPoints = userScore; // Баллы равны проценту, так как максимум 100
    
    return {
      userScore,
      totalPoints
    };
  };

  const [activeTab, setActiveTab] = useState('overview');
  const { userScore, totalPoints } = calculateScore();

  // в финальной версии приложения здесь был бы запрос к API
  useEffect(() => {
    // fetchTestResult(testId);
  }, [testId]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* навигация */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 text-violet-700 bg-white border-2 border-violet-300 rounded-xl hover:bg-violet-50 transition-all"
          >
            <span className="mr-2">←</span> Назад
          </button>
          <Link
            to="/user"
            className="px-4 py-2 text-violet-700 bg-white border-2 border-violet-300 rounded-xl hover:bg-violet-50 transition-all"
          >
            В профиль
          </Link>
          <button
            onClick={() => navigate(`/test/${testId}`)}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all"
          >
            Пройти еще раз
          </button>
        </div>

        {/* основной заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-violet-900 mb-2">
            Результаты теста
          </h1>
          <h2 className="text-xl md:text-2xl text-violet-700 font-medium">
            {testResult.testTitle}
          </h2>
          <p className="text-violet-600 mt-2">
            Завершен: {testResult.dateCompleted}
          </p>
        </div>

        {/* основные метрики - теперь 2 блока вместо 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* процент правильных ответов */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-violet-800">Правильных ответов</h3>
              <div className={`px-3 py-1 rounded-full ${getScoreBgColor(userScore)} ${getScoreColor(userScore)} font-bold`}>
                {userScore}%
              </div>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-violet-100">
                <div
                  style={{ width: `${userScore}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    userScore >= 80 ? 'bg-green-500' : 
                    userScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                ></div>
              </div>
            </div>
            <p className="text-violet-600 text-sm">
              {testResult.correctAnswers} из {testResult.totalQuestions} вопросов
            </p>
          </div>

          {/* баллы */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-violet-800">Заработанные баллы</h3>
              <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-bold">
                {totalPoints}/100
              </div>
            </div>
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-violet-900 mb-2">
                {totalPoints}
              </div>
              <p className="text-violet-600">из 100 возможных</p>
            </div>
          </div>
        </div>

        {/* табы для переключения между обзором и ответами */}
        <div className="mb-8">
          <div className="flex border-b border-violet-200">
            <button
              className={`px-6 py-3 font-medium text-lg ${activeTab === 'overview' ? 'text-violet-700 border-b-2 border-violet-600' : 'text-violet-500 hover:text-violet-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Сравнение с другими
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg ${activeTab === 'answers' ? 'text-violet-700 border-b-2 border-violet-600' : 'text-violet-500 hover:text-violet-700'}`}
              onClick={() => setActiveTab('answers')}
            >
              Ваши ответы ({testResult.totalQuestions})
            </button>
          </div>

          {/* контент табов */}
          <div className="mt-6">
            {activeTab === 'overview' ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-200">
                <h3 className="text-2xl font-bold text-violet-900 mb-6">Сравнение с другими участниками</h3>
                
                {/* статистика - только лучший результат и общее количество участников */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-violet-50 rounded-xl p-5">
                    <p className="text-violet-600 mb-2">Лучший результат</p>
                    <p className="text-3xl font-bold text-violet-900">
                      {testResult.comparisonData.highestScore}%
                    </p>
                    <p className="text-sm text-violet-500 mt-1">рекорд теста</p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-5">
                    <p className="text-violet-600 mb-2">Всего участников</p>
                    <p className="text-3xl font-bold text-violet-900">
                      {testResult.comparisonData.totalParticipants}
                    </p>
                    <p className="text-sm text-violet-500 mt-1">прошли этот тест</p>
                  </div>
                </div>

                {/* распределение результатов */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-violet-800 mb-4">Распределение результатов</h4>
                  <div className="space-y-4">
                    {testResult.comparisonData.scoreDistribution.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-24 text-violet-700 font-medium">{item.range}</span>
                        <div className="flex-1 ml-4">
                          <div 
                            className="h-6 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                            style={{ 
                              width: `${(item.count / testResult.comparisonData.totalParticipants) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="ml-4 text-violet-700 font-medium w-12 text-right">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* информация о вашем результате */}
                <div className="mt-8 pt-6 border-t border-violet-200">
                  <h4 className="text-xl font-bold text-violet-800 mb-4">Ваш результат</h4>
                  <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-violet-100 to-purple-100 p-6 rounded-xl">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                      <p className="text-violet-600 mb-1">Ваш процент правильных ответов</p>
                      <p className="text-3xl font-bold text-violet-900">
                        {userScore}%
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-bold">
                        {userScore}% правильных ответов
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-200">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-violet-900">Ваши ответы</h3>
                </div>

                <div className="space-y-6">
                  {testResult.questionDetails.map((question) => (
                    <div
                      key={question.id}
                      className={`p-5 rounded-xl border ${
                        question.isCorrect
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start mb-4">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 ${
                          question.isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        } font-bold`}>
                          {question.id}
                        </div>
                        <h4 className="text-lg font-medium text-violet-800 flex-1">
                          {question.question}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg ${
                          question.isCorrect
                            ? 'bg-green-100 border border-green-200'
                            : 'bg-red-100 border border-red-200'
                        }`}>
                          <p className="text-sm text-violet-600 mb-1">Ваш ответ</p>
                          <p className={`font-medium ${
                            question.isCorrect ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {question.userAnswer}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-violet-100 border border-violet-200">
                          <p className="text-sm text-violet-600 mb-1">Правильный ответ</p>
                          <p className="font-medium text-violet-800">{question.correctAnswer}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* статистика по ответам */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-violet-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {testResult.correctAnswers}
                      </div>
                      <p className="text-violet-600 text-sm">Правильных</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {testResult.wrongAnswers}
                      </div>
                      <p className="text-violet-600 text-sm">Неправильных</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-violet-600">
                        {testResult.totalQuestions}
                      </div>
                      <p className="text-violet-600 text-sm">Всего вопросов</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-violet-600">
                        {userScore}%
                      </div>
                      <p className="text-violet-600 text-sm">Точность</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* дополнительные действия */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => navigate(`/test/${testId}`)}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all font-medium"
          >
            Пройти тест еще раз
          </button>
          <button
            onClick={() => navigate('/user')}
            className="px-6 py-3 bg-white text-violet-700 border-2 border-violet-300 rounded-xl hover:bg-violet-50 transition-all font-medium"
          >
            К списку тестов
          </button>
        </div>

        {/* подсказка */}
        <div className="bg-gradient-to-r from-violet-100 to-indigo-100 rounded-2xl p-6 text-center">
          <p className="text-violet-700">
            <span className="font-bold">Совет:</span> Попробуйте пройти тест еще раз для закрепления знаний.
            Повторение — ключ к успеху!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestResult;