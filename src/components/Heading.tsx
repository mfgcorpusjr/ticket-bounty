import { Separator } from "@/components/ui/separator";

type Props = {
  title: string;
  description?: string;
};

export default function Heading({ title, description }: Props) {
  return (
    <div className="space-y-8">
      <div className="px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Separator />
    </div>
  );
}
