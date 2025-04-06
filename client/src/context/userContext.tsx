import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Token, User } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";

interface UserContextType {
  user: Token | null;
  token: string | null;
  setToken: (token: string | null) => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Token | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const isAdmin = user ? user.isAdmin : false;

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode<Token>(token);
          setUser(decodedToken);
        } catch (err) {
          console.error("Failed to load user:", err);
        }
      }
    };

    loadUser();
  }, [token]);

  const value = {
    user,
    token,
    isAdmin,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
