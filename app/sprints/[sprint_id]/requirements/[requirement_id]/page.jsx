import { get_requirementtests } from "@/app/actions";
import SprintRequirmentTestDetails from "./single";

export default async function SingleRequirement({ params }) {
  const { sprint_id, requirement_id, test_id } = await params;

  return (
    <>
      <SprintRequirmentTestDetails
        sprint_id={sprint_id}
        requirment_id={requirement_id}
        test_id={test_id}
      />
    </>
  );
}
