import React from 'react'

const Message = () => {
  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            message
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
