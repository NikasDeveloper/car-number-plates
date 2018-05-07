import React from 'react';
import classes from './DataPreloader.css';

const DataPreloader = () => {
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

export default DataPreloader;