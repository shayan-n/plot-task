import CollapseBox from "./Global/CollapseBox";
import Input from "./Global/Input";

export default function Properties() {
    return (
        <div className="w-full max-w-md h-full bg-gray-100">
            <CollapseBox
                title={"Properties"}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gray-600">Headers</h3>
                        <div className="flex flex-col gap-2">
                            <Input
                                label={"Title"}
                                placeholder={"Plot title"}
                            />
                            <Input
                                label={"X Label"}
                                placeholder={"x axis"}
                            />
                            <Input
                                label={"Y Label"}
                                placeholder={"y axis"}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gray-600">Margin</h3>
                        <div className="flex gap-2">
                            <Input
                                label={"Top"}
                                placeholder={"10"}
                            />
                            <Input
                                label={"Right"}
                                placeholder={"10"}
                            />
                            <Input
                                label={"Bottom"}
                                placeholder={"10"}
                            />
                            <Input
                                label={"Left"}
                                placeholder={"10"}
                            />
                        </div>
                    </div>
                </div>
            </CollapseBox>
            {/* title */}
            {/* x label */}
            {/* y label */}
            {/* margin */}
            {/* top right bottom left */}
            {/* add data */}
            {/* title, x, y [delete-icon] */}
            {/* title, x, y [delete-icon] */}
            {/* title, x, y [delete-icon] */}
            {/* title, x, y [delete-icon] */}
            {/* + */}
            {/* lock plot */}
            {/* zoom selection, pan, cross air, default */}
            {/* zoom - + */}
        </div>
    );
}