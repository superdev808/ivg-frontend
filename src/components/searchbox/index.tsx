import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SearchBox(
  { handleSearch, loading }: { handleSearch: (str: string) => void, loading: boolean }
) {
  const [qureyString, setQueryString] = useState("");

  const handleChange = (e: any) => {
    setQueryString(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(qureyString);
  };

  return (
    <div className="p-inputgroup flex-1">
      <InputText
        placeholder="Keyword"
        onChange={handleChange}
        value={qureyString}
        disabled={loading}
      />
      {loading ? <ProgressSpinner className="ml-4" style={{width: '50px', height: '50px'}} /> : <Button label="Search" onClick={handleSearchClick} disabled={loading} />}
    </div>
  );
}
