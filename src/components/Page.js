const Page = ({ children, className }) => (
  <div
    className={`h-screen mx-auto max-w-screen-2xl overflow-hidden ${className}`}
    style={{ paddingTop: 80 }}
  >
    {children}
  </div>
);

export default Page;
