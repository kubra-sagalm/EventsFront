import React from "react";
import { useLocation } from "react-router-dom"; // Rota bilgisini almak için
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children, isSidebarVisible, onMouseMove }) => {
  const location = useLocation(); // Mevcut rota bilgisi

  // Sidebar hareketini devre dışı bırakmak istediğimiz rotalar
  const disabledRoutes = ["/event-creation"];

  // Eğer mevcut rota devre dışı bırakılan rotalardan biriyse `onMouseMove` devre dışı kalır
  const isMouseMoveEnabled = !disabledRoutes.includes(location.pathname);

  return (
    <div
      className="layout-container"
      onMouseMove={isMouseMoveEnabled ? onMouseMove : undefined} // Şartlı onMouseMove
    >
      <Sidebar isVisible={isSidebarVisible} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
