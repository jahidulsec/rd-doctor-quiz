import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import React from "react";

export default function QuizSection() {
  return (
    <section>
      <h2 className="font-semibold mb-3">Recent</h2>

      {/* quiz card */}
      <div className="bg-accent rounded-md p-4 flex justify-between items-center flex-wrap gap-5">
        {/* left */}
        <div className="flex items-center gap-3">
          {/* icon */}
          <div className="bg-secondary/5 p-3 rounded-md">
            <Brain className="text-secondary/50 size-6" />
          </div>

          {/* information */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">Today&apos;s Quiz</h3>
            <p className="text-muted-foreground text-sm">3 Questions</p>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col items-end gap-3">
          <Badge variant={"outline"} className="bg-yellow-50 text-yellow-700">
            Incomplete
          </Badge>
        </div>
      </div>
    </section>
  );
}
