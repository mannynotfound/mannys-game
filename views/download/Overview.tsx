import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const overviewCode = `
~~~js
import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import manny from "manny";

const App = () => (
  <div style={{ height: "100vh", width: "100%" }}>
    <Canvas camera={{ position: [0, 0, 300] }} flat>
      {/* manny has to be called inside @react-three/fiber canvas context */}
      <Suspense fallback={null}>
        <group position={[0, -85, 0]}>
          <primitive object={manny()} dispose={null} />
        </group>
      </Suspense>
      <hemisphereLight groundColor={0x444444} />
      <directionalLight intensity={0.25} position={[0, 200, 100]} />
    </Canvas>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
~~~
`;

export default function Overview() {
  return (
    <div className="px-8">
      <h2 className="text-4xl mt-10 mb-5 text-green">Overview</h2>
      <div className="max-w-[800px]">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  style={vscDarkPlus}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {overviewCode}
        </ReactMarkdown>
      </div>
      <div className="mt-4 mb-10">
        For full documentation and usage, visit the{' '}
        <a
          className="text-yellow underline"
          href="https://github.com/mannynotfound/manny"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository.
        </a>
      </div>
    </div>
  );
}
