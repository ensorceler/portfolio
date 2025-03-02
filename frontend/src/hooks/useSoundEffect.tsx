// Create a reusable sound manager hook
import {useState,useRef,useEffect} from "react";

export default function useSoundEffect(soundUrl, options: any = {}) {
    const audioRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Create audio context and buffer - better performance than HTML Audio
        const audio = new Audio();
        audioRef.current = audio;

        // Optimize loading
        audio.preload = 'auto';
        audio.src = soundUrl;
        audio.volume = options?.volume || 0.5;
        audio.loop = options?.loop || false;

        // Handle loading
        audio.addEventListener('canplaythrough', () => {
            setIsLoaded(true);
        });

        // Cleanup
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [soundUrl, options.volume, options.loop]);

    // Methods for controlling sound
    const play = () => {
        if (audioRef.current && isLoaded) {
            // Reset position if needed
            if (options.resetOnPlay) {
                audioRef.current.currentTime = 0;
            }

            // Use Promise to handle autoplay restrictions
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Audio playback prevented:", error);
                });
            }
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return {play, pause, stop, isLoaded};
}


