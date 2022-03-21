import NextLink from 'next/link'
import { linkResolver } from 'prismicConfiguration'
import styles from './LanguageSwitcher.module.scss'
import { useComponentVisible } from '@hooks/index';
import { AppContext } from 'context/AppContext';
import { useContext } from 'react';
import { Icons } from '@components/index';

const LanguageSwitcher = ({ altLangs, currentLang }) => {

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const { setUserLang } = useContext(AppContext);

  const getCountryName = val => {

    if(val === 'en-us') {
      return 'Englisch'
    }
    if(val === 'de-de') {
      return 'Deutsch'
    }
  }

  const getCountryCode = val => {
      return val.slice(-2).toLowerCase()
  }



  const handleClick = altLang => {
    setIsComponentVisible(false)
    setUserLang(altLang)
  }

    return (

      <div 
        className={styles.container}
        ref={ref}
      >
          <span            
            className={styles.current}
            onClick={() => setIsComponentVisible(!isComponentVisible)}
          >
            {getCountryName(currentLang)}
          </span>

          {isComponentVisible &&
            <div className={styles.list}>
              { altLangs.map((altLang) => (
                <NextLink
                  key={altLang.id}
                  locale={altLang.lang}
                  href={linkResolver(altLang)}
                  passHref
                >
                  <a onClick={() => handleClick(altLang.lang)}>
                    <>
                    {getCountryName(altLang.lang)}
                    <Icons
                      name={getCountryCode(altLang.lang)}
                      width={20}
                      height={16}
                    />
                    </>
                  </a>
                </NextLink>
              ))}
            </div>
          }

      </div>

    )
  }

export default LanguageSwitcher;