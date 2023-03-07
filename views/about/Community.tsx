import Projects from '@/views/about/Projects';

export default function Community() {
  return (
    <div className="flex flex-col md:w-1/2 relative px-8">
      <h2 className="text-green font-bold text-center py-4 mt-10 text-5xl">
        Community
      </h2>
      <div>
        Manny holders are amongst the brightest and savviest of the web3
        landscape, representing talent from almost every major project.
        Token-gated discord channels offer industry secrets in{' '}
        <span className="text-yellow">#alpha</span>, allowlist spots from{' '}
        <span className="text-yellow">#giveaways</span>, or help on your project
        in <span className="text-yellow">#ask-manny</span>. Below are some of
        the projects manny holders work on:
      </div>
      <Projects />
    </div>
  );
}
