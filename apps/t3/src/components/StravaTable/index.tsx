import {
  useMemo,
  useEffect,
  useRef,
  type HTMLProps,
  useState,
  Fragment,
} from "react";
import { format } from "date-fns";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  convertMetersToKilometers,
  convertMetersToMiles,
} from "~/utils/conversion";
import { StravaActivity } from "~/server/api/routers/utils/strava";

import { api } from "~/utils/api";

import Button from "~/components/Button";

const METERS_TO_KMH = 3.6;
const METERS_TO_MPH = 2.23694;

const columnHelper = createColumnHelper<StravaActivity>();

const columns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("start_date", {
    header: "Date",
    cell: (info) => {
      return format(new Date(info.getValue()), "dd-MM-yyyy 'at' h:mm aaa");
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("distance", {
    header: ({ table }) => {
      return (
        <>
          Distance
          <br />
          <small>({table?.options?.meta?.distanceUnit})</small>
        </>
      );
    },
    cell: ({ getValue, table }) => {
      const distance = table.options.meta.isMetric
        ? convertMetersToKilometers(getValue())
        : convertMetersToMiles(getValue());
      return `${distance} ${table.options.meta.distanceUnit}`;
    },
  }),
  columnHelper.accessor("type", {
    header: "Activity Type",
  }),

  columnHelper.accessor("average_speed", {
    header: ({ table }) => {
      return (
        <>
          Average Speed
          <br />
          <small>({table.options.meta.speedUnit})</small>
        </>
      );
    },
    cell: ({ table, getValue }) => {
      const averageSpeed = table.options.meta.isMetric
        ? getValue() * METERS_TO_KMH
        : getValue() * METERS_TO_MPH;
      console.log(getValue());
      return `${averageSpeed.toFixed(2)} ${table.options.meta.speedUnit}`;
    },
  }),
  columnHelper.accessor("private", {
    header: "Private?",
    cell: ({ getValue }) => (getValue() ? "private" : ""),
  }),
];

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    // @ts-ignore
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

const StravaTable = ({
  data,
  isMetric,
  reloadData,
}: {
  data: StravaActivity[] | [];
  reloadData: () => void;
  isMetric: boolean;
}) => {
  const speedUnit = isMetric ? "km/h" : "mph";
  const distanceUnit = isMetric ? "km" : "miles";
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState({});

  // const oneMutation = api.strava.saveOneActivity.useMutation();
  // const manyMutation = api.strava.saveManyActivities.useMutation();
  // const convertMutation = api.strava.convertOneActivity.useMutation();
  const deleteMutation = api.strava.deleteAllDBActivities.useMutation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    meta: {
      speedUnit,
      distanceUnit,
      isMetric,
    },
  });

  const selectedActivities = useMemo(() => {
    // console.log("changing");
    const rowModal = table.getSelectedRowModel();
    // console.log(rowModal.flatRows.map((row) => row.original.id));
    return rowModal.flatRows.map((row) => row.original.id);
  }, [rowSelection]);

  const activitiesCount = selectedActivities.length;

  // const handleSaveOne = async () => {
  //   // 1. what is the id of the selected row?
  //   const activityId = selectedActivities[0];

  //   // get the activity data
  //   const selectedRows = table.getSelectedRowModel();
  //   const row = selectedRows.rows[0]?.original;

  //   console.log({ row });

  //   // 2. fire off the saveActivity mutation

  //   if (row && activityId) {
  //     const mutation = await oneMutation.mutateAsync({
  //       activityId: activityId?.toString(),
  //       name: row.name,
  //       distance: row.distance,
  //       average_speed: row.average_speed,
  //       type: row.type,
  //       start_date: row.start_date,
  //       private: row.private,

  //       //   name: "derp",
  //       //   distance: 1000,
  //       //   averageSpeed: 5,
  //     });
  //     // // finally: reset the selection
  //     if (mutation.message === "success") {
  //       table.resetRowSelection();
  //     }
  //     // console.log({ mutation });
  //   }
  // };

  // const handleConvertOne = async () => {
  //   const activityId = selectedActivities[0];
  //   const activity = table
  //     .getSelectedRowModel()
  //     .flatRows.find((row) => row.original.id === activityId);

  //   if (!activity || activity.original.type !== "Run") {
  //     table.resetRowSelection();
  //   } else {
  //     const mutation = await convertMutation.mutateAsync({
  //       activityId: activity.original.id.toString(),
  //       activityName: activity.original.name,
  //     });

  //     if (mutation?.message === "success") {
  //       reloadData();
  //       table.resetRowSelection();
  //     }
  //   }
  //   // console.log({ original: activity.original });
  //   return;
  // };

  const handleDeleteAll = async () => {
    setLoading(true);
    const deleteAll = await deleteMutation.mutateAsync();
    if (deleteAll.message === "success") {
      setLoading(false);
      table.resetRowSelection();
    }
  };

  // console.log(mutation.isSuccess);

  return (
    <Fragment>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <StravaTableActionBar
        onReset={() => table.resetRowSelection()}
        // onSaveOne={handleSaveOne}
        onDeleteAll={handleDeleteAll}
        count={activitiesCount}
      />
    </Fragment>
  );
};

/**
 * Strava Table Action Bar is a bar that shows when the user has
 * selected some rows on the table. The purpose of the bar is to allow
 * the user to choose what they want to do with the selected items.
 * @param count number
 * @returns JSX.Element
 */
const StravaTableActionBar = ({
  count,
  onReset,
  onDeleteAll,
  loading,
}: {
  count: number;
  onReset: () => void;
  onDeleteAll: () => void;
  loading: boolean;
}) => {
  if (count === 0) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0   w-screen border bg-white p-4">
      <div className="container  mx-auto  flex max-w-7xl items-center gap-4 px-2 sm:px-6 lg:px-8">
        {loading ? (
          <p>Loading</p>
        ) : (
          <Fragment>
            <p>You have selected {count} activities</p>
            {/* {count === 1 && <Button onClick={onSaveOne}>Save ONE to DB</Button>} */}
            {/* {count === 1 && (
          <Button onClick={onConvertOne}>Convert ONE in Strava</Button>
        )} */}
            {count > 1 && <Button onClick={onDeleteAll}>Delete All</Button>}
            <Button onClick={onReset}>Reset</Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default StravaTable;
