import Link from "next/link";

import classes from "./main-header.module.css";

// Main navigation header
function MainHeader() {
  return (
    <header className={classes.header}>
      {/* Application logo */}
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>

      {/* Main navigation */}
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
