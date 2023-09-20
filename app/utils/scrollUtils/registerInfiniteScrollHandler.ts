type ScrollContainerRef = {
    current: HTMLDivElement | null;
};
type VoidFunction = () => Promise<void>;

export const registerInfiniteScrollHandler = (container: ScrollContainerRef, loadData: VoidFunction): void => {
    const el = container.current;
    if (!el) return;
    let rate = el.scrollTop / (el.scrollHeight - el.clientHeight);
    if (rate < 0) {
        rate = Math.abs(rate);
    }
    if (rate > 0.9) {
        loadData();
    }
};
