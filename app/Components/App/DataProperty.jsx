import { Trash } from "~/Icons/BI";

export default function DataProperty({ data }) {
    return (
        <div className="w-full flex justify-between">
            <div className="flex items-center justify-center gap-2">
                {
                    data?.title ? (
                        <pre><span className="rounded bg-orange-200 text-orange-700">{'"'}{data.title}{'"'}</span>:</pre>
                    ) : null 
                }
                <span>({data?.x ?? "-"}, {data?.y ?? "-"})</span>
            </div>
            <button
                className="text-red-600 hover:text-red-800"
            >
                <Trash size="xs" />
            </button>
        </div>
    );
}