/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { Player, type PlayerRef } from "@remotion/player";
import {
  BriefcaseBusiness,
  Calendar,
  Coffee,
  Flag,
  Fullscreen,
  Map,
  MicOff,
  MicVocal,
  Pencil,
  Plus,
  Podcast,
  Share2,
  Trash2,
  Utensils,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Series } from "remotion";

import { supabase } from "app/lib/supabase";
import MapScene from "app/lib/videos/remotion/compositions/templates/map/Map";
import { OpenSpace } from "app/lib/videos/remotion/compositions/templates/openspace/OpenSpace";
import { Silence } from "app/lib/videos/remotion/compositions/templates/silence/Silence";
import { Speakers } from "app/lib/videos/remotion/compositions/templates/Speakers";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "app/lib/videos/types/constants";
import { Button } from "components/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/shared/ui/card";
import { Checkbox } from "components/shared/ui/checkbox";
import { Input } from "components/shared/ui/input";
import { Label } from "components/shared/ui/label";

const compositions = {
  silencio: {
    durationInFrames: 120,
    fps: 30,
    inputProps: {
      backgroundColor: "#18181b",
      title: "¿Cómo crear un video con Remotion?",
      startingDate: new Date(),
      location: "Sinergia Faro, Montevideo",
      logoUrl: "/carpincho.png",
      speakers: [
        {
          pictureUrl: "/carpincho.png",
          name: "OWU BOT",
          company: "OWU Company",
          job: "Software Developer",
        },
      ],
    },
  },
  sponsors: { durationInFrames: 30, fps: 30 },
  speakers: { durationInFrames: 480, fps: 30 }, // Check on duration.
  agendaEvento: { durationInFrames: 450, fps: 30 },
  agendaOpenSpace: { durationInFrames: 450, fps: 30 },
  mapaOpenSpace: { durationInFrames: 450, fps: 30 },
  horaAlmuerzo: { durationInFrames: 30, fps: 30 },
  redes: { durationInFrames: 30, fps: 30 },
  pausaCafe: { durationInFrames: 30, fps: 30 },
  finEvento: { durationInFrames: 30, fps: 30 },
};

type SceneKey = keyof typeof compositions;

interface ScheduledItem {
  id: string;
  scenes: SceneKey[];
  startTime: string;
  endTime: string;
  loop: boolean;
  paused: boolean;
}

function SeriesComponent({ currentScene }: { currentScene?: SceneKey[] }) {
  return (
    <Series>
      {currentScene?.map((scene: SceneKey) => (
        <>
          {["silencio"].includes(scene) ? (
            <Series.Sequence durationInFrames={compositions.silencio.durationInFrames}>
              <Silence />
            </Series.Sequence>
          ) : null}

          {["mapaOpenSpace"].includes(scene) ? (
            <Series.Sequence durationInFrames={compositions.mapaOpenSpace.durationInFrames}>
              <MapScene />
            </Series.Sequence>
          ) : null}

          {["agendaOpenSpace"].includes(scene) ? (
            <Series.Sequence durationInFrames={compositions.agendaEvento.durationInFrames}>
              <OpenSpace />
            </Series.Sequence>
          ) : null}
          {["speakers"].includes(scene) ? (
            <Series.Sequence durationInFrames={compositions.speakers.durationInFrames}>
              <Speakers />
            </Series.Sequence>
          ) : null}
        </>
      ))}
    </Series>
  );
}
type UpdateStateProps = {
  currentScene: SceneKey[];
  scheduledItems: ScheduledItem[];
  manualControl: boolean;
};

const updateState = async ({ currentScene, scheduledItems, manualControl }: UpdateStateProps) => {
  const { error } = await supabase
    .from("dashboard_state")
    .update({
      current_scene: JSON.stringify(currentScene),
      scheduled_items: JSON.stringify(scheduledItems),
      manual_control: manualControl,
    })
    .eq("id", 1);

  if (error) {
    console.error("Error updating state:", error);
  }
};

export default function Dashboard() {
  const playerRef = useRef<PlayerRef>(null);
  const [currentScene, setCurrentScene] = useState<SceneKey[]>([]);
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]);
  const [newScheduledItem, setNewScheduledItem] = useState<ScheduledItem>({
    id: "",
    scenes: ["silencio"],
    startTime: "",
    endTime: "",
    loop: false,
    paused: false,
  });
  const [isAddingScene, setIsAddingScene] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ScheduledItem | null>(null);
  const [manualControl, setManualControl] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const isSupabaseUpdateRef = useRef(false);

  const handleSceneChange = async (scene: SceneKey) => {
    setManualControl(true);
    if (currentScene.includes(scene)) {
      setCurrentScene((prev) => prev.filter((s) => s !== scene));
      updateState({ currentScene: currentScene.filter((s) => s !== scene), scheduledItems, manualControl: true });
    } else {
      setCurrentScene((prev) => [...prev, scene]);
      updateState({ currentScene: [...currentScene, scene], scheduledItems, manualControl: true });
    }
  };

  const handleScheduleItem = useCallback(() => {
    if (newScheduledItem.scenes.length > 0 && newScheduledItem.startTime && newScheduledItem.endTime) {
      setScheduledItems((prev) => [...prev, { ...newScheduledItem, id: Date.now().toString() }]);
      setNewScheduledItem({
        id: "",
        scenes: ["silencio"],
        startTime: "",
        endTime: "",
        loop: false,
        paused: false,
      });
      updateState({ currentScene, scheduledItems: [...scheduledItems, newScheduledItem], manualControl });
      setIsAddingScene(false);
    }
  }, [newScheduledItem]);

  const handleRemoveScheduledItem = useCallback((id: string) => {
    setScheduledItems((prev) => prev.filter((item) => item.id !== id));
    updateState({ currentScene, scheduledItems: scheduledItems.filter((item) => item.id !== id), manualControl });
  }, []);

  const handleEditItem = useCallback((item: ScheduledItem) => {
    setEditingItem(item);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingItem) {
      setScheduledItems((prev) => prev.map((item) => (item.id === editingItem.id ? editingItem : item)));
      setEditingItem(null);
      updateState({
        currentScene,
        scheduledItems: scheduledItems.map((item) => (item.id === editingItem.id ? editingItem : item)),
        manualControl,
      });
    }
  }, [editingItem]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const { current } = playerRef;

    if (!current) return;

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      current.requestFullscreen();
    }
  }, [isFullscreen]);

  const sceneButtons = [
    { key: "silencio", icon: MicOff, label: "Silencio" },
    { key: "sponsors", icon: BriefcaseBusiness, label: "Sponsors" },
    { key: "speakers", icon: MicVocal, label: "Speakers" },
    { key: "agendaEvento", icon: Calendar, label: "Agenda del Evento" },
    { key: "agendaOpenSpace", icon: Podcast, label: "Agenda Open Space" },
    { key: "mapaOpenSpace", icon: Map, label: "Mapa Open Space" },
    { key: "horaAlmuerzo", icon: Utensils, label: "Hora del Almuerzo" },
    { key: "redes", icon: Share2, label: "Redes" },
    { key: "pausaCafe", icon: Coffee, label: "Pausa para Café" },
    { key: "finEvento", icon: Flag, label: "Fin del Evento" },
  ] as const;
  const scheduledItemsRef = useRef(scheduledItems);

  useEffect(() => {
    const fetchInitialState = async () => {
      const { data, error } = await supabase.from("dashboard_state").select("*").eq("id", 1).single();

      if (error) {
        console.error("Error fetching initial state:", error);
      } else if (data) {
        setCurrentScene(JSON.parse(data.current_scene) || []);
        setScheduledItems(JSON.parse(data.scheduled_items) || []);
        setManualControl(data.manual_control || false);
      }
    };

    fetchInitialState();
  }, []);

  // Supabase Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("dashboard_state")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "dashboard_state", filter: "id=eq.1" },
        (payload) => {
          if (payload.new) {
            isSupabaseUpdateRef.current = true;
            setCurrentScene(JSON.parse(payload.new.current_scene) || ["silencio"]);
            setScheduledItems(JSON.parse(payload.new.scheduled_items) || []);
            setManualControl(!!payload.new.manual_control || false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    scheduledItemsRef.current = scheduledItems;
  }, [scheduledItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      setScheduledItems((prev) => {
        const updatedItems = prev.filter((item) => item.endTime > currentTime);

        return updatedItems;
      });

      const currentItems = scheduledItemsRef.current.filter(
        (item) => !item.paused && item.startTime <= currentTime && item.endTime > currentTime
      );

      if (currentItems.length > 0) {
        const scenes = currentItems.flatMap((item) => item.scenes);

        setCurrentScene(scenes);
        setManualControl(false);
      } else if (!manualControl) {
        setCurrentScene(["silencio"]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [manualControl]);

  return (
    <div className="w-full bg-white">
      <header className="flex flex-col justify-center border-b-[1px] border-b-gray-300 py-5 text-black">
        <div className="container px-8">
          <h1 className="m-0 p-0 text-2xl font-bold">Administrador de Pantalla</h1>
        </div>
      </header>
      <div className="container flex min-h-screen w-full flex-1 flex-row flex-wrap gap-5 bg-white p-4">
        <Card className="mx-auto h-fit w-full min-w-[280px] md:basis-[calc(50%-20px)]">
          <CardHeader>
            <CardTitle>Vista Previa - En vivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              <Player
                ref={playerRef}
                autoPlay
                loop
                component={SeriesComponent}
                compositionHeight={VIDEO_HEIGHT}
                compositionWidth={VIDEO_WIDTH}
                durationInFrames={currentScene
                  .map((scene) => compositions[scene].durationInFrames)
                  .reduce((acc, val) => acc + val, 1)}
                fps={30}
                inputProps={{ currentScene }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <button className="mt-4 flex flex-row gap-1.5" type="button" onClick={toggleFullscreen}>
              <Fullscreen />
              <p className="m-0">Pantalla completa</p>
            </button>
          </CardContent>
        </Card>

        <div className="flex w-full min-w-[280px] flex-col gap-2 md:basis-[calc(50%-20px)]">
          <Card>
            <CardHeader>
              <CardTitle>Control de Escenas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {sceneButtons.map(({ key, icon: Icon, label }) => (
                  <Button
                    key={key}
                    className="flex h-24 flex-col items-center justify-center text-center"
                    variant={currentScene.includes(key) ? "default" : "outline"}
                    onClick={() => handleSceneChange(key)}
                  >
                    <Icon className="mb-2 h-8 w-8" />
                    <span className="text-xs">{label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Programador de Escenas</CardTitle>
              <Button
                className="h-12 w-12 rounded-full"
                size="icon"
                variant="outline"
                onClick={() => setIsAddingScene(true)}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent>
              {isAddingScene || editingItem ? (
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Inicio</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={editingItem ? editingItem.startTime : newScheduledItem.startTime}
                        onChange={(e) => {
                          if (editingItem) {
                            setEditingItem({ ...editingItem, startTime: e.target.value });
                          } else {
                            setNewScheduledItem((prev) => ({ ...prev, startTime: e.target.value }));
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Fin</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={editingItem ? editingItem.endTime : newScheduledItem.endTime}
                        onChange={(e) => {
                          if (editingItem) {
                            setEditingItem({ ...editingItem, endTime: e.target.value });
                          } else {
                            setNewScheduledItem((prev) => ({ ...prev, endTime: e.target.value }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Escenas</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                      {sceneButtons.map(({ key, label }) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            checked={
                              editingItem ? editingItem.scenes.includes(key) : newScheduledItem.scenes.includes(key)
                            }
                            id={`scene-${key}`}
                            onCheckedChange={(checked) => {
                              if (editingItem) {
                                setEditingItem((prev) => {
                                  if (!prev) return prev;

                                  return {
                                    ...prev,
                                    scenes: checked
                                      ? [...prev.scenes, key]
                                      : prev.scenes.filter((scene) => scene !== key),
                                  };
                                });
                              } else {
                                setNewScheduledItem((prev) => ({
                                  ...prev,
                                  scenes: checked
                                    ? [...prev.scenes, key]
                                    : prev.scenes.filter((scene) => scene !== key),
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={`scene-${key}`}>{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" onClick={editingItem ? handleSaveEdit : handleScheduleItem}>
                    {editingItem ? "Guardar Cambios" : "+ Agregar Escenas Programadas"}
                  </Button>
                </div>
              ) : null}

              <div className="space-y-4">
                {scheduledItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-center justify-between">
                        <span className="font-medium">
                          {item.scenes.map((scene) => sceneButtons.find((btn) => btn.key === scene)?.label).join(", ")}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">
                            {item.startTime} - {item.endTime}
                          </span>
                          <Button
                            className="h-8 w-8"
                            size="icon"
                            variant="outline"
                            onClick={() => handleEditItem(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            className="h-8 w-8"
                            size="icon"
                            variant="destructive"
                            onClick={() => handleRemoveScheduledItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
