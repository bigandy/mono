import { Fragment, useMemo, useState } from "react";

import Link from "next/link";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { type Activity, type ActivityKeys } from "~/types";
import { toast } from "react-hot-toast";

import { api } from "~/utils/api";
import { METERS_TO_KMH, METERS_TO_MPH } from "~/utils/consts";
import {
  convertMetersToKilometers,
  convertMetersToMiles,
} from "~/utils/conversion";
import { niceActivityDate } from "~/utils/date-time";

import Button from "~/components/Button";
import IndeterminateCheckbox from "~/components/IndeterminateCheckbox";

const columnHelper = createColumnHelper<Activity>();

const StravaTable = ({
  data,
  isMetric,
  columnsToShow,
}: {
  data: Activity[] | [];
  isMetric: boolean;
  columnsToShow: ActivityKeys[];
}) => {
  const utils = api.useContext();
  const speedUnit = isMetric ? "km/h" : "mph";
  const distanceUnit = isMetric ? "km" : "miles";
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(() => {
    const listOfColumns = [
      // columnHelper.accessor("id", {
      //   header: "ID",
      //   id: "id",
      //   cell: (info) => info.getValue(),
      // }),

      columnHelper.accessor("start_date", {
        header: "Date",
        id: "start_date",
        cell: (info) => {
          return niceActivityDate(info.getValue());
        },
      }),
      columnHelper.accessor("name", {
        header: "Name",
        id: "name",
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor("distance", {
        id: "distance",
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
          const distance = table.options.meta?.isMetric
            ? convertMetersToKilometers(getValue())
            : convertMetersToMiles(getValue());
          return `${distance} ${table.options.meta?.distanceUnit}`;
        },
      }),
      columnHelper.accessor("type", {
        header: "Activity Type",
        id: "type",
      }),
      columnHelper.accessor("total_elevation_gain", {
        header: "Elevation Gain",
        id: "total_elevation_gain",
      }),

      columnHelper.accessor("average_speed", {
        id: "average_speed",
        header: ({ table }) => {
          return (
            <>
              Average Speed
              <br />
              <small>({table.options?.meta?.speedUnit})</small>
            </>
          );
        },
        cell: ({ table, getValue }) => {
          const averageSpeed = table.options.meta?.isMetric
            ? getValue() * METERS_TO_KMH
            : getValue() * METERS_TO_MPH;
          return `${averageSpeed.toFixed(2)} ${table.options.meta?.speedUnit}`;
        },
      }),
      columnHelper.accessor("private", {
        id: "private",
        header: "Private?",
        cell: ({ getValue }: { getValue: () => any }) =>
          getValue() ? "private" : "",
      }),
    ];

    return listOfColumns.filter((column) => {
      return columnsToShow.includes(column.id as ActivityKeys);
    });
  }, [columnsToShow]);

  const deleteMutation = api.strava.deleteDBActivities.useMutation({
    onSuccess: () => {
      setLoading(false);
      utils.strava.getActivitiesFromDB.invalidate();
      table.resetRowSelection();
      toast.success("Successfully deleted rows");
    },
  });

  const table = useReactTable({
    data,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
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
      ...columns,

      columnHelper.accessor("id", {
        header: "",
        cell: ({ getValue }: { getValue: () => any }) => {
          return <Link href={`/activities/${getValue()}`}>See Activity</Link>;
        },
      }),
    ],
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
      sorting,
    },
    meta: {
      speedUnit,
      distanceUnit,
      isMetric,
    },
  });

  const selectedActivities = useMemo(() => {
    return table.getSelectedRowModel().flatRows.map((row) => row.original.id);
  }, [rowSelection]);

  const activitiesCount = selectedActivities.length;

  const handleDeleteRows = async () => {
    setLoading(true);
    const rowIds = table
      .getSelectedRowModel()
      .flatRows.map((row) => String(row.original.id));
    await deleteMutation.mutateAsync({ rowIds });
  };

  return (
    <Fragment>
      <table>
        <thead className={"sticky top-[64px] bg-white shadow-md"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const cellIsClickable = header.column.columnDef.header !== "";
                return (
                  <th
                    key={header.id}
                    {...{
                      className:
                        header.column.getCanSort() && cellIsClickable
                          ? "cursor-pointer select-none"
                          : "",
                      onClick: cellIsClickable
                        ? header.column.getToggleSortingHandler()
                        : undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                );
              })}
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
        loading={loading}
        onReset={() => table.resetRowSelection()}
        onDeleteRows={handleDeleteRows}
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
  onDeleteRows,
  loading,
}: {
  count: number;
  onReset: () => void;
  onDeleteRows: () => void;
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
            <Button primary onClick={onDeleteRows}>
              Delete {count} activities
            </Button>
            <Button onClick={onReset}>Reset Selection</Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default StravaTable;
