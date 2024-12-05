import SprintRequirementTestDetails from "./single";

export default function SingleTest({ params }) {
  return (
    <>
      <SprintRequirementTestDetails
        sprint_id={params?.sprint_id}
        requirement_id={params?.requirement_id}
        test_id={params?.test_id}
      />
    </>
  );
}
