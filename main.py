from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import judge0
from pydantic import BaseModel
from pathlib import Path
import logging
import json

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Fix CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RunRequest(BaseModel):
    code: str
    language: str
    stdin: str = ""

# Load language map
PATH = Path(__file__).parent/"supported_languages.json"
with open(PATH, "r") as f:
    LANG_DATA = json.load(f)
    LANG_MAP = {lang["name"]: lang["id"] for lang in LANG_DATA}

@app.get("/")
async def root():
    return {"message": "Coding Platform API is running"}

@app.post("/run_code")
def run_code(request: RunRequest):
    lang_id = LANG_MAP.get(request.language)
    
    if not lang_id:
        return {"output": f"Error: Unsupported language '{request.language}'"}

    logging.info(f"Running {request.language} (ID: {lang_id})")

    try:
        # judge0.run returns a Submission object
        result = judge0.run(
            source_code=request.code,
            language=lang_id,
            stdin=request.stdin
        )
        
        # Extract output using attribute access
        output = ""
        
        # Priority 1: stdout
        if getattr(result, 'stdout', None):
            output = result.stdout
        # Priority 2: compile_output
        elif getattr(result, 'compile_output', None):
            output = result.compile_output
        # Priority 3: stderr
        elif getattr(result, 'stderr', None):
            output = result.stderr
        else:
            # Fallback: status description
            # In judge0 lib, 'status' is an IntEnum called Status
            if getattr(result, 'status', None):
                # result.status.__str__() returns a clean title like "Accepted" or "Wrong Answer"
                output = str(result.status)
            else:
                output = "No output received."

        return {"output": output}
        
    except Exception as e:
        logging.exception("Execution Error")
        return {"output": f"Internal Server Error: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
