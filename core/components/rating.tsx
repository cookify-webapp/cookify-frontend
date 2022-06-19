import React, { Fragment, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import _ from "lodash";

export const Rating = ({ rating, spaceX }) => {
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
    const buffer = _.cloneDeep(ratingToStar);
    let ratingRounded = Math.round(rating * 10) / 10;
    let hasDecimal = (ratingRounded % 1) > 0.5
    for (let i = 0; i < ratingRounded; i++) {
      buffer.splice(i, 1, "full");
    }
    if (hasDecimal) {
      buffer.splice(ratingRounded, 1, "half");
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
