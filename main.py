from fastapi import FastAPI
from pydantic import BaseModel
from dataclasses import dataclass

app = FastAPI()

@dataclass
class RunRequest(BaseModel):
    code: str
    language: str

@dataclass
class RunResponse(BaseModel):
    output: str
    error: str
    success: bool

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/run_code")
def run_code(request: RunRequest):
    result = judge0.run(
        source_code=RunRequest.code,
        language=RunRequest.language,
        # stdin="Alice",
    )
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)