
import {useMemo} from 'react';
import { format } from "date-fns";
import { useTable } from 'react-table'; 

import {
  convertMetersToKilometers,
  convertMetersToMiles,
} from "~/utils/conversion";
import { StravaActivity } from "~/server/api/routers/strava";


const METERS_TO_KMH = 3.6;
const METERS_TO_MPH = 2.23694;

const COLUMNS = [
    {
      Header: 'Date',
      accessor: 'start_date',
      Cell: ({ value }: {value: string}) => {
        return format(
            new Date(value),
            "dd-MM-yyyy 'at' h:mm aaa"
          )
      }
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
        Header: ({ distanceUnit}: { distanceUnit: string;}) => {
            return (
                <>
                Distance
                <br />
                <small>({distanceUnit})</small>
                </>
            );
        },
        accessor: "distance",
        Cell: ({value, isMetric, distanceUnit }: {value: number; isMetric: boolean; distanceUnit: string;}) => {
            const distance = isMetric
                  ? convertMetersToKilometers(value)
                  : convertMetersToMiles(value);
            return `${distance} ${distanceUnit}`;
        }
    }, 
    {
        Header: "Activity Type",
        accessor: "type"
    },
    {
        Header: ({speedUnit}: {speedUnit: string;}) => {
            return (
                <>
                Average Speed
                 <br />
                 <small>({speedUnit})</small></>
            )
        },
        accessor: "average_speed",
        Cell: ({value, isMetric, speedUnit }: {value: number; isMetric: boolean; speedUnit: string;}) => {

            const averageSpeed = isMetric
                  ? value * METERS_TO_KMH
                  : value * METERS_TO_MPH;
            return `${averageSpeed.toFixed(2)} ${speedUnit}`;
        }
    },
    {
        Header: "Private",
        accessor: "private",
        Cell: ({value }: {value: boolean; }) => {
            return `${value ? 'private' : ""}`;
        }
    },

  ];

const StravaTable = ({data, isMetric}: { data: StravaActivity[], isMetric: boolean; }) => {
    const speedUnit = isMetric ? "km/h" : "mph";
    const distanceUnit = isMetric ? "km" : "miles";

    const columns = useMemo(() => COLUMNS, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = useTable({
        // @ts-ignore
        columns,
        data,
        isMetric,
        distanceUnit,
        speedUnit
      });

    return (
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        </table>
    )
};

export default StravaTable;