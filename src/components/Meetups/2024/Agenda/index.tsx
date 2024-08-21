"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { type ElementNode } from "@payloadcms/richtext-slate";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "components/shared/ui/accordion";
import { Avatar, AvatarImage } from "components/shared/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/shared/ui/tooltip";
import { PayloadCMSRichText } from "components/shared/RichText";

type AgendaProps = {
  title?: string;
  subtitle?: string;
  lastUpdate?: string;
  agenda?: {
    id: number;
    title: string;
    richText: ElementNode[];
    startTime: Date;
    endTime: Date;
    presenter?: {
      firstname: string;
      lastname?: string;
      picture?: {
        url: string;
      };
    };
    location?: {
      name: string;
      capacity: number;
    };
    attendees?: {
      name: string;
      image: string;
    }[];
  }[];
};

export default function Agenda({ title, subtitle, lastUpdate, agenda }: AgendaProps) {
  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-5">
      <span>
        <h2 className="text-center text-5xl font-bold text-yellow-400">{title}</h2>
        <p className="mt-2 text-center text-lg font-[400] text-white">{subtitle}</p>
        {lastUpdate ? (
          <p className="mt-2 text-center text-xs text-gray-400">
            Última actualización: {format(parseISO(lastUpdate), "dd/MM/yyyy HH:mm:ss", { locale: es })}
          </p>
        ) : null}
      </span>
      <div className="flex w-full flex-row justify-center gap-5">
        <div className="w-full max-w-[1200px] text-white">
          <Accordion collapsible type="single">
            <div className="flex min-h-[35px] flex-col gap-4">
              {agenda?.map(({ id, startTime, endTime, presenter, title, richText, location }) => (
                <AccordionItem key={id} value={`${id}`}>
                  <AccordionTrigger>
                    <div className="flex w-full flex-row items-center justify-between gap-3 text-sm md:text-lg">
                      <div className="flex flex-row items-center justify-between gap-3">
                        <span className="text-yellow-400 md:mr-3">
                          {format(startTime, "HH:mm")} - {format(endTime, "HH:mm")}
                        </span>
                        {presenter ? (
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="flex flex-row items-center gap-2">
                                  <Avatar>
                                    <AvatarImage src={presenter.picture?.url ?? "/carpincho.png"} />
                                  </Avatar>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="mb-1 border-[1.5px] border-gray-400">
                                <p>{`${presenter.firstname} ${presenter.lastname ?? ""}`}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : null}
                        <span className="text-left text-xs sm:text-sm lg:text-base">{title}</span>
                      </div>
                      <span className="flex h-[30px] flex-row flex-wrap gap-4 md:h-[35px]">
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="hidden min-w-[150px] flex-row items-center justify-center gap-1 rounded-md bg-blue-600 px-5 text-center text-sm font-semibold lg:flex">
                                <FaMapMarkerAlt className="text-xs" /> {location?.name}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="mb-1 border-[1.5px] border-gray-400">
                              <p>Ubicación: {location?.name}</p>
                            </TooltipContent>
                          </Tooltip>
                          {/* Enable this tooltip when the location capacity is available */}
                          {/* <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="hidden min-w-[180px] flex-row items-center justify-center gap-1 rounded-md bg-red-600 px-5 text-center text-sm font-semibold text-white lg:flex">
                                <FaUsers /> {location?.capacity} ASISTENTES
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="mb-1 border-[1.5px] border-gray-400">
                              <p>Máximo {location?.capacity ?? 0} asistentes</p>
                            </TooltipContent>
                          </Tooltip> */}
                        </TooltipProvider>
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <PayloadCMSRichText richText={richText} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
