import { Separator } from "@/components/ui/separator";
import { cn, formatDuration } from "@/lib/utils";
import { Rank } from "@/types/rank";
import { ChartNoAxesColumnDecreasing } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function LeaderboardSection({
  data,
  userData,
}: {
  data: Rank[];
  userData: Rank[];
}) {
  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-start gap-3">
        <div className="border p-1 border-secondary-foreground bg-secondary/50 rounded-full">
          <ChartNoAxesColumnDecreasing className="size-4" />
        </div>
        <div className="flex flex-col items-start gap-0">
          <h1 className="text-xl font-semibold text-primary">Leaderboard</h1>
          <p className="text-xs text-muted-foreground font-semibold">Top 20</p>
        </div>
      </div>

      {/* card section */}
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <Card props={item} key={item.mobile} />
        ))}
      </div>

      {/* user data */}
      {userData && userData.length > 0 && (
        <div className="sticky bg-background bottom-20 mt-20 backdrop-blur-xs border border-primary pt-2 rounded-md shadow-sm">
          <h2 className="text-center text-xs font-semibold mb-3 px-2">
            Your Rank
          </h2>
          <Card className="border-0 border-t" props={userData[0]} />
        </div>
      )}
    </div>
  );
}

const Card = ({
  props,
  className,
}: { props: Rank } & React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-background p-4 rounded-md border border-primary/50 flex flex-col gap-3",
        className
      )}
    >
      {/* top */}
      <div className="flex justify-between items-center gap-3 ">
        {/* left */}
        <div className="flex items-center gap-3 w-full flex-1">
          <div className="p-1 bg-accent rounded-full overflow-hidden">
            <div className="relative w-10 aspect-square rounded-full overflow-hidden">
              <Image
                fill
                src={`/api/image/${props?.image?.replace("/", "")}`}
                alt={props.full_name.charAt(0)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h2 className="font-semibold">{props.full_name}</h2>
            <p className="text-muted-foreground text-xs">{props.mobile}</p>
          </div>
        </div>

        {/* right */}
        <div className="bg-secondary text-secondary-foreground size-10 rounded-full flex justify-center items-center">
          <p>{props.rank}</p>
        </div>
      </div>

      {/* button */}
      <div className="flex justify-center items-center border-t pt-2">
        <div className="">
          <div className="flex gap-3 w-full">
            <div className="flex items-center gap-1">
              <p className="text-xs text-foreground">Mark</p>
              <p className="text-sm text-secondary-foreground">
                {props.total_mark}
              </p>
            </div>
            <Separator orientation="vertical" className="min-h-4" />
            <div className="flex items-center gap-1">
              <p className="text-xs text-foreground">Duration</p>
              <p className="text-sm text-secondary-foreground">
                {formatDuration(props.total_duration)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
