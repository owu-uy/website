"use client";
import classNames from "classnames";
import { type ProgramItem, ProgramBox, ProgramFlex, ProgramStack, useProgram } from "planby";

export function Program({
  program,
  onClick,
  event,
  isApp,
  ...rest
}: ProgramItem & {
  event?: {
    name?: string;
    location?: string;
  };
  onClick?: () => void;
  isApp?: boolean;
}) {
  const { styles, formatTime, set12HoursTimeFormat } = useProgram({
    program,
    ...rest,
  });

  const { data } = program;
  const { since, till, title, speaker } = data;

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

  const eventClassName = classNames("flex flex-col flex-1 h-full w-full px-3 bg-[#1a202c] rounded-sm cursor-pointer", {
    "bg-[#232b3b]": event?.name === title,
  });

  const titleClassName = classNames("text-white", {
    "text-[15px]": !isApp,
    "text-[11px]": isApp,
  });

  const speakerClassName = classNames("absolute bottom-2.5 left-2.5 mt-1 text-gray-400", {
    "text-[15px]": !isApp,
    "text-[10px]": isApp,
  });

  const timeClassName = classNames("absolute bottom-2.5 right-2.5 mt-1.5 text-[10px] text-gray-400", {
    "text-[15px]": !isApp,
    "text-[10px]": isApp,
  });

  return (
    <ProgramBox
      className="relative"
      style={styles.position}
      title="¡Click para ver en el mapa!"
      width={styles.width}
      onClick={onClick}
    >
      <div
        className={eventClassName}
        style={{
          padding: "10px",
        }}
      >
        <ProgramFlex>
          <ProgramStack>
            <p className={titleClassName}>{title}</p>
            <p className={speakerClassName}>{speaker ? speaker : speaker === "" || !speaker ? "No Asignado" : null}</p>
            <p className={timeClassName}>
              {sinceTime} - {tillTime}
            </p>
          </ProgramStack>
        </ProgramFlex>
      </div>
    </ProgramBox>
  );
}
