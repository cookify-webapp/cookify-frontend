import React from "react"
import _ from "lodash"
import classNames from "classnames"

export interface TabFilterProps {
  tabs: string[]
  activeTab: string
  height?: string
  onClick: (tab: string) => void
}

export const TabFilter = ({ tabs, height = 'h-[35px]', onClick, activeTab }: TabFilterProps) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <div className="flex space-x-[16px]">
      {_.map(tabs, (tab, i) => {
        return (
          <button
            key={`core-tab-filter-children-${i}`}
            onClick={() => onClick(tab)}
            className={classNames(
              `flex flex-col w-auto shrink-0 transition-all duration-150 ${height}`,
              { "text-black rounded-[0px] border-b-[3px] border-brown-10": tab === activeTab },
              { "text-gray-50 ": tab !== activeTab }
            )}
          >
            <p className="text-[18px]">{tab}</p>
          </button>
        )
      })}
    </div>
  )
}
