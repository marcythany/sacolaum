import json
import requests
import pymongo
import os
from pymongo.errors import ConnectionFailure, PyMongoError
from requests.exceptions import RequestException

def fetch_platzi_data(endpoint, api_key=None):
    """
    Fetch data from Platzi API endpoint.

    Args:
        endpoint (str): API endpoint (e.g., 'courses', 'users')
        api_key (str, optional): API key for authentication

    Returns:
        dict or list: JSON response data, or None if error
    """
    # Using Platzi Fake Store API (https://fakeapi.platzi.com/)
    # This is the official mock API for Platzi e-commerce data
    base_url = "https://api.escuelajs.co/api/v1"
    url = f"{base_url}/{endpoint}"

    headers = {
        'User-Agent': 'Platzi-API-Script/1.0',
        'Accept': 'application/json'
    }

    if api_key:
        headers['Authorization'] = f'Bearer {api_key}'

    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        return response.json()
    except RequestException as e:
        print(f"Error fetching data from {endpoint}: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON response: {e}")
        return None

def process_data(data):
    """
    Process the JSON data before insertion.
    Add any necessary transformations here.

    Args:
        data: Raw JSON data from API

    Returns:
        Processed data
    """
    if isinstance(data, list):
        # If it's a list of items, process each
        processed = []
        for item in data:
            if isinstance(item, dict):
                # Add timestamp or other processing
                item['_fetched_at'] = pymongo.datetime.datetime.utcnow()
            processed.append(item)
        return processed
    elif isinstance(data, dict):
        # If it's a single object
        data['_fetched_at'] = pymongo.datetime.datetime.utcnow()
        return data
    else:
        return data

def insert_to_mongo(data, db_name, collection_name, mongo_uri):
    """
    Insert data into MongoDB collection.

    Args:
        data: Data to insert (dict or list of dicts)
        db_name (str): Database name
        collection_name (str): Collection name
        mongo_uri (str): MongoDB connection URI
    """
    if not data:
        print("No data to insert")
        return

    try:
        client = pymongo.MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        # Test connection
        client.admin.command('ping')
        print("Connected to MongoDB successfully")

        db = client[db_name]
        collection = db[collection_name]

        # Process data
        processed_data = process_data(data)

        if isinstance(processed_data, list):
            result = collection.insert_many(processed_data)
            print(f"Inserted {len(result.inserted_ids)} documents into {db_name}.{collection_name}")
        else:
            result = collection.insert_one(processed_data)
            print(f"Inserted 1 document into {db_name}.{collection_name}")

    except ConnectionFailure as e:
        print(f"MongoDB connection failed: {e}")
    except PyMongoError as e:
        print(f"MongoDB error: {e}")
    except Exception as e:
        print(f"Unexpected error during insertion: {e}")
    finally:
        if 'client' in locals():
            client.close()
            print("MongoDB connection closed")

def main():
    """
    Main function to orchestrate the data fetching and insertion process.
    """
    # Configuration from environment variables
    api_key = os.getenv('PLATZI_API_KEY')
    mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
    db_name = os.getenv('MONGO_DB_NAME', 'platzi_db')

    # Endpoints to fetch
    endpoints = ['products', 'users']  # Platzi Fake API endpoints

    for endpoint in endpoints:
        collection_name = endpoint  # Use endpoint as collection name

        print(f"Fetching data from {endpoint}...")
        data = fetch_platzi_data(endpoint, api_key)

        if data:
            print(f"Data fetched successfully from {endpoint}")
            insert_to_mongo(data, db_name, collection_name, mongo_uri)
        else:
            print(f"Failed to fetch data from {endpoint}")

if __name__ == "__main__":
    main()
