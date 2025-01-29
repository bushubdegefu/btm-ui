import SprintDetails from "./single";
import { get_sprint, get_sprintrequirements } from "@/app/actions";

export default async function SingleSprint({ params }) {
  const { sprint_id } = await params;
  const requirments = await get_sprintrequirements(sprint_id);

  return (
    <>
      <SprintDetails sprint_id={sprint_id} />
    </>
  );
}
