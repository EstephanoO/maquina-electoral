import { useState, useEffect } from "react";
import type { Scene } from "./types";

export function useCurrentTime(): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString().slice(11, 19));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function useScene(initialScene: Scene = "narrative") {
  const [scene, setScene] = useState<Scene>(initialScene);

  return {
    scene,
    setScene
  };
}

export function useCustomization() {
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [favoriteScenes, setFavoriteScenes] = useState<Scene[]>(["narrative", "competitors"]);

  const toggleCustomization = () => setIsCustomizable(!isCustomizable);
  const addFavoriteScene = (scene: Scene) => {
    setFavoriteScenes(prev => [...prev.filter(s => s !== scene), scene]);
  };
  const removeFavoriteScene = (scene: Scene) => {
    setFavoriteScenes(prev => prev.filter(s => s !== scene));
  };

  return {
    isCustomizable,
    favoriteScenes,
    toggleCustomization,
    addFavoriteScene,
    removeFavoriteScene
  };
}