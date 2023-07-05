import { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRouteElement from "./components/protected-route-element";
import {
  ConstructorPage,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  LayoutPage,
  OrderFeedPage,
  ProfileForm,
  ProfileHistory,
  IngredientPage,
  GeneratedOrderPage,
  OrderDetailsPage,
  ModalIngredientPage,
  ModalGeneratedOrderPage,
  ModalOrderDetailsPage
} from "./pages";
import { getIngredients } from './store/ingredients/actions';
import { useAppDispatch } from './store/hooks';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<ConstructorPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="orders" element={<ProfileHistory />} />
          </Route>
          <Route path="/feed" element={<OrderFeedPage />}></Route>

          <Route path="/register" element={<RegisterPage />}></Route>

          <Route path="ingredients/:id" element={<IngredientPage />}></Route>
          <Route path="order/:number" element={<OrderDetailsPage />}></Route>

          <Route path="feed/:number" element={<GeneratedOrderPage />}></Route>
          <Route path="profile/orders/:number" element={<GeneratedOrderPage />}></Route>

          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>

      {
        background && (
          <Routes>
            <Route path="/ingredients/:id" element={<ModalIngredientPage />}></Route>
            <Route path="/order/:number" element={<ModalOrderDetailsPage />}></Route>

            <Route path="/feed/:number" element={<ModalGeneratedOrderPage />}></Route>
            <Route path="/profile/orders/:number" element={<ModalGeneratedOrderPage />}></Route>
          </Routes>)
      }
    </>
  )
};

export default App;
