import { router } from "./route"
import { RouterProvider } from "react-router";
import { ShadcnProvider } from "./components/mine/shadcn-provider";

function App() {
  return (
    <>
      <ShadcnProvider>
        <RouterProvider router={router} />
      </ShadcnProvider>
    </>
  )
}

export default App
