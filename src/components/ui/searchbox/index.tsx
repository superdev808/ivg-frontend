import { debounce } from "lodash";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useCallback, useEffect, useState } from "react";

interface SearchBoxProps {
  handleSearch: (str: string) => void;
  loading: boolean;
  inputRef: any;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  handleSearch,
  loading,
  inputRef,
}) => {
  const [qureyString, setQueryString] = useState<string>("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e: any) => {
    setQueryString(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    if (!loading && inputRef.current) {
      (inputRef.current as any).focus();
    }
  }, [loading, inputRef]);

  return (
    <div className="p-inputgroup flex-1">
      <InputText
        placeholder="Keyword"
        onChange={handleChange}
        value={qureyString}
        ref={inputRef}
        style={{ height: 50, backgroundColor: "transparent", borderRadius: 10 }}
      />
      {loading && (
        <ProgressSpinner className="ml-4" style={{ width: 50, height: 50 }} />
      )}
    </div>
  );
};

export default SearchBox;
