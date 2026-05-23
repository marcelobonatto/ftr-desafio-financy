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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  if (!token || isTokenExpired(token)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);

  if (token && !isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

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
