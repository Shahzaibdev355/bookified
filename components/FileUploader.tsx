import { Upload } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Dropzone } from "./DropZone";


const FileUploader = ({ form }: any) => {
    return (
        <Field>
            <FieldLabel className="form-label">Book PDF File</FieldLabel>

            <Dropzone
                accept="application/pdf"
                icon={<Upload className="h-6 w-6" />}
                label="Click to upload PDF"
                hint="PDF file (max 50MB)"
                file={form.watch("pdfFile")}
                onFile={(f) => form.setValue("pdfFile", f)}
                onClear={() => form.setValue("pdfFile", undefined)}
                error={form.formState.errors.pdfFile?.message}
            />

            {/* {form.formState.errors.pdfFile && (
                <FieldError>
                    {form.formState.errors.pdfFile.message}
                </FieldError>
            )} */}
        </Field>
    );
}

export default FileUploader;