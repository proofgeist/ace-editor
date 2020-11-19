import React from "react";
import { Col, Row } from "reactstrap";

import {
  ConfigMenu,
  ConfigMenuItem,
  ConfigContent,
  MiniPage,
  Control,
} from "./lib/Configurator/ConfigWrapper";

export default function ({ menuProps, currentNav, proper }) {
  return (
    <>
      <ConfigMenu>
        <ConfigMenuItem
          {...menuProps}
          link="required"
          label="Required"
          fieldsToTrackErrorsArray={["DisplayLayout", "CodeField"]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="optional"
          label="Optional"
          fieldsToTrackErrorsArray={[]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="settings"
          label="Settings"
          fieldsToTrackErrorsArray={[]}
        />
      </ConfigMenu>

      <ConfigContent>
        <MiniPage current={currentNav} name="required">
          <h4>Required</h4>
          <Control {...proper("DisplayLayout")}></Control>
          <Control {...proper("CodeField")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="optional">
          <h4>Optional</h4>

          <p>
            These fields are available if you want to use multiple fields to
            store code.
          </p>
          <Control {...proper("CSSField")}></Control>
          <Control {...proper("JSField")}></Control>
          <Control {...proper("JSONField")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="settings">
          <h4>Settings</h4>

          <Control {...proper("Theme")}></Control>
          <Control {...proper("LoadingMessage")}></Control>

          <Row>
            {" "}
            <Col>
              {" "}
              <Control {...proper("FontSize")}></Control>
            </Col>
            <Col>
              {" "}
              <Control {...proper("TabSize")}></Control>
            </Col>
          </Row>
          <Row>
            {" "}
            <Col>
              {" "}
              <Control {...proper("ShowGutter")}></Control>
            </Col>
            <Col>
              {" "}
              <Control {...proper("ReadOnly")}></Control>
            </Col>
          </Row>
        </MiniPage>
      </ConfigContent>
    </>
  );
}
