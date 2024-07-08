import { createContext, useContext, useState } from 'react';

// Context가 제공할 기본값을 만든다.
export const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = 'ko', children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// 매번 useContext와 LocaleContext 값을 가지고 사용하는것이 번거롭기 때문에
// 이것들을 대신할 수 있는 커스텀 Hook을 만든다.
// useLocale Hook은 locale 값을 전달해주고,
// useSetLocale 이라는 Hook은 setLocale 함수를 전달해주도록 한다.
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('반드시 LocaleProvier 안에서 사용해야 합니다.');
  }
  return context.locale;
}
export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('반드시 LocaleProvier 안에서 사용해야 합니다.');
  }
  return context.setLocale;
}
