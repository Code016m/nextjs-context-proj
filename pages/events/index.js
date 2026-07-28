import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

// Display all available events
function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  // Navigate to the filtered events page
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All my events</title>
      </Head>

      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>

      {/* Search form */}
      <EventsSearch onSearch={findEventsHandler} />

      {/* Display all events */}
      <EventList items={events} />
    </Fragment>
  );
}

// Fetch all events at build time
export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    // Regenerate the page every minute
    revalidate: 60,
  };
}

export default AllEventsPage;
