import { type ImgType } from '@/global/types';

export type BlogSectionTypes = {
  data: {
    blog_Heading: string;
    blog_Paragraph: string;
    blog_HighlightedPost: HighlightedPostType;
    blogPosts: {
      categories: {
        name: string;
        slug: string;
      }[];
    }[];
    slug?: string;
    number?: number;
    pathPrefix?: string;
    isCategoryPagination?: boolean;
  };
};

export type HighlightedPostType = {
  hero_Heading: string;
  hero_Img: ImgType;
  hero_Paragraph: string;
  href?: string;
  hero_Author: {
    heading: string;
    paragraph: string;
    img: ImgType;
  };
};

export type BlogPostsType = {
  hero_Img: ImgType;
  hero_Heading: string;
  hero_Paragraph: string;
  slug: string;
  number: number;
};
