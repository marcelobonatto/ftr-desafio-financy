import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "./pages/Dashboard";
import { TransactionsPage } from "./pages/Transactions";
import { CategoriesPage } from "./pages/Categories";
import { ProfilePage } from "./pages/Profile";
import { LoginPage } from "./pages/Auth/Login";
import { SignupPage } from "./pages/Auth/Signup";
import { Layout } from "./components/Layout";
import { useAuthStore } from "@/stores/auth";
import { isTokenExpired } from "./utils";

// Define a rota protegida que requer autenticação.
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Obtém o token e a função de logout do store de autenticação.
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  // Verifica se o token é inválido ou expirado.
  if (!token || isTokenExpired(token)) {
    // Se o token for inválido ou expirado, faz logout.
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Define a rota pública que não requer autenticação.
function PublicRoute({ children }: { children: React.ReactNode }) {
  // Obtém o token do store de autenticação.
  const token = useAuthStore((s) => s.token);

  // Verifica se o token é válido e não expirado.
  if (token && !isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Definições iniciais do site
// <Layout>Layout</Layout> é usado para envolver todas as rotas com o layout padrão.
// <Routes>Routes</Routes> é usado para definir as rotas da aplicação.
// <ProtectedRoute>ProtectedRoute</ProtectedRoute> é usado para proteger as rotas que requerem autenticação.
// <PublicRoute>PublicRoute</PublicRoute> é usado para definir as rotas públicas que não requerem autenticação.
// As rotas disponíveis são:
//// Dashboard: rota protegida que exibe o dashboard com os resultados financeiros.
//// Transactions: rota protegida que exibe as transações.
//// Categories: rota protegida que exibe as categorias.
//// Profile: rota protegida que exibe o perfil de usuário.
//// Login: rota pública que exibe a página de login.
//// Signup: rota pública que redireciona para a página que permite o autocadastro.
function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
