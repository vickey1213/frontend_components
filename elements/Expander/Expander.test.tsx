/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"

import { fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { render } from "@streamlit/lib/src/test_util"
import { Block as BlockProto } from "@streamlit/lib/src/proto"

import Expander, { ExpanderProps } from "./Expander"

const getProps = (
  elementProps: Partial<BlockProto.Expandable> = {},
  props: Partial<ExpanderProps> = {}
): ExpanderProps => ({
  element: BlockProto.Expandable.create({
    label: "hi",
    expanded: true,
    ...elementProps,
  }),
  isStale: false,
  empty: false,
  ...props,
})

describe("Expander container", () => {
  it("renders without crashing", () => {
    const props = getProps()
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    const expanderContainer = screen.getByTestId("stExpander")
    expect(expanderContainer).toBeInTheDocument()
  })

  it("does not render a list", () => {
    const props = getProps()
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    const list = screen.queryByRole("list")
    expect(list).not.toBeInTheDocument()
  })

  it("renders expander label as expected", () => {
    const props = getProps()
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    expect(screen.getByText(props.element.label)).toBeInTheDocument()
  })

  it("does not render collapse/expand icon if empty", () => {
    const props = getProps({}, { empty: true })
    render(<Expander {...props}></Expander>)
    expect(screen.getByTestId("stExpanderToggleIcon")).toBeInTheDocument()
  })

  it("renders expander with a spinner icon", () => {
    const props = getProps({ icon: "spinner" })
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    expect(screen.getByTestId("stExpanderIconSpinner")).toBeInTheDocument()
  })

  it("renders expander with a check icon", () => {
    const props = getProps({ icon: "check" })
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    expect(screen.getByTestId("stExpanderIconCheck")).toBeInTheDocument()
  })

  it("renders expander with a error icon", () => {
    const props = getProps({ icon: "error" })
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    expect(screen.getByTestId("stExpanderIconError")).toBeInTheDocument()
  })

  it("should render a expanded component", () => {
    const props = getProps()
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    expect(screen.getByText("test")).toBeVisible()
  })

  it("should render a collapsed component", () => {
    const props = getProps({ expanded: false })
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )
    expect(screen.getByText("test")).not.toBeVisible()
  })

  it("should render the text when expanded", () => {
    const props = getProps({ expanded: false })
    render(
      <Expander {...props}>
        <div>test</div>
      </Expander>
    )

    fireEvent.click(screen.getByText("hi"))
    expect(screen.getByText("test")).toBeVisible()
  })
})
