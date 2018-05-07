import React from 'react';
import classes from './DataPreloader.css';

const DataPreloader = props => {
  return (
    <main>
      <article className={classes.Post}>
        <div className={classes.Preloader}>
          <div className={classes.LoaderCircle}/>
          <div className={classes.LoaderBar}/>
          <div className={classes.LoaderBar}/>
          <div className={classes.Filler}/>
        </div>
      </article>
    </main>
  );
};

export default DataPreloader;