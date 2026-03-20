/**
 * Shared speech synthesis utility for the app
 * Supports multiple languages (EN-US, HI-IN)
 * Automatically removes emoji for cleaner speech
 */

type SupportedLanguage = "en-US" | "hi-IN";

interface SpeakOptions {
    language?: SupportedLanguage;
    rate?: number;
    pitch?: number;
    volume?: number;
}

const DEFAULT_OPTIONS: SpeakOptions = {
    language: "en-US",
    rate: 0.9,
    pitch: 1.1,
    volume: 1,
};

// Emoji pattern - matches most emojis
const EMOJI_PATTERN =
    /[\p{Emoji}\p{Emoji_Component}\p{Emoji_Modifier}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu;

/**
 * Clean text by removing emoji for speech synthesis
 */
function cleanTextForSpeech(text: string): string {
    return text.replace(EMOJI_PATTERN, "").trim();
}

/**
 * Find the best voice for a given language
 */
function findBestVoice(lang: SupportedLanguage): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();

    // First try exact match
    const exactMatch = voices.find((voice) => voice.lang === lang);
    if (exactMatch) return exactMatch;

    // Try lang prefix match (e.g., "hi" for "hi-IN")
    const [langPrefix] = lang.split("-");
    const prefixMatch = voices.find((voice) =>
        voice.lang.startsWith(langPrefix)
    );
    if (prefixMatch) return prefixMatch;

    return null;
}

/**
 * Speak text using Web Speech API with language support
 * @param text - Text to speak
 * @param options - Optional configuration (language, rate, pitch, volume)
 *
 * @example
 * // Default English
 * speak("Hello, how many apples?");
 *
 * // With Hindi
 * speak("क्या है यह सेब?", { language: "hi-IN" });
 *
 * // Custom settings
 * speak("Count the stars", { language: "en-US", rate: 0.8, pitch: 1.2 });
 */
export function speak(text: string, options?: SpeakOptions): void {
    if (!("speechSynthesis" in window)) {
        console.warn("Speech Synthesis not supported in this browser");
        return;
    }

    const config = { ...DEFAULT_OPTIONS, ...options };

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text for better speech synthesis
    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) return; // Bail if nothing to speak

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = config.rate ?? 0.9;
    utterance.pitch = config.pitch ?? 1.1;
    utterance.volume = config.volume ?? 1;

    // Try to find and set appropriate voice
    const voice = findBestVoice(config.language!);
    if (voice) {
        utterance.voice = voice;
        utterance.lang = config.language!;
    } else {
        // Fallback to default language if voice not found
        utterance.lang = "en-US";
        if (config.language !== "en-US") {
            console.debug(
                `Voice for ${config.language} not available, using browser default`
            );
        }
    }

    // Handle errors silently (user can continue without audio)
    utterance.onerror = () => {
        console.debug("Speech synthesis encountered an error");
    };

    // Speak
    window.speechSynthesis.speak(utterance);
}

/**
 * Stop any ongoing speech
 */
export function cancelSpeak(): void {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}

/**
 * Check if speech synthesis is supported
 */
export function isSpeechSupported(): boolean {
    return "speechSynthesis" in window;
}
