import { create } from "zustand";

const useChatStore = create((set, get) => ({
  // State
  chatOpen: false,
  messages: [],
  inputMain: "",
  inputBubble: "",
  loading: false,
  
  // Actions
  setChatOpen: (open) => set({ chatOpen: open }),
  
  setInputMain: (text) => set({ inputMain: text }),
  setInputBubble: (text) => set({ inputBubble: text }),
  
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  
  sendMessage: async (text, isBubble) => {
    if (!text.trim() || get().loading) return;
    
    // Clear input
    if (isBubble) set({ inputBubble: "" });
    else set({ inputMain: "" });
    
    // Add user message
    set((state) => ({
      messages: [
        ...state.messages,
        { id: Date.now(), text, sender: "user" }
      ]
    }));
    
    // Add temporary bot message
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `temp-${Date.now()}`,
          text: "AURA đang suy nghĩ...",
          sender: "bot",
          isTemp: true
        }
      ],
      loading: true
    }));
    
    return text; // Return text để xử lý API call bên ngoài
  },
  
  finalizeMessage: (text, isError = false) => {
    set((state) => ({
      messages: [
        ...state.messages.filter(msg => !msg.isTemp),
        {
          id: Date.now(),
          text: isError ? `Lỗi: ${text}` : text,
          sender: "bot",
          ...(isError && { isError: true })
        }
      ],
      loading: false
    }));
  }
}));

export default useChatStore;