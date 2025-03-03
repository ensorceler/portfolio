package db

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Client is a MongoDB client instance
var Client *mongo.Client

// Connect establishes a connection to MongoDB
func Connect() {
	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get environment variables
	mongoURI := os.Getenv("MONGODB_URI")
	mongoUsername := os.Getenv("MONGODB_USER")
	mongoPassword := os.Getenv("MONGODB_PASSWORD")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	//uri := "mongodb://root:root%40123@188.245.203.93:27017/?directConnection=true"
	uri := mongoURI
	credential := options.Credential{
		Username: mongoUsername,
		Password: mongoPassword,
	}
	clientOptions := options.Client().ApplyURI(uri).SetAuth(credential)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		//return err
		log.Println("error client ", err)
		panic(err)
	}

	var result bson.M
	if err := client.Database("admin").RunCommand(ctx, bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		log.Println("Error Connecting", err)
		panic(err)
	}

	log.Println("Connected to MongoDB!", result)
	Client = client

}

// Disconnect closes the MongoDB connection
func Disconnect() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if Client != nil {
		if err := Client.Disconnect(ctx); err != nil {
			log.Println("Error Disconnecting", err)
			panic(err)
		}
		log.Println("Disconnected from MongoDB")
	}
}

// GetDatabase returns a database instance
func GetDatabase(databaseName string) *mongo.Database {
	return Client.Database(databaseName)
}

// GetCollection returns a collection from the specified database
func GetCollection(databaseName, collectionName string) *mongo.Collection {
	return Client.Database(databaseName).Collection(collectionName)
}
