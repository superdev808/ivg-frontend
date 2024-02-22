"use client";

import { find } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useMemo, useRef } from "react";

import {
  useDeleteSavedResultMutation,
  useGetUserInfoQuery,
} from "@/redux/hooks/apiHooks";

import SavedResultDetail from "./SavedResultDetail";

const SAVED_RESULTS_LISTING_PAGE_URL = "/settings/saved-results";

const SavedResultsDetailContainer: React.FC = () => {
  const { data, isLoading, refetch } = useGetUserInfoQuery({});
  const [deleteSavedResult, { isLoading: isDeletingSavedResult }] =
    useDeleteSavedResultMutation();

  const router = useRouter();
  const params = useSearchParams();

  const toastRef = useRef(null);

  const id = params.get("id");

  useEffect(() => {
    if (!id) {
      router.replace(SAVED_RESULTS_LISTING_PAGE_URL);
    }
  }, [id, router]);

  const savedResult = useMemo(() => {
    return find(
      data?.data?.savedResults,
      (result: Record<string, string>) => result.id === id
    );
  }, [id, data]);

  useEffect(() => {
    if (!isLoading && !savedResult) {
      router.replace(SAVED_RESULTS_LISTING_PAGE_URL);
    }
  }, [isLoading, savedResult, router]);

  const handleDelete = async () => {
    try {
      await deleteSavedResult(id).unwrap();
      await refetch();

      (toastRef.current as any).show({
        severity: "success",
        summary: "Success",
        detail: "Deleted saved result",
        life: 3000,
        className: "mt-8",
      });

      router.replace(SAVED_RESULTS_LISTING_PAGE_URL);
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

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      <div className="nav-offset container flex flex-column align-items-center overflow-auto px-2 pb-4">
        {id && (
          <>
            {isLoading && <ProgressSpinner className="w-1 mt-4" />}
            {!isLoading && savedResult && (
              <SavedResultDetail
                savedResult={savedResult}
                isDeleting={isDeletingSavedResult}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SavedResultsDetailContainer;
