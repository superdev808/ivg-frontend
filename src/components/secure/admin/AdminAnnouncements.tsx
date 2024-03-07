import classNames from "classnames/bind";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Toast, ToastMessage } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";

import {
  useGetLatestAnnouncementQuery,
  useGetAnnouncementsListQuery,
  useCreateAnnouncementMutation
} from "@/redux/hooks/apiHooks";
import { ANNOUNCEMENT_ITEM } from "@/types/calculators";

const cx = classNames.bind({});

const AdminAnnouncementsManagement: React.FC = () => {
  const { data, refetch } = useGetAnnouncementsListQuery({});

  const toast = useRef(null);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    content: { value: null, matchMode: FilterMatchMode.CONTAINS },
    published_at: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });

  const showToast = (
    response: { label: string; message: string },
    ref: React.RefObject<Toast>,
    severity: ToastMessage["severity"]
  ) => {
    ref.current?.show({
      severity: severity,
      summary: response.label,
      detail: response.message,
      life: 3000,
    });
  };

  const defaultFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => (
    <InputText
      className="p-inputtext-sm"
      value={options.value}
      onChange={(e) => options.filterApplyCallback(e.target.value)}
    />
  );

  const columns = [
    {
      field: "content",
      header: "Content",
      body: (row: ANNOUNCEMENT_ITEM) => <span>{row.content}</span>,
      sortable: true,
      filter: true,
    },
    {
      field: "published_at",
      header: "Published at",
      body: (row: ANNOUNCEMENT_ITEM) => {
        console.log("AAA", row);
        return 
      (<span>{row.published_at.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>);
      },
      sortable: true,
      filter: true,
    }
  ];

  return (
    <>
      <div className="mb-3">
        <span className="text-2xl font-semibold">Announcements Management</span>
      </div>

      <div>
        <DataTable
          stripedRows
          size="small"
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          globalFilterFields={[
            "content",
            "published_at",
          ]}
          filters={filters}
          filterDisplay="row"
          pt={{ wrapper: { className: "h-auto" } }}
        >
          {columns.map((col, i) => (
            <Column
              sortable={col.sortable}
              key={col.field}
              field={col.field}
              header={
                <div className="flex justify-content-between font-bold">
                  {col.header}
                </div>
              }
              body={col.body}
              bodyStyle={{ textAlign: "start" }}
              filterField={col.field}
              filter={col.filter}
              filterElement={defaultFilterTemplate}
              showFilterMenu={false}
              pt={{ headerCell: { className: "py-2" } }}
            />
          ))}
        </DataTable>
      </div>

      <Toast ref={toast} position="bottom-center" />

      <ConfirmDialog />
    </>
  );
};

export default AdminAnnouncementsManagement;
