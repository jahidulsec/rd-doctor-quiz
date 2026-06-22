"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn, formatDuration } from "@/lib/utils";
import { Rank } from "@/types/rank";
import { ChartNoAxesColumnDecreasing } from "lucide-react";
import React from "react";
import { getResults } from "../servers/result";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardSection({
  data,
  userData,
  size,
}: {
  data: Rank[];
  userData: Rank[];
  size: number;
}) {
  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-start gap-3">
        <div className="border p-1 border-secondary-foreground bg-secondary/50 rounded-full">
          <ChartNoAxesColumnDecreasing className="size-4" />
        </div>
        <div className="flex flex-col items-start gap-0">
          <h1 className="text-xl font-semibold text-primary">Leaderboard</h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Top {size}
          </p>
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
  const [tRank, setTRank] = React.useState<Rank[]>();
  const [pending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (tRank) return;

    const handleData = async () => {
      const res = await getResults({
        page: 1,
        size: 1,
        search: props.mobile,
        sap_code: props.mio_id,
      });

      if (res.data) {
        setTRank(res.data);
      }
    };

    startTransition(() => {
      handleData();
    });
  }, [props.mio_id]);

  return (
    <div
      className={cn(
        "bg-background p-4 rounded-md border border-primary/50 flex flex-col gap-3 @container/card",
        className,
      )}
    >
      {/* top */}
      <div className="flex justify-between items-center gap-3 ">
        {/* left */}
        <div className="flex items-start gap-3 w-full flex-1">
          <Avatar>
            <AvatarImage
              src={`/api/image/${props?.image?.replace("/", "")}`}
              alt={props.full_name}
              className="bg-muted p-1 object-cover"
            />
            <AvatarFallback>{props.full_name.charAt(0)}</AvatarFallback>
          </Avatar>

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

      {/* territory rank */}
      {pending ? (
        <div className="flex justify-center items-center gap-3 min-h-5">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-1 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-3 border-t py-2 bg-primary-foreground ">
          <div className="flex items-center gap-1 flex-wrap">
            <p className="text-xs sm:text-sm text-foreground">Territory Code:</p>
            <p className="text-xs sm:text-sm text-secondary-foreground">
              {tRank?.[0]?.mio_id}
            </p>
          </div>
          <Separator orientation="vertical" className="min-h-4" />
          <div className="flex items-center gap-1 flex-wrap">
            <p className="text-xs sm:text-sm text-foreground">Territory Rank:</p>
            <p className="text-xs sm:text-sm text-secondary-foreground">
              {tRank?.[0]?.rank}
            </p>
          </div>
        </div>
      )}

      {/* button */}
      <div className="flex justify-center items-center border-t pt-2 -mt-3">
        <div className="">
          <div className="flex gap-3 gap-y-1 w-full items-center flex-wrap text-center">
            <div className="flex items-center gap-1">
              <p className="text-xs text-foreground">Correct Answers</p>
              <p className="text-xs text-secondary-foreground">
                {Number(props.total_mark)}
              </p>
            </div>
            <Separator orientation="vertical" className="min-h-4" />
            <div className="flex items-center gap-1">
              <p className="text-xs text-foreground">Duration</p>
              <p className="text-xs text-secondary-foreground">
                {formatDuration(props.total_duration)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
