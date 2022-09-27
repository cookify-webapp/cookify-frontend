import React, { ChangeEvent } from "react";
import _ from "lodash";
import classNames from "classnames";
import { FormikErrors } from "formik";

//---------------------
//   INTERFACE
//---------------------
interface TextAreaInputProps {
  title?: string | string[];
  value: string;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  placeholder?: string;
  disabled?: boolean;
  height?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isAutoSize?: boolean
}

export function TextAreaInput(props: TextAreaInputProps) {
  //---------------------
  //  RENDER
  //---------------------
  return (
    <div className="w-full text-left">
      {
        props.title && (
          <p className="titleS pb-2">{props.title}</p>
        )
      }
      <textarea
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e: any) => {
          props.onChange(e);
        }}
        disabled={props.disabled}
        style={{ minHeight: `${props.height || "120"}px` }}
        className={classNames(
          "w-full placeholder-gray-50 py-2 px-4 border rounded-[12px]",
          { "border-gray-40 text-black": !props.error },
          { "border-error ": props.error },
          {
            "bg-gray-20 border-gray-30 text-gray-50 cursor-not-allowed":
              props.disabled,
          },
          {
            "auto-size": props.isAutoSize
          }
        )}
      />
      {props.error && <p className="bodyS text-error">{props.error}</p>}
    </div>
  );
}
