package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func test(w http.ResponseWriter, r *http.Request) {
	w.Write(([]byte)("HEllo"))
}

func main() {
	setupAPI()
}

func setupAPI() {
	m := NewManager()
	r := mux.NewRouter()
	r.HandleFunc("/", test).Methods("GET")
	r.HandleFunc("/ws/chat", m.websocketServer)
	fmt.Println("Server Listening at 8080")
	log.Fatal(http.ListenAndServeTLS(":8080", "server.crt", "server.key", r))
}
