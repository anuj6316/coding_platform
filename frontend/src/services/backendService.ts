// frontend/src/services/backendService.ts (Updated to use local FastAPI)

export interface BackendResponse {
  output: string;
}

const BACKEND_URL = 'http://localhost:8000';

export async function executeCodeLocal(language: string, code: string, stdin: string = ''): Promise<BackendResponse> {
  const response = await fetch(`${BACKEND_URL}/run_code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
      language: language, // Sending the full name from the dropdown (e.g., "Python (3.12.5)")
      stdin: stdin,       // Sending the input text
    }),
  });

  if (!response.ok) {
    throw new Error(`Local API Error: ${response.statusText}`);
  }

  return await response.json();
}
