import SprintRequirmentTestDetails from "./single";

export default function SingleRequirement({ params }) {
  return (
    <>
      <SprintRequirmentTestDetails
        sprint_id={params?.sprint_id}
        requirment_id={params?.requirement_id}
      />
    </>
  );
}
