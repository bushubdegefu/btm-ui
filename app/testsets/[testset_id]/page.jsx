import TestSetDetails from "./single";

import { get_testsettestinstances } from "@/app/actions";

export default async function SingleTestSet({ params }) {
  const { testset_id } = await params;
  // const test_instances = await get_testsettestinstances(testset_id);

  return (
    <>
      <TestSetDetails testset_id={testset_id} />
    </>
  );
}
