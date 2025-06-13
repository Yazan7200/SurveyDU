interface SurveyResponse {
    success: boolean;
    message: string;
    data?: {
        surveyId: number;
        title: string;
        createdAt: string;
    };
    error?: string;
}

export async function createSurvey(surveyData: any): Promise<SurveyResponse> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('/api/surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating survey:', error);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Unable to reach the server. Please check your internet connection and try again.');
            }
            throw error;
        }

        throw new Error('An unexpected error occurred. Please try again later.');
    }
} 