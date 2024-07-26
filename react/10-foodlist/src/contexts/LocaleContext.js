import { createContext, useContext, useState } from 'react';

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('ko');

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.');
  }
  return context.locale;
}
export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.');
  }
  return context.setLocale;
}
