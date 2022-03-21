import NextLink from 'next/link'
import { linkResolver } from 'prismicConfiguration'
import { LanguageSwitcher, ShareSite } from '@components/index';
import styles from './Footer.module.scss';

const Footer = ({ menu, altLangs, currentLang }) => {

    return (

        <footer className={styles.container}>
            <nav>
                <ul>
                    {menu.data?.main.map((item, index) => (
                        <li key={index}>
                            <NextLink
                                href={linkResolver(item.link)}
                                passHref
                                >
                                <a>{item.label}</a>
                            </NextLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.bottom}>
                <ShareSite />
                <LanguageSwitcher altLangs={altLangs} currentLang={currentLang} />
            </div>

        </footer>

    )
};

export default Footer;