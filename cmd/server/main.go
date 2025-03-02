package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"portfolio/internal/db"
	"portfolio/internal/handler"
	"portfolio/internal/utils"
	"regexp"
	"strings"
)

func main() {

	var err error
	log.Println("Hello, Portfolio SERVER")

	db.Connect()

	viteDevServer, err := url.Parse("http://localhost:5173")
	//viteDevServer,err:=url.Parse()

	if err != nil {
		log.Fatalf("Error parsing Vite dev server URL: %v", err)
	}

	viteProxy := httputil.NewSingleHostReverseProxy(viteDevServer)
	//log.Println("viteProxy", viteProxy)

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("path: ", r.URL.Path)

		if strings.HasPrefix(r.URL.Path, "/api/") {
			handleAPI(w, r)
			return
		}
		log.Printf("Proxying request: %s %s", r.Method, r.URL.Path)
		viteProxy.ServeHTTP(w, r)
	})

	err = http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Println("error starting server")
	}
}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	// Log the API request
	log.Printf("API Request: %s %s", r.Method, r.URL.Path)
	// Set common API response headers
	// Route API requests to appropriate handlers

	//log.Println("url path")
	//if strings.Contains(r.URL.Path)
	if strings.HasSuffix(r.URL.Path, "/works") {
		handler.GetAllWorks(w, r)
	} else if match, _ := regexp.MatchString("/works/[a-zA-Z0-9]+", r.URL.Path); match == true {
		log.Println("match dynamic content", r.URL.Path)
		sarr := strings.Split(r.URL.Path, "/")
		handler.GetWorkDetail(w, r, sarr[len(sarr)-1])
	} else if strings.HasSuffix(r.URL.Path, "/posts") {
		handler.GetAllPosts(w, r)
	} else {
		utils.HttpResponse(w, http.StatusNotFound, "Not Found", nil)
	}

}
