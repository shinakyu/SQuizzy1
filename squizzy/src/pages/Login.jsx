import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './MakingTest.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Логин обязателен для заполнения';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен для заполнения';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Здесь будет API-запрос на вход
      // Пример:
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username: formData.username,
      //     password: formData.password
      //   })
      // });
      
      // имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // временная логика для демонстрации
      console.log('Данные для входа:', {
        username: formData.username
      });
      
      // сохраняем данные пользователя в localStorage (для демо)
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        isAuthenticated: true,
        lastLogin: new Date().toISOString()
      }));
      
      // показываем уведомление об успехе
      alert(`Вход выполнен успешно!\nДобро пожаловать, ${formData.username}!`);
      
      // перенаправляем на главную страницу
      navigate('/');
      
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Неверный логин или пароль. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToRegistration = () => {
    navigate('/register');
  };

  const handleCancel = () => {
    // проверяем, есть ли введенные данные
    if (formData.username || formData.password) {
      const confirmExit = window.confirm('У вас есть несохраненные данные. Вы уверены, что хотите отменить вход?');
      if (!confirmExit) return;
    }
    navigate('/');
  };

  return (
    <div className="login-page min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 flex items-center justify-center p-4 font-mono">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-violet-600 hover:text-violet-800 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Назад
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* шапка */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-violet-900 mb-2">SQuizzy</h1>
          <p className="text-gray-600">Войдите в свой аккаунт</p>
        </div>

        {/* форма входа */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-violet-900 mb-4 text-center">
              Вход в аккаунт
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* логин */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-violet-800">
                  Логин
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Введите ваш логин"
                    className={`w-full pl-10 pr-4 py-3.5 rounded-xl border-2 ${errors.username ? 'border-red-500 bg-red-50' : 'border-violet-200'} focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all duration-200`}
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* пароль */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-violet-800">
                  Пароль
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Введите ваш пароль"
                    className={`w-full pl-10 pr-12 py-3.5 rounded-xl border-2 ${errors.password ? 'border-red-500 bg-red-50' : 'border-violet-200'} focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all duration-200`}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-violet-700 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* кнопка входа */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 bg-gradient-to-r from-purple-600 to-violet-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-100'}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Вход...</span>
                  </div>
                ) : (
                  'Войти'
                )}
              </button>
            </form>

            {/* разделитель */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">или</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* ссылка на регистрацию */}
            <div className="text-center">
              <p className="text-gray-600">
                Нет аккаунта?{' '}
                <button
                  onClick={goToRegistration}
                  className="text-violet-600 hover:text-violet-800 font-semibold underline"
                >
                  Зарегистрироваться
                </button>
              </p>
            </div>
          </div>

          {/* декоративный элемент внизу формы */}
          <div className="h-2 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;