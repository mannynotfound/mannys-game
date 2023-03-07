import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/views/docs/Header';
import Menu, { MenuConfig } from '@/views/docs/menus';
import mannyMenu from '@/views/docs/menus/manny';
import mannysGameMenu from '@/views/docs/menus/mannys-game';

const importDoc = (filename: string) => import(`./mdx/${filename}.mdx`);
const NoPage = () => <div>Page Not Found</div>;

const menus: {
  [docPath: string]: MenuConfig;
} = {
  manny: mannyMenu,
  'mannys-game': mannysGameMenu,
};

const versions: { [docPath: string]: string } = {
  manny: '3.2.0',
  'mannys-game': '0.4.04',
};

export default function Docs() {
  const [contentComponent, setContentComponent] = useState<JSX.Element>();
  const router = useRouter();
  const chunks = router.asPath
    .split('/')
    .filter((c: string) => c && c !== 'docs');
  const docsPath = chunks[0] ?? 'mannys-game';
  const routerLoading = docsPath === '[[...all]]';
  const lastRoute = chunks.pop();
  const contentPath =
    !lastRoute || Object.keys(menus).includes(lastRoute)
      ? 'getting-started'
      : lastRoute;
  const subPath = chunks.length > 1 ? chunks.pop() : '';

  useEffect(() => {
    if (routerLoading) return;
    importDoc(docsPath + '/' + subPath + (subPath ? '/' : '') + contentPath)
      .then(({ default: Cpt }) => setContentComponent(<Cpt />))
      .catch(() => setContentComponent(NoPage));
  }, [routerLoading, docsPath, subPath, contentPath]);

  // router still figuring itself out
  if (routerLoading) {
    return null;
  }

  const menuCfg = menus[docsPath];

  return (
    <>
      <Header
        title={docsPath.replace('-', '.')}
        homePath={docsPath === 'manny' ? '/docs/manny' : '/docs'}
        gitHubPath={docsPath}
        version={versions[docsPath]}
        contentPath={contentPath}
        docsPath={docsPath}
        menuCfg={menuCfg}
      />
      <div className="fixed left-0 bottom-0 w-full docs-bg h-[300px] opacity-10" />
      <div className="fixed left-0 bottom-0 w-full docs-bg-overlay h-[300px]" />
      <div className="flex mx-auto max-w-screen-xl text-white relative">
        <div className="hidden md:block pointer-events-none w-[250px] h-0" />
        <div className="flex-1 pt-4 pb-10 mb-10 px-8 prose max-w-screen-md">
          {contentComponent}
        </div>
      </div>
      <div className="fixed left-0 w-full hidden md:block top-[70px]">
        <div className="max-w-screen-xl mx-auto px-8 py-4 h-0">
          <div className="w-[200px] h-[calc(100vh-100px)] overflow-auto">
            <Menu
              docsPath={docsPath}
              contentPath={contentPath}
              subPath={subPath}
              menuCfg={menuCfg}
            />
          </div>
        </div>
      </div>
    </>
  );
}
