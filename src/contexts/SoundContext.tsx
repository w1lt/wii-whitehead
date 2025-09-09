import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SoundContextType {
  soundsEnabled: boolean;
  toggleSounds: () => void;
  playClick: () => void;
  playNextPage: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [soundsEnabled, setSoundsEnabled] = useState(false);

  // Load sound preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("soundsEnabled");
    if (savedPreference !== null) {
      setSoundsEnabled(JSON.parse(savedPreference));
    } else {
      setSoundsEnabled(false); // Default to disabled
    }
  }, []);

  // Save sound preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("soundsEnabled", JSON.stringify(soundsEnabled));
  }, [soundsEnabled]);

  const toggleSounds = () => {
    setSoundsEnabled((prev) => !prev);
  };

  // Lazy load audio files and cache them
  let clickAudio: HTMLAudioElement | null = null;
  let nextPageAudio: HTMLAudioElement | null = null;

  const playClick = () => {
    if (!soundsEnabled) return;

    if (!clickAudio) {
      clickAudio = new Audio("/src/assets/sounds/click.mp3");
    }

    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {
      // Silently handle play errors (e.g., user hasn't interacted with page yet)
    });
  };

  const playNextPage = () => {
    if (!soundsEnabled) return;

    if (!nextPageAudio) {
      nextPageAudio = new Audio("/src/assets/sounds/nextpage.mp3");
    }

    nextPageAudio.currentTime = 0;
    nextPageAudio.play().catch(() => {
      // Silently handle play errors
    });
  };

  return (
    <SoundContext.Provider
      value={{
        soundsEnabled,
        toggleSounds,
        playClick,
        playNextPage,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
