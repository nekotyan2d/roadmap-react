import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    nick: string | null;
    setNick: (nick: string | null) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            nick: null,
            setNick: (nick) => set({ nick }),
        }),
        {
            name: "user-store",
            partialize: (state) => ({ nick: state.nick }),
        }
    )
);
