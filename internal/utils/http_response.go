package utils

import (
	"encoding/json"
	"net/http"
)

func HttpResponse(w http.ResponseWriter, status int, message string, data any) {

	resp, err := json.Marshal(map[string]any{
		"status":  status,
		"message": message,
		"data":    data,
	})
	if err != nil {
		w.Write([]byte("Server ERROR"))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	//http.Status
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(resp)
}
