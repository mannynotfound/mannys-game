import ReactDOM from 'react-dom';

function importBuildTarget() {
  if (process.env.REACT_APP_BUILD_TARGET === 'app') {
    return import('./App.js');
  }

  if (process.env.REACT_APP_BUILD_TARGET === 'view') {
    return import('./App-view.js');
  }

  return Promise.reject(
    new Error('No such build target: ' + process.env.REACT_APP_BUILD_TARGET)
  );
}

importBuildTarget().then(({ default: App }) => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
