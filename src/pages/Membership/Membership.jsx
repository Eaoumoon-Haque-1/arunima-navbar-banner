import React from 'react';
import MembershipHero from '../../components/Membership/MembershipHero';
import MembershipPlans from '../../components/Membership/MembershipPlans';
import MembershipBenefits from '../../components/Membership/MembershipBenefits';
import MembershipPrivileges from '../../components/Membership/MembershipPrivileges';
import MembershipFees from '../../components/Membership/MembershipFees';
import MembershipRequirements from '../../components/Membership/MembershipRequirements';
import MembershipTerms from '../../components/Membership/MembershipTerms';
import GameFees from '../../components/Membership/GameFees';

const Membership = () => {
    return (
        <main className="w-full pt-[86px] lg:pt-[96px]">
            <MembershipHero />
            <MembershipPlans />
            <MembershipBenefits />
            <MembershipPrivileges />
            <MembershipFees />
            <MembershipRequirements />
            <MembershipTerms />
            <GameFees />
        </main>
    );
};

export default Membership;
