import { Client, manageLocal } from 'utils/prismicHelpers';
import { Layout } from '@components/index';
import SliceZone from "next-slicezone";
import { RichText } from 'prismic-reactjs'
import { queryRepeatableDocuments } from 'utils/queries';
import { AppContext } from 'context/AppContext';
import { useContext, useEffect } from 'react';

const Post = ({ doc, menu, contacts, lang, preview }) => {
   
  const { setContacts } = useContext(AppContext);

  useEffect(() => {
    setContacts(contacts);
  },[setContacts, contacts]);

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        isPreview={preview.isActive}
        menu={menu}
      >
        {RichText.asText(doc.data.title)}
        <SliceZone sliceZone={doc.data.body} />
      </Layout>
    );
  
};

export async function getStaticProps({
  preview, 
  previewData,
  params,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null
  const isPreview = preview || false
  const client = Client();

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale)

  const doc = await client.getByUID('post', params.uid, ref ? { ref, lang: locale } : { lang: locale }) || {};
  const menu = await client.getSingle('menu', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const contacts = await client.getSingle('contacts', ref ? { ref, lang: locale } : { lang: locale }) || {};

  return {
    props: {
      doc,
      menu,
      contacts,
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      lang:{
        currentLang,
        isMyMainLanguage,
        locales
      }
    },
  };
}


export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(doc => doc.type === 'post');
  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default Post;