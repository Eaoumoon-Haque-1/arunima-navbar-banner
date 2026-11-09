import { useEffect, useMemo, useState } from "react";
import { getContactInfo, fallbackContacts } from "../../services/contactApi";

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1522.2369363960609!2d89.71408736278582!3d23.075595441392302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ffc0bdcb9defbb%3A0x62a9cf35e00b9eea!2sArunima%20Resort%20Golf%20Club!5e1!3m2!1sen!2sbd!4v1782725412101!5m2!1sen!2sbd";

const Contact = () => {
  const [contacts, setContacts] = useState(fallbackContacts);

  useEffect(() => {
    let isMounted = true;

    const fetchContacts = async () => {
      const data = await getContactInfo();

      if (isMounted) {
        setContacts(data);
      }
    };

    fetchContacts();

    return () => {
      isMounted = false;
    };
  }, []);

  const officeContacts = useMemo(
    () =>
      contacts.map((contact) => ({
        id: contact.id,
        title: contact.address_type,
        items: [
          {
            label: "Address",
            value: contact.address,
            href: null,
            icon: "ph ph-map-pin",
          },
          {
            label: "Email",
            value: contact.email,
            href: contact.email ? `mailto:${contact.email}` : null,
            icon: "ph ph-envelope-simple",
          },
          ...[contact.mobile_no, contact.mobile_no_2]
            .filter(Boolean)
            .map((mobileNumber) => ({
              label: "Phone",
              value: mobileNumber,
              href: `tel:${mobileNumber.replace(/[^\d+]/g, "")}`,
              icon: "ph ph-phone-call",
            })),
        ].filter((item) => item.value),
      })),
    [contacts],
  );

  const socialLinks = useMemo(
    () =>
      [
        {
          label: "Facebook",
          field: "fb_link",
          icon: "ph ph-facebook-logo",
        },
        {
          label: "X",
          field: "x_link",
          icon: "ph ph-twitter-logo",
        },
        {
          label: "YouTube",
          field: "youtube_link",
          icon: "ph ph-youtube-logo",
        },
        {
          label: "Instagram",
          field: "insta_link",
          icon: "ph ph-instagram-logo",
        },
      ]
        .map((social) => ({
          label: social.label,
          href: contacts.find((contact) => contact[social.field])?.[
            social.field
          ],
          icon: social.icon,
        }))
        .filter((social) => social.href),
    [contacts],
  );

  const contactEmail =
    contacts.find((contact) => contact.email)?.email ||
    fallbackContacts[0].email;

  return (
    <main className="w-full bg-[#f7fbf3] pt-[86px] text-[#082611] lg:pt-[96px]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d7b56d]">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#087207] sm:text-5xl">
            Let&apos;s Get Started
          </h1>
        </div>

        <div className="grid gap-9 lg:grid-cols-[1.05fr_0.75fr] lg:items-stretch">
          <div className="space-y-9">
            <div className="grid gap-6 bg-[#087207] p-6 text-white shadow-xl shadow-emerald-950/10 sm:grid-cols-[1fr_1fr] md:p-8">
              <div>
                <h2 className="text-2xl font-black">Our Offices</h2>

                <div className="mt-5 space-y-6">
                  {officeContacts.map((office) => (
                    <div key={office.id}>
                      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#d7b56d]">
                        {office.title}
                      </h3>

                      <div className="mt-3 space-y-3 text-base font-bold">
                        {office.items.map((item) => {
                          const content = (
                            <>
                              <i
                                className={`${item.icon} mt-1 text-xl text-[#d7b56d]`}
                                aria-hidden="true"
                              ></i>
                              <span>{item.value}</span>
                            </>
                          );

                          return item.href ? (
                            <a
                              key={`${item.label}-${item.value}`}
                              href={item.href}
                              className="flex w-fit items-start gap-3 underline-offset-4 transition hover:text-[#d7b56d] hover:underline"
                            >
                              {content}
                            </a>
                          ) : (
                            <p
                              key={`${item.label}-${item.value}`}
                              className="flex items-start gap-3"
                            >
                              {content}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black">Follow Us</h2>

                  <div className="mt-5 flex flex-wrap gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-[#087207] transition hover:-translate-y-1 hover:bg-[#d7b56d] hover:text-[#061b0d]"
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-hidden bg-white shadow-xl shadow-emerald-950/10">
              <iframe
                title="Arunima Resort Golf Club location"
                src={mapSrc}
                className="h-[360px] w-full border-0 sm:h-[430px] lg:h-[515px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>

          <div className="flex min-h-[520px] items-center bg-[#034b05] p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-8 lg:p-10">
            <div className="w-full">
              <h2 className="text-3xl font-black">Send a Message</h2>
              <p className="mt-4 max-w-md text-base font-bold leading-6 text-white">
                Contact us via email any time. We will be at your service.
              </p>

              <form
                className="mt-6 space-y-4"
                action={`mailto:${contactEmail}`}
                method="post"
                encType="text/plain"
              >
                <label className="sr-only" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="h-12 w-full border border-white/20 bg-white px-4 text-base font-medium text-[#082611] outline-none transition placeholder:text-slate-400 focus:border-[#d7b56d] focus:ring-4 focus:ring-[#d7b56d]/25"
                />

                <label className="sr-only" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="h-12 w-full border border-white/20 bg-white px-4 text-base font-medium text-[#082611] outline-none transition placeholder:text-slate-400 focus:border-[#d7b56d] focus:ring-4 focus:ring-[#d7b56d]/25"
                />

                <label className="sr-only" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Message"
                  rows="5"
                  className="min-h-32 w-full resize-y border border-white/20 bg-white px-4 py-3 text-base font-medium text-[#082611] outline-none transition placeholder:text-slate-400 focus:border-[#d7b56d] focus:ring-4 focus:ring-[#d7b56d]/25"
                ></textarea>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-3 bg-[#087207] px-6 text-base font-black text-white transition hover:bg-[#d7b56d] hover:text-[#061b0d] focus:outline-none focus:ring-4 focus:ring-[#d7b56d]/30"
                >
                  <i className="ph ph-paper-plane-tilt text-xl"></i>
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;