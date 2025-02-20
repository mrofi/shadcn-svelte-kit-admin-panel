import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
import type { WithElementRef } from "bits-ui";

export type InputType = Exclude<HTMLInputTypeAttribute, "file">;
export type InputxType = Omit<HTMLInputAttributes, "type"> &
  ({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined });
export type Props = WithElementRef<InputxType>;
