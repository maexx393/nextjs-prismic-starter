
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import NextLink from "next/link";
import { Icons } from "@components/index";

const ShareSite = () => {
    
    const { contacts } = useContext(AppContext);

    return (
        <div>
        {contacts?.data.social.map((item,index) => (
            <NextLink
                key={index}
                href={item.link.url}
                passHref
            >
                <a aria-label={item.provider} rel="noopener noreferrer">
                    <Icons
                        name={item.provider.toLowerCase()}
                        width={24}
                        height={24}
                    />
                </a>
            </NextLink>
        ))}
        </div>
    )
}

export default ShareSite;