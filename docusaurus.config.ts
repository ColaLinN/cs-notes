import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import TOCInline from '@theme/TOCInline';
import { lazy } from 'react';

const config: Config = {
  title: 'Fenglyu\'s Doc',
  tagline: 'Dinosaurs are cool',
  // favicon: 'img/favicon.ico',
  favicon: 'img/fenglyu-v1.jpg',

  // Set the production url of your site here
  url: 'https://docs.fenglyulin.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    themes: ['@docusaurus/theme-search-algolia'],
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    // image: 'img/fenglyu-v1.jpg',
    // announcementBar: {
    // id: "feature_release", // Any value that will identify this message.
    // content: `更新<a href='/docs/videos/browser/js-web-animations-api'>《与 CSS Keyframes 媲美的原生 JS 高性能动画 API 教程》配套文本</a>`,
    // backgroundColor: "#fafbfc", // Defaults to `#fff`.
    // textColor: "#091E42", // Defaults to `#000`.
    // },
    // hideableSidebar: true,
    algolia: {
      // The application ID provided by Algolia
      appId: 'JYA67C7803',

      // Public API key: it is safe to commit it
      apiKey: '880e03eeac519808fd841d5d26f4fca7',

      indexName: 'fenglyulin',

      // Optional: see doc section below
      contextualSearch: false,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      // Optional: Algolia search parameters
      searchParameters: {
        // initialQuery: 'test', // Optional
      },

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      // insights: false,

      //... other Algolia params
      
    },

    navbar: {
      title: 'Fenglyu\'s Doc',
      logo: {
        alt: 'Fenglyu\'s Doc Logo',
        // src: 'https://avatars.githubusercontent.com/u/41199987?v=4',
        // src: 'img/logo.svg',
        src: 'img/fenglyu-v1.jpg',
      },

      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {
          type: 'doc',
          docId: 'practise-coding-record',
          position: 'right',
          label: "💾 Docs Summary",
        },
        // {
        //   type: 'doc',
        //   docId: 'distributed-systems/intro',
        //   position: 'right',
        //   label: 'Distributed Systems', // the name
        // },
        // {
        //   type: 'doc',
        //   docId: 'leetcode/240201-why',
        //   position: 'right',
        //   label: 'Leetcode',
        // },
        // {
        //   type: 'doc',
        //   docId: 'system-design/overview',
        //   position: 'right',
        //   label: 'System Design',
        // },
        // {
        //   type: 'doc',
        //   docId: 'web-full-stack/overview',
        //   position: 'right',
        //   label: 'Web Full Stack',
        // },
        {
          label: "🤖 AI/MLsys",
          position: "right",
          items: [
            {
              label: "AI/ML",
              to: "docs/artificial-intelligence/overview",
            },
            {
              label: "MLSys",
              to: "docs/mlsys/overview",
            },
          ],
        },
        {
          label: "👨‍💻 Software Engineering",
          position: "right",
          items: [
            {
              label: "System Design",
              to: "docs/system-design/overview",
            },
            {
              label: "Leetcode",
              to: "docs/leetcode/240201-why",
            },
            {
              label: "Web Full Stack",
              to: "docs/web-full-stack/overview",
            },
          ],
        },
        {
          label: "🍔 CS-Stack",
          position: "right",
          items: [
            {
              label: "Operating Systems",
              to: "docs/operating-systems/overview",
            },
            {
              label: "Database",
              to: "docs/database/overview",
            },
            {
              label: "Computer Networks",
              to: "docs/computer-networks/overview",
            },
            {
              label: "Distributed Systems",
              to: "docs/distributed-systems/overview",
            }
          ],
        },
        // {
        //   label: "More",
        //   position: "right",
        //   items: [
        //     {
        //       label: "Tech Videos",
        //       to: "todo",
        //     },
        //     {
        //       label: "All",
        //       to: "docs/intro",
        //     },
        //   ],
        // },
        // {
        //   // to: '/blog', 
        //   href: 'https://fenglyulin.com/',
        //   label: 'Fenglyu\'Log', position: 'right'
        // },
        // {
        //   href: 'https://github.com/ColaLinN/fenglyu-docs-site-v1',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Distribution Systems',
              to: '/docs/distributed-systems/overview',
            },
            {
              label: 'Leetcode',
              to: '/docs/leetcode/240201-why',
            },
            {
              label: 'System Design',
              to: '/docs/system-design/from-zero-to-millions',
            },
            {
              label: 'Operating Systems',
              to: '/docs/operating-systems/overview',
            },
            {
              label: 'Database',
              to: '/docs/database/essential-knowledge',
            },
            {
              label: 'Computer Networks',
              to: '/docs/computer-networks/overview',
            },
            {
              label: 'Web Full Stack',
              to: '/docs/web-full-stack/overview',
            },
            {
              label: 'MLSys',
              to: '/docs/mlsys/overview',
            },
            {
              label: 'AI/ML',
              to: '/docs/artificial-intelligence/overview',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/ColaLin7',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/ColaLinN/fenglyu-docs-site-v1',
            // },
            // {
            //   html: `
            //     <a href="https://docusaurus.io/" target="_blank" rel="noreferrer noopener">
            //       <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
            //     <a/>
            //     `,
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fenglyu`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    plugins: [
      ["@gracefullight/docusaurus-plugin-vercel-analytics"],
      [
        'vercel-analytics',
        {
          debug: true,
          mode: 'auto',
        },
      ],
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
