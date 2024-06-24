import Clientside from "./Clientside";
import { PageProviders } from "./PageProviders";
import { trpc } from "./trpc";

export default async function Home() {
  const employees = await trpc.getEmployees.query();
  return (
    <PageProviders employees={employees}>
      <Clientside />
    </PageProviders>
  );
}
