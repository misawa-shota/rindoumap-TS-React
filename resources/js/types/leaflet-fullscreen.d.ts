import 'leaflet';

declare module 'leaflet' {
    namespace control {
        function fullscreen(options?: FullscreenOptions): Control;
    }

    interface FullscreenOptions {
        position?: ControlPosition;
        title?: {
        false?: string;
        true?: string;
        };
    }

    interface Map {
        toggleFullscreen(): void;
        isFullscreen(): boolean;
    }
}
