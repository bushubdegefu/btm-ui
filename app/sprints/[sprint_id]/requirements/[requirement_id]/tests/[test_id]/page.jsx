import SprintRequirementTestDetails from "./single";

export default async function SingleTest({ params }) {
  const { sprint_id, requirement_id, test_id } = await params;
  return (
    <>
      <SprintRequirementTestDetails
        sprint_id={sprint_id}
        requirement_id={requirement_id}
        test_id={test_id}
      />
    </>
  );
}
