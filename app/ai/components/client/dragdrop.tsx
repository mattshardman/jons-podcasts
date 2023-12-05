"use client"
import { useDropzone } from 'react-dropzone';

export interface DragAndDropProps {
  title: string;
  setData: (files: File[]) => void;
}

export const DragAndDrop = ({ title, setData }: DragAndDropProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: setData,
  });

  return (
    <div className="grid gap-2 w-full">
      <label className="block text-sm font-medium text-white">{title}</label>

      <div
        className="w-full flex justify-center px-6 py-80 border-2 border-white border-dashed rounded-md"
        {...getRootProps()}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-white">
            <label
              htmlFor="fileInput"
              className="relative cursor-pointer rounded-md font-medium text-white hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              Upload a file
              <input {...getInputProps()} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-white">CSV</p>
        </div>
      </div>
    </div>
  );
};
