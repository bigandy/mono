import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface Props extends React.PropsWithChildren {
  horizontal?: boolean;
  vertical?: boolean;
  both?: boolean;
  debug?: boolean;
}

const Resizer = ({ horizontal, vertical, both, debug, children }: Props) => {
  const isBoth = (horizontal && vertical) || both;
  const [text, setText] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (debug) {
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
    }
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

export const ResizerDecorator = (Story: React.FC) => {
  return (
    <div className="storybook__resizer">
      <Resizer horizontal>
        <div className="storybook__box-wrapper">
          <Story />
        </div>
      </Resizer>
    </div>
  );
};
