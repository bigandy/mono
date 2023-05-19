import { Fragment, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import {
  activities,
  type Activity,
  type ActivityKeys,
  type ActivityType,
} from "~/types";
import { toast } from "react-hot-toast";

import { api } from "~/utils/api";
import { isMetricAtom, useAtom } from "~/utils/store";

import Button from "~/components/Button";
import StravaTable from "~/components/StravaTable";

import UnitSelector from "../UnitSelector";

const defaultColumns: { id: ActivityKeys; label: string }[] = [
  { id: "start_date", label: "Date" },
  { id: "name", label: "Name" },
  { id: "distance", label: "Distance" },
  { id: "type", label: "Type" },
  { id: "average_speed", label: "Average Speed" },
  { id: "private", label: "Private" },
  { id: "total_elevation_gain", label: "Elevation Gain" },
];

const StravaActivities: React.FC = () => {
  const [isMetric] = useAtom(isMetricAtom);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<
    ActivityType[]
  >([...activities]);
  const [stravaActivities, setStravaActivities] = useState<Activity[]>([]);
  const [columnsToShow, setColumnsToShow] = useState<ActivityKeys[]>(
    defaultColumns.map((col) => col.id)
  );

  const utils = api.useContext();

  const { data: sessionData } = useSession();
  const page = 1;

  const { data: dbActivities, isLoading } =
    api.strava.getActivitiesFromDB.useQuery(
      { page: page, activities_count: 10 },
      { enabled: sessionData?.user !== undefined } // Not sure if this is needed or not.
    );

  const getActivitiesMutation = api.strava.getActivitiesFromStrava.useMutation({
    onSuccess: () => {
      utils.strava.getActivitiesFromDB.invalidate();
      toast.success("Successfully fetched activities from Strava");
    },
  });

  // const handleNextPage = () => setPage((p) => p + 1);
  // const handlePreviousPage = () => setPage((p) => p - 1);

  useEffect(() => {
    if (dbActivities && dbActivities.length > 0) {
      setStravaActivities(
        dbActivities.filter((activity) => {
          return selectedActivityTypes.includes(activity.type);
        })
      );
    } else {
      setStravaActivities([]);
    }
  }, [dbActivities?.length, selectedActivityTypes.length]);

  const handleGetStravaActivities = async () => {
    await getActivitiesMutation.mutateAsync();
  };

  const handleColumnCheckbox = (columnId: ActivityKeys) => {
    setColumnsToShow((prevState) => {
      const newState = [...prevState];
      if (newState.includes(columnId)) {
        // remove from prevState
        const indexOfCol = newState.findIndex((col) => col === columnId);
        newState.splice(indexOfCol, 1);
        return newState;
      } else {
        return [...newState, columnId];
      }
    });
  };

  const handleTypeCheckbox = (checkboxType: ActivityType) => {
    setSelectedActivityTypes((prevState) => {
      const newState = [...prevState];
      if (prevState.includes(checkboxType)) {
        // remove it from array
        const indexOfCol = newState.findIndex((col) => col === checkboxType);
        newState.splice(indexOfCol, 1);
      } else {
        newState.push(checkboxType);
      }
      return newState;
    });
  };

  const handleSelectedTypesToggle = () => {
    setSelectedActivityTypes((prevState) => {
      if (prevState.length > 0) {
        return [];
      } else {
        return [...activities];
      }
    });
  };

  const loading = isLoading || getActivitiesMutation.isLoading;

  return (
    <div className="">
      <TableControl
        handleSelectedTypesToggle={handleSelectedTypesToggle}
        handleColumnCheckbox={handleColumnCheckbox}
        handleTypeCheckbox={handleTypeCheckbox}
        columnsToShow={columnsToShow}
        selectedActivityTypes={selectedActivityTypes}
      />
      <div className="mt-4 text-base text-black relative h-full">
        {isLoading && <PageLoader />}
        <StravaTable
          data={stravaActivities}
          isMetric={isMetric}
          columnsToShow={columnsToShow}
        />

        {stravaActivities.length === 0 && (
          <div className="mt-4">
            <Button
              primary
              big
              onClick={handleGetStravaActivities}
              disabled={isLoading || loading}
            >
              {isLoading || loading ? "Loading" : "Get Strava Activities"}
            </Button>
          </div>
        )}

        {/* <Button
          disabled={page < 2}
          className="mr-4 mt-4 "
          onClick={handlePreviousPage}
        >
          &larr; Get Previous Page ({page - 1})
        </Button>

        <Button className="mt-4" onClick={handleNextPage}>
          Get Next Page ({page + 1}) &rarr;
        </Button> */}
      </div>
    </div>
  );
};

type TableControlProps = {
  handleTypeCheckbox: (checkboxType: ActivityType) => void;
  handleColumnCheckbox: (columnId: ActivityKeys) => void;
  handleSelectedTypesToggle: () => void;
  columnsToShow: ActivityKeys[];
  selectedActivityTypes: ActivityType[];
};

/**
 * TableControl sets the columns / filters / unit for the table
 */
const TableControl = ({
  handleTypeCheckbox,
  handleColumnCheckbox,
  handleSelectedTypesToggle,
  columnsToShow,
  selectedActivityTypes,
}: TableControlProps) => {
  const [isMetric, setIsMetric] = useAtom(isMetricAtom);
  return (
    <Fragment>
      <div>
        <details>
          <summary className="mt-4 text-xl font-bold">Columns</summary>
          <div className="flex">
            {defaultColumns.map((column) => {
              return (
                <div key={column.id} className="mr-4">
                  <label htmlFor={column.id} className={`pr-2`}>
                    {column.label}
                  </label>
                  <input
                    type="checkbox"
                    id={column.id}
                    checked={columnsToShow.includes(column.id)}
                    onChange={() => handleColumnCheckbox(column.id)}
                  />
                </div>
              );
            })}
          </div>
        </details>
      </div>
      <div>
        <details>
          <summary className="mt-4 text-xl font-bold">
            Metric / Imperial
          </summary>
          <UnitSelector setIsMetric={setIsMetric} isMetric={isMetric} />
        </details>
      </div>

      <div>
        <details>
          <summary className="mt-4 text-xl font-bold">
            Activity Filtering - Activity Type
          </summary>
          <div
            onClick={handleSelectedTypesToggle}
            className="text-blue-600 cursor-pointer"
          >
            Show{" "}
            {selectedActivityTypes.length === activities.length
              ? "None"
              : "All"}
          </div>
          <div className="flex">
            {activities.map((type: ActivityType) => {
              return (
                <div key={`activity-selector-${type}`} className={"mr-4"}>
                  <label htmlFor={`activity-${type}`} className={`pr-2`}>
                    {type}
                  </label>
                  <input
                    type="checkbox"
                    id={`activity-${type}`}
                    name="activityType"
                    checked={selectedActivityTypes.includes(type)}
                    onChange={() => handleTypeCheckbox(type)}
                  />
                </div>
              );
            })}
          </div>
        </details>
      </div>
    </Fragment>
  );
};

const PageLoader = () => {
  return (
    <div className="text-6xl z-10 absolute inset-0 h-screen  w-full bg-black/50 text-white grid place-content-center">
      LOADING...
    </div>
  );
};

export default StravaActivities;
