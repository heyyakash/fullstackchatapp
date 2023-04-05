package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	wsUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     CheckOrigin,
	}
)

type Manager struct {
	clients ClientList
}

func NewManager() *Manager {
	return &Manager{
		clients: make(ClientList),
	}
}

func (m *Manager) websocketServer(w http.ResponseWriter, r *http.Request) {
	conn, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err.Error())
	}
	log.Println("New Connection Added")
	c := NewClient(conn, m)

	go c.readMessage()
}

func CheckOrigin(r *http.Request) bool {
	return true
}
