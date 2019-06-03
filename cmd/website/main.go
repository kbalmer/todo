package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	fileServer := http.FileServer(http.Dir("../../public"))
	http.Handle("/", fileServer)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("failed to listen and serve")
		os.Exit(1)
	}
}