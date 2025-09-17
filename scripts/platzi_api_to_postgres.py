import json
import requests
import psycopg2
import os
from psycopg2.extras import RealDictCursor
from datetime import datetime, timezone

def fetch_platzi_data(endpoint, api_key=None):
    """
    Fetch data from Platzi API endpoint.

    Args:
        endpoint (str): API endpoint (e.g., 'products', 'users')
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
                item['_fetched_at'] = datetime.now(timezone.utc)
            processed.append(item)
        return processed
    elif isinstance(data, dict):
        # If it's a single object
        data['_fetched_at'] = datetime.now(timezone.utc)
        return data
    else:
        return data

def insert_to_postgres(data, table_name, db_config):
    """
    Insert data into PostgreSQL table.

    Args:
        data: Data to insert (dict or list of dicts)
        table_name (str): Table name
        db_config (dict): Database configuration
    """
    if not data:
        print("No data to insert")
        return

    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()

        if isinstance(data, list):
            for item in data:
                if table_name == 'products':
                    cursor.execute("""
                        INSERT INTO products (name, price, image, _fetched_at)
                        VALUES (%s, %s, %s, %s)
                        ON CONFLICT (id) DO NOTHING
                    """, (
                        item.get('title', ''),
                        item.get('price', 0),
                        item.get('images', [''])[0] if item.get('images') else '',
                        item.get('_fetched_at')
                    ))
                elif table_name == 'users':
                    cursor.execute("""
                        INSERT INTO users (name, email, _fetched_at)
                        VALUES (%s, %s, %s)
                        ON CONFLICT (id) DO NOTHING
                    """, (
                        item.get('name', ''),
                        item.get('email', ''),
                        item.get('_fetched_at')
                    ))
        else:
            if table_name == 'products':
                cursor.execute("""
                    INSERT INTO products (name, price, image, _fetched_at)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                """, (
                    data.get('title', ''),
                    data.get('price', 0),
                    data.get('images', [''])[0] if data.get('images') else '',
                    data.get('_fetched_at')
                ))
            elif table_name == 'users':
                cursor.execute("""
                    INSERT INTO users (name, email, _fetched_at)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                """, (
                    data.get('name', ''),
                    data.get('email', ''),
                    data.get('_fetched_at')
                ))

        conn.commit()
        print(f"Data inserted successfully into {table_name}")

    except psycopg2.Error as e:
        print(f"PostgreSQL error: {e}")
        conn.rollback()
    except Exception as e:
        print(f"Unexpected error during insertion: {e}")
        conn.rollback()
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

def main():
    """
    Main function to orchestrate the data fetching and insertion process.
    """
    # Configuration from environment variables
    api_key = os.getenv('PLATZI_API_KEY')

    # PostgreSQL configuration
    db_config = {
        'host': os.getenv('PG_HOST', 'localhost'),
        'port': int(os.getenv('PG_PORT', 5432)),
        'database': os.getenv('PG_DATABASE', 'platzi_db'),
        'user': os.getenv('PG_USER', 'postgres'),
        'password': os.getenv('PG_PASSWORD', '')
    }

    # Endpoints to fetch
    endpoints = ['products', 'users']  # Platzi Fake API endpoints

    for endpoint in endpoints:
        table_name = endpoint  # Use endpoint as table name

        print(f"Fetching data from {endpoint}...")
        data = fetch_platzi_data(endpoint, api_key)

        if data:
            print(f"Data fetched successfully from {endpoint}")
            insert_to_postgres(data, table_name, db_config)
        else:
            print(f"Failed to fetch data from {endpoint}")

if __name__ == "__main__":
    main()
