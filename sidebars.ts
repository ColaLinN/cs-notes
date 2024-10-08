import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  distributedSystemsSidebar: [{ type: 'autogenerated', dirName: 'distributed-systems' }],
  leetcodeSidebar: [{ type: 'autogenerated', dirName: 'leetcode' }],
  databaseSidebar: [{ type: 'autogenerated', dirName: 'database' }],
  systemDesignSidebar: [{ type: 'autogenerated', dirName: 'system-design' }],
  operatingSystemsSidebar: [{ type: 'autogenerated', dirName: 'operating-systems' }],
  computerNetworksSidebar: [{ type: 'autogenerated', dirName: 'computer-networks' }],
  webfullstackSidebar: [{ type: 'autogenerated', dirName: 'web-full-stack' }],
  aiSidebar: [{ type: 'autogenerated', dirName: 'artificial-intelligence' }],
  mlsysSidebar: [{ type: 'autogenerated', dirName: 'mlsys' }],


  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
