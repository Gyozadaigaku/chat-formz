import type { StorybookConfig } from '@storybook/nextjs'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal(baseConfig) {
    baseConfig.resolve!.alias = {
      ...baseConfig.resolve!.alias,
    }
    baseConfig.resolve!.plugins = [
      ...(baseConfig.resolve!.plugins || []),
      new TsconfigPathsPlugin(),
    ]
    return baseConfig
  },
  staticDirs: ['../public'],
}
export default config
