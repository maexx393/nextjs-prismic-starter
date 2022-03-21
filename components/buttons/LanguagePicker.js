import NextLink from 'next/link'
import { linkResolver } from 'prismicConfiguration'
import styles from './LanguagePicker.module.scss'
import { AppContext } from 'context/AppContext';
import { useContext } from 'react';
import { Icons } from '@components/index';

const LanguagePicker = ({ locales }) => {

  const { setUserLang } = useContext(AppContext);

  const getCountryName = val => {

    if(val === 'en-us') {
      return 'Englisch'
    }
    if(val === 'de-de') {
      return 'Deutsch'
    }
  }

  const getCountryCode = lang => {
      return lang.slice(-2).toLowerCase()
  }

  const handleClick = lang => {
    setUserLang(lang)
  }

    return (

      <div 
        className={styles.container}
      >

            <div className={styles.list}>


              { locales.map((lang) => (

                <NextLink
                  key={lang}
                  locale={lang}
                  href={linkResolver(lang)}
                  passHref
                >

                  <a onClick={() => handleClick(lang)}>
                    <>
                    {getCountryName(lang)}
                      <Icons
                        name={getCountryCode(lang)}
                        width={20}
                        height={16}
                      />
                    </>
                  </a>

                </NextLink>
              ))}

            </div>

      </div>

    )
  }

export default LanguagePicker;