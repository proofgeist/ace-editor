import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import {
  READ_DATA_SCRIPT,
  SAVE_DATA_SCRIPT,
  HANDLE_ERROR_SCRIPT,
} from "../constants";
import { getConfig, fmFetch } from "fmw-utils";
import { saveAnyCode } from "./editorUtils";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-html";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-terminal";

// Render editor
function Editor(initialProps) {
  const E = useRef();
  const Config = initialProps.Config;
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState(null);
  const [mode, setMode] = useState(null);
  const height = initialProps.WebViewerSize.Height + "px";
  const width = initialProps.WebViewerSize.Width + "px";
  const fName = getConfig("CodeField");
  const config = initialProps.Config;
  const loadingMessage = getConfig("LoadingMessage") || "loading . . .";
  window.loadCode = (mode, code) => {
    // console.log(mode);
    setTheme(Config.Theme.value);
    console.log(mode);
    setMode(mode);
    if (code === null) {
      code = "<html></html>";
    }
    console.log("Code", code);
    setCode(code);
  };
  if (!mode) {
    return <p>{loadingMessage}</p>;
  }
  // console.log(mode);
  console.log(code);

  //FUNCTIONS EXPOSED TO FM

  window.SaveCode = () => {
    const string = E.current.editor.getValue();
    saveAnyCode(string, mode);

    // console.log("EDITOR", JSON.parse(editor));
  };
  function onChange(newValue) {
    const string = newValue;
    saveAnyCode(string, mode);
  }
  return (
    <AceEditor
      ref={E}
      mode={mode}
      theme={theme}
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: false }}
      value={code}
      height={height}
      enableBasicAutocompletion={true}
      debounceChangePeriod={1000}
      width={width}
      defaultValue={""}
      // onBlur={onBlur}
      tabSize={Number(config.TabSize.value) || 4}
      fontSize={Number(config.FontSize.value) || 14}
      showGutter={config.ShowGutter.value || false}
      readOnly={config.ReadOnly.value || false}
    ></AceEditor>
  );
}

export default Editor;
