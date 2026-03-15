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

const stateRegionMap = {
  AL: 'south',
  AK: 'west',
  AZ: 'west',
  AR: 'south',
  CA: 'west',
  CO: 'west',
  CT: 'northeast',
  DE: 'south',
  DC: 'south',
  FL: 'south',
  GA: 'south',
  HI: 'west',
  ID: 'west',
  IL: 'midwest',
  IN: 'midwest',
  IA: 'midwest',
  KS: 'midwest',
  KY: 'south',
  LA: 'south',
  ME: 'northeast',
  MD: 'south',
  MA: 'northeast',
  MI: 'midwest',
  MN: 'midwest',
  MS: 'south',
  MO: 'midwest',
  MT: 'west',
  NE: 'midwest',
  NV: 'west',
  NH: 'northeast',
  NJ: 'northeast',
  NM: 'west',
  NY: 'northeast',
  NC: 'south',
  ND: 'midwest',
  OH: 'midwest',
  OK: 'south',
  OR: 'west',
  PA: 'northeast',
  RI: 'northeast',
  SC: 'south',
  SD: 'midwest',
  TN: 'south',
  TX: 'south',
  UT: 'west',
  VT: 'northeast',
  VA: 'south',
  WA: 'west',
  WV: 'south',
  WI: 'midwest',
  WY: 'west'
};

const updateBackEstimate = () => {
  const backEstimateLink = document.querySelector('[data-back-estimate]');
  if (!backEstimateLink) return;
  const parts = window.location.pathname.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  const entry = Object.entries(stateMetaMap).find(([, meta]) => meta.slug === slug);
  if (!entry) return;
  const [abbr, meta] = entry;
  backEstimateLink.href = `/estimator/?state=${abbr}`;
  if (backEstimateLink.hasAttribute('data-back-label')) {
    backEstimateLink.textContent = `Back to ${meta.name} estimate`;
  }
};

const updateEstimatorLinks = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  const entry = Object.entries(stateMetaMap).find(([, meta]) => meta.slug === slug);
  if (!entry) return;
  const [abbr] = entry;
  document.querySelectorAll('a[href^="/estimator/"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.includes('?')) return;
    link.href = `/estimator/?state=${abbr}`;
  });
};

const initStateTable = () => {
  const stateTable = document.querySelector('[data-state-table]');
  if (!stateTable) return;
  const params = new URLSearchParams(window.location.search);
  const selectedState = params.get('state');
  const searchInput = document.querySelector('[data-state-search]');
  const regionSelect = document.querySelector('[data-state-region]');
  const countEl = document.querySelector('[data-state-count]');
  const clearButton = document.querySelector('[data-state-clear]');
  const rows = Object.entries(stateMetaMap)
    .map(([abbr, meta]) => ({
      abbr,
      name: meta.name,
      slug: meta.slug,
      region: stateRegionMap[abbr] || ''
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const renderTable = () => {
    const query = searchInput?.value?.trim().toLowerCase() || '';
    const region = regionSelect?.value || '';
    stateTable.innerHTML = '';
    const visibleRows = rows.filter(({ abbr, name, region: rowRegion }) => {
      const matchesQuery = !query || abbr.toLowerCase().includes(query) || name.toLowerCase().includes(query);
      const matchesRegion = !region || rowRegion === region;
      return matchesQuery && matchesRegion;
    });

    visibleRows.forEach(({ abbr, name, slug }) => {
        const row = document.createElement('tr');
        if (selectedState && abbr === selectedState) {
          row.classList.add('highlight');
        }
        row.innerHTML = `
          <td>${name} (${abbr})</td>
          <td><a href="/state-costs/${slug}/" class="tag">Guide</a></td>
          <td><a href="/estimator/?state=${abbr}" class="tag">Estimate</a></td>
        `;
        stateTable.appendChild(row);
      });

    if (countEl) {
      countEl.textContent = `Showing ${visibleRows.length} guide${visibleRows.length === 1 ? '' : 's'}`;
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', renderTable);
  }
  if (regionSelect) {
    regionSelect.addEventListener('change', renderTable);
  }
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (regionSelect) regionSelect.value = '';
      renderTable();
    });
  }
  renderTable();
};

updateBackEstimate();
updateEstimatorLinks();
initStateTable();
