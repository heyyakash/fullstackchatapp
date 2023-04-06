package main

type Payload struct {
	Username string `json:"username"`
	Roomname string `json:"roomname"`
	Message  string `json:"message"`
}

type Event struct {
	Type    string  `json:"type"`
	Payload Payload `json:"payload"`
}

const (
	EventSendMessage = "send_message"
	EventChangeRoom  = "change_room"
)
