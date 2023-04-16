package main

import (
	"log"
	"net/http"
	"sync"

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
	sync.RWMutex
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
	m.addClient(c)
	log.Println(len(m.clients))

	go c.readMessage()
	go c.WriteMessage()
}

func (m *Manager) addClient(c *Client) {
	m.Lock()
	defer m.Unlock()

	m.clients[c] = true
}

func (m *Manager) deleteClient(c *Client) {
	m.Lock()
	defer m.Unlock()

	delete(m.clients, c)
}

func CheckOrigin(r *http.Request) bool {
	origin := r.Header.Get("Origin")
	switch origin {
	case "https://fullstackchatapp.vercel.app":
	case "http://localhost:3000":
		return true
	default:
		return false
	}
	return false
}
