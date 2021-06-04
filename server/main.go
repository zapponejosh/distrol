package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()

	// fs := http.FileServer(http.Dir("./web/build/"))
	// r.PathPrefix("/").Handler(fs)

	r.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]bool{"ok": true})
		fmt.Println(r.Body)
	})

	log.Fatal(http.ListenAndServe(":8080", r))

}
