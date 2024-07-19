let currentId = 999; // Initialize with 999 to start from 1000

export function idGenerator() {
    currentId++;
    return currentId.toString();
}