"use client";

import { UploadCloudIcon } from "lucide-react";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./spinner";

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  image: "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md",
  active: "border-2",
  disabled: "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
  width?: number;
  height?: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Record<string, unknown>;
};

export function SingleImageDropzone({
  width = 1920,  // Increased default width for better quality
  height = 1080, // Increased default height for better quality
  value,
  onChange,
  className,
  disabled,
  dropzoneOptions,
}: InputProps) {
  const [loading, setLoading] = React.useState(false);

  const imageUrl = React.useMemo(() => {
    if (typeof value === "string") {
      return value;
    } else if (value) {
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    disabled,
    maxSize: 20 * 1024 * 1024, // 20MB max size
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      
      if (file) {
        try {
          setLoading(true);
          
          // Optional: Add image processing here if needed
          // For example, you could use a library like sharp to resize/optimize
          
          await onChange?.(file);
        } finally {
          setLoading(false);
        }
      }
    },
    ...dropzoneOptions,
  });

  React.useEffect(() => {
    acceptedFiles.forEach((file) => {
      URL.revokeObjectURL(URL.createObjectURL(file));
    });
  }, [acceptedFiles]);

  return (
    <div className={className}>
      <div
        {...getRootProps({
          className: twMerge(
            variants.base,
            imageUrl && variants.image,
            disabled && variants.disabled,
            className
          ),
        })}
      >
        <input {...getInputProps()} />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-50">
            <Spinner />
          </div>
        )}
        {imageUrl ? (
          <div className="relative w-full aspect-video">
            <img
              src={imageUrl}
              alt="Preview"
              width={width}
              height={height}
              className="h-full w-full object-cover rounded-md"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-xs text-gray-400 p-8">
            <UploadCloudIcon className="mb-2 h-7 w-7" />
            <div className="text-gray-400 text-center">
              <p>Click or drag image to upload</p>
              <p className="mt-1 text-gray-500">Max size: 20MB</p>
              <p className="mt-1 text-gray-500">Recommended: 1920×1080 or higher</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
