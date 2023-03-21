import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface Props extends React.FunctionComponent {
  horizontal?: boolean;
  vertical?: boolean;
  both?: boolean;
  debug?: boolean;
}

export class ReSizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<div class="parent">
	<slot></slot>
	<div class="size-val"></div>
	</div>`;

    const styles = document.createElement("style");
    styles.innerHTML = `
  
`;
    this.shadowRoot.appendChild(styles);
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const container = shadow.querySelector(".parent");

    if (isHorizontal) {
      container.classList.add("horizontal");
    }
    if (isVertical) {
      container.classList.add("vertical");
    }
    if (isBoth) {
      container.classList.add("both");
    }

    if (debug) {
    }
  }
}

customElements.define("re-sizer", ReSizer);

const Resizer = ({
  horizontal,
  vertical,
  both,
  debug,
  children,
  props,
}: Props) => {
  const isBoth = (horizontal && vertical) || both;
  const [text, setText] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    let containerWidth = 600; // = default width
    let containerHeight = 400; // = default width

    // Observe container and keep track of its width.
    const cardObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        containerWidth = +entry.contentRect.width.toFixed(0);
        containerHeight = +entry.contentRect.height.toFixed(0);
        let text = ``;
        if (horizontal) {
          text += `Width: ${containerWidth}px`;
        }
        if (isBoth) {
          text += " ";
        }
        if (vertical) {
          text += `Height: ${containerHeight}px`;
        }
        setText(text);
      });
    });
    containerRef.current && cardObserver.observe(containerRef.current);
  }, []);

  return (
    <div
      className={clsx("storybook__resizer__parent", {
        storybook__resizer__vertical: vertical,
        storybook__resizer__horizontal: horizontal,
        storybook__resizer__both: both,
      })}
      ref={containerRef}
    >
      {children}
      <div className="storybook__resizer__size-val">{text}</div>
    </div>
  );
};

export const ResizerDecorator = (Story) => {
  return (
    <div className="storybook__resizer">
      <Resizer horizontal className="storybook__resizer">
        <div className="storybook__box-wrapper">
          <Story />
        </div>
      </Resizer>
    </div>
  );
};
