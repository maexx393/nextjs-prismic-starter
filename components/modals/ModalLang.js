
import styles from './ModalLang.module.scss'
import { LanguagePicker } from "@components/index";
import { AppContext } from 'context/AppContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'

const ModalLang = ({ locales }) => {

    const { uiContents } = useContext(AppContext);
    const lang = useRouter().locale.substr(0,2);

    return (
        <div 
            className={styles.container}
        >   
            <h2>{uiContents.languagePicker.title[lang]}</h2>
            <p>{uiContents.languagePicker.description[lang]}</p>
            <LanguagePicker locales={locales} />

        </div>
    )
  }

export default ModalLang;