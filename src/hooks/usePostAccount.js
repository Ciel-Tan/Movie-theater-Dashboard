import { accountService } from "@/services/accountService";
import { useState } from "react";

export const usePostAccount = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const Forgot_Password = async (email) => {
        setLoading(true);
        try {
            const response = await accountService.forgotPassword(email);
            setResponse(response);
        }
        catch (error) {
            console.error("Error sending forgot password email in hooks:", error);
            setError("Failed to send forgot password email", error);
        }
        finally {
            setLoading(false);
        }
    }

    return { Forgot_Password, loading, response, error };
}