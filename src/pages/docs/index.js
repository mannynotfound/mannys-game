import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Menu from './menus';
import mannyMenu from './menus/manny';
import mannysGameMenu from './menus/mannys-game';

const importDoc = (filename) => import(`./mdx/${filename}.mdx`);
const NoPage = () => <div>Page Not Found</div>;

const menus = {
  manny: mannyMenu,
  'mannys-game': mannysGameMenu,
};

const versions = {
  manny: '3.2.0',
  'mannys-game': '0.4.04',
};

const Docs = (props) => {
  const [contentComponent, setContentComponent] = useState(null);
  const chunks = props?.location?.pathname
    .split('/')
    .filter((c) => c && c !== 'docs');
  const docsPath = chunks[0] ?? 'mannys-game';
  const lastRoute = chunks.pop();
  const contentPath =
    !lastRoute || Object.keys(menus).includes(lastRoute)
      ? 'getting-started'
      : lastRoute;
  const subPath = chunks.length > 1 ? chunks.pop() : '';

  useEffect(() => {
    importDoc(docsPath + '/' + subPath + (subPath ? '/' : '') + contentPath)
      .then(({ default: Cpt }) => setContentComponent(<Cpt />))
      .catch(() => setContentComponent(NoPage));
  }, [contentPath]);

  const navProps = { contentPath, subPath, docsPath, menuCfg: menus[docsPath] };

  return (
    <>
      <Header
        title={docsPath.replace('-', '.')}
        gitHubPath={docsPath}
        version={versions[docsPath]}
        {...navProps}
      />
      <div
        className="fixed left-0 w-full hidden md:block z-30"
        style={{ top: 70 }}
      >
        <div
          className="max-w-screen-xl mx-auto px-8 py-4"
          style={{ height: 0 }}
        >
          <div
            style={{
              width: 200,
              height: 'calc(100vh - 100px)',
              overflow: 'auto',
            }}
          >
            <Menu {...navProps} />
          </div>
        </div>
      </div>
      <div
        className="flex mx-auto max-w-screen-xl text-white relative z-20"
        style={{ paddingTop: 80 }}
      >
        <div
          style={{ width: 250, height: 0 }}
          className="hidden md:block pointer-events-none"
        />
        <div className="flex-1 pt-4 pb-10 mb-10 px-8 prose max-w-screen-md">
          {contentComponent}
        </div>
      </div>
      <div
        className="fixed left-0 bottom-0 w-full docs-bg-overlay z-10"
        style={{
          height: 300,
        }}
      />
      <div
        className="fixed left-0 bottom-0 w-full docs-bg z-0"
        style={{
          height: 300,
          opacity: 0.1,
        }}
      />
    </>
  );
};

export default withRouter((props) => <Docs {...props} />);
