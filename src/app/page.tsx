import { getData } from "@/actions/matchAction";
import MatchList from "@/components/MatchList";

export default async function Home() {
  const data = await getData();
  return <MatchList />;
}
