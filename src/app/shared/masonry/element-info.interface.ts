export interface ElementInfo {
    readonly width: number;
    readonly height: number;

    resise(width: number | null, height: number | null): void;
}
