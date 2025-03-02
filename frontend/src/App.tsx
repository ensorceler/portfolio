import { Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import WorksPage from "./pages/Works.tsx";
import PostsPage from "./pages/Posts.tsx";
import WorkDetail from "./pages/WorkDetail.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import NotFoundPage from "./pages/NotFound.tsx";
import MainLayout from "./components/MainLayout.tsx";
import { SWRConfig } from "swr";

function App() {
  return (
    <SWRConfig
      value={{
        // Keep data in cache for 10 minutes before revalidating
        dedupingInterval: 10 * 60 * 1000,
        errorRetryCount: 3,
        // Don't auto-revalidate on window focus
        revalidateOnFocus: false,
        // Don't auto-revalidate on reconnect
        revalidateOnReconnect: false,
        // Keep previous data when fetching fails
        keepPreviousData: true,
      }}
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="works" element={<MainLayout />}>
          <Route index element={<WorksPage />} />
          <Route path=":workid" element={<WorkDetail />} />
        </Route>

        <Route path="posts" element={<MainLayout />}>
          <Route index element={<PostsPage />} />
          <Route path=":workid" element={<PostDetail />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SWRConfig>
  );
}

export default App;
