import React from 'react';
import classes from './Preloader.css';

const Preloader = () => {
  return (
    <div className={classes.Container}>
      <article className={classes.Post}>
        <div className={classes.Preloader}>
          <div className={classes.LoaderCircle}/>
          <div className={classes.LoaderBar}/>
          <div className={classes.LoaderBar}/>
          <div className={classes.Filler}/>
        </div>
      </article>
    </div>
  );
};

export default Preloader;