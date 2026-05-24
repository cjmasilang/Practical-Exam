import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImportValidationProps {
    errors?: string[]
    infos?: string[]
    success?: boolean
    className?: string
}

export function ImportValidation({ errors, infos, success, className }: ImportValidationProps) {
    if (!errors?.length && !infos?.length && !success) return null

    return (
        <div className={cn("space-y-3 animate-in fade-in slide-in-from-top-1", className)}>
            {success && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <p className="text-[11px] font-bold uppercase tracking-wider">All rows validated successfully</p>
                </div>
            )}

            {errors && errors.length > 0 && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-destructive">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <p className="text-[11px] font-black uppercase tracking-[0.1em]">Validation Errors Found:</p>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc">
                        {errors.map((error, i) => (
                            <li key={i} className="text-[10px] font-medium leading-tight">{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {infos && infos.length > 0 && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-blue-500">
                    <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 shrink-0" />
                        <p className="text-[11px] font-black uppercase tracking-[0.1em]">System Notes:</p>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc">
                        {infos.map((info, i) => (
                            <li key={i} className="text-[10px] font-medium leading-tight">{info}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
