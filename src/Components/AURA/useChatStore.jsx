import { create } from "zustand";

const useChatStore = create((set) => ({
  chatOpen: false,
  messages: [],
  inputBubble: "",
  loading: false,

  setChatOpen: (open) => set({ chatOpen: open }),
  
  sendMessage: (text) => {
    if (!text.trim()) return;
    set((state) => ({
      messages: [
        ...state.messages,
        { id: Date.now(), text, sender: "user" },
        { id: `temp-${Date.now()}`, text: "AURA đang suy nghĩ...", sender: "bot", isTemp: true },
      ],
      inputBubble: "",
    }));
  },
  setInputBubble: (text) => set({ inputBubble: text }),
}));

export default useChatStore;
