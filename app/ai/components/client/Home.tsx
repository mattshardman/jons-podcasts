"use client";
import React from "react";
import { DragAndDrop } from "./dragdrop";
import { readCsv } from "./utils";
import { ResultsTable } from "../server/ResultsTable";
import { InputTable } from "../server/InputTable";

export function Home() {
  const [csv, setCsv] = React.useState<Awaited<ReturnType<typeof readCsv>>>();
  const onDrop = async (input: File[]) => {
    const result = await readCsv(input);
    setCsv(result);
  };

  if (csv) {
    return (
      <div className="space-y-6 py-16 px-8">
        {/* <InputTable data={csv} />
        <hr /> */}
        <ResultsTable data={csv} />
      </div>
    );
  }

  return (
    <div className="py-16 px-8">
      <DragAndDrop title="Upload CSV" setData={onDrop} />
    </div>
  );
}
