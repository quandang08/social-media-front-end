import { create } from "zustand";
import { nanoid } from "nanoid";

const useChatStore = create((set, get) => ({
  chatOpen: false,
  messages: [],
  inputMain: "",
  inputBubble: "",
  loading: false,
  
  // Tối ưu: Gộp set input
  setInput: (type, text) => set({ [`input${type}`]: text }),
  
  setChatOpen: (open) => set({ chatOpen: open }),
  
  // Tối ưu: Thêm timestamp và nanoid
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: nanoid(),
      timestamp: Date.now()
    }]
  })),
  
  sendMessage: async (text, isBubble) => {
    if (!text.trim() || get().loading) return null;
    
    // Clear input
    set({ [`input${isBubble ? 'Bubble' : 'Main'}`]: "" });
    
    // Tối ưu: Chỉ set state 1 lần
    set({
      messages: [
        ...get().messages,
        { id: nanoid(), text, sender: "user" },
        { id: `temp-${nanoid()}`, text: "AURA đang suy nghĩ...", sender: "bot", isTemp: true }
      ],
      loading: true
    });
    
    return text;
  },
  
  finalizeMessage: (text, isError = false) => {
    set({
      messages: get().messages
        .filter(msg => !msg.isTemp)
        .concat({
          id: nanoid(),
          text: isError ? `Lỗi: ${text}` : text,
          sender: "bot",
          ...(isError && { isError: true })
        }),
      loading: false
    });
  }
}));

export default useChatStore;