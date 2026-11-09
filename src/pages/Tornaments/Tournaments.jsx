import React from 'react';
import OpenChampionshipSection from '../../components/Tournament/OpenChampionshipSection';
import TournamentCalendarSection from '../../components/Tournament/TournamentCalendarSection';
import TournamentMomentsSection from '../../components/Tournament/TournamentMomentsSection';
import TournamentRegistrationFormSection from '../../components/Tournament/TournamentRegistrationFormSection';
import golfPlayer from '../../assets/golfPlayer.jpg';
import aboutMain from '../../assets/aboutMain.JPG';
import golfField from '../../assets/golf_field.JPG';
import courseMap from '../../assets/courseMap.jpg';
import banner from '../../assets/banner.JPG';

const openChampionshipTournament = {
    eyebrow: 'Upcoming Tournament',
    title: 'Arunima Open Championship 2025',
    description:
        'Join us for an exciting championship featuring top golfers from across the country. Compete for glory on our championship course.',
    details: [
        {
            label: 'Date',
            value: '29 May - 31 May, 2025',
            icon: 'ph ph-calendar',
        },
        {
            label: 'Venue',
            value: 'Arunima Resort Golf Club, Narayanganj',
            icon: 'ph ph-map-pin',
        },
        {
            label: 'Entry Fee',
            value: 'BDT 5,000',
            icon: 'ph ph-currency-circle-dollar',
        },
        {
            label: 'Registration Deadline',
            value: '25 May, 2025',
            icon: 'ph ph-clock',
        },
    ],
    cta: {
        label: 'Register Now',
        href: '/contact',
    },
    prize: {
        label: 'Prize Pool',
        amount: 'BDT 200,000+',
        imageAlt: 'Arunima Resort Golf Club championship course',
        highlights: [
            {
                title: '3 Days',
                subtitle: 'Tournament',
                icon: 'ph ph-calendar-check',
            },
            {
                title: 'Multiple',
                subtitle: 'Categories',
                icon: 'ph ph-golf',
            },
            {
                title: 'Exciting',
                subtitle: 'Prizes',
                icon: 'ph ph-trophy',
            },
        ],
    },
};

const tournamentCalendar = {
    eyebrow: 'Tournament Calendar',
    title: 'Mark Your Calendar',
    cta: {
        label: 'View All Events',
        href: '/contact',
    },
    events: [
        {
            date: '29-31',
            month: 'May',
            title: 'Arunima Open Championship 2025',
            venue: 'Arunima Golf Club',
            icon: 'ph ph-trophy',
            cta: {
                label: 'Register',
                href: '/contact',
            },
        },
        {
            date: '12-13',
            month: 'Jul',
            title: 'Arunima Invitational 2025',
            venue: 'Arunima Golf Club',
            icon: 'ph ph-flag',
            cta: {
                label: 'Register',
                href: '/contact',
            },
        },
        {
            date: '15-17',
            month: 'Aug',
            title: 'Independence Cup 2025',
            venue: 'Arunima Golf Club',
            icon: 'ph ph-medal',
            cta: {
                label: 'Register',
                href: '/contact',
            },
        },
        {
            date: '20-21',
            month: 'Sep',
            title: 'Ladies Open Championship 2025',
            venue: 'Arunima Golf Club',
            icon: 'ph ph-person-simple-walk',
            cta: {
                label: 'Register',
                href: '/contact',
            },
        },
        {
            date: '10-19',
            month: 'Oct',
            title: 'Corporate Challenge 2025',
            venue: 'Arunima Golf Club',
            icon: 'ph ph-users-three',
            cta: {
                label: 'Register',
                href: '/contact',
            },
        },
    ],
};

const tournamentMoments = {
    eyebrow: 'Tournament Gallery',
    title: 'Moments to Remember',
    cta: {
        label: 'Register Now',
        href: '/contact',
    },
    images: [
        {
            src: golfPlayer,
            alt: 'Golfer playing a tournament shot at Arunima Resort Golf Club',
        },
        {
            src: aboutMain,
            alt: 'Golf tournament participants at Arunima Resort Golf Club',
        },
        {
            src: golfField,
            alt: 'Arunima Resort Golf Club tournament fairway',
        },
        {
            src: courseMap,
            alt: 'Arunima Resort Golf Club course view',
        },
        {
            src: banner,
            alt: 'Arunima Resort Golf Club tournament moment',
        },
    ],
};

const tournamentRegistration = {
    eyebrow: 'Tournament Registration',
    title: 'Register for the Next Tournament',
    submitEmail: 'arunimaresortgolfclub@gmail.com',
    emailSubject: 'Tournament Registration Request',
    description:
        'Submit your player details and preferred tournament category. Our tournament office will contact you to confirm availability, payment, and tee-time details.',
    note: {
        icon: 'ph ph-info',
        title: 'Before You Submit',
        description:
            'Please keep your handicap information and contact number ready. Registration is confirmed after the tournament office verifies payment and eligibility.',
    },
    terms:
        'By submitting this form, you agree to be contacted by Arunima Resort Golf Club about tournament registration.',
    submitLabel: 'Submit Registration',
    fields: [
        {
            label: 'Full Name',
            name: 'fullName',
            type: 'text',
            placeholder: 'Enter your full name',
            required: true,
        },
        {
            label: 'Phone Number',
            name: 'phone',
            type: 'tel',
            placeholder: 'Enter your phone number',
            required: true,
        },
        {
            label: 'Email Address',
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email address',
            required: true,
        },
        {
            label: 'Tournament',
            name: 'tournament',
            type: 'select',
            placeholder: 'Select tournament',
            required: true,
            options: [
                {
                    label: 'Arunima Open Championship 2025',
                    value: 'arunima-open-championship-2025',
                },
                {
                    label: 'Arunima Invitational 2025',
                    value: 'arunima-invitational-2025',
                },
                {
                    label: 'Independence Cup 2025',
                    value: 'independence-cup-2025',
                },
            ],
        },
        {
            label: 'Category',
            name: 'category',
            type: 'select',
            placeholder: 'Select category',
            required: true,
            options: [
                {
                    label: 'Open Championship',
                    value: 'open-championship',
                },
                {
                    label: 'Stroke Play',
                    value: 'stroke-play',
                },
                {
                    label: 'Match Play',
                    value: 'match-play',
                },
                {
                    label: 'Corporate Team',
                    value: 'corporate-team',
                },
                {
                    label: 'Ladies Championship',
                    value: 'ladies-championship',
                },
            ],
        },
        {
            label: 'Handicap',
            name: 'handicap',
            type: 'text',
            placeholder: 'Enter your handicap',
            required: false,
        },
        {
            label: 'Message',
            name: 'message',
            type: 'textarea',
            placeholder: 'Add notes, team name, or special requests',
            required: false,
        },
    ],
};

const Tournaments = () => {
    return (
        <main className="w-full pt-[86px] lg:pt-[96px]">
            <OpenChampionshipSection tournament={openChampionshipTournament} />
            <TournamentCalendarSection calendar={tournamentCalendar} />
            <TournamentMomentsSection moments={tournamentMoments} />
            <TournamentRegistrationFormSection registration={tournamentRegistration} />
        </main>
    );
};

export default Tournaments;
