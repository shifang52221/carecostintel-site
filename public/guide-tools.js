const stateMetaMap = {
  AL: { name: 'Alabama', slug: 'alabama' },
  AK: { name: 'Alaska', slug: 'alaska' },
  AZ: { name: 'Arizona', slug: 'arizona' },
  AR: { name: 'Arkansas', slug: 'arkansas' },
  CA: { name: 'California', slug: 'california' },
  CO: { name: 'Colorado', slug: 'colorado' },
  CT: { name: 'Connecticut', slug: 'connecticut' },
  DE: { name: 'Delaware', slug: 'delaware' },
  DC: { name: 'District of Columbia', slug: 'district-of-columbia' },
  FL: { name: 'Florida', slug: 'florida' },
  GA: { name: 'Georgia', slug: 'georgia' },
  HI: { name: 'Hawaii', slug: 'hawaii' },
  ID: { name: 'Idaho', slug: 'idaho' },
  IL: { name: 'Illinois', slug: 'illinois' },
  IN: { name: 'Indiana', slug: 'indiana' },
  IA: { name: 'Iowa', slug: 'iowa' },
  KS: { name: 'Kansas', slug: 'kansas' },
  KY: { name: 'Kentucky', slug: 'kentucky' },
  LA: { name: 'Louisiana', slug: 'louisiana' },
  ME: { name: 'Maine', slug: 'maine' },
  MD: { name: 'Maryland', slug: 'maryland' },
  MA: { name: 'Massachusetts', slug: 'massachusetts' },
  MI: { name: 'Michigan', slug: 'michigan' },
  MN: { name: 'Minnesota', slug: 'minnesota' },
  MS: { name: 'Mississippi', slug: 'mississippi' },
  MO: { name: 'Missouri', slug: 'missouri' },
  MT: { name: 'Montana', slug: 'montana' },
  NE: { name: 'Nebraska', slug: 'nebraska' },
  NV: { name: 'Nevada', slug: 'nevada' },
  NH: { name: 'New Hampshire', slug: 'new-hampshire' },
  NJ: { name: 'New Jersey', slug: 'new-jersey' },
  NM: { name: 'New Mexico', slug: 'new-mexico' },
  NY: { name: 'New York', slug: 'new-york' },
  NC: { name: 'North Carolina', slug: 'north-carolina' },
  ND: { name: 'North Dakota', slug: 'north-dakota' },
  OH: { name: 'Ohio', slug: 'ohio' },
  OK: { name: 'Oklahoma', slug: 'oklahoma' },
  OR: { name: 'Oregon', slug: 'oregon' },
  PA: { name: 'Pennsylvania', slug: 'pennsylvania' },
  RI: { name: 'Rhode Island', slug: 'rhode-island' },
  SC: { name: 'South Carolina', slug: 'south-carolina' },
  SD: { name: 'South Dakota', slug: 'south-dakota' },
  TN: { name: 'Tennessee', slug: 'tennessee' },
  TX: { name: 'Texas', slug: 'texas' },
  UT: { name: 'Utah', slug: 'utah' },
  VT: { name: 'Vermont', slug: 'vermont' },
  VA: { name: 'Virginia', slug: 'virginia' },
  WA: { name: 'Washington', slug: 'washington' },
  WV: { name: 'West Virginia', slug: 'west-virginia' },
  WI: { name: 'Wisconsin', slug: 'wisconsin' },
  WY: { name: 'Wyoming', slug: 'wyoming' }
};

const guideTypeMap = {
  'assisted-living-costs-2026': { type: 'assisted_living', label: 'Assisted living' },
  'affording-assisted-living': { type: 'assisted_living', label: 'Assisted living' },
  'memory-care-costs': { type: 'memory_care', label: 'Memory care' },
  'nursing-home-costs': { type: 'nursing_home', label: 'Nursing home' },
  'home-care-hourly-vs-live-in': { type: 'home_care', label: 'Home care' },
  'home-care-vs-assisted': { type: 'home_care', label: 'Home care' },
  'assisted-vs-nursing-home': { type: 'assisted_living', label: 'Assisted living' }
};

const getGuideSlug = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const guideIndex = parts.indexOf('guides');
  if (guideIndex === -1) return '';
  return parts[guideIndex + 1] || '';
};

const updateGuideActions = () => {
  const stateTitle = document.querySelector('[data-guide-actions-state-title]');
  const stateNote = document.querySelector('[data-guide-actions-state-note]');
  const stateLink = document.querySelector('[data-guide-actions-state-link]');
  const estimatorNote = document.querySelector('[data-guide-actions-estimator-note]');
  const estimatorLink = document.querySelector('[data-guide-actions-estimator-link]');

  if (!stateTitle || !stateLink) return;

  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');
  const guideSlug = getGuideSlug();
  const guideType = guideTypeMap[guideSlug];

  if (state && stateMetaMap[state]) {
    const meta = stateMetaMap[state];
    stateTitle.textContent = `${meta.name} cost guide`;
    if (stateNote) stateNote.textContent = `Local pricing context for ${meta.name}.`;
    stateLink.href = `/state-costs/${meta.slug}/`;
  }

  const estimatorParams = new URLSearchParams();
  if (state && stateMetaMap[state]) estimatorParams.set('state', state);
  if (guideType?.type) estimatorParams.set('type', guideType.type);

  if (estimatorLink) {
    const query = estimatorParams.toString();
    estimatorLink.href = query ? `/estimator/?${query}` : '/estimator/';
  }
  if (estimatorNote && guideType?.label) {
    estimatorNote.textContent = `Model a ${guideType.label.toLowerCase()} range using your care tier and room type.`;
  }
};

const updateOfficialNote = () => {
  const officialNote = document.querySelector('[data-official-note]');
  if (!officialNote) return;
  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');
  if (!state || !stateMetaMap[state]) return;
  officialNote.textContent = `Use ${stateMetaMap[state].name} licensing and oversight pages to validate the assumptions referenced here.`;
};

const updateEstimatorDeepLinks = () => {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');
  const guideSlug = getGuideSlug();
  const guideType = guideTypeMap[guideSlug];
  if (!state && !guideType?.type) return;

  document.querySelectorAll('a[href="/estimator/"]').forEach((link) => {
    const linkParams = new URLSearchParams();
    if (state && stateMetaMap[state]) linkParams.set('state', state);
    if (guideType?.type) linkParams.set('type', guideType.type);
    const query = linkParams.toString();
    link.href = query ? `/estimator/?${query}` : '/estimator/';
  });
};

const setupTocTracking = () => {
  const tocLinks = Array.from(document.querySelectorAll('.toc a[href^="#"]'));
  if (!tocLinks.length) return;

  const sections = tocLinks
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return null;
      const target = document.getElementById(id);
      if (!target) return null;
      return { link, target };
    })
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    sections.forEach(({ link }) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.1, 0.35, 0.6]
      }
    );

    sections.forEach(({ target }) => observer.observe(target));
  } else {
    const onScroll = () => {
      let current = null;
      for (let index = sections.length - 1; index >= 0; index -= 1) {
        if (sections[index].target.getBoundingClientRect().top <= 180) {
          current = sections[index];
          break;
        }
      }
      if (current) setActive(current.target.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
};

updateGuideActions();
updateOfficialNote();
updateEstimatorDeepLinks();
setupTocTracking();
