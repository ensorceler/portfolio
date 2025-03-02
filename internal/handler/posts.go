package handler

import (
	"net/http"
	"portfolio/internal/utils"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	utils.HttpResponse(w, http.StatusOK, "No Data", nil)
}
