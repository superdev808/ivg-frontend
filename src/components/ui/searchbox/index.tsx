import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';
import { debounce } from "lodash";

export default function SearchBox(
  { handleSearch, loading }: { handleSearch: (str: string) => void, loading: boolean }
) {
  const [qureyString, setQueryString] = useState("");
  const debouncedSearch = debounce(handleSearch, 500);

  const handleChange = (e: any) => {
    setQueryString(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="p-inputgroup flex-1">
      <InputText
        placeholder="Keyword"
        onChange={handleChange}
        value={qureyString}
        disabled={loading}
      />
      {loading && <ProgressSpinner className="ml-4" style={{width: '50px', height: '50px'}} />}
    </div>
  );
}
