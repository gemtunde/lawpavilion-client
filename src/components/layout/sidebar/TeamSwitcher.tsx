import Link from "next/link";
import * as React from "react";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  };
}) {
  return (
    <Link href="/home" className="flex items-center gap-2 px-3 py-2">
      <div className="flex aspect-square size-10 bg-green-700  items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <teams.logo className="size-6" />
      </div>
      <div className="grid flex-1 text-green-700 text-left text-xl leading-tight">
        <span className="truncate font-semibold">{teams.name}</span>
        <span className="truncate text-xs">{teams.plan}</span>
      </div>
    </Link>
  );
}
