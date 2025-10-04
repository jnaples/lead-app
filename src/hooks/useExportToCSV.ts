import { useCallback } from "react";

export function useExportToCSV(filename = "output.csv") {
  const exportCSV = useCallback(
    (data: Record<string, any>[], headersMap?: Record<string, string>) => {
      if (!data || data.length === 0) return;

      const keys = Object.keys(data[0]);
      const headers = keys.map((key) => headersMap?.[key] ?? key);

      const csvRows = [
        headers.join(","), // first row = headers
        ...data.map((row) =>
          keys
            .map((key) => {
              const value = row[key] ?? "";
              return `"${String(value).replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      link.click();
      URL.revokeObjectURL(url);
    },
    [filename]
  );

  return exportCSV;
}
