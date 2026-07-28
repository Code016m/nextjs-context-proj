import Button from "../ui/button";
import classes from "./results-title.module.css";

// Display the selected filter date
function ResultsTitle(props) {
  const { date } = props;

  // Format the selected month and year
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>

      {/* Navigate back to all events */}
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
