package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// FindOne retrieves a single document
func FindOne(collection *mongo.Collection, filter interface{}, result interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return collection.FindOne(ctx, filter).Decode(result)
}

// FindMany retrieves multiple documents
func FindMany(collection *mongo.Collection, filter interface{}, opts *options.FindOptionsBuilder, res interface{}) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	//optss := options.Find().SetSort(bson.D{{"age", 1}})

	cur, err := collection.Find(ctx, filter, opts)
	if err != nil {
		log.Println("Nothing Found", err)
	}
	defer cur.Close(ctx)
	var resultArr []interface{}

	for cur.Next(ctx) {
		var result bson.D
		if err := cur.Decode(&result); err != nil {
			log.Fatal(err)
		}
		resultArr = append(resultArr, result)
		// do something with result....
	}
	res = resultArr
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
}

// InsertOne adds a single document
func InsertOne(collection *mongo.Collection, document interface{}) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return collection.InsertOne(ctx, document)
}

// InsertMany adds multiple documents
func InsertMany(collection *mongo.Collection, documents []interface{}) (*mongo.InsertManyResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	return collection.InsertMany(ctx, documents)
}

// UpdateOne modifies a single document
func UpdateOne(collection *mongo.Collection, filter interface{}, update interface{}) (*mongo.UpdateResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return collection.UpdateOne(ctx, filter, update)
}

// DeleteOne removes a single document
func DeleteOne(collection *mongo.Collection, filter interface{}) (*mongo.DeleteResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return collection.DeleteOne(ctx, filter)
}
