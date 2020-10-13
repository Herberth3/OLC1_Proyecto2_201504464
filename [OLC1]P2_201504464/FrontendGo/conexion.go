package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func main() {

	//Direcciona los archivos css y js de la carpeta layout para ser utilizados en el servidor
	http.Handle("/layout/", http.StripPrefix("/layout/", http.FileServer(http.Dir("layout"))))

	//localhost:3000 manda a llamar a la funcion dada
	http.HandleFunc("/", index)

	//Levanta el servidor y lo pone a la escucha en el puerto dado
	fmt.Println("Frontend escuchando en el puerto 3000")
	http.ListenAndServe(":3000", nil)
}
