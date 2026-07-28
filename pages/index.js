import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

// Home page component
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>

      {/* Newsletter signup form */}
      <NewsletterRegistration />

      {/* Display the featured events */}
      <EventList items={props.events} />
    </div>
  );
}

// Fetch featured events at build time
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    // Regenerate the page every 30 minutes
    revalidate: 1800,
  };
}

export default HomePage;
