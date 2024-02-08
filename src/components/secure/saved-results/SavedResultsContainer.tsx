"use client";

import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

import {
  useDeleteSavedResultMutation,
  useGetUserInfoQuery,
} from "@/redux/hooks/apiHooks";

import SavedResultsList from "./SavedResultsList";

const SavedResultsContainer: React.FC = () => {
  const { data, isLoading, refetch } = useGetUserInfoQuery({});
  const [deleteSavedResult, { isLoading: isDeletingSavedResult }] =
    useDeleteSavedResultMutation();

  const [search, setSearch] = useState<string>("");
  const toastRef = useRef(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (resultId: string) => {
    try {
      await deleteSavedResult(resultId).unwrap();
      refetch();

      (toastRef.current as any).show({
        severity: "success",
        summary: "Success",
        detail: "Deleted saved result",
        life: 3000,
      });
    } catch (error) {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save result",
        life: 3000,
      });
    }
  };

  const userInfo = data?.data;

  return (
    <>
      <Toast ref={toastRef} />
      <div className="nav-offset container flex flex-column align-items-center overflow-auto px-4 pb-4">
        <h1>Saved Results</h1>

        <div className="mt-2 w-12 mx-auto flex flex-column align-items-center xl:w-6">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              placeholder="Search"
              className="w-full"
              value={search}
              disabled={isLoading}
              onChange={(evt) => setSearch(evt.target.value)}
            />
          </span>

          {isLoading && <ProgressSpinner className="w-1" />}
          {!isLoading && userInfo && (
            <div className="w-full mt-4">
              {userInfo.savedResults.length === 0 ? (
                <p>You have not saved any results yet.</p>
              ) : (
                <SavedResultsList
                  savedResults={userInfo.savedResults}
                  search={search}
                  isLoading={isDeletingSavedResult}
                  onDelete={handleDelete}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedResultsContainer;
