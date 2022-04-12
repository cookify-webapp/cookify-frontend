import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import _ from "lodash";

export const Rating = ({ rating, spaceX, width, height }) => {
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
    let ratingRounded = Math.floor(rating);
    let ratingRoundedWithDecimal = Math.round(rating * 2) / 2;
    let hasDecimal = ratingRoundedWithDecimal - ratingRounded === 0.5;
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
        <div className={`${spaceX} flex`}>
          {_.map(ratingToStar, (rate, index) => (
            <>
              {rate === "full" && (
                <i
                  key={`${rate}_${index}`}
                  className="text-yellow fas fa-star"
                ></i>
              )}
              {rate === "half" && (
                <i
                  key={`${rate}_${index}`}
                  className="text-yellow fas fa-star-half-alt"
                ></i>
              )}
              {rate === "empty" && (
                <i
                  key={`${rate}_${index}`}
                  className="text-yellow far fa-star"
                ></i>
              )}
            </>
          ))}
        </div>
      )}
    </Observer>
  );
};
