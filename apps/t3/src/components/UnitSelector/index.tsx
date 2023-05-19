import { Fragment } from "react";

type UnitSelectorProps = {
  isMetric: boolean;
  setIsMetric: (state: boolean) => void;
};

const UnitSelector = ({ setIsMetric, isMetric }: UnitSelectorProps) => {
  return (
    <Fragment>
      <div className="flex">
        <div className="mr-4 cursor-pointer ">
          <label htmlFor="metric" className={`pr-2`}>
            Metric
          </label>
          <input
            type="radio"
            name="unitSelector"
            id="metric"
            checked={isMetric}
            onChange={() => setIsMetric(true)}
          />
        </div>
        <div className="cursor-pointer ">
          <label htmlFor="imperial" className={`pr-2`}>
            Imperial
          </label>
          <input
            type="radio"
            name="unitSelector"
            id="imperial"
            checked={!isMetric}
            onChange={() => setIsMetric(false)}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UnitSelector;
