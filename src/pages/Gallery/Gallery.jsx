import event1 from '../../assets/Gallery/Event1.jpg';
import event2 from '../../assets/Gallery/Event2.jpg';
import event3 from '../../assets/Gallery/Event3.jpg';
import event4 from '../../assets/Gallery/Event4.jpg';
import event5 from '../../assets/Gallery/Event5.JPG';
import event6 from '../../assets/Gallery/Event6.JPG';
import event7 from '../../assets/Gallery/Event7.jpg';
import event8 from '../../assets/Gallery/Event8.JPG';
import event9 from '../../assets/Gallery/Event9.JPG';
import event10 from '../../assets/Gallery/Event10.jpg';

const featuredPhotos = [
    {
        src: event5,
        title: 'Tournament Day',
        meta: 'Club event moments',
        className: 'lg:col-span-2 lg:row-span-2',
    },
    {
        src: event2,
        title: 'Course Gathering',
        meta: 'Players and guests',
        className: '',
    },
    {
        src: event9,
        title: 'Prize Ceremony',
        meta: 'Celebration highlights',
        className: '',
    },
];

const galleryPhotos = [
    {
        src: event4,
        title: 'Opening Moment',
        category: 'Tournament',
        className: 'sm:col-span-2 lg:col-span-1 lg:row-span-2',
    },
    {
        src: event10,
        title: 'Event Guests',
        category: 'Club Life',
        className: '',
    },
    {
        src: event1,
        title: 'Fairway Action',
        category: 'Golf',
        className: '',
    },
    {
        src: event6,
        title: 'Group Program',
        category: 'Events',
        className: 'sm:col-span-2',
    },
    {
        src: event8,
        title: 'Award Moment',
        category: 'Ceremony',
        className: '',
    },
    {
        src: event3,
        title: 'Club Gathering',
        category: 'Members',
        className: '',
    },
    {
        src: event7,
        title: 'Golf Course',
        category: 'Course',
        className: 'sm:col-span-2 lg:col-span-1',
    },
];

const GalleryImage = ({ photo, large = false }) => {
    return (
        <article
            className={`group relative overflow-hidden rounded-[8px] bg-[#062014] shadow-[0_18px_50px_rgba(15,23,42,0.12)] ${
                large ? 'min-h-[260px] sm:min-h-[340px] lg:min-h-[520px]' : 'min-h-[240px]'
            } ${photo.className || ''}`}
        >
            <img
                src={photo.src}
                alt={`${photo.title} at Arunima Resort Golf Club`}
                className="h-full min-h-[inherit] w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#061b0d]/80 via-[#061b0d]/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-95"></div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#d7b56d]">
                    {photo.meta || photo.category}
                </p>
                <h2 className="mt-2 text-xl font-black leading-tight sm:text-2xl">
                    {photo.title}
                </h2>
            </div>
        </article>
    );
};

const Gallery = () => {
    return (
        <main className="w-full bg-[#fbfaf6] pt-[86px] text-[#102416] lg:pt-[96px]">
            <section className="px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                        <div>
                            <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#a8753b]">
                                <span className="h-px w-8 bg-[#d7b56d]"></span>
                                Event Gallery
                            </p>

                            <h1 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight text-[#102416] sm:text-5xl lg:text-6xl">
                                Arunima event moments in frame
                            </h1>
                        </div>

                        <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                            A look back at club gatherings, tournament days, award
                            ceremonies, and golf moments from Arunima Resort Golf Club.
                        </p>
                    </div>

                    <div className="mt-10 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[250px]">
                        {featuredPhotos.map((photo, index) => (
                            <GalleryImage
                                key={photo.title}
                                photo={photo}
                                large={index === 0}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#003c2f] px-5 py-12 text-white sm:px-6 lg:px-10 lg:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#d7b56d]">
                                <span className="h-px w-8 bg-[#d7b56d]"></span>
                                Photo Highlights
                            </p>

                            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                                Events, golf, and celebrations
                            </h2>
                        </div>

                        <a
                            href="/contact"
                            className="inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-[4px] border border-[#d7b56d]/70 px-5 text-xs font-black uppercase tracking-wide text-white transition duration-300 hover:bg-[#d7b56d] hover:text-[#061b0d]"
                        >
                            <span>Plan an Event</span>
                            <i className="ph ph-arrow-right"></i>
                        </a>
                    </div>

                    <div className="mt-8 grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {galleryPhotos.map((photo) => (
                            <GalleryImage key={photo.title} photo={photo} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Gallery;
