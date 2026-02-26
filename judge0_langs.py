import requests
import json
# Base URL for the Judge0 API
# You can change this to the CE / Extra CE endpoint you are using
BASE_URL = "https://ce.judge0.com"  # or "https://api.judge0.com" if using the official API host

def list_languages():
    url = f"{BASE_URL}/languages"
    try:
        response = requests.get(url, headers={"Accept": "application/json"})
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching languages: {e}")
        return

    languages = response.json()
    if not languages:
        print("No languages found.")
        return

    print("Supported Judge0 Languages:")
    with open("supported_languages.json", "w") as f:
        json.dump(languages, f, indent=4)
    for lang in languages:
        lang_id = lang.get("id")
        lang_name = lang.get("name")
        print(f"{lang_id}: {lang_name}")

if __name__ == "__main__":
    list_languages()