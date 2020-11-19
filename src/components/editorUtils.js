import React, { useState, useEffect, useRef } from "react";
import {
  READ_DATA_SCRIPT,
  SAVE_DATA_SCRIPT,
  HANDLE_ERROR_SCRIPT,
} from "../constants";
import { getConfig, fmFetch, fmCallScript } from "fmw-utils";

export const handleError = () => {
  fmFetch(HANDLE_ERROR_SCRIPT, { Error: "Invalid JSON" });
};

export const saveAsJSON = (string, mode) => {
  const htmlFieldN = getConfig("CodeField");
  const cssFieldN = getConfig("CSSField");
  const jsFieldN = getConfig("JSField");
  const jsonFieldN = getConfig("JSONField");

  let fName;

  switch (mode) {
    case "js":
      fName = jsFieldN;
      break;
    case "json":
      fName = jsonFieldN;
      break;
    case "css":
      fName = cssFieldN;
      break;
    default:
      fName = htmlFieldN;
  }
  const thisField = fName || htmlFieldN;

  // alert("Try");
  try {
    var json = JSON.parse(string);
  } catch (e) {
    if (e instanceof SyntaxError) {
      handleError();
    }
  }
  fmCallScript(SAVE_DATA_SCRIPT, { FieldName: thisField, code: json });
};

export const saveAsCode = (string, mode) => {
  const htmlFieldN = getConfig("CodeField");
  const cssFieldN = getConfig("CSSField");
  const jsFieldN = getConfig("JSField");
  const jsonFieldN = getConfig("JSONField");

  let fName;

  switch (mode) {
    case "javascript":
      fName = jsFieldN;
      break;
    case "json":
      fName = jsonFieldN;
      break;
    case "css":
      fName = cssFieldN;
      break;
    default:
      fName = htmlFieldN;
  }
  console.log(mode);
  console.log("fName", fName);
  const thisField = fName || htmlFieldN;
  fmCallScript(SAVE_DATA_SCRIPT, { FieldName: thisField, code: string });
};

export const saveAnyCode = (string, mode) => {
  if (mode === "json") {
    saveAsJSON(string, mode);
  } else {
    saveAsCode(string, mode);
  }
};
