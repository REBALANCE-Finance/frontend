import React, { FC, PropsWithChildren, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Router: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <ScrollToTop />
    {children}
  </BrowserRouter>
);

export default Router;
