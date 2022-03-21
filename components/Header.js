import { LanguageSwitcher } from '@components/index';
import styles from './Header.module.scss';
import NextLink from 'next/link'
import { linkResolver } from 'prismicConfiguration'

const Header = ({ menu }) => {

    return (

        <header className={`${styles.container} grid`}>
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
        </header>

    )
};

export default Header;