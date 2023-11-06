import Home from "../screens/Home";
import Login from "../screens/Login";
import ProductsAdmin from "../screens/ProductsAdmin";
import Profile from "../screens/Profile";
import SignUp from "../screens/SignUp";

export const privateRoutes = {
  admin: [
    {
      path: '/profile',
      element: <Profile />,
      props: {
        header: false,
      }
    },
    {
      path: '/products',
      element: <ProductsAdmin />,
      props: {
        header: true,
      }
    },
    {
      path: '/home',
      element: <Home />,
      props: {
        header: true,
      }
    },
  ],
  user: [
    {
      path: '/profile',
      element: <Profile />,
      props: {
        header: false,
      }
    },
  ],
  shareRoutes: [
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
    path: '/signup',
    element: <SignUp />,
    props: {
      header: false,
    }
  }
]
