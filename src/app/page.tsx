import { getData } from "@/actions/matchAction";
import MatchList from "@/components/MatchList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const data = await getData();
  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-primary">mtgtracker</h1>
      </div>

      <div className="flex-1 flex flex-col">
        <Tabs
          defaultValue="history"
          fullscreen
          className="flex-1 flex flex-col"
        >
          <TabsContent value="history" className="flex-1 pb-20 px-4">
            <MatchList />
          </TabsContent>
          <TabsContent value="analytics" className="flex-1 pb-20 px-4">
            OOOIIEEEE!!
          </TabsContent>

          <TabsList className="fixed bottom-4 left-0 right-0 mx-8 z-10">
            <TabsTrigger value="history">Match history</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
