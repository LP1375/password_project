import React from "react";

const Main = () => {
  const [password, setPassword] = React.useState("");
  const [strength, setStrength] = React.useState("");
  const [recommendations, setRecommendations] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false); // Статус видимості пароля

  // Функція для оцінки сили пароля
  const evaluateStrength = (password) => {
    let score = 0;
    const recommendations = [];

    // Критерії для оцінки пароля
    if (password.length >= 8) {
      score++;
    } else {
      recommendations.push("Hasło musi mieć co najmniej 8 znaków.");
    }

    if (/[A-Z]/.test(password)) {
      score++;
    } else {
      recommendations.push("Dodaj przynajmniej jedną dużą literę.");
    }

    if (/[a-z]/.test(password)) {
      score++;
    } else {
      recommendations.push("Dodaj przynajmniej jedną małą literę.");
    }

    if (/\d/.test(password)) {
      score++;
    } else {
      recommendations.push("Dodaj przynajmniej jedną cyfrę.");
    }

    if (/[@#$%^&*!]/.test(password)) {
      score++;
    } else {
      recommendations.push("Dodaj przynajmniej jeden znak specjalny (@, #, $, % itp.).");
    }

    setRecommendations(recommendations);

    // Оцінка сили пароля на основі кількості виконаних критеріїв
    switch (score) {
      case 5:
        return "Silne";
      case 4:
        return "Dobre";
      case 3:
        return "Średnie";
      case 2:
        return "Słabe";
      default:
        return "Bardzo słabe";
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setStrength(evaluateStrength(input));
  };

  // Функція для перемикання видимості пароля
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Викликаємо evaluateStrength одразу при завантаженні сторінки для відображення всіх критеріїв
  React.useEffect(() => {
    evaluateStrength(""); // Оцінка порожнього пароля, щоб вивести всі критерії
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Analiza bezpieczeństwa hasła</h1>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Перемикаємо тип в залежності від стану
            placeholder="Wprowadź hasło"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "Ukryj" : "Pokaż"} {/* Кнопка для перемикання видимості */}
          </button>
        </div>

        <div className="mb-4">
          <strong>Siła hasła:</strong>
          <div className="w-full h-2 bg-gray-300 rounded mt-2">
            <div
              className={`h-full rounded ${
                strength === "Silne"
                  ? "bg-green-500 w-full"
                  : strength === "Dobre"
                  ? "bg-blue-500 w-4/5"
                  : strength === "Średnie"
                  ? "bg-yellow-500 w-3/5"
                  : strength === "Słabe"
                  ? "bg-orange-500 w-2/5"
                  : "bg-red-500 w-1/5"
              }`}
            ></div>
          </div>
          <p className="mt-2 text-sm">{strength}</p>
        </div>

        <div className="mb-4">
          <strong>Zalecenia:</strong>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => <li key={index}>{rec}</li>)
            ) : (
              <li>Twoje hasło spełnia wszystkie wymagania bezpieczeństwa.</li>
            )}
          </ul>
        </div>

        <p className="text-sm text-gray-600">
          * Twórz mocne hasła: używaj liter, cyfr i znaków specjalnych.
        </p>

        <div className="mt-4 text-gray-700 text-sm">
          <strong>Typowe błędy:</strong>
          <ul className="list-disc list-inside mt-2">
            <li>Używanie łatwych haseł, takich jak "123456" lub "hasło".</li>
            <li>Używanie danych osobowych, takich jak imię lub data urodzenia.</li>
            <li>Powtarzanie tego samego hasła w różnych serwisach.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
