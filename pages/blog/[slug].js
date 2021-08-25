import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';

import BlogLayout from '@/layouts/BlogLayout';
import { getAllSlug, getPostBySlug } from '@/lib/graphcms';

export async function getStaticPaths() {
  const data = await getAllSlug();

  return {
    paths: data.map(slug => ({
      params: {
        ...slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const { post, posts } = await getPostBySlug(slug);

  const source = await serialize(post.body.markdown);

  return {
    props: {
      post: {
        ...post,
        readingTime: readingTime(post.body.markdown),
      },
      allPosts: posts,
      source,
    },
    revalidate: 60 * 5,
  };
}

const SingleBlogPost = ({ post, allPosts, source }) => (
  // <BlogLayout frontMatter={frontMatter} allPosts={allPosts}>
  <BlogLayout post={post} allPosts={allPosts}>
    <MDXRemote {...source} />
  </BlogLayout>
);

export default SingleBlogPost;

// components={MDXComponents}
