import React from "react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

type Props = {
  items: { label: string; href?: string }[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            return item.href ? (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
              </React.Fragment>
            ) : (
              <BreadcrumbPage key={index}>{item.label}</BreadcrumbPage>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <Separator />
    </div>
  );
}
