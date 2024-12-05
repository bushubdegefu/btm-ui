import SprintRequirementTestRunDetails from "./single";

export default function SingleTestRun({ params }) {
  return (
    <>
      <SprintRequirementTestRunDetails
        sprint_id={params?.sprint_id}
        requirement_id={params?.requirement_id}
        test_id={params?.test_id}
        run_id={params?.run_id}
      />
    </>
  );
}
