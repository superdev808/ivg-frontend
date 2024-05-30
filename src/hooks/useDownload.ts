interface DownloadHook {
  download: (data: Blob, fileName: string) => void;
}

function useDownload(): DownloadHook {
  function download(data: Blob, fileName: string): void {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", fileName);
    a.click();
    a.remove();
  }

  return {
    download,
  };
}

export default useDownload;
