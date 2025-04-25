import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatHistory,
  sendMessage,
  editMessage,
  deleteMessage
} from "../../../Store/Auth/Action";
import MessageItem from "../MessageItem/MessageItem";
import useChatSocket from "../useChatSocket";
import ChatHeader from "./ChatHeader";
import MessageInputBox from "./MessageInputBox";
import { uploadToCloudinary } from "../../../Utils/uploadToCloudnary";

const ChatBox = ({ user, onBack }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const messages = useSelector((state) => state.auth.messages) || [];

  const memoizedMessages = useMemo(() => messages, [messages]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  //1. Goi dau tien
  const handleDeleteMessage = useCallback(
    async (messageId) => {
      try {
        await dispatch(deleteMessage(messageId)); // Gọi action deleteMessage để xóa từ server
      } catch (error) {
        console.error("Lỗi khi xóa tin nhắn:", error);
      }
    },
    [dispatch]
  );

  const handleNewMessage = useCallback(
    (newMessage) => {
      if (newMessage.messageType === "DELETED") {
        dispatch({ type: "DELETE_MESSAGE_SUCCESS", payload: newMessage.id });
      } else {
        dispatch({ type: "ADD_NEW_MESSAGE", payload: newMessage });
      }
    },
    [dispatch]
  );

  const { sendMessage: sendSocketMessage } = useChatSocket(
    currentUser.id,
    handleNewMessage
  );

  const handleSendMessage = useCallback(async () => {
    if (!message.trim() && !selectedFile) return;

    try {
      let content = message;
      let type = "TEXT";

      if (selectedFile) {
        setUploadingImage(true);
        const imageUrl = await uploadToCloudinary(selectedFile);
        setUploadingImage(false);
        if (!imageUrl) return;
        content = imageUrl;
        type = "IMAGE";
      }

      sendSocketMessage({
        senderId: currentUser.id,
        receiverId: user.id,
        content,
        type,
      });

      await dispatch(sendMessage(currentUser.id, user.id, content, type));

      setMessage("");
      setSelectedFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadingImage(false);
      console.error("Lỗi gửi tin nhắn:", error);
    }
  }, [
    message,
    selectedFile,
    currentUser.id,
    user.id,
    dispatch,
    sendSocketMessage,
  ]);

  const scrollToBottom = useCallback(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [memoizedMessages, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    dispatch(fetchChatHistory(currentUser.id, user.id));
  }, [dispatch, currentUser.id, user.id]);

  const renderedMessages = useMemo(
    () =>
      memoizedMessages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isSender={msg.senderId === currentUser.id}
          onEdit={(msg) => {
            const newContent = prompt("Nhập nội dung mới", msg.content);
            if (newContent && newContent.trim()) {
              dispatch(editMessage(msg.id, newContent.trim()));
            }
          }}
          onDelete={handleDeleteMessage}
        />
      )),
    [memoizedMessages, currentUser.id, handleDeleteMessage, dispatch]
  );

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-3xl rounded-lg overflow-hidden shadow bg-white relative">
      <ChatHeader user={user} onBack={onBack} />
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3"
        style={{ overflowY: "scroll", scrollBehavior: "smooth" }}
      >
        {renderedMessages}
      </div>
      <MessageInputBox
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        uploadingImage={uploadingImage}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        fileInputRef={fileInputRef}
        inputRef={inputRef}
      />
    </div>
  );
};

export default ChatBox;
