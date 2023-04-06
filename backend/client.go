package main

import (
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	connection *websocket.Conn
	manager    *Manager
	room       string
	channel    chan Event
}

type ClientList map[*Client]bool

func NewClient(connection *websocket.Conn, manager *Manager) *Client {
	return &Client{
		connection: connection,
		manager:    manager,
		channel:    make(chan Event),
	}
}

func (c *Client) readMessage() {
	defer func() {
		// c.manager.deleteClient(c)
		c.manager.deleteClient(c)
		log.Println("Client Deleted")
	}()

	c.connection.SetReadLimit(512)

	for {
		_, p, err := c.connection.ReadMessage()
		if err != nil {
			log.Println(err)
			break
		}

		var req Event

		if err := json.Unmarshal(p, &req); err != nil {
			log.Println("Error Unmarshling the data")
		}

		if req.Type == EventChangeRoom {
			c.room = req.Payload.Roomname
		}

		// if err := c.connection.WriteMessage(1, []byte("Message Received")); err != nil {
		// 	log.Println(err.Error())
		// 	break
		// }

		for wsclients := range c.manager.clients {
			wsclients.channel <- req
		}

	}

}

// for (c *Client) WriteMessage()
func (c *Client) WriteMessage() {
	defer func() {
		c.manager.deleteClient(c)
		log.Print("Client Left")
	}()
	for {
		select {
		case evnt, ok := <-c.channel:
			if !ok {
				if err := c.connection.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("Connection closed ", err)
				}
				return
			}
			event := Event{Type: "new_message", Payload: evnt.Payload}
			log.Println(event)
			data, err := json.Marshal(event)
			if err != nil {
				log.Print("error : ", err.Error())
			}

			if err := c.connection.WriteMessage(websocket.TextMessage, data); err != nil {
				log.Println("error : ", err.Error())
			}

		}
	}
}
