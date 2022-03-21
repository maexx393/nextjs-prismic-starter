export const apiEndpoint = process.env.PRISMIC_API
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN


export const linkResolver = (doc) => {
  if(doc.lang === 'de-de') {
    if (doc.type === 'post') {
      return `/posts/${doc.uid}`
    }
    if (doc.type === 'home') {
      return `/`
    }
    if (doc.type === 'contact') {
      return `/contact`
    }
    return '/'
  }
 else {
    if (doc.type === 'post') {
      return `/${doc.lang}/posts/${doc.uid}`
    }
    if (doc.type === 'home') {
      return `/${doc.lang}`
    }
    if (doc.type === 'contact') {
      return `/${doc.lang}/contact`
    }
    return '/'
 }
}

// Additional helper function for Next/Link component
export const hrefResolver = (doc) => {
  if (doc.type === 'post') {
    return `/${doc.lang}/posts/${doc.uid}`;
  }
  if (doc.type === 'home') {
    return `/${doc.lang}`;
  }
  if (doc.type === 'contact') {
    return `/${doc.lang}/contact`
  }
  return '/';
}