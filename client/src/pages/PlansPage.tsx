import PlanCard from '../components/PlanCard';
import usePlans from '../hooks/usePlans';

export default function PlansPage() {
  const { loading, data, error } = usePlans();
  console.log({ loading, data, error });
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="w-[600px]">
        <h1 className="font-semibold text-3xl">
          Choose a plan that works for you
        </h1>
        <div className="flex mt-4">
          <PlanCard />
          <PlanCard />
        </div>
        <button className="rounded bg-red-400 p-3 text-white px-10 mt-3 w-full">
          Purchase
        </button>
      </div>
    </div>
  );
}
