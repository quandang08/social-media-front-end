export const TWEET_CREATE_REQUEST = "TWEET_CREATE_REQUEST"
export const TWEET_CREATE_SUCCESS = "TWEET_CREATE_SUCCESS"
export const TWEET_CREATE_FAILURE = "TWEET_CREATE_FAILURE"

export const TWEET_DELETE_REQUEST = "TWEET_DELETE_REQUEST"
export const TWEET_DELETE_SUCCESS = "TWEET_DELETE_SUCCESS"
export const TWEET_DELETE_FAILURE = "TWEET_DELETE_FAILURE"

export const GET_ALL_TWEETS_REQUEST = "GET_ALL_TWEETS_REQUEST"
export const GET_ALL_TWEETS_SUCCESS = "GET_ALL_TWEETS_SUCCESS"
export const GET_ALL_TWEETS_FAILURE = "GET_ALL_TWEETS_FAILURE"

export const GET_USERS_TWEET_REQUEST = "GET_USERS_TWEET_REQUEST"
export const GET_USERS_TWEET_SUCCESS = "GET_USERS_TWEET_SUCCESS"
export const GET_USERS_TWEET_FAILURE = "GET_USERS_TWEET_FAILURE"

export const USER_LIKE_TWEET_REQUEST = "USER_LIKE_TWEET_REQUEST"
export const USER_LIKE_TWEET_SUCCESS = "USER_LIKE_TWEET_SUCCESS"
export const USER_LIKE_TWEET_FAILURE = "USER_LIKE_TWEET_FAILURE"

export const LIKE_TWEET_REQUEST = "LIKE_TWEET_REQUEST"
export const LIKE_TWEET_SUCCESS = "LIKE_TWEET_SUCCESS"
export const LIKE_TWEET_FAILURE = "LIKE_TWEET_FAILURE"

export const FIND_TWEET_BY_ID_REQUEST = "FIND_TWEET_BY_ID_REQUEST"
export const FIND_TWEET_BY_ID_SUCCESS = "FIND_TWEET_BY_ID_SUCCESS"
export const FIND_TWEET_BY_ID_FAILURE = "FIND_TWEET_BY_ID_FAILURE"

export const REPLY_TWEET_REQUEST = "REPLY_TWEET_REQUEST"
export const REPLY_TWEET_SUCCESS = "REPLY_TWEET_SUCCESS"
export const REPLY_TWEET_FAILURE = "REPLY_TWEET_FAILURE"

export const RETWEET_REQUEST = "RETWEET_REQUEST"
export const RETWEET_SUCCESS = "RETWEET_SUCCESS"
export const RETWEET_FAILURE = "RETWEET_FAILURE"

/*
📌 File định nghĩa các action types cho Redux liên quan đến tweet.

🔹 Cấu trúc: Mỗi hành động có 3 trạng thái:  
   - `_REQUEST`: Bắt đầu xử lý.  
   - `_SUCCESS`: Xử lý thành công.  
   - `_FAILURE`: Xử lý thất bại.  

🔹 Các hành động chính:  
   ✅ Tạo tweet (`TWEET_CREATE_*`)  
   ✅ Xóa tweet (`TWEET_DELETE_*`)  
   ✅ Lấy danh sách tweet (`GET_ALL_TWEETS_*`, `GET_USERS_TWEET_*`)  
   ✅ Like tweet (`LIKE_TWEET_*`, `USER_LIKE_TWEET_*`)  
   ✅ Tìm tweet theo ID (`FIND_TWEET_BY_ID_*`)  
   ✅ Trả lời tweet (`REPLY_TWEET_*`)  
   ✅ Retweet (`RETWEET_*`)  

✅ Giúp Redux dễ dàng quản lý trạng thái của các yêu cầu API.
*/
