export interface FormSubmissionData {
  plan: string;
  bankName: string;
  cardNumber1: string;
  phone?: string; // 선택사항
}

export async function submitToGoogleSheets(
  data: FormSubmissionData
): Promise<boolean> {
  try {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    return result.success;
  } catch (error) {
    return false;
  }
}
