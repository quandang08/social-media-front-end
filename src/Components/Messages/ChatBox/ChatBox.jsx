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
  sendMessage as apiSendMessage,
  editMessage,
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

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleNewMessage = useCallback(
    (newMessage) => {
      if (newMessage.eventType === "DELETED") {
        dispatch({ type: "DELETE_MESSAGE_SUCCESS", payload: newMessage.id });
      } else {
        dispatch({ type: "ADD_NEW_MESSAGE", payload: newMessage });
      }
    },
    [dispatch]
  );

  const {
    sendMessage: sendSocketMessage,
    deleteMessage: deleteSocketMessage,
    isConnected,
  } = useChatSocket(currentUser.id, handleNewMessage);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim() && !selectedFile) return;
    try {
      let content = message,
        type = "TEXT";
      if (selectedFile) {
        setUploadingImage(true);
        content = await uploadToCloudinary(selectedFile);
        setUploadingImage(false);
        type = "IMAGE";
      }

      sendSocketMessage({
        senderId: currentUser.id,
        receiverId: user.id,
        content,
        type,
      });
      // lưu DB
      await dispatch(apiSendMessage(currentUser.id, user.id, content, type));

      setMessage("");
      setSelectedFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setUploadingImage(false);
      console.error(err);
    }
  }, [
    message,
    selectedFile,
    currentUser.id,
    user.id,
    dispatch,
    sendSocketMessage,
  ]);

  const handleDeleteMessage = useCallback(
    (id) => {
      if (!isConnected) {
        console.warn("⚠️ WebSocket chưa kết nối, không thể xóa");
        return;
      }

      deleteSocketMessage({
        id,
        senderId: currentUser.id,
        receiverId: user.id,
      });

      dispatch({ type: "DELETE_MESSAGE_SUCCESS", payload: id });
    },
    [isConnected, deleteSocketMessage, currentUser.id, user.id, dispatch]
  );

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [memoizedMessages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    dispatch(fetchChatHistory(currentUser.id, user.id));
  }, [dispatch, currentUser.id, user.id]);

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-3xl rounded-lg overflow-hidden shadow bg-white">
      <ChatHeader user={user} onBack={onBack} />
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3"
      >
        {memoizedMessages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            isSender={msg.senderId === currentUser.id}
            onEdit={(m) => {
              const newContent = prompt("Nhập nội dung mới", m.content);
              if (newContent?.trim()) {
                dispatch(editMessage(m.id, newContent.trim()));
              }
            }}
            onDelete={handleDeleteMessage}
          />
        ))}
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
