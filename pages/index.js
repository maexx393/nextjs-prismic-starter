import Head from 'next/head'
import { Client, manageLocal } from '@utils/prismicHelpers'
import { RichText } from 'prismic-reactjs'
import SliceZone from "next-slicezone";
import { Layout } from "@components/index";
import { AppContext } from 'context/AppContext';
import { useContext, useEffect, useState } from 'react';

const resolver = ({ sliceName }) => Slices[sliceName];

export default function Home({doc, menu, contacts, lang, preview}) {

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
        <h1>{RichText.asText(doc.data.title)}</h1>

        <section style={{maxWidth: '800px', margin: '0 auto'}}>
          <h2 style={{marginBottom: '64px'}}>Build your video library</h2>
          <p style={{marginBottom: '64px'}}>
            Whether you’re launching a new website or scaling your existing business, creating and marketing online video content, such as multi-part courses or tutorials, is a strategic way to grow your digital footprint. For instructors, chefs, educators, wellness providers, and other skill-based experts, video content can help attract new customers and bring your offerings to life online. 
          </p>
          <h3 style={{marginBottom: '32px'}}>
            BASIC is a global branding and digital design agency building products, services, and eCommerce experiences that turn cultural values into company value.
          </h3>
          <p style={{marginBottom: '64px'}}>
            The Anthem Awards, hosted by The Webby Awards, celebrates purpose and mission-driven work from organizations that are inspiring others to take action in their communities. With the significant culture shift of people aligning their values to their everyday decisions and actions that have a global impact, the Webbys created this platform to uplift the amazing social impact work that’s around us.
          </p>
          <p style={{marginBottom: '64px'}}>
          {/* <p style={{letterSpacing: '0.005em', wordSpacing: '0.04em'}}> */}
            With Squarespace, building your video library is simple. You can add video pages to your website to create a library that fits your brand, and organize your video content so customers can easily browse and find the videos they want to watch. If you’re just getting started, learn more about planning and developing a course curriculum.  
          </p>
        </section>

        <SliceZone slices={doc.data.slices} resolver={resolver} />

      </Layout>
  )
}

export async function getStaticProps({ 
  preview, 
  previewData,
  locale,
  locales,
}) {

  const ref = previewData ? previewData.ref : null
  const isPreview = preview || false
  const client = Client()

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale)

  const doc = await client.getSingle('home', ref ? { ref, lang: locale } : { lang: locale }) || {};
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
      lang: {
        currentLang,
        isMyMainLanguage,
        locales
      }
    }
  }
} 