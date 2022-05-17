import React from "react";
import { Observer } from "mobx-react-lite";
import { breadcrumbType } from "core/types/core_components_type";
import _ from "lodash";
import classNames from "classnames";
import Link from "next/link";

export const Breadcrumb = ({ routes }: breadcrumbType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="bodyM flex items-center space-x-2">
          {_.map(routes, (route, index) => (
            <>
            <Link href={route.onRoute}>
              <p
                className={classNames(
                  "cursor-pointer w-auto",
                  { "text-gray-50": _.size(routes) - 1 !== index },
                  { "text-brown-10": _.size(routes) - 1 === index }
                )}
              >
                {route.title}
              </p>            
            </Link>

            {
              (_.size(routes) - 1 !== index) && (
                <i className="fas fa-chevron-right text-[12px] h-3 w-auto leading-3 text-gray-50"></i>
              )
            }            
            </>
          ))}
        </div>
      )}
    </Observer>
  );
};
