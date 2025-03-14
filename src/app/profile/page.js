'use client';

import ProfileLeftCard from "@/components/profile/ProfileLeftCard";
import ProfileRightCard from "@/components/profile/ProfileRightCard";

export default function profile() {
    return (
        <div className="container">
            <div className="profileSettings">
                <ProfileLeftCard />

                <ProfileRightCard />
            </div>
        </div>
    )
}