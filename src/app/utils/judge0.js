export const LANGUAGE_IDS = {
  python: 71,
  javascript: 63,
  cpp: 54,
  java: 62
};

export async function runCode(sourceCode, languageId, stdin) {
  try {
    // Step 1: POST to /judge0/submissions
    const postResponse = await fetch("/judge0/submissions?base64_encoded=false&wait=false", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin || ""
      })
    });

    if (!postResponse.ok) {
      throw new Error(`Failed to create submission: ${postResponse.statusText}`);
    }

    const { token } = await postResponse.json();
    if (!token) {
      throw new Error("No token received from Judge0");
    }

    // Step 2: Poll GET /judge0/submissions/{token}
    const getUrl = `/judge0/submissions/${token}?base64_encoded=false`;
    
    const result = await new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = setInterval(async () => {
        try {
          if (Date.now() - startTime > 15000) {
            clearInterval(interval);
            reject(new Error("Polling timed out after 15 seconds"));
            return;
          }

          const getResponse = await fetch(getUrl, {
            method: "GET"
          });

          if (!getResponse.ok) {
            clearInterval(interval);
            reject(new Error(`Failed to fetch status: ${getResponse.statusText}`));
            return;
          }

          const data = await getResponse.json();

          if (data.status && data.status.id > 2) {
            clearInterval(interval);
            resolve(data);
          }
        } catch (err) {
          clearInterval(interval);
          reject(err);
        }
      }, 1500);
    });

    // Return the final result
    return result;

  } catch (error) {
    return { error: error.message };
  }
}
