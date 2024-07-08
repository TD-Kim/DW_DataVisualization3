import './LocaleSelect.css';
import { useLocale, useSetLocale } from './contexts/LocaleConext';

function LocaleSelect(props) {
//   const {locale, setLocale} = useContext(LocaleContext);
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handleChange = (e) => {
    setLocale(e.target.value);
  }
  
  return (
    <select className='LocaleSelect' value={locale} onChange={handleChange}>
      <option value='ko'>한국어</option>
      <option value='en'>English</option>
    </select>
  );
}

export default LocaleSelect;
