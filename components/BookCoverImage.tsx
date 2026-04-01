import { ImageIcon } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Dropzone } from "./DropZone";

const BookCoverImage = ({ form }: any) => {
    return (
        <Field>
            <FieldLabel className="form-label">Cover Image (Optional)</FieldLabel>

            <Dropzone
                accept="image/*"
                icon={<ImageIcon className="h-6 w-6" />}
                label="Click to upload cover image"
                hint="Leave empty to auto-generate from PDF"
                file={form.watch("coverImage")}
                onFile={(f) => form.setValue("coverImage", f)}
                onClear={() => form.setValue("coverImage", undefined)}
                error={form.formState.errors.coverImage?.message}
            />

            {form.formState.errors.coverImage && (
                <FieldError>
                    {form.formState.errors.coverImage.message}
                </FieldError>
            )}
        </Field>
    );
}

export default BookCoverImage;