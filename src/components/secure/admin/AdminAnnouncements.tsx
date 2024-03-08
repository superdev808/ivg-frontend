import classNames from "classnames/bind";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from "primereact/toast";
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { InputText } from "primereact/inputtext";
import React, { useMemo, useRef, useState } from "react";
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';

import {
  useGetLatestAnnouncementQuery,
  useGetAnnouncementsListQuery,
  useCreateAnnouncementMutation
} from "@/redux/hooks/apiHooks";
import { ANNOUNCEMENT_ITEM } from "@/types/calculators";

const cx = classNames.bind({});

const AdminAnnouncementsManagement: React.FC = () => {
  const toast = useRef(null);

  const [contentDialogVisible, setContentDialogVisible] = useState(false);
  const [newContent, setNewContent] = useState('');

  const { data, refetch } = useGetAnnouncementsListQuery({});
  const cleanedData = useMemo(() => {
    return ((data ?? []) as any[]).map(item => {
      let published_at = new Date(item.published_at);
      published_at.setHours(0, 0, 0, 0);
      return { ...item, published_at }
    })
  }, [data])

  const [createAnnouncement] = useCreateAnnouncementMutation()
  const onCreateAnnouncement = async (content: string) => {
    setContentDialogVisible(false)
    setNewContent('')
    try {
      const response: any = await createAnnouncement({ content });
      if (response.error) {
        throw new Error("An error occurred while publishing new announcement.");
      }
      showToast(
        { label: "Success", message: "New announcement published successfully." },
        toast,
        "success"
      );
      refetch();
    } catch (error) {
      showToast(
        {
          label: "Error",
          message: "An error occurred while publishing new announcement.",
        },
        toast,
        "error"
      );
    }
  }

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

  const calendarRangeFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => (
    <div className="flex justify-content-center">
      <Calendar
        value={options.value}
        onChange={(e: CalendarChangeEvent) => options.filterApplyCallback(e.value)}
        selectionMode="range"
        readOnlyInput
      />
    </div>
  );

  const columns = [
    {
      field: "content",
      header: "Content",
      body: (row: ANNOUNCEMENT_ITEM) => <div className="h-8rem w-full overflow-y-auto inline-block flex align-items-center"><span dangerouslySetInnerHTML={{__html: row.content}} /></div>,
      sortable: true,
      filter: true,
    },
    {
      field: "published_at",
      header: "Published at",
      body: (row: ANNOUNCEMENT_ITEM) => <span>{row.published_at.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>,
      sortable: true,
      filter: true,
      filterElement: calendarRangeFilterTemplate
    }
  ];

  return (
    <div className="flex flex-column flex-grow-1">
      <div className="mb-3 flex align-items-center">
        <span className="text-2xl font-semibold">Announcements Management</span>
        <Button label="Publish new one" className="ml-3 text-md px-3 py-3" onClick={() => setContentDialogVisible(true)} />
      </div>

      <div className="flex-grow-1">
        <DataTable
          stripedRows
          size="small"
          value={cleanedData}
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
              filterElement={col.filterElement ?? defaultFilterTemplate}
              showFilterMenu={false}
              pt={{ headerCell: { className: "py-2" } }}
            />
          ))}
        </DataTable>
      </div>
      <Toast ref={toast} position="bottom-center" />
      <Dialog
        header="Publish new announcement"
        visible={contentDialogVisible}
        maximizable
        style={{ width: '50vw' }}
        onHide={() => setContentDialogVisible(false)}
        footer={
          <>
            <Button label="Publish" className="p-button p-button-primary" icon="pi pi-check" onClick={() => onCreateAnnouncement(newContent)} autoFocus />
            <Button label="Cancel" className="p-button p-button-secondary" icon="pi pi-times" onClick={() => setContentDialogVisible(false)}/>
          </>
        }
      >
        <Editor value={newContent} onTextChange={(e) => setNewContent(e.htmlValue ?? '')} style={{ height: '320px' }} />
      </Dialog>
    </div>
  );
};

export default AdminAnnouncementsManagement;
