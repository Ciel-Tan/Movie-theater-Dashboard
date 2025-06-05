import { getAllRoles } from "@/services/roleService";
import { useEffect, useState } from "react";

export const useGetRole = () => {
    const [rolesData, setRolesData] = useState([]);
    const [roleLoading, setRoleLoading] = useState(false);
    const [roleError, setRoleError] = useState(null);

    const getRoles = async () => {
        setRoleLoading(true);
        try {
            const roles = await getAllRoles();
            setRolesData(roles);
        }
        catch (error) {
            console.error("Error get all roles: ", error);
            setRoleError("Failed to get all roles");
        }
        finally {
            setRoleLoading(false);
        }
    };

    useEffect(() => {
        getRoles();
    }, []);

    return { rolesData, roleLoading, roleError };
}