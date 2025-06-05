import { getAllMemberships } from "@/services/membershipService";
import { useEffect, useState } from "react";

export const useGetMembership = () => {
    const [membershipsData, setMembershipsData] = useState([]);
    const [membershipLoading, setMembershipLoading] = useState(false);
    const [membershipError, setMembershipError] = useState(null);

    const getMemberships = async () => {
        setMembershipLoading(true);
        try {
            const memberships = await getAllMemberships();
            setMembershipsData(memberships);
        }
        catch (error) {
            console.error("Error get all memberships: ", error);
            setMembershipError("Failed to get all memberships");
        }
        finally {
            setMembershipLoading(false);
        }
    };

    useEffect(() => {
        getMemberships();
    }, []);

    return { membershipsData, membershipLoading, membershipError };
}