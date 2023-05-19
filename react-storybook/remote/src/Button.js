import React from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

const Button = React.forwardRef((
    {
        children,
        className,
        variant = "primary",
        Icon,
        ...props
    },
    ref
) => {
    const cssClasses = classNames(styles.button, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
    })

    return (
        <button {...props} ref={ref} className={`${cssClasses} ${className}`}>
            <span>{children}</span>
            {Icon && <Icon className={styles.icon} />}
        </button>
    );
});

export default Button;
