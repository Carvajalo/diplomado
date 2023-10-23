import Home from "../screens/Home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";

export const privateRoutes = {
  admin: [
    {
      path: '/profile',
      element: <Profile />,
      props: {
        header: false,
      }
    }
  ],
  user: [
    {
      path: '/profile',
      element: <Profile />,
      props: {
        header: false,
      }
    },
    {
      path: '/home',
      element: <Home />,
      props: {
        header: true,
      }
    },
    {
      path: '/*',
      element: <Home />,
      props: {
        header: true,
      }
    },
  ]
}

export const publicRoutes = [
  {
    path: '/home',
    element: <Home />,
    props: {
      header: true,
    }
  },
  {
    path: '/*',
    element: <Home />,
    props: {
      header: true,
    }
  },
  {
    path: '/login',
    element: <Login />,
    props: {
      header: false,
    }
  },
  {
    path: '/singup',
    element: <Login />,
    props: {
      header: false,
    }
  }
]
