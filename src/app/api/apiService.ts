// services/apiService.ts

// Fetch the base API URL from environment variables. The variable NEXT_PUBLIC_API_BASE_URL must be defined in the environment.
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define the apiService function, which makes an API request.
// - <T>: A generic type to make the function flexible with different types of data.
// - url: the endpoint to append to the base API URL.
// - method: the HTTP method (GET, POST, PUT, etc.).
// - data?: Optional payload to send with the request (for POST, PUT, etc.).
const apiService = async <T>(url: string, method: string, data?: T) => {

    // Make a request to the API using the fetch API.
    // - Combine base URL and endpoint.
    // - Use the specified HTTP method.
    // - If data is provided, convert it to a JSON string; otherwise, no body is sent.
    const response = await fetch(`${apiBaseUrl}${url}`, {
        method,  // HTTP method like 'GET', 'POST', etc.
        headers: {
            'Content-Type': 'application/json',  // Specify that the request body (if any) is JSON.
        },
        body: data ? JSON.stringify(data) : undefined,  // Send data as a JSON string if it exists; otherwise, no body.
    });

    // Check if the response is not OK (i.e., an error occurred).
    // - If response status is not in the range of 200-299, throw an error.
    if (!response.ok) {
        throw new Error('Network response was not ok');  // Throw a network error if the response is not successful.
    }

    // Return the parsed JSON from the response body.
    // - Converts the response (which is JSON) into a JavaScript object.
    return response.json();
};

// Export the apiService function as the default export so it can be imported and used in other files.
export default apiService;

