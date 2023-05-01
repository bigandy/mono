import { useMemo, useEffect, useRef, type HTMLProps, useState } from "react";
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
import { StravaActivity } from "~/server/api/routers/strava";

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
    header: "id",
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
}: {
  data: StravaActivity[];
  isMetric: boolean;
}) => {
  const speedUnit = isMetric ? "km/h" : "mph";
  const distanceUnit = isMetric ? "km" : "miles";
  const [rowSelection, setRowSelection] = useState({});

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
    console.log(rowModal.flatRows.map((row) => row.original.id));
    return rowModal.flatRows.map((row) => row.original.id);
  }, [rowSelection]);

  const activitiesCount = selectedActivities.length;

  return (
    <div className="p-2">
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
        count={activitiesCount}
      />
    </div>
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
}: {
  count: number;
  onReset: () => void;
}) => {
  if (count === 0) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0 flex w-screen items-center gap-4 border bg-white p-4">
      <p>You have selected {count} activities</p>
      <Button handleClick={onReset}>Reset</Button>
    </div>
  );
};

export default StravaTable;
