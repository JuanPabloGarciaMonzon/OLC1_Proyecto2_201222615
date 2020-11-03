package main
import (
	"fmt"
	"log"
	"net/http"
	"time")
type mensaje struct {
	msg string
}
func (m mensaje) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, m.msg)
}
func main() {
	msg := mensaje{
		msg: "Hola Mundo Nuevo",
	}
	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("public"))
	mux.Handle("/", fs)
	mux.Handle("/hola", msg)
	server := &http.Server{
		Addr:           ":8000",
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Println("Servidor escuchando en: http://localhost:8000/")
	log.Fatal(server.ListenAndServe())
}
