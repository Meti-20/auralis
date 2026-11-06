'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserProfile,
  UserPreferences,
  CurrencyCode,
  DateFormatOption,
  NumberFormatOption,
  InterfaceDensity,
} from '@/types';

export type {
  UserProfile,
  UserPreferences,
  CurrencyCode,
  DateFormatOption,
  NumberFormatOption,
  InterfaceDensity,
};

export interface UserContextType {
  profile: UserProfile;
  preferences: UserPreferences;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetDefaults: () => void;
  formatMoney: (amount: number, forceStandard?: boolean) => string;
  formatDate: (rawDate: string, displayDateFallback?: string) => string;
  isLoaded: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: 'Meti Jemal',
  firstName: 'Meti',
  email: 'meti@acmetech.io',
  companyName: 'Acme Technologies Inc.',
  initials: 'MJ',
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
};

const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'USD',
  currencySymbol: '$',
  dateFormat: 'MMM DD, YYYY',
  numberFormat: 'standard',
  density: 'comfortable',
  emailAlerts: true,
  weeklyDigest: true,
  burnAlertThreshold: '25000',
  aiGlow: true,
};

const STORAGE_KEY_PROFILE = 'auralis_user_profile_v2';
const STORAGE_KEY_PREFERENCES = 'auralis_user_preferences_v2';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (savedProfile) {
        setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(savedProfile) });
      }

      const savedPreferences = localStorage.getItem(STORAGE_KEY_PREFERENCES);
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({
          ...DEFAULT_PREFERENCES,
          ...parsed,
          currencySymbol: CURRENCY_SYMBOLS[parsed.currency as CurrencyCode] || '$',
        });
      }
    } catch (e) {
      console.warn('Could not load user profile from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      // Auto-compute firstName and initials if fullName was updated
      if (updates.fullName && !updates.firstName) {
        const parts = updates.fullName.trim().split(/\s+/);
        updated.firstName = parts[0] || 'User';
        if (!updates.initials) {
          updated.initials = parts
            .map((p) => p[0]?.toUpperCase())
            .slice(0, 2)
            .join('');
        }
      }
      try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save profile to localStorage:', e);
      }
      return updated;
    });
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...updates };
      if (updates.currency) {
        updated.currencySymbol = CURRENCY_SYMBOLS[updates.currency] || '$';
      }
      try {
        localStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save preferences to localStorage:', e);
      }
      return updated;
    });
  };

  const resetDefaults = () => {
    setProfile(DEFAULT_PROFILE);
    setPreferences(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem(STORAGE_KEY_PROFILE);
      localStorage.removeItem(STORAGE_KEY_PREFERENCES);
    } catch (e) {
      console.warn('Could not clear user storage:', e);
    }
  };

  const formatMoney = (amount: number, forceStandard = false): string => {
    const symbol = preferences.currencySymbol;
    const isNeg = amount < 0;
    const absVal = Math.abs(amount);

    if (!forceStandard && preferences.numberFormat === 'compact' && absVal >= 1000) {
      const formatted = (absVal / 1000).toFixed(1) + 'k';
      return `${isNeg ? '-' : ''}${symbol}${formatted}`;
    }

    const formatted = absVal.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${isNeg ? '-' : ''}${symbol}${formatted}`;
  };

  const formatDate = (rawDate: string, displayDateFallback?: string): string => {
    if (!rawDate) return displayDateFallback || '';
    try {
      const [year, month, day] = rawDate.split('-').map(Number);
      if (!year || !month || !day) return displayDateFallback || rawDate;

      const d = new Date(year, month - 1, day);
      if (preferences.dateFormat === 'YYYY-MM-DD') {
        return rawDate;
      }
      if (preferences.dateFormat === 'DD/MM/YYYY') {
        const dd = String(day).padStart(2, '0');
        const mm = String(month).padStart(2, '0');
        return `${dd}/${mm}/${year}`;
      }
      // 'MMM DD, YYYY'
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return displayDateFallback || rawDate;
    }
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        preferences,
        updateProfile,
        updatePreferences,
        resetDefaults,
        formatMoney,
        formatDate,
        isLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
