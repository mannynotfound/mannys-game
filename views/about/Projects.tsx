import { LinkOut } from '@/components/Svg';
import mannyProjects from '@/fixtures/projects.json';

export default function AboutProjects() {
  const sortedProjects = mannyProjects.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  return (
    <div className="p-4 flex justify-center flex-wrap">
      {sortedProjects.map((project) => (
        <div className="w-1/3 md:w-1/6" key={project.name}>
          <div
            className="relative group pb-[66%]"
            style={{
              backgroundImage: `url(/logos/${project.logo})`,
              backgroundSize: project.logoSize ?? '80%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="group-hover:opacity-100 opacity-0 transition absolute inset-0">
              <div className="bg-gray-dark opacity-90 absolute inset-0 z-0" />
              <div className="relative h-full z-10 text-xs flex flex-col justify-center items-center text-center">
                <a
                  className="block text-yellow"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name} <LinkOut className="ml-1 inline-block" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
