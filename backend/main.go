package main

import (
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
	r := mux.NewRouter()
	r.HandleFunc("/", test).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", r))
}
