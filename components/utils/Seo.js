import { NextSeo } from 'next-seo';

const Seo = ({ title, description, slug, coverImage }) => (
  // const { title, excerpt, slug, coverImage } = postData;

  <NextSeo
    title={title}
    description={description}
    canonical={`https://sergiobarria.com/${slug}`}
    openGraph={{
      type: 'website',
      url: 'https://sergiobarria.com',
      title: `${title} | Originally posted on sergiobarria.com`,
      description,
      locale: 'en_EN',
      images: [
        {
          url:
            coverImage ||
            'https://www.sergiobarria.com/static/images/banner.png',
          width: 1600,
          height: 882,
          alt: `hero image for ${title}`,
        },
      ],
      site_name: 'sergiobarria.com',
    }}
    twitter={{
      handle: '@sergioBarria01',
      site: 'https://twitter.com/sergioBarria01',
      cardType: 'summary_large_image',
    }}
  />
);

export default Seo;