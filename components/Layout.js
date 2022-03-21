import Head from 'next/head';
import {
    Header,
    Footer,
    ExitPreviewButton,
    Modal,
    ModalLang
} from '@components/index'

const Layout = ({ isPreview, children, altLangs, lang, menu }) => {


  return (

  <>

    <Header
      menu={menu}
    />

    <Head>

    </Head>
    
    <main>{children}</main>


    {isPreview && 
      <ExitPreviewButton lang={lang.currentLang}/>
    }

    {!lang.isMyMainLanguage &&
      <Modal>
        <ModalLang 
          locales={lang.locales}
        />
      </Modal>
    }

    <Footer
      altLangs={altLangs}
      currentLang={lang.currentLang}
      menu={menu}
    />

  </>
)};

export default Layout;