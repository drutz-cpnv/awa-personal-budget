import { ref } from "vue";

const needsReload = ref(false);

export function useReload() {

    const triggerReload = () => {
        needsReload.value = true;
    };

    const resetReload = () => {
        needsReload.value = false;
    };

    return { needsReload, triggerReload, resetReload };
}