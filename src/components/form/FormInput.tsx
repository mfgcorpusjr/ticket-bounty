import { ComponentProps } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
} & ComponentProps<typeof Input>;

export default function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  ...rest
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          <Input
            {...rest}
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
