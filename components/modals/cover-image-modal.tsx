"use client";

import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useAuth } from "@clerk/clerk-react";

export const CoverImageModal = () => {
  const { isSignedIn } = useAuth();
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file && isSignedIn) {
      try {
        setIsSubmitting(true);
        setFile(file);

        const res = await edgestore.publicFiles.upload({
          file,
          options: { replaceTargetUrl: coverImage.url },
        });

        await update({
          id: params.documentId as Id<"documents">,
          coverImage: res.url,
        });

        onClose();
      } catch (error) {
        console.error("Failed to update cover image:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
