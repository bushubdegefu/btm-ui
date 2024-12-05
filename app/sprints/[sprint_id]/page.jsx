import SprintDetails from "./single";
import { get_sprint, get_sprintrequirements } from "@/app/actions";

export default async function SingleSprint({ params }) {
  return (
    <>
      <SprintDetails
        sprint_id={params?.sprint_id}
        sprint_requirments={[]}
        getSprint={get_sprint}
      />
    </>
  );
}
