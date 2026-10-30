import { NewsArticleItem } from '../types';

export const SAMPLE_EXPLORER_ARTICLES: NewsArticleItem[] = [
  {
    id: 'art-001',
    headline: 'Federal Reserve Holds Benchmark Interest Rate Steady Following Policy Meeting',
    summary: 'The central bank maintained its federal funds rate target range, citing persistent labor market resilience and measured progress toward its 2 percent inflation objective.',
    content: 'WASHINGTON (Reuters) - The Federal Reserve held its benchmark overnight interest rate steady in the 5.25%-5.50% range on Wednesday, as officials cited steady economic expansion and continuing progress on price stability. In a statement following the two-day Federal Open Market Committee meeting, policymakers confirmed that additional economic data will guide future policy recalibration.',
    category: 'Business',
    date: '2026-10-28',
    source: 'Reuters / Financial Bureau',
    label: 'REAL',
    confidence: 96,
    credibilityScore: 95,
    author: 'Jerome Miller, Senior Economics Reporter',
    keyPhrases: ['Federal Reserve', 'benchmark overnight interest rate', 'Federal Open Market Committee', 'economic data']
  },
  {
    id: 'art-002',
    headline: 'SHOCKING LEAK: Secret Miracle Plant Cures All Cancers in 48 Hours Mainstream Media Banned!',
    summary: 'Viral online claim asserts an obscure Amazonian root completely destroys all cancer cells within two days while pharmaceutical conglomerates suppress clinical trials.',
    content: 'Wake up people! An explosive undercover bombshell has just been leaked from inside an elite lab. A secret miracle root discovered deep in South America completely eradicates all malignant tumors within 48 hours guaranteed! Mainstream media and big pharma have banned all discussion because it destroys their profits. Share this urgent post before it gets taken down by government censors!',
    category: 'Health',
    date: '2026-10-26',
    source: 'Viral Telegram Channel / HealthAlertDaily',
    label: 'FAKE',
    confidence: 98,
    credibilityScore: 4,
    author: 'Anonymous Freedom Watcher',
    keyPhrases: ['miracle root', 'mainstream media banned', 'wake up people', 'bombshell leaked', 'guaranteed cure']
  },
  {
    id: 'art-003',
    headline: 'NASA James Webb Space Telescope Identifies Atmospheric Carbon Dioxide on Habitable-Zone Exoplanet',
    summary: 'Spectroscopic data published in Nature reveals clear biosignature molecular signatures in the atmosphere of exoplanet K2-18b, situated 120 light-years away.',
    content: 'BALTIMORE (Associated Press) - Astronomers utilizing the James Webb Space Telescope have detected spectral evidence of carbon-bearing molecules, including methane and carbon dioxide, in the atmosphere of sub-Neptune exoplanet K2-18b. The peer-reviewed findings, published Thursday in the journal Nature, provide unprecedented data regarding planetary atmospheres beyond our solar system, according to lead researcher Dr. Nikku Madhusudhan of Cambridge University.',
    category: 'Science',
    date: '2026-10-24',
    source: 'Associated Press / Nature Journal',
    label: 'REAL',
    confidence: 97,
    credibilityScore: 96,
    author: 'Elena Rostova, Space Science Correspondent',
    keyPhrases: ['James Webb Space Telescope', 'peer-reviewed findings', 'Nature journal', 'spectral evidence']
  },
  {
    id: 'art-004',
    headline: 'BOMBSHELL: Deep State Installs Microchips in New 6G Antennas to Control Human Brainwaves',
    summary: 'Unsubstantiated conspiratorial article claims telecommunication towers transmit mind control frequencies synchronized with neural implants.',
    content: 'Urgent warning to all citizens! Undeniable proof has emerged that government elites and the deep state are installing microscopic neuro-transmitters inside newly deployed 6G telecommunication towers. These transmitters allegedly broadcast resonant frequencies designed to induce panic and obedience. Insiders say this covert operation was authorized without public disclosure or oversight.',
    category: 'Technology',
    date: '2026-10-22',
    source: 'ConspiracyWatchNews.org',
    label: 'FAKE',
    confidence: 95,
    credibilityScore: 6,
    author: 'CyberPatriot99',
    keyPhrases: ['deep state', 'undeniable proof', 'mind control frequencies', 'urgent warning']
  },
  {
    id: 'art-005',
    headline: 'European Union Passes Landmark AI Safety and Algorithmic Transparency Legislation',
    summary: 'The European Parliament voted overwhelmingly to establish strict risk tiers for foundation models and prohibited high-risk biometric mass surveillance applications.',
    content: 'BRUSSELS (Reuters) - Lawmakers in the European Parliament formally ratified the European Union Artificial Intelligence Act on Tuesday, concluding more than two years of intense negotiations. The legislation institutes stringent disclosure mandates for general-purpose AI model developers and bans applications deemed an unacceptable threat to fundamental rights. European Commissioner Thierry Breton stated that the regulation balances innovation with constitutional safety.',
    category: 'Politics',
    date: '2026-10-20',
    source: 'Reuters / European Affairs',
    label: 'REAL',
    confidence: 94,
    credibilityScore: 93,
    author: 'Marc Van Der Berg',
    keyPhrases: ['European Parliament', 'Artificial Intelligence Act', 'European Commissioner', 'transparency legislation']
  },
  {
    id: 'art-006',
    headline: 'Hollywood Celebrity Arrested After Accusing Illuminati of Staging Olympic Games!',
    summary: 'Fabricated entertainment tabloid story alleges celebrity was detained backstage after wild accusations regarding the International Olympic Committee.',
    content: 'In an unbelievable turn of events, popular Hollywood star was reportedly handcuffed and escorted out of a red-carpet event after shouting that global sporting events are scripted occult rituals. Video footage allegedly suppressed on social platforms is rumored to exist. Neither the actor nor police representatives have issued any verified public acknowledgment.',
    category: 'Entertainment',
    date: '2026-10-18',
    source: 'GossipMatrix Insider',
    label: 'FAKE',
    confidence: 93,
    credibilityScore: 12,
    author: 'Tabloid Scoop Team',
    keyPhrases: ['unbelievable turn of events', 'suppressed footage', 'rumored to exist', 'illuminati staged']
  },
  {
    id: 'art-007',
    headline: 'International Olympic Committee Announces Host City Candidate Shortlist for 2036 Summer Games',
    summary: 'The executive board confirmed six National Olympic Committees have entered continuous dialogue phase for the 2036 Olympiad under reformed bidding protocols.',
    content: 'LAUSANNE, Switzerland (Associated Press) - The International Olympic Committee executive board on Thursday confirmed formal candidate cities participating in preliminary feasibility assessments for the 2036 Olympic and Paralympic Games. IOC President Thomas Bach highlighted that newly adopted sustainability requirements emphasize utilizing existing sports venues and reducing municipal expenditures.',
    category: 'Sports',
    date: '2026-10-15',
    source: 'Associated Press Sports Wire',
    label: 'REAL',
    confidence: 95,
    credibilityScore: 94,
    author: 'Graham Hughes',
    keyPhrases: ['International Olympic Committee', 'executive board', 'feasibility assessments', 'IOC President']
  },
  {
    id: 'art-008',
    headline: 'World Health Organization Declares Global Containment Milestone for Polio Eradication Campaign',
    summary: 'Surveillance data presented at the World Health Assembly indicates wild poliovirus transmission remains confined to historically low geographical pockets.',
    content: 'GENEVA (Reuters) - The Global Polio Eradication Initiative announced on Friday that sustained vaccination campaigns across Central Asia and East Africa have prevented an estimated 1.8 million cases of paralysis over the past decade. Independent technical advisory panels verified that wild poliovirus Type 2 and Type 3 remain eradicated globally, while transmission of Type 1 has dropped by over 90 percent.',
    category: 'World News',
    date: '2026-10-12',
    source: 'World Health Organization / Reuters',
    label: 'REAL',
    confidence: 96,
    credibilityScore: 97,
    author: 'Dr. Sarah Jenkins, Public Health Editor',
    keyPhrases: ['World Health Organization', 'Global Polio Eradication Initiative', 'surveillance data', 'vaccination campaigns']
  }
];

export const TEST_PRESETS = [
  {
    id: 'preset-real-tech',
    title: 'Technology (Real Journalistic)',
    category: 'Technology',
    headline: 'Quantum Computing Consortium Announces 1,000-Qubit Fault-Tolerant Logical Processor Architecture',
    content: 'SAN JOSE, Calif. (Reuters) - Researchers at the Quantum Systems Alliance announced on Thursday that they have demonstrated a fault-tolerant logical qubit processor utilizing surface-code error correction. In a paper published in the journal Physical Review X, the research team demonstrated an exponential reduction in physical error rates, marking a crucial milestone toward commercial quantum supremacy, according to lead scientist Dr. Raymond Vance.'
  },
  {
    id: 'preset-fake-health',
    title: 'Health (Fake Sensationalist)',
    category: 'Health',
    headline: 'SHOCKING BOMBSHELL: Ancient Himalayan Mineral Dissolves 30 Pounds of Belly Fat Overnight Without Exercise!',
    content: 'Wake up! Doctors are furious and big pharma is terrified because an obscure Himalayan mineral has just been exposed. This unbelievable secret compound burns 30 pounds of stubborn fat overnight while you sleep! Mainstream medical journals banned this information because it cures obesity permanently without pills or surgeries. Undeniable proof leaked from private clinical files guarantees 100% results!'
  },
  {
    id: 'preset-real-politics',
    title: 'Politics (Real Journalistic)',
    category: 'Politics',
    headline: 'Senate Committee Approves Bipartisan Cybersecurity Infrastructure Reauthorization Bill',
    content: 'WASHINGTON (Associated Press) - The Senate Homeland Security and Governmental Affairs Committee voted 12-2 on Wednesday to advance legislation bolstering federal cybersecurity defenses across municipal power grids and water treatment facilities. The bill allocates $450 million in technical grants and establishes mandatory 72-hour cyber incident reporting requirements for critical infrastructure operators.'
  },
  {
    id: 'preset-fake-politics',
    title: 'Politics (Fake Conspiracy)',
    category: 'Politics',
    headline: 'LEAKED DOCUMENTS: Shadow Cabal Secretly Replaced Entire Cabinet With Synthetic Clones!',
    content: 'In an urgent explosive report, anonymous whistleblowers have revealed leaked files confirming that prominent international leaders were quietly replaced by bio-synthetic clones during the private summit last month. The deep state is orchestrating a global takeover while mainstream media lies to the public. You won\'t believe the shocking evidence documented in these covert memos!'
  },
  {
    id: 'preset-real-business',
    title: 'Business (Real Press)',
    category: 'Business',
    headline: 'Global Semiconductor Shipments Rise 14% as Automotive and Data Center Demand Accelerates',
    content: 'TOKYO (Reuters) - Global semiconductor billings reached $53.1 billion during the third quarter, representing a 14.2% year-over-year increase, the Semiconductor Industry Association confirmed in a statement released on Tuesday. Industry analysts attributed the expansion to robust capital expenditure in generative artificial intelligence server hardware and advanced driver-assistance electronics.'
  }
];
