import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'Minecraft Pluginの作り方',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://make-plugin.nikomaru.dev',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'nlkomaru', // Usually your GitHub org/user name.
    projectName: 'make-plugin', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'ja',
        locales: ['ja'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    routeBasePath: '',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/nlkomaru/make-plugin/tree/main/docs/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                // Options here
                indexDocs: true,
                language: "ja",
            },
        ],
    ],
    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'Plugin Tutorial',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    href: 'https://github.com/nlkomaru/make-plugin',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/intro',
                        },

                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Homepages',
                            href: 'https://morino.party',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discord.com/invite/9HdanPM',
                        },
                        {
                            label: 'X',
                            href: 'https://x.com/morinoparty',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/nlkomaru/make-plugin',
                        },
                    ],
                },
            ],
            copyright: `No right reserved. This docs under CC0. Built with Docusaurus.`,
        },
        prism: {
            additionalLanguages: ['java', 'groovy', 'diff', 'toml', 'yaml'],
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
