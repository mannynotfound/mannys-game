import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Code = ({ language, children }) => (
  <SyntaxHighlighter
    style={vscDarkPlus}
    customStyle={{ margin: 0, borderRadius: 6 }}
    language={language}
    PreTag="div"
  >
    {String(children).replace(/\n$/, '')}
  </SyntaxHighlighter>
);

export default Code;
