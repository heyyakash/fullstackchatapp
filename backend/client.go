package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	connection *websocket.Conn
	manager    *Manager
}

type ClientList map[*Client]bool

func NewClient(connection *websocket.Conn, manager *Manager) *Client {
	return &Client{
		connection: connection,
		manager:    manager,
	}
}

func (c *Client) readMessage() {
	defer func() {
		// c.manager.deleteClient(c)
		log.Println("Client Deleted")
	}()

	c.connection.SetReadLimit(512)

	for {
		messageType, p, err := c.connection.ReadMessage()
		if err != nil {
			log.Println(err)
			break
		}

		log.Println(messageType)
		log.Println(string(p))
	}

}
