import { RouterProvider } from "react-router";
import ShadcnProvider from "./components/ShadcnProvider";
import { router } from "./route";

export function App() {
  return (
    <>
      <ShadcnProvider>
        <RouterProvider router={router} />
      </ShadcnProvider>
    </>
  );
}

export default App;
