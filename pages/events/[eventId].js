import { Fragment } from "react";
import Head from "next/head";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

// Display the details of a single event
function EventDetailPage(props) {
  const event = props.selectedEvent;

  // Show a loading message while the page is being generated
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        {/* Dynamic page metadata */}
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

      <EventSummary title={event.title} />

      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />

      <EventContent>
        <p>{event.description}</p>
      </EventContent>

      {/* Display and add comments */}
      <Comments eventId={event.id} />
    </Fragment>
  );
}

// Generate the event page at build time
export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    // Regenerate the page every 30 seconds
    revalidate: 30,
  };
}

// Pre-generate pages for featured events
export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    // Generate other event pages on demand
    fallback: "blocking",
  };
}

export default EventDetailPage;
