import requests
import json

# ==========================================
# 1. Replit (via custom code-exec API)
# ==========================================
def test_replit(prompt_code, eval_token):
    """
    Replit allows headless execution using the `replit-code-exec` library 
    or by hitting a specifically deployed API Repl.
    """
    print("\n--- Testing Replit ---")
    
    # If using their official python wrapper:
    # import replit_code_exec
    # code_exec = replit_code_exec.build_code_exec(...)
    
    # Alternatively, hitting a deployed custom Replit eval server:
    url = "https://your-eval-server.username.repl.co/execute" 
    headers = {"Authorization": f"Bearer {eval_token}"}
    
    try:
        response = requests.post(url, headers=headers, json={"code": prompt_code})
        if response.ok:
            print("Replit Execution Success!")
            print("Output:", response.json())
        else:
            print(f"Status: {response.status_code}, Failed to execute.")
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")

# ==========================================
# 2. CodeSandbox (via REST representation)
# ==========================================
def test_codesandbox(api_key):
    """
    CodeSandbox SDK programmatically creates VM Sandboxes.
    The native SDK is JS/TS based (`import { CodeSandbox } from "@codesandbox/sdk"`).
    In Python, you would interact with their underlying REST API.
    """
    print("\n--- Testing CodeSandbox ---")
    url = "https://api.codesandbox.io/v1/sandboxes" # Illustrative REST endpoint
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Payload requesting a Python VM sandbox template
    payload = {
        "template": "python",
        "files": {
            "main.py": {"content": "print('Hello from CodeSandbox microVM!')"}
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"CodeSandbox API Status: {response.status_code}")
        if response.ok:
            print("Sandbox spun up successfully! URL:", response.json().get("url"))
    except Exception as e:
        print(f"CodeSandbox request failed: {e}")

# ==========================================
# 3. StackBlitz (WebContainers API)
# ==========================================
def test_stackblitz():
    """
    StackBlitz WebContainers run securely inside a browser tab using ServiceWorkers.
    It cannot be triggered via a simple Python backend HTTP request.
    """
    print("\n--- Testing StackBlitz ---")
    print("Error: StackBlitz WebContainers execute locally inside the browser.")
    print("To test this via Python, you must use a headless browser automation tool:")
    print("Example: Use Playwright or Selenium to open 'https://webcontainers.io',")
    print("inject JavaScript to trigger the WebContainer API, and read the DOM.")

# ==========================================
# 4. goormIDE
# ==========================================
def test_goormide():
    """
    goormIDE is a collaborative GUI environment. It does not provide 
    a public REST API for remote, headless code execution.
    """
    print("\n--- Testing goormIDE ---")
    print("Error: goormIDE requires terminal interaction (e.g., 'goorm filename').")
    print("It lacks a standard programmatic RCE API for automated backend testing.")

if __name__ == "__main__":
    # Replace with your actual API keys/tokens
    REPLIT_TOKEN = "your_replit_eval_token"
    CODESANDBOX_KEY = "your_codesandbox_api_key"
    
    sample_code = "print('Hello, secure execution world!')"
    
    test_replit(sample_code, REPLIT_TOKEN)
    test_codesandbox(CODESANDBOX_KEY)
    test_stackblitz()
    test_goormide()