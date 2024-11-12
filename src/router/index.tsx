import { RouteObject, useRoutes } from 'react-router-dom';
import { Suspense, lazy, useMemo } from 'react';
import { AUTH_ROUTES, MAIN_ROUTES } from '../constants/endpoint';
import { useAppSelector } from '@/redux/hooks';
import Loading from '@/templates/Loading';
const Dashboard = lazy(() => import("../pages/App"));
const NotFound = lazy(() => import("../pages/notFound"));
const SignIn = lazy(() => import("../pages/sign-in/SignIn"));
const SignUp = lazy(() => import("../pages/sign-up/SignUp"));

const authRoutes: RouteObject[] = [
  {
    path: AUTH_ROUTES.LOGIN,
    element: <Suspense fallback={<Loading />}><SignIn /></Suspense>
  },
  {
    path: AUTH_ROUTES.SIGNUP,
    element: <Suspense fallback={<Loading />}><SignUp /></Suspense>,
  },
  {
    path: '*',
    element: <Suspense fallback={<Loading />}><SignIn /></Suspense>,
  },
];

const mainRoutes: RouteObject[] = [
  {
    path: MAIN_ROUTES.ROOT,
    element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
  },
  {
    path: '*',
    element: <Suspense fallback={<Loading />}><NotFound /></Suspense>,

  },
];

export default function Router() {
  const user = useAppSelector((state) => state.user)

  const availableRoutes = useMemo(() => {
    if (!user.userInfo?.secret && !user.userInfo?.key) {
      return authRoutes;
    }
    return mainRoutes
  }, [user])

  const route = useRoutes(availableRoutes);
  return route;
}
