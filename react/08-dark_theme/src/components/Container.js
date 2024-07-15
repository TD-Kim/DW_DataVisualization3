import styles from './Container.module.css';
import cn from "classnames";

function Container({ className, children }) {
  return (
    <div className={cn(styles.container, className)}>{children}</div>
  );
}

export default Container;
