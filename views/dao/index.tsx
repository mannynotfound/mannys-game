import useHasMounted from '@/hooks/useHasMounted';
import Holdings from '@/views/dao/Holdings';
import DaoScene from '@/views/dao/Scene';

const Dao = () => {
  const hasMounted = useHasMounted();

  return (
    <div className="h-full overflow-y-scroll">
      <div className="h-full flex items-center">
        <section className="flex flex-col-reverse md:flex-row w-full px-0">
          <div className="w-full md:w-2/5 h-auto relative flex flex-col justify-center items-center">
            {hasMounted && <Holdings />}
          </div>
          <div className="w-full md:w-3/5 h-0 relative pb-[58%]">
            <DaoScene />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dao;
