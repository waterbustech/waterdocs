import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/waterbustech/waterbus",
  themeSwitch: {enabled: false},
  nav: {
    title: (
      <>
        <img
          src="https://media.waterbus.tech/Logo-01.png"
          alt="Logo"
          width={24}
          height={24}
        />
        Waterdocs
      </>
    ),
  },
};
