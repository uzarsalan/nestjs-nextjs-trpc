import Clientside from "./Clientside";
import { PageProviders } from "./PageProviders";

export default async function Home() {
  return (
    <PageProviders>
      <Clientside />
    </PageProviders>
  );
}
