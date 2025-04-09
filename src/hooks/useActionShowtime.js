'use client';

import { addShowtime, removeShowtime, updateShowtime } from "@/services/showtimeService";
import { useEffect, useState } from "react";

export const useActionShowtime = () => {
    const [actionShowtime, setActionShowtime] = useState([]);
    const [actionLoading, setActionLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [actionError, setActionError] = useState(null);

    const createShowtime = async (data) => {
        setActionLoading(true);
        try {
            const response = await addShowtime(data);
            setActionShowtime(response);
            setSuccess("Showtime created successfully");
            return response;
        }
        catch (error) {
            console.error("Error in create showtime hook:", error);
            setActionError(error);
        }
        finally {
            setActionLoading(false);
        }
    };

    const editShowtime = async (id, data) => {
        setActionLoading(true);
        try {
            const response = await updateShowtime(id, data);
            setActionShowtime(response);
            setSuccess("Showtime updated successfully");
        }
        catch (error) {
            console.error("Error in edit showtime hook:", error);
            setActionError(error);
        }
        finally {
            setActionLoading(false);
        }
    };

    const deleteShowtime = async (id) => {
        setActionLoading(true);
        try {
            const response = await removeShowtime(id);
            setActionShowtime(response);
            setSuccess(response.message);
        }
        catch (error) {
            console.error("Error in delete showtime hook:", error);
            setActionError(error);
        }
        finally {
            setActionLoading(false);
        }
    };

    return { createShowtime, editShowtime, deleteShowtime, actionShowtime, actionLoading, success, actionError };
}