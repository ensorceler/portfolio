package handler

import (
	"context"
	"log"
	"net/http"
	"portfolio/internal/db"
	"portfolio/internal/utils"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func GetAllWorks(w http.ResponseWriter, r *http.Request) {
	//db.GetCollection("works").FindOne(ctx,interface{})
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := db.GetCollection("portfolio", "works")
	//log.Printf("collection %+v", collection)

	filter := bson.D{}
	opts := options.Find().SetProjection(bson.D{})

	cur, err := collection.Find(ctx, filter, opts)
	if err != nil {
		log.Println("collection: Error", err)
		utils.HttpResponse(w, http.StatusInternalServerError, "No Data", nil)
		return
	}
	defer cur.Close(ctx)

	var results []interface{}
	if err = cur.All(ctx, &results); err != nil {
		log.Println("error: currAll", err)
		utils.HttpResponse(w, http.StatusInternalServerError, "No Data", nil)
		return
	}

	if err != nil {
		log.Println("error: decoding marshal", err)
		utils.HttpResponse(w, http.StatusInternalServerError, "Nil", nil)
		return
	}
	//fmt.Println
	utils.HttpResponse(w, http.StatusOK, "Okay", results)
}

func GetWorkDetail(w http.ResponseWriter, r *http.Request, id string) {
	var err error
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := db.GetCollection("portfolio", "work_details")
	//log.Printf("collection %+v", collection)

	objId, err := bson.ObjectIDFromHex(id)
	if err != nil {
		log.Println("object bson error:", err)
		utils.HttpResponse(w, http.StatusInternalServerError, "No Data", nil)
		return
	}

	filter := bson.D{{Key: "_id", Value: objId}}

	var result interface{}
	err = collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		log.Println("collection FindOne", err)
		utils.HttpResponse(w, http.StatusInternalServerError, "No Data", nil)
		return
	}

	utils.HttpResponse(w, http.StatusOK, "Okay", result)

}
