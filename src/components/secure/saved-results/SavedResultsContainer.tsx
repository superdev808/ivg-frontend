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
        className: "mt-8",
      });
    } catch (error) {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save result",
        life: 3000,
        className: "mt-8",
      });
    }
  };

  const userInfo = data?.data;

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      <div className="container flex flex-column align-items-center overflow-auto px-4 pb-4 bg-beige text-light-green">
        <h1>Saved Results</h1>

        <div className="mt-2 w-12 mx-auto flex flex-column align-items-center lg:w-8 xl:w-6">
          {isLoading && <ProgressSpinner className="w-1" />}
          {!isLoading && userInfo && (
            <>
              {userInfo.savedResults.length === 0 ? (
                <p className="text-center">
                  You have not saved any results yet.
                </p>
              ) : (
                <>
                  <span className="p-input-icon-left w-full">
                    <i className="pi pi-search" />
                    <InputText
                      placeholder="Search"
                      className="w-full bg-transparent"
                      value={search}
                      disabled={isLoading}
                      onChange={(evt) => setSearch(evt.target.value)}
                    />
                  </span>

                  <SavedResultsList
                    savedResults={userInfo.savedResults}
                    search={search}
                    isLoading={isDeletingSavedResult}
                    onDelete={handleDelete}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedResultsContainer;
