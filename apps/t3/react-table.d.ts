import "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    speedUnit: string;
    distanceUnit: string;
    isMetric: boolean;
  }
}
