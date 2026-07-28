import classes from "./logistics-item.module.css";

// Display a single logistics item
function LogisticsItem(props) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>

      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
