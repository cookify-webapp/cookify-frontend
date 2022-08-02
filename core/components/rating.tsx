import React, { Fragment, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import _ from "lodash";

export const Rating = ({ rating }) => {
  //---------------------
  // HOOKS
  //---------------------
  const [ratingToStar, setRatingToStar] = useState([
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ]);

  //---------------------
  // VARIABLE
  //---------------------

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    let buffer = _.cloneDeep(ratingToStar)
    let hasDecimal = (rating % 1) >= 0.5
    for (let i = 0; i < Math.floor(rating); i++) {
      buffer[i] = 'full';
    }
    if (hasDecimal) {
      buffer.splice(_.indexOf(buffer, 'empty'), 1, 'half')
    }
    setRatingToStar(buffer);
  }, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className={`flex w-[100px]`}>
          {_.map(ratingToStar, (rate, index) => (
            <Fragment key={`${rate}_${index}`}>
              {rate === "full" && (
                <i
                  className="text-yellow fas fa-star"
                ></i>
              )}
              {rate === "half" && (
                <i
                  className="text-yellow fas fa-star-half-alt"
                ></i>
              )}
              {rate === "empty" && (
                <i
                  className="text-yellow far fa-star"
                ></i>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </Observer>
  );
};
