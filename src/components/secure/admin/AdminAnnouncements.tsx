import parse from "html-react-parser";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast, ToastMessage } from "primereact/toast";
import React, { SyntheticEvent, useMemo, useRef, useState } from "react";

import {
  useGetAnnouncementsListQuery,
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} from "@/redux/hooks/apiHooks";
import { AnnouncementItem } from "@/types/calculators";

const AdminAnnouncementsManagement: React.FC = () => {
  const toast = useRef(null);

  const [contentDialogVisible, setContentDialogVisible] =
    useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, refetch } = useGetAnnouncementsListQuery({});

  const cleanedData = useMemo(() => {
    return ((data ?? []) as any[]).map((item) => {
      let published_at = new Date(item.published_at);
      published_at.setHours(0, 0, 0, 0);
      return { ...item, published_at };
    });
  }, [data]);

  const [createAnnouncement] = useCreateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const onCreateOrUpdateAnnouncement = async (
    content: string,
    _id: string | null
  ) => {
    setContentDialogVisible(false);
    setNewContent("");
    setSelectedId(null);

    try {
      const response: any = await createAnnouncement({
        content,
        _id: _id == null ? undefined : _id,
      });

      if (response.error) {
        throw new Error("An error occurred while publishing new announcement.");
      }

      showToast(
        {
          label: "Success",
          message: "New announcement published successfully.",
        },
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
  };

  const onCreateAnnouncement = async () => {
    setContentDialogVisible(true);
    setNewContent("");
  };

  const onUpdateAnnouncement = async (e: SyntheticEvent) => {
    setNewContent(selectedAnnouncement?.content || "");
    setSelectedId(selectedAnnouncement?._id || null);
    setContentDialogVisible(true);
    (menuPanel.current as OverlayPanel).toggle(e);
  };

  const onDeleteAnnouncement = async (announcementItem: AnnouncementItem) => {
    confirmDialog({
      message: "Are you sure you want to delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        try {
          const response: any = await deleteAnnouncement({
            _id: announcementItem._id,
          });

          refetch();

          if (response.error) {
            throw new Error(
              "An error occurred while deleting selected announcement."
            );
          }

          showToast(
            {
              label: "Success",
              message: "Announcement deleted successfully.",
            },
            toast,
            "success"
          );
        } catch (error) {
          showToast(
            {
              label: "Error",
              message:
                "An error occurred while deleting selected announcement.",
            },
            toast,
            "error"
          );
        }
      },
    });
  };

  const menuPanel = useRef<OverlayPanel>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementItem | null>(null);

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
    <div className="flex justify-content-start">
      <Calendar
        value={options.value}
        onChange={(e: CalendarChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        selectionMode="range"
        readOnlyInput
        className="flex-grow-1"
      />
    </div>
  );

  const actionsBodyTemplate = (row: AnnouncementItem) => (
    <>
      <Button
        icon="pi pi-ellipsis-v"
        rounded
        text
        onClick={(e) => {
          (menuPanel.current as OverlayPanel).toggle(e);
          setSelectedAnnouncement(row);
        }}
      />

      <OverlayPanel
        pt={{
          content: { className: "py-0 px-4 text-sm" },
          root: { className: "border-round-lg	shadow-2 border-1 border-100" },
        }}
        ref={menuPanel}
        onHide={() => setSelectedAnnouncement(null)}
      >
        <p
          className="cursor-pointer hover:text-gray-600"
          onClick={(e) => onUpdateAnnouncement(e)}
        >
          Update
        </p>

        <p
          className="cursor-pointer hover:text-gray-600"
          onClick={() => {
            onDeleteAnnouncement(selectedAnnouncement as AnnouncementItem);
          }}
        >
          Delete
        </p>
      </OverlayPanel>
    </>
  );

  const columns = [
    {
      field: "content",
      header: "Content",
      body: (row: AnnouncementItem) => (
        <div className="h-8rem w-full overflow-y-auto inline-block flex align-items-center">
          <span>{parse(row.content)}</span>
        </div>
      ),
      sortable: true,
      filter: true,
    },
    {
      field: "published_at",
      header: "Published at",
      body: (row: AnnouncementItem) => (
        <span>
          {row.published_at.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
      sortable: true,
      filter: true,
      filterElement: calendarRangeFilterTemplate,
    },
    {
      field: "actions",
      body: (row: AnnouncementItem) => actionsBodyTemplate(row),
      sortable: false,
    },
  ];

  return (
    <div className="flex flex-column flex-grow-1">
      <div className="mb-3 flex align-items-center">
        <span className="text-2xl font-semibold">Announcements Management</span>
        <Button
          label="Publish new one"
          size="small"
          className="ml-3 text-md px-3 py-3"
          onClick={onCreateAnnouncement}
        />
      </div>

      <div className="flex-grow-1 border-1 border-light-green">
        <DataTable
          stripedRows
          size="small"
          value={cleanedData}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          globalFilterFields={["content", "published_at"]}
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

      <ConfirmDialog />

      <Dialog
        header="Publish new announcement"
        visible={contentDialogVisible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => setContentDialogVisible(false)}
        footer={
          <>
            <Button
              label="Publish"
              className="p-button p-button-primary"
              icon="pi pi-check"
              onClick={() =>
                onCreateOrUpdateAnnouncement(newContent, selectedId)
              }
              autoFocus
            />
            <Button
              label="Cancel"
              className="p-button p-button-secondary"
              icon="pi pi-times"
              onClick={() => setContentDialogVisible(false)}
            />
          </>
        }
      >
        <Editor
          value={newContent}
          onTextChange={(e) => setNewContent(e.htmlValue ?? "")}
          style={{ height: 320 }}
        />
      </Dialog>
    </div>
  );
};

export default AdminAnnouncementsManagement;
