import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { RiComputerLine } from 'react-icons/ri';
import { FaServer, FaMobileAlt } from 'react-icons/fa';
import { ImStack } from 'react-icons/im';

import { getAllFilesFrontMatter } from '@/lib/mdx';

import Container from '@/components/Container';
import PostListPreview from '@/components/PostListPreview';
import Card from '@/components/Card';

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  const latestPosts = posts.allFiles.slice(0, 4);
  const url = 'https://sergiobarria.com';
  const title = 'Home | Sergio Barria';
  const description =
    'Sergio Barria engineer, developer, writer. Sharing my journey as I transition from Civil Engineer to Web Developer';

  const jobs = [
    {
      id: 1,
      title: 'Frontend Development',
      icon: {
        type: RiComputerLine,
      },
      description: 'I build UI and scalable SPA with HTML, CSS and JavaScript',
      techStack: ['JavaScript', 'Vue', 'React'],
    },
    {
      id: 2,
      title: 'Backend Development',
      icon: {
        type: FaServer,
      },
      description: 'Connection with the frontend, databases and security',
      techStack: ['Node', 'Django', 'Mongo', 'Firebase'],
    },
    {
      id: 3,
      title: 'JAM Stack Development',
      icon: {
        type: ImStack,
      },
      description:
        'SSR and SSG development for better performance & SEO Optimization',
      techStack: ['Next js', 'Gatsby'],
    },
    {
      id: 4,
      title: 'Mobile Development',
      icon: {
        type: FaMobileAlt,
      },
      description:
        'Cross platform mobile development for iOS and Android phones',
      techStack: ['Flutter'],
    },
  ];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ url, title, description }}
      />
      <Container>
        <div className="flex flex-col justify-center max-w-2xl mx-auto mb-4">
          <h1 className="mb-4 text-3xl font-bold text-center text-skin-title md:text-4xl tracking-tigh dark:text-skin-inverted">
            Hey, I'm Sergio
          </h1>
          <p className="mb-8 font-normal prose text-center text-skin-base dark:text-skin-inverted">
            I'm an Engineer, developer and writer. For last few years I've
            worked as a Civil Engineer until I decide to take a professional
            turn and becoming a web developer. I created this small space on the
            internet to share my journey and try to help others who are also
            starting to learn how to code.
          </p>
        </div>

        <section>
          <h1 className="mb-4 text-2xl font-bold leading-9 tracking-tight text-skin-title dark:text-skin-inverted sm:leading-10 md:text-4xl md:leading-14">
            What I do
          </h1>
          <div className="grid grid-cols-1 gap-4 mx-auto md:grid-cols-2 md:gap-4">
            {jobs.map((job, id) => (
              <Card
                key={id}
                title={job.title}
                icon={
                  <job.icon.type className="w-10 h-10 text-skin-accent md:w-12 md:h-12" />
                }
                description={job.description}
                techStack={job.techStack}
              />
            ))}
          </div>
        </section>

        <section className="my-16">
          <h1 className="pb-4 text-2xl font-bold leading-9 tracking-tight text-gray-800 border-b dark:text-gray-100 sm:leading-10 md:text-4xl md:leading-14">
            My latest toughts
          </h1>
          <PostListPreview
            postsArr={latestPosts}
            sectTitle="My latest toughts"
          />
          <div className="flex justify-center mt-6">
            <NextLink href="/blog">
              <a className="px-4 py-2 uppercase transition duration-200 ease-in transform border rounded text-skin-accent border-skin-accent hover:text-skin-inverted hover:border-transparent hover:-translate-y-1 active:translate-y-0 hover:shadow-xl hover:bg-skin-fill">
                All Posts &rarr;
              </a>
            </NextLink>
          </div>
        </section>
      </Container>
    </>
  );
}