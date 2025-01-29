import { get_testinstancetestruns } from "@/app/actions";
import InstanceRunsPage from "./single";

export default async function SingleTestSet({ params }) {
  const { testset_id, test_instance_id } = await params;
  // const test_runs = await get_testinstancetestruns(test_instance_id);

  return (
    <>
      <InstanceRunsPage test_instance_id={test_instance_id} />
    </>
  );
}
