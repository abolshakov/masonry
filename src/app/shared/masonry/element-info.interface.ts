export interface ElementInfo {
    width: number;
    height: number;
    clone(): ElementInfo;
    commitChanges(): void;
}
