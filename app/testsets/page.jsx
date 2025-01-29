import TestSetsTable from "./single";

import { get_testsets } from "@/app/actions";

export default async function TestSets() {
  return (
    <>
      <TestSetsTable />
    </>
  );
}
