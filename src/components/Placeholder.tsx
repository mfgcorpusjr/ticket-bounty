import { cloneElement } from "react";
import { MessageSquareWarning } from "lucide-react";

type Props = {
  icon?: React.ReactElement<{ className: string }>;
  text: string;
  button?: React.ReactNode;
};

export default function Placeholder({
  icon = <MessageSquareWarning />,
  text,
  button,
}: Props) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2">
      {cloneElement(icon, {
        className: "size-12",
      })}

      <p>{text}</p>

      {button}
    </div>
  );
}
