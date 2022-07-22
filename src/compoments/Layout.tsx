import { ReactNode } from "react";

import "./Layout.css";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className='wrapper'>
    <div className='layout'>{children}</div>
  </div>
);

export default Layout;
