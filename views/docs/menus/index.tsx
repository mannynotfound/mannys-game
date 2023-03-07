import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type MenuConfigItem = {
  label: string;
  to?: string;
  subPath?: string;
  subMenu?: {
    label: string;
    to: string;
  }[];
};

export type MenuConfig = MenuConfigItem[];

type Props = {
  docsPath: string;
  subPath?: string;
  contentPath: string;
  menuCfg: MenuConfig;
  onClick?: () => void;
};

export default function Menu({
  docsPath,
  subPath,
  contentPath,
  menuCfg,
  onClick,
}: Props) {
  return (
    <>
      {menuCfg.map((m) => {
        const baseClasses = 'mb-2 px-2 mr-2 pt-1 text-gray-lightest';
        const activeClasses = 'text-gray-dark font-bold bg-green rounded-md';

        if (m.to) {
          return (
            <div
              key={m.label}
              className={twMerge(
                baseClasses,
                contentPath === m.to && activeClasses
              )}
            >
              <Link onClick={onClick} href={`/docs/${docsPath}/${m.to}`}>
                {m.label}
              </Link>
            </div>
          );
        }

        if (m.subMenu === undefined) {
          console.warn('No to or submenu found, check config for ', m);
          return null;
        }

        return (
          <div
            key={m.label}
            className={twMerge(baseClasses, 'text-gray-lightest')}
          >
            <div>{m.label}</div>
            <div className="pl-4">
              {m.subMenu.map((sm) => (
                <div
                  key={sm.label}
                  className={twMerge(
                    'px-2 pt-1 truncate text-gray-lightest',
                    subPath === m.subPath &&
                      contentPath === sm.to &&
                      activeClasses
                  )}
                >
                  <Link
                    onClick={onClick}
                    href={`/docs/${docsPath}/${m.subPath}/${sm.to}`}
                  >
                    {sm.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
