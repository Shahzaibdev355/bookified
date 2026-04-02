"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FormValues } from "@/lib/zod";
import { UseFormReturn } from "react-hook-form";

interface VoiceSelectorProps {
    form: UseFormReturn<FormValues>;
}

const VoiceSelector = ({ form }: VoiceSelectorProps) => {

    const voices = {
        male: [
            { id: "dave", name: "Dave", desc: "Young male, British-Essex" },
            { id: "daniel", name: "Daniel", desc: "Authoritative but warm" },
            { id: "chris", name: "Chris", desc: "Casual & easy-going" },
        ],
        female: [
            { id: "rachel", name: "Rachel", desc: "Calm & clear" },
            { id: "sarah", name: "Sarah", desc: "Soft & approachable" },
        ],
    };

    return (
        <Field>
            <FieldLabel className="form-label">Choose Assistant Voice</FieldLabel>

            <div className="space-y-5">
                {/* Male voices */}
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9e8575]">
                        Male Voices
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {voices.male.map((v) => (
                            <button
                                key={v.id}
                                type="button"
                                onClick={() => form.setValue("persona", v.id)}
                                className={`voice-selector-option rounded-xl border-2 px-4 py-3 text-left transition-all ${form.watch("persona") === v.id
                                    ? "voice-selector-option-selected border-[#663820] bg-[#663820]/5 shadow-sm"
                                    : "border-[#e2d8cf] bg-white hover:border-[#c8b8a2]"
                                    }`}
                            >
                                <div className="flex items-start gap-2">
                                    <span
                                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${form.watch("persona") === v.id ? "border-[#663820]" : "border-[#c8b8a2]"}`}
                                    >
                                        {form.watch("persona") === v.id && (
                                            <span className="h-2 w-2 rounded-full bg-[#663820]" />
                                        )}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-[#3d2b1f]">{v.name}</p>
                                        <p className="text-xs leading-snug text-[#9e8575]">{v.desc}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Female voices */}
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9e8575]">
                        Female Voices
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {voices.female.map((v) => (
                            <button
                                key={v.id}
                                type="button"
                                onClick={() => form.setValue("persona", v.id)}
                                className={`voice-selector-option rounded-xl border-2 px-4 py-3 text-left transition-all ${form.watch("persona") === v.id
                                    ? "voice-selector-option-selected border-[#663820] bg-[#663820]/5 shadow-sm"
                                    : "border-[#e2d8cf] bg-white hover:border-[#c8b8a2]"
                                    }`}
                            >
                                <div className="flex items-start gap-2">
                                    <span
                                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${form.watch("persona") === v.id ? "border-[#663820]" : "border-[#c8b8a2]"}`}
                                    >
                                        {form.watch("persona") === v.id && (
                                            <span className="h-2 w-2 rounded-full bg-[#663820]" />
                                        )}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-[#3d2b1f]">{v.name}</p>
                                        <p className="text-xs leading-snug text-[#9e8575]">{v.desc}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {form.formState.errors.persona && (
                <FieldError>
                    {form.formState.errors.persona.message}
                </FieldError>
            )}
        </Field>
    );
}

export default VoiceSelector;