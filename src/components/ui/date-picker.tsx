import Flatpickr, { DateTimePickerProps } from "react-flatpickr";

function DatePicker(props: DateTimePickerProps) {
    return (
        <Flatpickr
            placeholder="Select time"
            className="h-10 w-52 rounded-md border border-input bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...props}
        />
    )
}

export default DatePicker