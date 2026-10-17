import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
} from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

export default function FormDate<T extends FieldValues>({
  name,
  control,
  label,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          <Popover>
            <PopoverTrigger
              asChild
              id={field.name}
              aria-invalid={fieldState.invalid}
            >
              <Button
                variant="outline"
                data-empty={!field.value}
                className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                <CalendarIcon />

                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) =>
                  field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                }
              />
            </PopoverContent>
          </Popover>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
