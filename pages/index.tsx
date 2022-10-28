import { MainLayout } from "../components/layouts";
import { SpanishToEnglish } from "../components/ui";
import { worldsData } from "../json/data";

export default function Home() {

  return (
    <MainLayout>
      <SpanishToEnglish worlds={worldsData}/>
    </MainLayout>
  )
}
