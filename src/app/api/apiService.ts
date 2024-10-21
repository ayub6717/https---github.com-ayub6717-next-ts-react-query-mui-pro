// services/apiService.ts
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiService = async <T>(url: string, method: string, data?: T) => {
    const response = await fetch(`${apiBaseUrl}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export default apiService;
