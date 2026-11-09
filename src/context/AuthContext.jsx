import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TOKEN_STORAGE_KEY = "argc_auth_token";
const USER_STORAGE_KEY = "argc_auth_user";

const AuthContext = createContext(null);

const getStoredSession = () => {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!token || !storedUser) {
      return { token: null, user: null };
    }

    return {
      token,
      user: JSON.parse(storedUser),
    };
  } catch {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(getStoredSession);

  useEffect(() => {
    const syncSession = (event) => {
      if (
        event.key === TOKEN_STORAGE_KEY ||
        event.key === USER_STORAGE_KEY ||
        event.key === null
      ) {
        setSession(getStoredSession());
      }
    };

    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  const login = (token, user) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setSession({ token, user });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setSession({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      token: session.token,
      user: session.user,
      isLoggedIn: Boolean(session.token && session.user),
      login,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
};
