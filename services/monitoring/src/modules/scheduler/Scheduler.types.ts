export interface Task {
    userId: string;
    url: string;
    interval: number;
    isActive: boolean;
    nextCheckAt: number;
}