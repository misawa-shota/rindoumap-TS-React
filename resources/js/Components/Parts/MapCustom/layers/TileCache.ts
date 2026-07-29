export default class TileCache {
    private readonly cache = new Map<string, HTMLImageElement>();

    public get(key: string) {
        return this.cache.get(key);
    }

    public set(key: string, image: HTMLImageElement) {
        this.cache.set(key, image);
    }

    public clear() {
        this.cache.clear();
    }
}
