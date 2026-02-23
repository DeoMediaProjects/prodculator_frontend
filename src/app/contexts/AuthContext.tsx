import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService as supabaseAuthService, AuthUser as SupabaseAuthUser } from '@/services/auth.service';

// Admin permission levels
export type AdminRole = 'master_admin' | 'senior_admin' | 'data_admin' | 'support_admin';

export interface AdminPermissions {
  canManageAdmins: boolean;
  canViewBusinessMetrics: boolean;
  canEditIncentiveData: boolean;
  canEditCrewCosts: boolean;
  canEditComparables: boolean;
  canManageDataSources: boolean;
  canManageEmailGating: boolean;
  canManagePDFReports: boolean;
  canViewPlatformEconomics: boolean;
}

interface User {
  email: string;
  plan: 'free' | 'single' | 'studio';
  reportsUsed: number;
  reportsLimit: number;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: AdminPermissions;
  createdAt: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  hasUsedFreeReport: (email: string) => boolean;
  markFreeReportUsed: (email: string) => void;
  
  // User auth
  userLogin: (email: string, password: string) => Promise<boolean>;
  userSignup: (userData: any) => Promise<boolean>;
  userLogout: () => void;
  
  // Admin auth
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  hasAdminPermission: (permission: keyof AdminPermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Permission presets for each role
const ROLE_PERMISSIONS: Record<AdminRole, AdminPermissions> = {
  master_admin: {
    canManageAdmins: true,
    canViewBusinessMetrics: true,
    canEditIncentiveData: true,
    canEditCrewCosts: true,
    canEditComparables: true,
    canManageDataSources: true,
    canManageEmailGating: true,
    canManagePDFReports: true,
    canViewPlatformEconomics: true,
  },
  senior_admin: {
    canManageAdmins: false,
    canViewBusinessMetrics: true,
    canEditIncentiveData: true,
    canEditCrewCosts: true,
    canEditComparables: true,
    canManageDataSources: true,
    canManageEmailGating: true,
    canManagePDFReports: true,
    canViewPlatformEconomics: true,
  },
  data_admin: {
    canManageAdmins: false,
    canViewBusinessMetrics: false,
    canEditIncentiveData: true,
    canEditCrewCosts: true,
    canEditComparables: true,
    canManageDataSources: false,
    canManageEmailGating: false,
    canManagePDFReports: false,
    canViewPlatformEconomics: false,
  },
  support_admin: {
    canManageAdmins: false,
    canViewBusinessMetrics: false,
    canEditIncentiveData: false,
    canEditCrewCosts: false,
    canEditComparables: false,
    canManageDataSources: false,
    canManageEmailGating: true,
    canManagePDFReports: true,
    canViewPlatformEconomics: false,
  },
};

// Mock admin users (in production, this would be in a database)
const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: '1',
    email: 'admin@prodculator.com',
    name: 'Master Administrator',
    role: 'master_admin',
    permissions: ROLE_PERMISSIONS.master_admin,
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    email: 'senior@prodculator.com',
    name: 'Senior Admin',
    role: 'senior_admin',
    permissions: ROLE_PERMISSIONS.senior_admin,
    createdAt: '2025-01-05',
  },
  {
    id: '3',
    email: 'data@prodculator.com',
    name: 'Data Admin',
    role: 'data_admin',
    permissions: ROLE_PERMISSIONS.data_admin,
    createdAt: '2025-01-10',
  },
  {
    id: '4',
    email: 'support@prodculator.com',
    name: 'Support Admin',
    role: 'support_admin',
    permissions: ROLE_PERMISSIONS.support_admin,
    createdAt: '2025-01-15',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usedEmails, setUsedEmails] = useState<Set<string>>(new Set());
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const currentUser = await supabaseAuthService.getCurrentUser();
      if (currentUser) {
        setUser({
          email: currentUser.email,
          plan: currentUser.plan || 'free',
          reportsUsed: 0, // TODO: fetch from database
          reportsLimit: currentUser.credits_remaining || 0,
        });
      }
    };
    checkSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabaseAuthService.onAuthStateChange((user) => {
      if (user) {
        setUser({
          email: user.email,
          plan: user.plan || 'free',
          reportsUsed: 0,
          reportsLimit: user.credits_remaining || 0,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const hasUsedFreeReport = (email: string): boolean => {
    return usedEmails.has(email.toLowerCase());
  };

  const markFreeReportUsed = (email: string): void => {
    setUsedEmails(prev => new Set(prev).add(email.toLowerCase()));
  };

  const userLogin = async (email: string, password: string): Promise<boolean> => {
    const { user: authUser, error } = await supabaseAuthService.signIn(email, password);
    
    if (error || !authUser) {
      console.error('Login error:', error);
      return false;
    }

    setUser({
      email: authUser.email,
      plan: authUser.plan || 'free',
      reportsUsed: 0,
      reportsLimit: authUser.credits_remaining || 0,
    });
    
    return true;
  };

  const userSignup = async (userData: { 
    email: string; 
    password: string; 
    name?: string; 
    company?: string; 
    role?: string; 
  }): Promise<boolean> => {
    const { user: authUser, error } = await supabaseAuthService.signUp(
      userData.email,
      userData.password,
      {
        name: userData.name,
        company: userData.company,
        role: userData.role,
      }
    );

    if (error || !authUser) {
      console.error('Signup error:', error);
      return false;
    }

    setUser({
      email: authUser.email,
      plan: authUser.plan || 'free',
      reportsUsed: 0,
      reportsLimit: authUser.credits_remaining || 0,
    });

    return true;
  };

  const userLogout = async () => {
    await supabaseAuthService.signOut();
    setUser(null);
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    // For demo purposes, any password works
    const foundAdmin = MOCK_ADMIN_USERS.find(
      admin => admin.email.toLowerCase() === email.toLowerCase()
    );

    if (foundAdmin) {
      setAdminUser({
        ...foundAdmin,
        lastLogin: new Date().toISOString(),
      });
      return true;
    }

    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
  };

  const hasAdminPermission = (permission: keyof AdminPermissions): boolean => {
    if (!adminUser) return false;
    return adminUser.permissions[permission] === true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        hasUsedFreeReport,
        markFreeReportUsed,
        userLogin,
        userSignup,
        userLogout,
        adminUser,
        isAdminAuthenticated: !!adminUser,
        adminLogin,
        adminLogout,
        hasAdminPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export { ROLE_PERMISSIONS, MOCK_ADMIN_USERS };
export type { AdminUser };