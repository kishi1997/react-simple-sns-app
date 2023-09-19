import { voidFunction } from "@/app/types/function/voidFunction";
import { scrollContainerRef } from "@/app/types/refs/scrollContainerRef";

export const onScrollLoad = (container: scrollContainerRef, loadData: voidFunction): void => {
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
