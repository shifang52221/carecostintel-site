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

const weights = {
  careLevelWeight: { basic: 0.9, moderate: 1.0, high: 1.15 },
  roomWeight: { shared: 0.9, private: 1.1 },
  locationWeight: { urban: 1.1, suburban: 1.0, rural: 0.9 },
  amenitiesWeight: { meals: 0.03, rehab: 0.05, transport: 0.03, specialized: 0.05 }
};

const baseRange = { low: 0.9, median: 1, high: 1.12 };

const currency = (value) => `$${value.toLocaleString('en-US')}`;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const formatLabel = (value = '') =>
  value
    .toString()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const estimatorForm = document.querySelector('[data-estimator-form]');
const stateSelect = document.querySelector('[data-state]');
const careTypeSelect = document.querySelector('[data-care-type]');
const locationSelect = document.querySelector('[data-location]');
const careLevelSelect = document.querySelector('[data-care-level]');
const careLevelRange = document.querySelector('[data-care-level-range]');
const careLevelLabel = document.querySelector('[data-care-level-label]');
const roomTypeSelect = document.querySelector('[data-room-type]');
const budgetInput = document.querySelector('[data-budget]');
const baselineInput = document.querySelector('[data-baseline]');
const budgetRange = document.querySelector('[data-budget-range]');
const budgetOutput = document.querySelector('[data-budget-output]');
const inflationRange = document.querySelector('[data-inflation-range]');
const inflationOutput = document.querySelector('[data-inflation-output]');
const hoursInput = document.querySelector('[data-hours]');
const hoursField = document.querySelector('[data-hours-field]');
const hourlyInput = document.querySelector('[data-hourly]');
const hourlyField = document.querySelector('[data-hourly-field]');
const zipInput = document.querySelector('[data-zip]');
const moveSelect = document.querySelector('[data-move]');
const profileButtons = document.querySelectorAll('[data-profile]');
const shareButton = document.querySelector('[data-share]');
const shareReportButton = document.querySelector('[data-share-report]');
const shareStatus = document.querySelector('[data-share-status]');
const saveBaselineButton = document.querySelector('[data-save-baseline]');
const compareStatus = document.querySelector('[data-compare-status]');
const compareTable = document.querySelector('[data-compare-table]');
const compareEls = {
  baselineMonth: document.querySelector('[data-compare-baseline-month]'),
  baselineAnnual: document.querySelector('[data-compare-baseline-annual]'),
  baselineGap: document.querySelector('[data-compare-baseline-gap]'),
  currentMonth: document.querySelector('[data-compare-current-month]'),
  currentAnnual: document.querySelector('[data-compare-current-annual]'),
  currentGap: document.querySelector('[data-compare-current-gap]'),
  deltaMonth: document.querySelector('[data-compare-delta-month]'),
  deltaAnnual: document.querySelector('[data-compare-delta-annual]')
};
const curveBars = document.querySelectorAll('[data-curve-bar]');
const insightButtons = document.querySelectorAll('[data-insight-view]');
const insightItems = document.querySelectorAll('[data-insight]');
const nextStateCard = {
  title: document.querySelector('[data-next-state-title]'),
  note: document.querySelector('[data-next-state-note]'),
  link: document.querySelector('[data-next-state-link]')
};
const nextActionsCard = {
  note: document.querySelector('[data-next-actions-note]'),
  link: document.querySelector('[data-next-actions-state]')
};
const cityCompareCard = {
  note: document.querySelector('[data-next-city-compare-note]'),
  link: document.querySelector('[data-next-city-compare]')
};
const workspaceEls = {
  title: document.querySelector('[data-workspace-title]'),
  note: document.querySelector('[data-workspace-note]')
};
const reportEls = {
  container: document.querySelector('[data-report]'),
  range: document.querySelector('[data-report-range]'),
  median: document.querySelector('[data-report-median]'),
  annual: document.querySelector('[data-report-annual]'),
  three: document.querySelector('[data-report-three]'),
  five: document.querySelector('[data-report-five]'),
  state: document.querySelector('[data-report-state]'),
  stateLink: document.querySelector('[data-report-state-link]'),
  gap: document.querySelector('[data-report-gap]'),
  gapLabel: document.querySelector('[data-report-gap-label]'),
  affordability: document.querySelector('[data-report-affordability]'),
  careFit: document.querySelector('[data-report-carefit]'),
  anchorNote: document.querySelector('[data-report-anchor-note]'),
  type: document.querySelector('[data-report-type]'),
  level: document.querySelector('[data-report-level]'),
  room: document.querySelector('[data-report-room]'),
  location: document.querySelector('[data-report-location]'),
  move: document.querySelector('[data-report-move]'),
  analysis: document.querySelector('[data-report-analysis]'),
  suggestion1: document.querySelector('[data-report-suggestion-1]'),
  suggestion2: document.querySelector('[data-report-suggestion-2]'),
  suggestion3: document.querySelector('[data-report-suggestion-3]'),
  risk1: document.querySelector('[data-report-risk-1]'),
  risk2: document.querySelector('[data-report-risk-2]'),
  risk3: document.querySelector('[data-report-risk-3]'),
  print: document.querySelector('[data-print]')
};

const resultsEls = {
  range: document.querySelector('[data-result-range]'),
  median: document.querySelector('[data-result-median]'),
  annual: document.querySelector('[data-result-annual]'),
  three: document.querySelector('[data-result-three]'),
  five: document.querySelector('[data-result-five]'),
  affordability: document.querySelector('[data-result-affordability]'),
  gap: document.querySelector('[data-result-gap]'),
  gapLabel: document.querySelector('[data-gap-label]'),
  careFit: document.querySelector('[data-result-carefit]'),
  affordabilityBar: document.querySelector('[data-affordability-bar]'),
  careFitBar: document.querySelector('[data-carefit-bar]'),
  analysis: document.querySelector('[data-result-analysis]'),
  note: document.querySelector('[data-result-note]'),
  driverCare: document.querySelector('[data-driver-care]'),
  driverRoom: document.querySelector('[data-driver-room]'),
  driverLocation: document.querySelector('[data-driver-location]'),
  driverAmenities: document.querySelector('[data-driver-amenities]'),
  suggestion1: document.querySelector('[data-suggestion-1]'),
  suggestion2: document.querySelector('[data-suggestion-2]'),
  suggestion3: document.querySelector('[data-suggestion-3]'),
  confidence: document.querySelector('[data-confidence]'),
  distLow: document.querySelector('[data-dist-low]'),
  distMedian: document.querySelector('[data-dist-median]'),
  distHigh: document.querySelector('[data-dist-high]'),
  summaryState: document.querySelector('[data-summary-state]'),
  summaryType: document.querySelector('[data-summary-type]'),
  summaryLevel: document.querySelector('[data-summary-level]'),
  summaryRoom: document.querySelector('[data-summary-room]'),
  summaryLocation: document.querySelector('[data-summary-location]'),
  summaryMove: document.querySelector('[data-summary-move]'),
  risk1: document.querySelector('[data-risk-1]'),
  risk2: document.querySelector('[data-risk-2]'),
  risk3: document.querySelector('[data-risk-3]'),
  aiAnalysis: document.querySelector('[data-ai-analysis]'),
  readiness: document.querySelector('[data-result-readiness]'),
  anchorTip: document.querySelector('[data-result-anchor-tip]'),
  budgetStory: document.querySelector('[data-budget-story]'),
  status: document.querySelector('[data-result-status]')
};

const errorEls = {
  state: document.querySelector('[data-error="state"]'),
  zip: document.querySelector('[data-error="zip"]'),
  budget: document.querySelector('[data-error="budget"]'),
  baseline: document.querySelector('[data-error="baseline"]'),
  hours: document.querySelector('[data-error="hours"]'),
  hourly: document.querySelector('[data-error="hourly"]'),
  anchor: document.querySelector('[data-error="anchor"]')
};

let lastStatus = '';

const setFieldError = (input, errorEl, message) => {
  if (!input || !errorEl) return;
  if (message) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    return;
  }
  input.classList.remove('is-invalid');
  input.removeAttribute('aria-invalid');
  errorEl.textContent = '';
};

const focusFirstField = (panel) => {
  if (!panel) return;
  const focusTarget = panel.querySelector('input:not([type="hidden"]), select, textarea, button');
  if (focusTarget) focusTarget.focus();
};

const zipPattern = /^\d{5}(-\d{4})?$/;

const validateZip = () => {
  if (!zipInput) return true;
  const value = zipInput.value.trim();
  if (!value) {
    setFieldError(zipInput, errorEls.zip, '');
    return true;
  }
  if (!zipPattern.test(value)) {
    setFieldError(zipInput, errorEls.zip, 'Enter a valid 5-digit ZIP or ZIP+4.');
    return false;
  }
  setFieldError(zipInput, errorEls.zip, '');
  return true;
};

const validateState = (options = {}) => {
  const showError = options.showError !== false;
  if (!stateSelect) return true;
  if (!stateSelect.value) {
    if (showError) setFieldError(stateSelect, errorEls.state, 'Select a state to continue.');
    return false;
  }
  setFieldError(stateSelect, errorEls.state, '');
  return true;
};

const validateBudgetStep = (options = {}) => {
  const showAnchor = options.showAnchor !== false;
  let valid = true;
  const budget = Number(budgetInput?.value || 0);
  const baseline = Number(baselineInput?.value || 0);
  const hours = Number(hoursInput?.value || 0);
  const hourlyRate = Number(hourlyInput?.value || 0);
  const isHomeCare = careTypeSelect?.value === 'home_care';

  if (budgetInput && budget < 0) {
    setFieldError(budgetInput, errorEls.budget, 'Budget must be 0 or more.');
    valid = false;
  } else if (budgetInput) {
    setFieldError(budgetInput, errorEls.budget, '');
  }

  if (baselineInput && baseline < 0) {
    setFieldError(baselineInput, errorEls.baseline, 'Baseline must be 0 or more.');
    valid = false;
  } else if (baselineInput) {
    setFieldError(baselineInput, errorEls.baseline, '');
  }

  if (isHomeCare) {
    if (hoursInput && (hours < 1 || hours > 24)) {
      setFieldError(hoursInput, errorEls.hours, 'Enter hours between 1 and 24.');
      valid = false;
    } else if (hoursInput) {
      setFieldError(hoursInput, errorEls.hours, '');
    }

    if (hourlyInput && hourlyRate < 0) {
      setFieldError(hourlyInput, errorEls.hourly, 'Hourly rate must be 0 or more.');
      valid = false;
    } else if (hourlyInput) {
      setFieldError(hourlyInput, errorEls.hourly, '');
    }
  } else {
    if (hoursInput) setFieldError(hoursInput, errorEls.hours, '');
    if (hourlyInput) setFieldError(hourlyInput, errorEls.hourly, '');
  }

  const hasAnchor = baseline > 0 || budget > 0 || (isHomeCare && hourlyRate > 0);
  if (showAnchor) {
    if (!hasAnchor) {
      if (errorEls.anchor) errorEls.anchor.textContent = 'Add a baseline quote, budget, or hourly rate to continue.';
      valid = false;
    } else if (errorEls.anchor) {
      errorEls.anchor.textContent = '';
    }
  } else if (errorEls.anchor) {
    errorEls.anchor.textContent = '';
  }

  return valid;
};
const populateStates = () => {
  if (!stateSelect) return;
  Object.entries(stateMetaMap)
    .sort((a, b) => a[1].name.localeCompare(b[1].name))
    .forEach(([abbr, meta]) => {
      const option = document.createElement('option');
      option.value = abbr;
      option.textContent = `${meta.name} (${abbr})`;
      stateSelect.appendChild(option);
    });
};

const getAmenities = () => {
  const amenityInputs = document.querySelectorAll('[data-amenity]');
  return Array.from(amenityInputs).filter((input) => input.checked).map((input) => input.value);
};

const compute = () => {
  const state = stateSelect?.value;
  if (!state) {
    resultsEls.note.textContent = 'Select a state and add a baseline quote or budget to generate a personalized range.';
    return null;
  }

  const careType = careTypeSelect?.value || 'assisted_living';
  const careLevel = careLevelSelect?.value || 'moderate';
  const roomType = roomTypeSelect?.value || 'shared';
  const locationType = locationSelect?.value || 'suburban';
  const amenities = getAmenities();
  const budget = Number(budgetInput?.value || 0);
  const baseline = Number(baselineInput?.value || 0);
  const hours = Number(hoursInput?.value || 6);
  const hourlyRate = Number(hourlyInput?.value || 0);
  const zip = zipInput?.value?.trim() || '';
  const move = moveSelect?.value || '';
  const inflation = Number(inflationRange?.value || 4);

  let base = 0;
  let anchorSource = '';
  if (careType === 'home_care' && hourlyRate) {
    base = hourlyRate * 30 * hours;
    anchorSource = 'hourly rate';
  }
  if (!base && baseline) {
    base = baseline;
    anchorSource = 'baseline quote';
  }
  if (!base && budget) {
    base = budget;
    anchorSource = 'monthly budget';
  }
  if (!base) {
    resultsEls.note.textContent = 'Add a baseline quote, hourly rate, or budget to generate a personalized range.';
    return null;
  }

  const amenityWeight = amenities.reduce((sum, key) => sum + (weights.amenitiesWeight[key] || 0), 0);
  const factor = weights.careLevelWeight[careLevel] * weights.roomWeight[roomType] * weights.locationWeight[locationType] * (1 + amenityWeight);

  const median = Math.round(base * baseRange.median * factor);
  const low = Math.round(base * baseRange.low * factor);
  const high = Math.round(base * baseRange.high * factor);
  const annual = Math.round(median * 12);

  const affordabilityRaw = budget ? Math.round((budget / median) * 100) : 0;
  const affordability = clamp(affordabilityRaw, 0, 200);

  const careFit = clamp(100 - Math.abs(weights.careLevelWeight[careLevel] - 1) * 70, 50, 100);

  return {
    state,
    careType,
    careLevel,
    roomType,
    locationType,
    amenities,
    budget,
    baseline,
    hours,
    hourlyRate,
    zip,
    move,
    inflation,
    median,
    low,
    high,
    annual,
    affordability,
    careFit,
    amenityWeight,
    anchorSource
  };
};

const formatDelta = (value) => {
  const rounded = Math.round(value);
  if (rounded === 0) return '0%';
  return `${rounded > 0 ? '+' : ''}${rounded}%`;
};

const animateValue = (element, value, formatter = currency) => {
  if (!element) return;
  const start = Number(element.dataset.value || 0);
  const duration = 450;
  const startTime = performance.now();

  const step = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const current = start + (value - start) * progress;
    element.textContent = formatter(Math.round(current));
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.dataset.value = value;
    }
  };

  requestAnimationFrame(step);
};

const getConfidence = ({ zip, amenities, move }) => {
  let score = 0;
  if (zip) score += 1;
  if (amenities.length) score += 1;
  if (move) score += 1;
  if (score <= 1) return 'Low';
  if (score <= 2) return 'Medium';
  return 'High';
};

const annuityTotal = (annual, rate, years) => {
  if (!rate) return annual * years;
  const r = rate / 100;
  return annual * ((Math.pow(1 + r, years) - 1) / r);
};

const buildSuggestions = ({ careLevel, roomType, locationType, amenities, careType, hours }) => {
  const suggestions = [];
  if (roomType === 'private') suggestions.push('Run a shared-room version to see whether privacy is the biggest budget lever.');
  if (locationType === 'urban') suggestions.push('Compare a suburban option so you can isolate the location premium.');
  if (careLevel === 'high') suggestions.push('Ask every provider for the written care tier schedule before you compare totals.');
  if (amenities.includes('rehab')) suggestions.push('Separate temporary rehab costs from long-term monthly support when you budget.');
  if (careType === 'home_care' && hours > 8) suggestions.push('Compare home care against assisted living once daily hours move above eight.');
  while (suggestions.length < 3) {
    suggestions.push('Run a second scenario before you treat this range as decision-ready.');
  }
  return suggestions.slice(0, 3);
};

const buildRisks = ({ affordability, careType, hours, careLevel, amenities, baseline, budget }) => {
  const risks = [];
  if (affordability && affordability < 80) {
    risks.push({ text: 'Budget may not cover median cost. Plan for higher out-of-pocket spending.', type: 'alert' });
  } else if (affordability && affordability >= 110) {
    risks.push({ text: 'Budget buffer is strong. You may negotiate for better care tiers.', type: 'ok' });
  }
  if (!baseline && !budget) {
    risks.push({ text: 'No real quote or budget anchor yet. Treat the result as directional, not decision-ready.', type: 'alert' });
  }
  if (careType === 'home_care' && hours > 10) {
    risks.push({ text: 'High daily hours can exceed assisted living ranges. Compare both options.', type: 'alert' });
  }
  if (careLevel === 'high' && !amenities.includes('specialized')) {
    risks.push({ text: 'High care intensity without specialized staff may limit fit. Consider adding it.', type: 'alert' });
  }
  while (risks.length < 3) {
    risks.push({ text: 'Add more details to unlock tailored risk checks.', type: 'neutral' });
  }
  return risks.slice(0, 3);
};

const buildAnalysis = ({ affordability, careType, locationType, roomType, inflation }) => {
  const typeLabel = formatLabel(careType);
  const affordabilityLine = affordability
    ? `Your budget covers about ${affordability}% of the median monthly cost.`
    : 'Add a monthly budget to see whether this range is comfortable or tight.';
  const locationHint =
    locationType === 'urban'
      ? 'Urban pricing usually sits above state medians, so quote differences can widen fast.'
      : 'Suburban or rural areas can moderate monthly costs, but service bundles still need review.';
  const roomHint =
    roomType === 'private'
      ? 'Private rooms add a noticeable premium, so compare that choice separately.'
      : 'Shared rooms can reduce rent while keeping core care costs in view.';
  return `${typeLabel} planning insight: ${affordabilityLine} ${locationHint} ${roomHint} With a ${inflation}% annual increase, long-term totals can compound quickly.`;
};

const buildDecisionStory = (result) => {
  const stateName = stateMetaMap[result.state]?.name || result.state;
  const anchorSource = result.anchorSource || 'planning assumptions';
  const readiness = [];
  const anchorTip = [];
  const budgetStory = [];

  if (result.baseline) {
    readiness.push(`This estimate is stronger because it is anchored to a real quote in ${stateName}.`);
  } else {
    readiness.push(`This estimate is still directional because it is modeled from your ${anchorSource}.`);
  }

  if (result.zip) {
    readiness.push('ZIP detail improves location context for comparing similar providers.');
  } else {
    readiness.push('Add a ZIP when you want a tighter location check before you call providers.');
  }

  if (result.anchorSource === 'baseline quote') {
    anchorTip.push('Keep the same room type and care tier when you compare this quote against a second provider.');
  } else if (result.anchorSource === 'monthly budget') {
    anchorTip.push('Use one written quote next so you can test whether your budget target is realistic.');
  } else {
    anchorTip.push('Home care becomes especially sensitive once daily hours increase, so run a higher-hour scenario too.');
  }

  if (result.budget) {
    const gap = result.budget - result.median;
    if (gap >= 0) {
      budgetStory.push(`Your current budget sits about ${currency(Math.abs(gap))} above the median monthly estimate.`);
      budgetStory.push('That buffer is useful for annual increases, care reassessments, and move-in fees.');
    } else {
      budgetStory.push(`Your current budget sits about ${currency(Math.abs(gap))} below the median monthly estimate.`);
      budgetStory.push('Use the state guide and a second scenario to decide whether the gap comes from location, care level, or room choice.');
    }
  } else {
    budgetStory.push('Add a monthly budget to turn this from a planning range into an affordability conversation.');
  }

  return {
    readiness: readiness.join(' '),
    anchorTip: anchorTip.join(' '),
    budgetStory: budgetStory.join(' ')
  };
};

const updateDistribution = (low, median, high) => {
  if (!resultsEls.distLow || !resultsEls.distMedian || !resultsEls.distHigh) return;
  const range = high - low || 1;
  const medianPos = ((median - low) / range) * 100;
  resultsEls.distLow.style.left = '0%';
  resultsEls.distMedian.style.left = `${medianPos}%`;
  resultsEls.distHigh.style.left = '100%';
};

const updateNextState = (abbr, careType) => {
  const meta = stateMetaMap[abbr];
  if (!meta || !nextStateCard.title) return;
  const careLabel = formatLabel(careType || 'assisted_living');
  nextStateCard.title.textContent = `${meta.name} cost guide`;
  if (nextStateCard.note) nextStateCard.note.textContent = `Use ${meta.name} context to pressure-test your ${careLabel.toLowerCase()} plan.`;
  if (nextStateCard.link) nextStateCard.link.href = `/state-costs/${meta.slug}/`;
  if (nextActionsCard.note) nextActionsCard.note.textContent = `Validate this estimate with ${meta.name} local context before you compare providers.`;
  if (nextActionsCard.link) {
    nextActionsCard.link.textContent = `${meta.name} guide`;
    nextActionsCard.link.href = `/state-costs/${meta.slug}/`;
  }
  if (cityCompareCard.note) cityCompareCard.note.textContent = `Compare ${meta.name} metros with the city table before you trust price gaps.`;
  if (cityCompareCard.link) {
    cityCompareCard.link.href = `/state-costs/${meta.slug}/#city-comparison`;
  }
};


const getBaseline = () => {
  try {
    const raw = localStorage.getItem('baseline');
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const setBaseline = (data) => {
  try {
    localStorage.setItem('baseline', JSON.stringify(data));
  } catch (error) {
    return;
  }
};

const updateComparison = (current) => {
  if (!compareTable) return;
  const baseline = getBaseline();
  if (!baseline) {
    compareStatus.textContent = 'No baseline saved yet.';
    return;
  }
  compareStatus.textContent = 'Baseline saved. Comparing with current.';
  compareEls.baselineMonth.textContent = currency(baseline.median);
  compareEls.baselineAnnual.textContent = currency(baseline.annual);
  compareEls.baselineGap.textContent = baseline.gapLabel === 'N/A' ? 'N/A' : baseline.gapLabel;
  compareEls.currentMonth.textContent = currency(current.median);
  compareEls.currentAnnual.textContent = currency(current.annual);
  compareEls.currentGap.textContent = current.gapLabel === 'N/A' ? 'N/A' : current.gapLabel;
  const deltaMonth = current.median - baseline.median;
  const deltaAnnual = current.annual - baseline.annual;
  if (compareEls.deltaMonth) {
    compareEls.deltaMonth.textContent = `${deltaMonth >= 0 ? '+' : '-'}${currency(Math.abs(deltaMonth))}`;
    compareEls.deltaMonth.classList.toggle('positive', deltaMonth <= 0);
    compareEls.deltaMonth.classList.toggle('negative', deltaMonth > 0);
  }
  if (compareEls.deltaAnnual) {
    compareEls.deltaAnnual.textContent = `${deltaAnnual >= 0 ? '+' : '-'}${currency(Math.abs(deltaAnnual))}`;
    compareEls.deltaAnnual.classList.toggle('positive', deltaAnnual <= 0);
    compareEls.deltaAnnual.classList.toggle('negative', deltaAnnual > 0);
  }
};

const buildParams = () => {
  const params = new URLSearchParams();
  if (stateSelect?.value) params.set('state', stateSelect.value);
  if (careTypeSelect?.value) params.set('type', careTypeSelect.value);
  if (careLevelSelect?.value) params.set('level', careLevelSelect.value);
  if (roomTypeSelect?.value) params.set('room', roomTypeSelect.value);
  if (locationSelect?.value) params.set('loc', locationSelect.value);
  if (budgetInput?.value) params.set('budget', budgetInput.value);
  if (baselineInput?.value) params.set('baseline', baselineInput.value);
  if (budgetRange?.value) params.set('budgetRange', budgetRange.value);
  if (hoursInput?.value) params.set('hours', hoursInput.value);
  if (hourlyInput?.value) params.set('hourly', hourlyInput.value);
  if (zipInput?.value) params.set('zip', zipInput.value);
  if (moveSelect?.value) params.set('move', moveSelect.value);
  if (inflationRange?.value) params.set('inflation', inflationRange.value);
  const amenities = getAmenities();
  if (amenities.length) params.set('amenities', amenities.join(','));
  return params;
};

const applyParams = () => {
  if (!window?.location?.search) return;
  const params = new URLSearchParams(window.location.search);
  if (params.has('state')) stateSelect.value = params.get('state');
  if (params.has('type')) careTypeSelect.value = params.get('type');
  if (params.has('level')) careLevelSelect.value = params.get('level');
  if (params.has('room')) roomTypeSelect.value = params.get('room');
  if (params.has('loc')) locationSelect.value = params.get('loc');
  if (params.has('budget')) budgetInput.value = params.get('budget');
  if (params.has('baseline') && baselineInput) baselineInput.value = params.get('baseline');
  if (params.has('budgetRange') && budgetRange) budgetRange.value = params.get('budgetRange');
  if (params.has('hours')) hoursInput.value = params.get('hours');
  if (params.has('hourly') && hourlyInput) hourlyInput.value = params.get('hourly');
  if (params.has('zip')) zipInput.value = params.get('zip');
  if (params.has('move') && moveSelect) moveSelect.value = params.get('move');
  if (params.has('inflation') && inflationRange) inflationRange.value = params.get('inflation');
  if (params.has('amenities')) {
    const values = params.get('amenities').split(',');
    document.querySelectorAll('[data-amenity]').forEach((input) => {
      input.checked = values.includes(input.value);
    });
  }
};

const render = () => {
  const result = compute();
  if (!result) return;

  const { state, careType, median, low, high, annual, affordability, careFit, budget, amenityWeight, inflation } = result;

  resultsEls.range.textContent = `${currency(low)} - ${currency(high)}`;
  animateValue(resultsEls.median, median);
  animateValue(resultsEls.annual, annual);
  animateValue(resultsEls.three, Math.round(annuityTotal(annual, inflation, 3)));
  animateValue(resultsEls.five, Math.round(annuityTotal(annual, inflation, 5)));
  resultsEls.affordability.textContent = affordability ? `${affordability}%` : 'N/A';
  resultsEls.careFit.textContent = `${Math.round(careFit)} / 100`;

  resultsEls.affordabilityBar.style.width = `${Math.min(affordability, 100)}%`;
  resultsEls.careFitBar.style.width = `${careFit}%`;

  let gapLabelText = 'N/A';
  if (budget) {
    const gap = budget - median;
    const gapLabel = gap >= 0 ? 'Budget surplus' : 'Budget gap';
    gapLabelText = `${gapLabel} ${gap < 0 ? '-' : ''}${currency(Math.abs(gap))}`;
    resultsEls.gapLabel.textContent = gapLabel;
    resultsEls.gap.textContent = `${gap < 0 ? '-' : ''}${currency(Math.abs(gap))}`;
  } else {
    resultsEls.gapLabel.textContent = 'Budget gap';
    resultsEls.gap.textContent = 'N/A';
  }

  const typeLabel = formatLabel(careType);
  const affordabilityLine = affordability ? `Your budget covers about ${affordability}% of the median monthly cost.` : 'Add a monthly budget to see affordability.';
  const anchorLine = result.anchorSource ? `Modeled from your ${result.anchorSource}. ` : '';
  resultsEls.analysis.textContent = `${anchorLine}The modeled ${typeLabel} range is ${currency(low)} to ${currency(high)} per month, with a median around ${currency(median)}.`;
  resultsEls.note.textContent = affordabilityLine;
  updateDistribution(low, median, high);

  resultsEls.driverCare.textContent = formatDelta((weights.careLevelWeight[result.careLevel] - 1) * 100);
  resultsEls.driverRoom.textContent = formatDelta((weights.roomWeight[result.roomType] - 1) * 100);
  resultsEls.driverLocation.textContent = formatDelta((weights.locationWeight[result.locationType] - 1) * 100);
  resultsEls.driverAmenities.textContent = formatDelta(amenityWeight * 100);

  const suggestions = buildSuggestions(result);
  resultsEls.suggestion1.textContent = suggestions[0];
  resultsEls.suggestion2.textContent = suggestions[1];
  resultsEls.suggestion3.textContent = suggestions[2];
  resultsEls.confidence.textContent = getConfidence(result);
  const stateName = stateMetaMap[result.state]?.name || result.state;
  if (workspaceEls.title) {
    workspaceEls.title.textContent = result.anchorSource ? `Working from your ${result.anchorSource}` : 'Set up a realistic baseline';
  }
  if (workspaceEls.note) {
    workspaceEls.note.textContent = result.baseline
      ? `This scenario is anchored to a real quote in ${stateName}. Save it as the baseline, then raise one variable at a time.`
      : `Use one written quote in ${stateName} to tighten this model, then compare one higher-care scenario before deciding.`;
  }
  if (resultsEls.status) {
    const status = `Estimate updated for ${stateName}.`;
    if (status !== lastStatus) {
      resultsEls.status.textContent = status;
      lastStatus = status;
    }
  }
  if (resultsEls.summaryState) resultsEls.summaryState.textContent = stateName;
  if (resultsEls.summaryType) resultsEls.summaryType.textContent = formatLabel(careType);
  if (resultsEls.summaryLevel) resultsEls.summaryLevel.textContent = formatLabel(result.careLevel);
  if (resultsEls.summaryRoom) resultsEls.summaryRoom.textContent = formatLabel(result.roomType);
  if (resultsEls.summaryLocation) resultsEls.summaryLocation.textContent = formatLabel(result.locationType);
  if (resultsEls.summaryMove) resultsEls.summaryMove.textContent = formatLabel(result.move || 'timeline');

  const risks = buildRisks(result);
  [resultsEls.risk1, resultsEls.risk2, resultsEls.risk3].forEach((el, idx) => {
    if (!el) return;
    el.textContent = risks[idx].text;
    el.classList.remove('alert', 'ok');
    if (risks[idx].type === 'alert') el.classList.add('alert');
    if (risks[idx].type === 'ok') el.classList.add('ok');
  });

  const analysis = buildAnalysis(result);
  const decisionStory = buildDecisionStory(result);
  if (resultsEls.aiAnalysis) {
    resultsEls.aiAnalysis.textContent = analysis;
  }
  if (resultsEls.readiness) resultsEls.readiness.textContent = decisionStory.readiness;
  if (resultsEls.anchorTip) resultsEls.anchorTip.textContent = decisionStory.anchorTip;
  if (resultsEls.budgetStory) resultsEls.budgetStory.textContent = decisionStory.budgetStory;

  updateReport(result, suggestions, risks, analysis);
  updateNextState(state, careType);
  updateComparison({
    median,
    annual,
    gapLabel: gapLabelText
  });

  if (curveBars.length) {
    const monthlyRate = inflation ? Math.pow(1 + inflation / 100, 1 / 12) - 1 : 0;
    const values = Array.from({ length: 12 }, (_, idx) => Math.round(median * Math.pow(1 + monthlyRate, idx)));
    const max = Math.max(...values, 1);
    curveBars.forEach((bar, idx) => {
      const height = Math.max(10, Math.round((values[idx] / max) * 100));
      bar.style.height = `${height}%`;
    });
  }

  const params = buildParams();
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
};

const updateReport = (result, suggestions, risks, analysis) => {
  if (!reportEls.container) return;
  reportEls.range.textContent = `${currency(result.low)} - ${currency(result.high)}`;
  reportEls.median.textContent = currency(result.median);
  reportEls.annual.textContent = currency(result.annual);
  reportEls.three.textContent = currency(Math.round(annuityTotal(result.annual, result.inflation, 3)));
  reportEls.five.textContent = currency(Math.round(annuityTotal(result.annual, result.inflation, 5)));
  if (reportEls.state) reportEls.state.textContent = result.state;
  if (reportEls.stateLink && stateMetaMap[result.state]) {
    reportEls.stateLink.textContent = stateMetaMap[result.state].name;
    reportEls.stateLink.href = `/state-costs/${stateMetaMap[result.state].slug}/`;
  }
  reportEls.type.textContent = formatLabel(result.careType);
  reportEls.level.textContent = formatLabel(result.careLevel);
  reportEls.room.textContent = formatLabel(result.roomType);
  reportEls.location.textContent = formatLabel(result.locationType);
  reportEls.move.textContent = formatLabel(result.move || 'timeline');
  reportEls.analysis.textContent = analysis;
  reportEls.suggestion1.textContent = suggestions[0];
  reportEls.suggestion2.textContent = suggestions[1];
  reportEls.suggestion3.textContent = suggestions[2];
  if (reportEls.affordability) {
    reportEls.affordability.textContent = result.affordability ? `${result.affordability}%` : 'N/A';
  }
  if (reportEls.careFit) {
    reportEls.careFit.textContent = `${Math.round(result.careFit)} / 100`;
  }
  if (reportEls.anchorNote) {
    const anchorText = result.anchorSource ? `Model anchor: ${result.anchorSource}.` : 'Model anchor: baseline quote.';
    reportEls.anchorNote.textContent = anchorText;
  }
  if (reportEls.gap || reportEls.gapLabel) {
    if (result.budget) {
      const gap = result.budget - result.median;
      const label = gap >= 0 ? 'Budget surplus' : 'Budget gap';
      if (reportEls.gapLabel) reportEls.gapLabel.textContent = label;
      if (reportEls.gap) reportEls.gap.textContent = `${gap < 0 ? '-' : ''}${currency(Math.abs(gap))}`;
    } else {
      if (reportEls.gapLabel) reportEls.gapLabel.textContent = 'Budget gap';
      if (reportEls.gap) reportEls.gap.textContent = 'N/A';
    }
  }
  [reportEls.risk1, reportEls.risk2, reportEls.risk3].forEach((el, idx) => {
    if (!el) return;
    el.textContent = risks[idx].text;
    el.classList.remove('alert', 'ok');
    if (risks[idx].type === 'alert') el.classList.add('alert');
    if (risks[idx].type === 'ok') el.classList.add('ok');
  });
};

const setupStepper = () => {
  const steps = Array.from(document.querySelectorAll('[data-step]'));
  const panels = Array.from(document.querySelectorAll('[data-step-panel]'));
  const nextButtons = document.querySelectorAll('[data-step-next]');
  const prevButtons = document.querySelectorAll('[data-step-prev]');
  const stepStatus = document.querySelector('[data-step-status]');
  let current = 0;
  let didInitFocus = false;

  const goNext = () => {
    if (!validateStep()) {
      focusInvalid();
      return;
    }
    if (current === panels.length - 1) {
      render();
      const report = document.querySelector('#report');
      if (report) report.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    current = Math.min(current + 1, panels.length - 1);
    renderSteps();
  };

  const goPrev = () => {
    current = Math.max(current - 1, 0);
    renderSteps();
  };

  const renderSteps = () => {
    if (stepStatus) stepStatus.textContent = `Step ${current + 1} of ${panels.length}`;
    steps.forEach((step, index) => step.classList.toggle('active', index <= current));
    panels.forEach((panel, index) => panel.classList.toggle('active', index === current));
    if (didInitFocus) {
      focusFirstField(panels[current]);
    }
    didInitFocus = true;
  };

  const focusInvalid = () => {
    const panel = panels[current];
    const invalid = panel?.querySelector('.is-invalid');
    if (invalid) {
      invalid.focus();
      return;
    }
    focusFirstField(panel);
  };

  const validateStep = () => {
    if (current === 1) return validateState();
    if (current === 3) return validateBudgetStep();
    return true;
  };

  nextButtons.forEach((btn) => {
    btn.addEventListener('click', goNext);
  });

  prevButtons.forEach((btn) => {
    btn.addEventListener('click', goPrev);
  });

  if (estimatorForm) {
    estimatorForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    estimatorForm.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      const blockedTypes = new Set(['checkbox', 'radio', 'range', 'button', 'submit']);
      if (blockedTypes.has(target.type)) return;
      event.preventDefault();
      goNext();
    });
  }

  renderSteps();
};

const syncCareLevel = () => {
  if (!careLevelRange || !careLevelSelect) return;
  const mapping = ['basic', 'moderate', 'high'];
  const labels = ['Basic', 'Moderate', 'High'];
  const index = Number(careLevelRange.value || 1);
  careLevelSelect.value = mapping[index] || 'moderate';
  if (careLevelLabel) {
    careLevelLabel.textContent = labels[index] || 'Moderate';
  }
};

const syncBudget = (value) => {
  if (budgetInput) budgetInput.value = value;
  if (budgetRange) budgetRange.value = value;
  if (budgetOutput) budgetOutput.textContent = currency(Number(value || 0));
};

const syncInflation = (value) => {
  if (inflationRange) inflationRange.value = value;
  if (inflationOutput) inflationOutput.textContent = `${Number(value).toFixed(1)}%`;
};

const toggleHomeCareFields = () => {
  if (!careTypeSelect) return;
  const isHomeCare = careTypeSelect.value === 'home_care';
  if (hoursField) hoursField.style.display = isHomeCare ? 'grid' : 'none';
  if (hourlyField) hourlyField.style.display = isHomeCare ? 'grid' : 'none';
  if (!isHomeCare && hourlyInput) hourlyInput.value = '';
  if (!isHomeCare) {
    if (hoursInput) setFieldError(hoursInput, errorEls.hours, '');
    if (hourlyInput) setFieldError(hourlyInput, errorEls.hourly, '');
  }
};

const applyProfile = (profile) => {
  if (!careTypeSelect || !careLevelSelect || !roomTypeSelect) return;
  const amenityInputs = document.querySelectorAll('[data-amenity]');

  const presets = {
    independent: {
      careType: 'assisted_living',
      careLevel: 'basic',
      roomType: 'shared',
      amenities: ['meals'],
      hours: 4
    },
    memory: {
      careType: 'memory_care',
      careLevel: 'high',
      roomType: 'private',
      amenities: ['meals', 'specialized'],
      hours: 6
    },
    inhome: {
      careType: 'home_care',
      careLevel: 'moderate',
      roomType: 'shared',
      amenities: ['transport'],
      hours: 8
    },
    nursing: {
      careType: 'nursing_home',
      careLevel: 'high',
      roomType: 'private',
      amenities: ['meals', 'specialized'],
      hours: 6
    }
  };

  const preset = presets[profile];
  if (!preset) return;

  careTypeSelect.value = preset.careType;
  careLevelSelect.value = preset.careLevel;
  roomTypeSelect.value = preset.roomType;
  if (hoursInput) hoursInput.value = preset.hours;

  amenityInputs.forEach((input) => {
    input.checked = preset.amenities.includes(input.value);
  });

  if (careLevelRange) {
    const map = { basic: 0, moderate: 1, high: 2 };
    careLevelRange.value = map[preset.careLevel];
  }
  syncCareLevel();
};

if (estimatorForm) {
  populateStates();
  applyParams();
  toggleHomeCareFields();
  estimatorForm.addEventListener('input', render);
  if (stateSelect) {
    stateSelect.addEventListener('change', () => {
      validateState();
      render();
    });
  }
  if (zipInput) {
    zipInput.addEventListener('input', validateZip);
    zipInput.addEventListener('blur', validateZip);
  }
  if (careTypeSelect) {
    careTypeSelect.addEventListener('change', () => {
      toggleHomeCareFields();
      validateBudgetStep({ showAnchor: false });
      render();
    });
  }
  if (careLevelRange) {
    careLevelRange.addEventListener('input', () => {
      syncCareLevel();
      render();
    });
    syncCareLevel();
  }
  if (budgetRange) {
    budgetRange.addEventListener('input', (event) => {
      syncBudget(event.target.value);
      render();
    });
  }
  if (budgetInput) {
    budgetInput.addEventListener('input', (event) => {
      syncBudget(event.target.value || 0);
      render();
    });
    budgetInput.addEventListener('blur', validateBudgetStep);
  }
  if (baselineInput) {
    baselineInput.addEventListener('blur', validateBudgetStep);
  }
  if (hoursInput) {
    hoursInput.addEventListener('blur', validateBudgetStep);
  }
  if (hourlyInput) {
    hourlyInput.addEventListener('blur', validateBudgetStep);
  }
  if (inflationRange) {
    inflationRange.addEventListener('input', (event) => {
      syncInflation(event.target.value);
      render();
    });
    syncInflation(inflationRange.value || 4);
  }
  profileButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      profileButtons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      applyProfile(btn.dataset.profile);
      toggleHomeCareFields();
      render();
    });
  });
  if (budgetOutput) {
    const initialBudget = budgetInput?.value || budgetRange?.value || 0;
    syncBudget(initialBudget);
  }
  if (inflationOutput && inflationRange) {
    syncInflation(inflationRange.value || 4);
  }
  const shareHandler = async (statusEl) => {
    const params = buildParams();
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      if (statusEl) statusEl.textContent = 'Link copied.';
    } catch (error) {
      if (statusEl) statusEl.textContent = 'Copy failed. Select the URL from the address bar.';
    }
  };
  if (shareButton) {
    shareButton.addEventListener('click', () => shareHandler(shareStatus));
  }
  if (shareReportButton) {
    shareReportButton.addEventListener('click', () => shareHandler(null));
  }
  if (saveBaselineButton) {
    saveBaselineButton.addEventListener('click', () => {
      const baseline = compute();
      if (!baseline) return;
      const gap = baseline.budget ? baseline.budget - baseline.median : 0;
      const gapLabel = baseline.budget ? `${gap >= 0 ? 'Budget surplus' : 'Budget gap'} ${gap < 0 ? '-' : ''}${currency(Math.abs(gap))}` : 'N/A';
      setBaseline({ median: baseline.median, annual: baseline.annual, gapLabel });
      if (compareStatus) compareStatus.textContent = 'Baseline saved. Adjust inputs to compare.';
      updateComparison({ median: baseline.median, annual: baseline.annual, gapLabel });
    });
  }
  if (reportEls.print) {
    reportEls.print.addEventListener('click', () => {
      window.print();
    });
  }
  if (insightButtons.length) {
    const setView = (view) => {
      insightButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.insightView === view));
      insightItems.forEach((item) => {
        item.style.display = item.dataset.insight === view ? 'flex' : 'none';
      });
    };
    insightButtons.forEach((btn) => {
      btn.addEventListener('click', () => setView(btn.dataset.insightView));
    });
    setView('beginner');
  }
  validateZip();
  validateState({ showError: false });
  validateBudgetStep({ showAnchor: false });
  render();
  setupStepper();
}

