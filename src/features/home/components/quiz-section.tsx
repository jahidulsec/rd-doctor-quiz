import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function QuizSection({
  count,
  submissionCount,
  totalMark,
}: {
  count: number;
  submissionCount: number;
  totalMark: number;
}) {
  return (
    <section>
      <h2 className="font-semibold mb-3">Recent</h2>

      {/* quiz card */}
      <div className="bg-accent rounded-md p-4 flex justify-between items-center flex-wrap gap-5">
        {/* left */}
        <div className="flex items-center gap-3">
          {/* icon */}
          <div className="bg-secondary p-3 rounded-md">
            <Brain className="text-secondary-foreground size-6" />
          </div>

          {/* information */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">Today&apos;s Quiz</h3>
            <p className="text-muted-foreground text-sm">
              {submissionCount > 0 && totalMark + " / "}
              {count} Question{count > 1 ? "s" : null}
            </p>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col items-end gap-3">
          {submissionCount > 0 ? (
            <>
              <Badge variant={"outline"} className="bg-green-50 text-green-700">
                Complete
              </Badge>
              <Button size={"sm"} asChild>
                <Link href={"/preview"}>Preview</Link>
              </Button>
            </>
          ) : (
            <Badge variant={"outline"} className="bg-yellow-50 text-yellow-700">
              Incomplete
            </Badge>
          )}
        </div>
      </div>
    </section>
  );
}
