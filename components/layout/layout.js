import { Fragment } from "react";

import MainHeader from "./main-header";

// Wrap every page with the main layout
function Layout(props) {
  return (
    <Fragment>
      <MainHeader />

      {/* Render the current page content */}
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
