export const languages = ['en', 'ko'] as const;
export type Lang = (typeof languages)[number];

const translations = {
  en: {
    nav: { books: 'books', music: 'music', posts: 'posts', products: 'products' },
    sections: { books: 'Books', music: 'Music', posts: 'Posts', products: 'Products' },
    all: 'All',
    bookMeta: { grip: 'Grip', resonance: 'Resonance' },
    product: {
      shopLink: 'Shop',
      affiliateNotice: 'This is an affiliate link. I may earn a small commission at no extra cost to you.',
    },
    pagination: {
      prev: '← Prev',
      next: 'Next →',
      allPosts: (n: number) => `See all ${n} posts →`,
    },
  },
  ko: {
    nav: { books: '책', music: '음악', posts: '글', products: '제품' },
    sections: { books: '책', music: '음악', posts: '글', products: '제품' },
    all: '전체',
    bookMeta: { grip: '흡입력', resonance: '여운' },
    product: {
      shopLink: '구매 링크',
      affiliateNotice: '이 링크는 제휴 링크로, 구매 시 소정의 수수료가 지급될 수 있습니다.',
    },
    pagination: {
      prev: '← 이전',
      next: '다음 →',
      allPosts: (n: number) => `글 전체 ${n}편 보기 →`,
    },
  },
} as const;

import { siteConfig } from '../site.config';

export function resolveLang(lang?: Lang): Lang {
  return lang ?? siteConfig.lang;
}

export function t(lang: Lang = siteConfig.lang) {
  return translations[lang];
}

export function formatDate(date: Date, lang: Lang = siteConfig.lang): string {
  return date.toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
