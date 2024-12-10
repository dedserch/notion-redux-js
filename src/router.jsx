import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { NotFound } from "./pages/NotFound/NotFound"
import { Layout } from "./components/Layout/Layout"
import { Auth } from "./pages/Auth/Auth"
import { RequireAuth } from "./components/shared/RequireAuth/RequireAuth"
import { Notes } from "./pages/Notes/Notes"
import { NoteCreate } from "./pages/NoteCreate/NoteCreate"
import { NoteEdit } from "./pages/NoteEdit/NoteEdit"
import { Note } from "./pages/Note/Note"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/notes",
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/create",
        element: (
          <RequireAuth>
            <NoteCreate />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/edit/:noteId",
        element: (
          <RequireAuth>
            <NoteEdit />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/:noteId",
        element: (
          <RequireAuth>
            <Note />
          </RequireAuth>
        )
      }
      
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
