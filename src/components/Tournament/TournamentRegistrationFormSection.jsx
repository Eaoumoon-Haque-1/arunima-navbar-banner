const inputClassName =
  'min-h-12 w-full rounded-[4px] border border-emerald-900/10 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-[#d7b56d] focus:ring-2 focus:ring-[#d7b56d]/25';

const TournamentRegistrationFormSection = ({ registration }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const selectedLabels = registration?.fields?.reduce((labels, field) => {
      if (field.type !== 'select') {
        return labels;
      }

      const selectedValue = formData.get(field.name);
      const selectedOption = field.options?.find((option) => option.value === selectedValue);

      return {
        ...labels,
        [field.name]: selectedOption?.label || selectedValue,
      };
    }, {});

    const emailBody = registration?.fields
      ?.map((field) => {
        const value = selectedLabels?.[field.name] || formData.get(field.name) || '-';
        return `${field.label}: ${value}`;
      })
      .join('\n');

    const subject = encodeURIComponent(registration?.emailSubject || 'Tournament Registration');
    const body = encodeURIComponent(emailBody || '');

    window.location.href = `mailto:${registration?.submitEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative overflow-hidden bg-[#fbfaf6] px-6 py-16 lg:px-10">
      <div className="absolute left-0 top-0 h-full w-full opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061b0d_1px,transparent_1px),linear-gradient(#061b0d_1px,transparent_1px)] bg-size-[42px_42px]"></div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#a8753b]">
            <span className="h-px w-8 bg-[#d7b56d]"></span>
            {registration?.eyebrow}
          </p>

          <h2 className="mt-3 max-w-md font-serif text-3xl font-bold leading-tight text-[#102416] sm:text-4xl">
            {registration?.title}
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
            {registration?.description}
          </p>

          <div className="mt-8 rounded-[8px] border border-[#d7b56d]/35 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#003c2f] text-[#d7b56d]">
                <i className={`${registration?.note?.icon} text-xl`}></i>
              </span>
              <div>
                <h3 className="text-sm font-black text-[#102416]">
                  {registration?.note?.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {registration?.note?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          className="rounded-[8px] border border-emerald-900/10 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-7"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {registration?.fields?.map((field) => (
              <label
                key={field.name}
                className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
              >
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-[#a8753b]">
                  {field.label}
                </span>

                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    required={field.required}
                    defaultValue=""
                    className={inputClassName}
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    rows={4}
                    placeholder={field.placeholder}
                    className={`${inputClassName} resize-none py-3`}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={inputClassName}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-slate-500">
              {registration?.terms}
            </p>

            <button
              type="submit"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-[4px] bg-[#d7b56d] px-6 text-sm font-black uppercase tracking-wide text-[#061b0d] transition duration-300 hover:bg-[#061b0d] hover:text-white"
            >
              <span>{registration?.submitLabel}</span>
              <i className="ph ph-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TournamentRegistrationFormSection;
