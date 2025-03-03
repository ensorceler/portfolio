package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"portfolio/internal/db"
	"portfolio/internal/handler"
	"portfolio/internal/utils"
	"regexp"
	"strings"

	"github.com/joho/godotenv"
)

func main() {
	var err error
	log.Println("PORTFOLIO SERVER")

	// Load environment variables from .env file
	// This will simply continue if the .env file doesn't exist in production
	_ = godotenv.Load()

	// Connect to database
	db.Connect()

	// Check if we're in development or production mode
	isDev := os.Getenv("GO_ENV") != "production"

	mux := http.NewServeMux()

	if isDev {
		// Development mode: Proxy to Vite dev server
		viteDevURL := os.Getenv("VITE_DEV_URL")
		log.Println("VITE DEV URL: ", viteDevURL)
		viteDevServer, err := url.Parse(viteDevURL)
		if err != nil {
			log.Fatalf("Error parsing Vite dev server URL: %v", err)
		}
		viteProxy := httputil.NewSingleHostReverseProxy(viteDevServer)

		mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			log.Println("path: ", r.URL.Path)
			if strings.HasPrefix(r.URL.Path, "/api/") {
				handleAPI(w, r)
				return
			}
			log.Printf("Proxying request to Vite dev server: %s %s", r.Method, r.URL.Path)
			viteProxy.ServeHTTP(w, r)
		})
	} else {
		// Production mode: Serve static files
		distDir := "./frontend/dist"
		if customDist := os.Getenv("DIST_DIR"); customDist != "" {
			distDir = customDist
		}

		// Serve API routes
		mux.HandleFunc("/api/", handleAPI)

		// Create a file server for the Vite build output
		fs := http.FileServer(http.Dir(distDir))

		// Serve static files
		mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			// Check if the requested file exists
			if _, err := os.Stat(distDir + r.URL.Path); os.IsNotExist(err) && !strings.Contains(r.URL.Path, ".") {
				// For SPA routing, serve the index.html for non-existent paths that don't look like files
				http.ServeFile(w, r, distDir+"/index.html")
				return
			}
			// Otherwise serve the requested file
			fs.ServeHTTP(w, r)
		})
	}

	// Determine port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	err = http.ListenAndServe(":"+port, mux)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	// Remove the "/api" prefix from the path for routing
	path := strings.TrimPrefix(r.URL.Path, "/api")

	// Log the API request
	log.Printf("API Request: %s %s", r.Method, path)

	// Route API requests to appropriate handlers
	if strings.HasSuffix(path, "/works") {
		handler.GetAllWorks(w, r)
	} else if match, _ := regexp.MatchString("/works/[a-zA-Z0-9]+", path); match {
		sarr := strings.Split(path, "/")
		handler.GetWorkDetail(w, r, sarr[len(sarr)-1])
	} else if strings.HasSuffix(path, "/posts") {
		handler.GetAllPosts(w, r)
	} else {
		utils.HttpResponse(w, http.StatusNotFound, "Not Found", nil)
	}
}
