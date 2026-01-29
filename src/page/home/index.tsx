import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ButtonGroupDemo } from "./button"
import { SonnerPosition } from "./sonner"

export default function Home() {
  return (
    <div className="containler mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>UI 组件展示</CardTitle>
          <CardDescription>
            基于 shadcn/ui 的组件库演示
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="button" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="button">Button</TabsTrigger>
              <TabsTrigger value="sonner">Sonner</TabsTrigger>
            </TabsList>
            <TabsContent value="button" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Button Group Demo</h3>
                <div className="p-6 border rounded-lg">
                  {/* <ButtonGroupDemo /> */}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sonner" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sonner Toast 位置演示</h3>
                <div className="p-6 border rounded-lg">
                  <SonnerPosition />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
