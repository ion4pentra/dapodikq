import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "../lib/auth";
import type { User } from "../types/schema";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const session = await auth.getSession();
        setIsAuthenticated(!!session);

        if (session) {
          const userData = await auth.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = auth.onAuthStateChange(
      async (event, session) => {
        setIsAuthenticated(!!session);

        if (session) {
          const userData = await auth.getCurrentUser();
          setUser(userData);
        } else {
          setUser(null);
        }

        setIsLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Special case for demo credentials
      if (email === "smp01laki@gmail.com" && password === "P4$$word") {
        // Simulate a successful login
        setIsAuthenticated(true);
        setUser({
          id: "demo-user-id",
          email: email,
          full_name: "Admin Demo",
          role: "admin",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        return { user: { email } };
      }

      // Regular Supabase authentication
      const result = await auth.signIn(email, password);
      return result;
    } catch (error: any) {
      console.error("Authentication error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      return await auth.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    return auth.resetPassword(email);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
