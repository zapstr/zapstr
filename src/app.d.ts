declare global {
    namespace App {
        interface Track {
            id?: string;
            authors: string[];
            name: string;
            genres: string[];
            cover?: string;
            media?: Map<string, string[]>;
        }

        // TODO: for whatever reason the import from ndk's NDKUserProfile is not working
        interface UserProfile {
            id?: string;
            name?: string;
            displayName?: string;
            image?: string;
            banner?: string;
            bio?: string;
            nip05?: string;
            lud16?: string;
            about?: string;
            zapService?: string;
        }

        interface ListenedEvent {
            id?: string;
            listener: string; // pubkey of listener
            publisher: string; // pubkey of publisher
            listenedTrack: string; // track id
        }

        interface Zap {
            id?: string;
            zapper: string; // pubkey of zapper app
            zappee: string; // pubkey of user sending zap
            zapped: string; // pubkey of user receiving zap
            zappedNote?: string; // note from zapper to zapped
            amount: number;
            comment?: string;
        }

        interface Settings {
            streamingZapsEnabled: boolean = true;
            streamingZaps: number = 1500;
        }

        // interface Errors {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
