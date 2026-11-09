import React from 'react';

const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Course Map', href: '#course-map' },
    { label: 'Membership', href: '#membership' },
];

const resortLinks = [
    { label: 'Golf', href: '#course-map' },
    { label: 'Accommodation', href: '#accommodation' },
    { label: 'Dining', href: '#dining' },
    { label: 'Activities', href: '#activities' },
];

const contactItems = [
    {
        label: 'Phone',
        value: '01958-339133',
        href: 'tel:01958339133',
        icon: 'ph ph-phone-call',
    },
    {
        label: 'Email',
        value: 'arunimaresortgolfclub@gmail.com',
        href: 'mailto:arunimaresortgolfclub@gmail.com',
        icon: 'ph ph-envelope-simple',
    },
    {
        label: 'Location',
        value: 'Panipara, Naragati, Narail, Bangladesh',
        href: '#',
        icon: 'ph ph-map-pin',
    },
];

const socialLinks = [
    {
        label: 'Facebook',
        href: '#',
        icon: 'ph ph-facebook-logo',
    },
    {
        label: 'YouTube',
        href: '#',
        icon: 'ph ph-youtube-logo',
    },
    {
        label: 'Instagram',
        href: '#',
        icon: 'ph ph-instagram-logo',
    },
];

const FooterLink = ({ href, children }) => {
    return (
        <a
            href={href}
            className="group flex w-fit items-center gap-2 text-sm font-medium text-emerald-50/70 transition duration-300 hover:text-[#d7b56d]"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d7b56d] opacity-0 transition duration-300 group-hover:opacity-100"></span>
            <span className="transition duration-300 group-hover:translate-x-1">
                {children}
            </span>
        </a>
    );
};

const FooterColumn = ({ title, children }) => {
    return (
        <div>
            <h3 className="mb-5 text-lg font-extrabold text-white">
                {title}
            </h3>
            {children}
        </div>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-[#061b0d] text-white">
            {/* Decorative Top Line */}
            <div className="h-[3px] w-full bg-linear-to-r from-transparent via-[#d7b56d] to-transparent"></div>

            {/* Background Effects */}
            <div className="absolute left-0 top-0 h-full w-full opacity-[0.06]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ffffff_1px,transparent_1px)] bg-size-[34px_34px]"></div>
            </div>

            <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl sm:h-96 sm:w-96"></div>
            <div className="absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-[#d7b56d]/10 blur-3xl sm:h-96 sm:w-96"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
                {/* Newsletter Card */}
                <div className="relative mb-10 overflow-hidden rounded-[1.5rem] border border-emerald-400/20 bg-linear-to-br from-emerald-900/70 via-emerald-900/40 to-[#102416]/80 p-5 shadow-2xl backdrop-blur-md sm:mb-14 sm:rounded-[2rem] sm:p-6 md:p-8">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d7b56d]/20 blur-3xl"></div>
                    <div className="absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl"></div>

                    <div className="relative grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d7b56d] sm:text-sm sm:tracking-[0.3em]">
                                Stay Connected
                            </p>

                            <h3 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
                                Get Resort Updates & Golf News
                            </h3>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50/70">
                                Subscribe for Arunima updates, golf notices, booking news,
                                seasonal offers, and visitor information.
                            </p>
                        </div>

                        <form className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="min-h-14 flex-1 rounded-full border border-white/10 bg-white/95 px-6 text-sm font-medium text-[#102416] outline-none transition placeholder:text-slate-500 focus:border-[#d7b56d] focus:ring-4 focus:ring-[#d7b56d]/20"
                            />

                            <button
                                type="button"
                                className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#d7b56d] px-7 text-sm font-black uppercase tracking-wide text-[#061b0d] transition duration-300 hover:bg-white sm:w-auto"
                            >
                                <span>Subscribe</span>

                                <span className="relative flex h-9 w-9 rotate-[-18deg] items-center justify-center overflow-hidden rounded-full bg-[#061b0d] text-white transition duration-300 group-hover:rotate-0 group-hover:bg-emerald-800">
                                    <i className="ph ph-paper-plane-right absolute translate-x-0 text-base transition duration-300 group-hover:translate-x-10"></i>
                                    <i className="ph ph-paper-plane-right absolute -translate-x-10 text-base transition duration-300 group-hover:translate-x-0"></i>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Footer */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.2fr] lg:gap-10">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <a href="#" className="inline-flex items-center gap-4">
                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d7b56d]/30 bg-white/10 shadow-xl backdrop-blur-md sm:h-16 sm:w-16 sm:rounded-3xl">
                                <div className="absolute inset-1 rounded-[1.25rem] border border-white/10"></div>
                                <i className="ph ph-flag-banner text-3xl text-[#d7b56d]"></i>
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-2xl font-black leading-none text-white sm:text-3xl">
                                    Arunima
                                </h2>
                                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#d7b56d] sm:text-xs sm:tracking-[0.25em]">
                                    Resort Golf Club
                                </p>
                            </div>
                        </a>

                        <p className="mt-6 max-w-md text-sm leading-7 text-emerald-50/70">
                            A peaceful golf and nature resort in Narail, offering
                            countryside calm, scenic course views, resort leisure,
                            and memorable outdoor experiences.
                        </p>

                        <div className="mt-7 flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-emerald-400/20 bg-white/10 text-lg text-white transition duration-300 hover:-translate-y-1 hover:border-[#d7b56d]/60"
                                >
                                    <span className="absolute inset-0 translate-y-full bg-[#d7b56d] transition duration-300 group-hover:translate-y-0"></span>
                                    <i className={`${social.icon} relative z-10 transition duration-300 group-hover:text-[#061b0d]`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <FooterColumn title="Explore">
                        <div className="space-y-3">
                            {quickLinks.map((link) => (
                                <FooterLink key={link.label} href={link.href}>
                                    {link.label}
                                </FooterLink>
                            ))}
                        </div>
                    </FooterColumn>

                    {/* Resort Links */}
                    <FooterColumn title="Resort">
                        <div className="space-y-3">
                            {resortLinks.map((link) => (
                                <FooterLink key={link.label} href={link.href}>
                                    {link.label}
                                </FooterLink>
                            ))}
                        </div>
                    </FooterColumn>

                    {/* Contact Card */}
                    <div className="min-w-0 rounded-[1.5rem] border border-emerald-400/20 bg-white/10 p-4 backdrop-blur-md sm:col-span-2 sm:p-6 lg:col-span-1 lg:rounded-[2rem]">
                        <h3 className="mb-5 text-lg font-extrabold text-white">
                            Contact
                        </h3>

                        <div className="space-y-3 sm:space-y-4">
                            {contactItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="group flex min-w-0 items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3 transition duration-300 hover:border-[#d7b56d]/40 hover:bg-white/[0.08] sm:gap-4 sm:rounded-2xl sm:p-4"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7b56d]/15 text-[#d7b56d] transition duration-300 group-hover:bg-[#d7b56d] group-hover:text-[#061b0d]">
                                        <i className={`${item.icon} text-lg`}></i>
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="block text-xs font-bold uppercase tracking-wide text-emerald-50/40">
                                            {item.label}
                                        </span>
                                        <span className="mt-1 block text-sm leading-6 text-emerald-50/75 [overflow-wrap:anywhere] transition duration-300 group-hover:text-white">
                                            {item.value}
                                        </span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 flex flex-col gap-4 border-t border-emerald-400/15 pt-6 text-sm leading-6 text-emerald-50/60 md:mt-12 md:flex-row md:items-center md:justify-between">
                    <p>
                        © {currentYear} Arunima Resort Golf Club. All rights reserved.
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <a href="#" className="transition duration-300 hover:text-[#d7b56d]">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition duration-300 hover:text-[#d7b56d]">
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
