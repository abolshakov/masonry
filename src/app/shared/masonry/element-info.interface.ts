export interface ElementInfo {
    width: number;
    height: number;
    commitChanges(): void;
    rollbackChanges(): void;
}
