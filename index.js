    const MAX_GUESSES = 10;
    const MAX_HINTS = 3;
    const OST_UNLOCK_AT = 5;
    const DEFAULT_TMDB_KEY = '2dca580c2a14b55200e784d157207b4d';

    const Prefs = {
      palette: 'midnight',
      accent: 'gold',
      font: 'marquee',
      cinemaGlow: true,
      region: 'All',
      animeFormat: 'All',
      tmdbKeyOverride: '',
      geminiKeyOverride: ''
    };

    const MediaCache = { posters: {}, ratings: {}, entities: {} };
    const REGIONS_LIST = ['All', 'Hollywood', 'Bollywood', 'Kannada', 'Tamil', 'Telugu', 'Malayalam', 'Other International'];
    const ANIME_FORMATS_LIST = ['All', 'TV Series', 'Anime Movie'];

    const DB = {
      movies: [
        { id: 'tmdb_m_27205', tmdbId: 27205, title: 'Inception', year: 2010, region: 'Hollywood', genres: ['Action', 'Sci-Fi', 'Adventure'], grossM: 839, imdb: 8.8, letterboxd: 4.2, rated: 'PG-13', studio: 'Warner Bros.', director: 'Christopher Nolan', composer: 'Hans Zimmer', cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ken Watanabe', 'Tom Hardy', 'Elliot Page'], riddle: 'Architects of layered subconsciousness negotiate guilt across nested temporal realities.', taglineWords: ['Subconscious', 'Pendulum', 'Limbo', 'Architecture'], notes: [261.63, 261.63, 311.13, 261.63, 246.94, 246.94, 293.66, 246.94] },
        { id: 'tmdb_m_157336', tmdbId: 157336, title: 'Interstellar', year: 2014, region: 'Hollywood', genres: ['Sci-Fi', 'Drama', 'Adventure'], grossM: 731, imdb: 8.7, letterboxd: 4.4, rated: 'PG-13', studio: 'Paramount Pictures', director: 'Christopher Nolan', composer: 'Hans Zimmer', cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine', 'Matt Damon'], riddle: 'Gravity and parental devotion transcend relativistic time dilation across dying worlds.', taglineWords: ['Relativity', 'Horizon', 'Dustbowl', 'Tesseract'], notes: [329.63, 493.88, 329.63, 493.88, 349.23, 493.88, 392.00, 493.88] },
        { id: 'tmdb_m_155', tmdbId: 155, title: 'The Dark Knight', year: 2008, region: 'Hollywood', genres: ['Action', 'Crime', 'Drama', 'Thriller'], grossM: 1006, imdb: 9.0, letterboxd: 4.5, rated: 'PG-13', studio: 'Warner Bros.', director: 'Christopher Nolan', composer: 'Hans Zimmer', cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine', 'Gary Oldman'], riddle: 'An agent of pure anarchy tests the moral incorruptibility of a vigilante and a district attorney.', taglineWords: ['Escalation', 'Vigilante', 'Anarchy', 'Gotham'], notes: [220.00, 220.00, 261.63, 220.00, 196.00, 220.00, 246.94, 220.00] },
        { id: 'tmdb_m_2116', tmdbId: 2116, title: 'L.A. Confidential', year: 1997, region: 'Hollywood', genres: ['Crime', 'Mystery', 'Thriller', 'Drama'], grossM: 126, imdb: 8.2, letterboxd: 4.1, rated: 'R', studio: 'Warner Bros.', director: 'Curtis Hanson', composer: 'Jerry Goldsmith', cast: ['Kevin Spacey', 'Russell Crowe', 'Guy Pearce', 'Kim Basinger', 'Danny DeVito'], riddle: 'Three very different detectives uncover systemic corruption behind a late-night diner massacre.', taglineWords: ['Tabloid', 'Precinct', 'Glamour', 'Conspiracy'], notes: [261.63, 311.13, 392.00, 349.23, 311.13, 293.66, 261.63, 246.94] },
        { id: 'tmdb_m_67670', tmdbId: 67670, title: 'Upendra', year: 1999, region: 'Kannada', genres: ['Drama', 'Thriller'], grossM: 8, imdb: 8.6, letterboxd: 4.1, rated: 'UA', studio: 'Shilpa Srinivas', director: 'Upendra', composer: 'Gurukiran', cast: ['Upendra', 'Raveena Tandon', 'Prema', 'Damini', 'Arunachalam'], riddle: 'An arrogant protagonist personifying ego collides with three women representing love, wealth, and fame.', taglineWords: ['Ego', 'Symbolism', 'Allegory', 'Mirror'], notes: [293.66, 349.23, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63] },
        { id: 'tmdb_m_813258', tmdbId: 813258, title: 'Kantara', year: 2022, region: 'Kannada', genres: ['Action', 'Drama', 'Thriller'], grossM: 50, imdb: 8.2, letterboxd: 3.9, rated: 'UA', studio: 'Hombale Films', director: 'Rishab Shetty', composer: 'B. Ajaneesh Loknath', cast: ['Rishab Shetty', 'Sapthami Gowda', 'Kishore', 'Achyuth Kumar', 'Pramod Shetty'], riddle: 'Ancestral forest covenants collide with state land demarcation and feudal greed.', taglineWords: ['Folklore', 'Sanctuary', 'Trance', 'Covenant'], notes: [220.00, 261.63, 293.66, 329.63, 349.23, 329.63, 293.66, 220.00] },
        { id: 'tmdb_m_587412', tmdbId: 587412, title: 'K.G.F: Chapter 2', year: 2022, region: 'Kannada', genres: ['Action', 'Crime', 'Drama'], grossM: 155, imdb: 8.2, letterboxd: 3.6, rated: 'UA', studio: 'Hombale Films', director: 'Prashanth Neel', composer: 'Ravi Basrur', cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon', 'Srinidhi Shetty', 'Prakash Raj'], riddle: 'An empire forged in subterranean gold faces external warlords and federal crackdowns.', taglineWords: ['Bullion', 'Empire', 'Sovereignty', 'Vow'], notes: [196.00, 233.08, 261.63, 293.66, 261.63, 233.08, 196.00, 196.00] },
        { id: 'tmdb_m_20453', tmdbId: 20453, title: '3 Idiots', year: 2009, region: 'Bollywood', genres: ['Comedy', 'Drama'], grossM: 90, imdb: 8.4, letterboxd: 4.1, rated: 'UA', studio: 'Vinod Chopra Films', director: 'Rajkumar Hirani', composer: 'Shantanu Moitra', cast: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi', 'Kareena Kapoor', 'Boman Irani'], riddle: 'Rote memorization and parental pressure clash with joyful curiosity in an elite academy.', taglineWords: ['Curiosity', 'Brotherhood', 'Invention', 'Campus'], notes: [392.00, 440.00, 392.00, 329.63, 293.66, 329.63, 392.00, 523.25] },
        { id: 'tmdb_m_750830', tmdbId: 750830, title: 'Vikram', year: 2022, region: 'Tamil', genres: ['Action', 'Thriller', 'Crime'], grossM: 62, imdb: 8.3, letterboxd: 3.9, rated: 'UA', studio: 'Raaj Kamal Films', director: 'Lokesh Kanagaraj', composer: 'Anirudh Ravichander', cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil', 'Narain', 'Chemban Vinod'], riddle: 'A masked vigilante cell dismantles a syndicate while an investigator uncovers ghosts.', taglineWords: ['Syndicate', 'Ghost', 'Covert', 'Reckoning'], notes: [246.94, 293.66, 369.99, 329.63, 293.66, 246.94, 220.00, 246.94] },
        { id: 'tmdb_m_579974', tmdbId: 579974, title: 'RRR', year: 2022, region: 'Telugu', genres: ['Action', 'Drama'], grossM: 160, imdb: 7.8, letterboxd: 4.2, rated: 'UA', studio: 'DVV Entertainment', director: 'S. S. Rajamouli', composer: 'M. M. Keeravani', cast: ['N. T. Rama Rao Jr.', 'Ram Charan', 'Alia Bhatt', 'Ajay Devgn', 'Ray Stevenson'], riddle: 'Fire and water forge an unwitting brotherhood across opposing sides of colonial rule.', taglineWords: ['Brotherhood', 'Rebellion', 'Elemental', 'Oath'], notes: [293.66, 349.23, 440.00, 392.00, 349.23, 329.63, 293.66, 440.00] },
        { id: 'tmdb_m_1079605', tmdbId: 1079605, title: 'Manjummel Boys', year: 2024, region: 'Malayalam', genres: ['Adventure', 'Thriller', 'Drama'], grossM: 29, imdb: 8.2, letterboxd: 4.1, rated: 'U', studio: 'Parava Films', director: 'Chidambaram', composer: 'Sushin Shyam', cast: ['Soubin Shahir', 'Sreenath Bhasi', 'Balu Varghese', 'Ganapathi', 'Jean Paul Lal'], riddle: 'Childhood camaraderie becomes the sole lifeline when a holiday descends into a dark chasm.', taglineWords: ['Chasm', 'Camaraderie', 'Descent', 'Lifeline'], notes: [329.63, 349.23, 392.00, 349.23, 329.63, 293.66, 261.63, 329.63] },
        { id: 'tmdb_m_496243', tmdbId: 496243, title: 'Parasite', year: 2019, region: 'Other International', genres: ['Thriller', 'Drama', 'Comedy'], grossM: 263, imdb: 8.5, letterboxd: 4.6, rated: 'R', studio: 'CJ Entertainment', director: 'Bong Joon-ho', composer: 'Jung Jae-il', cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik', 'Park So-dam'], riddle: 'Class stratification turns symbiotic infiltration into a violent collision of basements and glass.', taglineWords: ['Stratification', 'Subterranean', 'Symbiosis', 'Monsoon'], notes: [392.00, 369.99, 329.63, 293.66, 329.63, 369.99, 392.00, 440.00] }
      ],
      tv: [
        { id: 'tmdb_tv_1396', tmdbId: 1396, title: 'Breaking Bad', year: 2008, seasons: 5, genres: ['Drama', 'Crime', 'Thriller'], imdb: 9.5, letterboxd: 4.7, rated: 'TV-MA', network: 'AMC', creator: 'Vince Gilligan', composer: 'Dave Porter', cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris', 'Bob Odenkirk'], riddle: 'A terminal diagnosis catalyzes a prideful transformation from mild educator to ruthless kingpin.', taglineWords: ['Synthesis', 'Empire', 'Hubris', 'Desert'], notes: [220.00, 261.63, 246.94, 220.00, 196.00, 220.00, 293.66, 220.00] },
        { id: 'tmdb_tv_95396', tmdbId: 95396, title: 'Severance', year: 2022, seasons: 2, genres: ['Drama', 'Mystery', 'Sci-Fi & Fantasy'], imdb: 8.7, letterboxd: 4.4, rated: 'TV-MA', network: 'Apple TV+', creator: 'Dan Erickson', composer: 'Theodore Shapiro', cast: ['Adam Scott', 'Zach Cherry', 'Britt Lower', 'Tramell Tillman', 'John Turturro'], riddle: 'Surgically partitioned memories create two trapped halves of the same person in sterile hallways.', taglineWords: ['Partition', 'Elevator', 'Outie', 'Refinement'], notes: [261.63, 311.13, 293.66, 261.63, 246.94, 261.63, 392.00, 311.13] },
        { id: 'tmdb_tv_70523', tmdbId: 70523, title: 'Dark', year: 2017, seasons: 3, genres: ['Crime', 'Drama', 'Sci-Fi & Fantasy', 'Mystery'], imdb: 8.7, letterboxd: 4.5, rated: 'TV-MA', network: 'Netflix', creator: 'Baran bo Odar', composer: 'Ben Frost', cast: ['Louis Hofmann', 'Lisa Vicari', 'Maja Schöne', 'Oliver Masucci', 'Jördis Triebel'], riddle: 'Four interconnected families confront deterministic cycles spanning thirty-three-year intervals.', taglineWords: ['Labyrinth', 'Cycle', 'Bootstrap', 'Wind'], notes: [220.00, 246.94, 261.63, 246.94, 220.00, 196.00, 220.00, 164.81] },
        { id: 'tmdb_tv_1399', tmdbId: 1399, title: 'Game of Thrones', year: 2011, seasons: 8, genres: ['Sci-Fi & Fantasy', 'Drama', 'Action & Adventure'], imdb: 9.2, letterboxd: 4.2, rated: 'TV-MA', network: 'HBO', creator: 'David Benioff', composer: 'Ramin Djawadi', cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage', 'Lena Headey', 'Nikolaj Coster-Waldau'], riddle: 'Noble houses bleed for an iron seat while an ancient winter marches south.', taglineWords: ['Succession', 'Winter', 'Oaths', 'Dragons'], notes: [392.00, 261.63, 311.13, 349.23, 392.00, 261.63, 311.13, 349.23] },
        { id: 'tmdb_tv_66732', tmdbId: 66732, title: 'Stranger Things', year: 2016, seasons: 5, genres: ['Drama', 'Mystery', 'Sci-Fi & Fantasy'], imdb: 8.7, letterboxd: 4.0, rated: 'TV-14', network: 'Netflix', creator: 'The Duffer Brothers', composer: 'Kyle Dixon', cast: ['Winona Ryder', 'David Harbour', 'Millie Bobby Brown', 'Finn Wolfhard', 'Gaten Matarazzo'], riddle: 'Small-town adolescents confront a shadowy mirror dimension opened by Cold War experiments.', taglineWords: ['Synthwave', 'Shadow', 'Telekinesis', 'Hawkins'], notes: [261.63, 329.63, 392.00, 493.88, 523.25, 493.88, 392.00, 329.63] },
        { id: 'tmdb_tv_76331', tmdbId: 76331, title: 'Succession', year: 2018, seasons: 4, genres: ['Drama', 'Comedy'], imdb: 8.8, letterboxd: 4.6, rated: 'TV-MA', network: 'HBO', creator: 'Jesse Armstrong', composer: 'Nicholas Britell', cast: ['Brian Cox', 'Jeremy Strong', 'Sarah Snook', 'Kieran Culkin', 'Matthew Macfadyen'], riddle: 'Poisonous sibling rivalry spirals around an aging patriarch’s global media empire.', taglineWords: ['Conglomerate', 'Patriarch', 'Boardroom', 'Dynasty'], notes: [261.63, 311.13, 392.00, 415.30, 392.00, 349.23, 311.13, 293.66] }
      ],
      anime: [
        { id: 'tmdb_an_tv_1429', tmdbId: 1429, title: 'Attack on Titan', year: 2013, format: 'TV Series', episodes: 94, genres: ['Action & Adventure', 'Drama', 'Sci-Fi & Fantasy'], mal: 8.55, crunchyroll: 4.9, rated: 'TV-MA', studio: 'WIT Studio / MAPPA', director: 'Tetsuro Araki', composer: 'Hiroyuki Sawano', leadCast: ['Yuki Kaji', 'Yui Ishikawa'], supportCast: ['Marina Inoue', 'Hiroshi Kamiya'], riddle: 'Concentric stone walls protect humanity until the truth outside turns freedom into tragedy.', taglineWords: ['Walls', 'Freedom', 'Cycle', 'Horizon'], notes: [293.66, 329.63, 349.23, 440.00, 392.00, 349.23, 329.63, 293.66] },
        { id: 'tmdb_an_tv_13916', tmdbId: 13916, title: 'Death Note', year: 2006, format: 'TV Series', episodes: 37, genres: ['Mystery', 'Sci-Fi & Fantasy', 'Drama'], mal: 8.62, crunchyroll: 4.8, rated: 'TV-14', studio: 'Madhouse', director: 'Tetsuro Araki', composer: 'Yoshihisa Hirano', leadCast: ['Mamoru Miyano', 'Kappei Yamaguchi'], supportCast: ['Aya Hirano', 'Naoya Uchida'], riddle: 'An intellectual cat-and-mouse duel tests whether absolute justice corrupts its self-appointed judge.', taglineWords: ['Ledger', 'Deduction', 'Hubris', 'Alias'], notes: [329.63, 392.00, 493.88, 440.00, 392.00, 369.99, 329.63, 293.66] },
        { id: 'tmdb_an_tv_37854', tmdbId: 37854, title: 'Fullmetal Alchemist: Brotherhood', year: 2009, format: 'TV Series', episodes: 64, genres: ['Action & Adventure', 'Animation', 'Sci-Fi & Fantasy'], mal: 9.09, crunchyroll: 4.9, rated: 'TV-14', studio: 'Bones', director: 'Yasuhiro Irie', composer: 'Akira Senju', leadCast: ['Romi Park', 'Rie Kugimiya'], supportCast: ['Shinichiro Miki', 'Kenji Utsumi'], riddle: 'Two brothers pay a bodily price for forbidden transmutation and uncover a nation-wide conspiracy.', taglineWords: ['Equivalence', 'Alchemy', 'Armor', 'Philosopher'], notes: [293.66, 369.99, 440.00, 493.88, 440.00, 369.99, 329.63, 293.66] },
        { id: 'tmdb_an_m_372058', tmdbId: 372058, title: 'Your Name', year: 2016, format: 'Anime Movie', episodes: null, genres: ['Romance', 'Drama', 'Animation'], mal: 8.83, crunchyroll: 4.9, rated: 'PG', studio: 'CoMix Wave Films', director: 'Makoto Shinkai', composer: 'RADWIMPS', leadCast: ['Ryunosuke Kamiki', 'Mone Kamishiraishi'], supportCast: ['Ryo Narita', 'Aoi Yuki'], riddle: 'Twilight bridges two lives separated by geography and an unseen offset in the calendar.', taglineWords: ['Twilight', 'Comet', 'Thread', 'Memory'], notes: [392.00, 440.00, 493.88, 587.33, 493.88, 440.00, 392.00, 329.63] },
        { id: 'tmdb_an_m_129', tmdbId: 129, title: 'Spirited Away', year: 2001, format: 'Anime Movie', episodes: null, genres: ['Adventure', 'Fantasy', 'Family'], mal: 8.77, crunchyroll: 4.9, rated: 'PG', studio: 'Studio Ghibli', director: 'Hayao Miyazaki', composer: 'Joe Hisaishi', leadCast: ['Rumi Hiiragi', 'Miyu Irino'], supportCast: ['Mari Natsuki', 'Bunta Sugawara'], riddle: 'Identity and resilience survive a realm of excess where forgetting your name means servitude.', taglineWords: ['Bathhouse', 'Identity', 'Spirits', 'Train'], notes: [392.00, 440.00, 392.00, 329.63, 392.00, 523.25, 493.88, 440.00] },
        { id: 'tmdb_an_m_635302', tmdbId: 635302, title: 'Demon Slayer: Mugen Train', year: 2020, format: 'Anime Movie', episodes: null, genres: ['Action', 'Adventure', 'Fantasy'], mal: 8.56, crunchyroll: 4.9, rated: 'R', studio: 'ufotable', director: 'Haruo Sotozaki', composer: 'Yuki Kajiura', leadCast: ['Natsuki Hanae', 'Satoshi Hino'], supportCast: ['Akari Kito', 'Akira Ishida'], riddle: 'Lucid dream traps test warriors’ resolve aboard a speeding nocturnal locomotive.', taglineWords: ['Locomotive', 'Slumber', 'Flame', 'Duty'], notes: [349.23, 440.00, 493.88, 523.25, 493.88, 440.00, 392.00, 349.23] }
      ]
    };

    const ROTATING_TIPS = [
      { title: 'Direction Arrows', body: 'Yellow tiles on Year, Box Office, and Ratings include a direction arrow.', leftIcon: '↑', leftText: 'The answer is a <strong>higher</strong> number', rightIcon: '↓', rightText: 'The answer is a <strong>lower</strong> number' },
      { title: 'Verified IMDb, Letterboxd & Anime Scores', body: 'Cross-checks IMDb & Letterboxd for Movies/TV, or MyAnimeList & Crunchyroll for Anime via Google Search.', leftIcon: '★', leftText: 'Green means exact match within <strong>±0.1</strong>', rightIcon: '●', rightText: 'Yellow shows <strong>↑ / ↓</strong> proximity' },
      { title: 'Box Office & Age Certification', body: 'Movies compare worldwide Box Office Gross and MPAA/CBFC age ratings (PG-13, R, U, UA).', leftIcon: '🟩', leftText: 'Exact <strong>Rated</strong> badge or Gross within ±$12M', rightIcon: '🟨', rightText: 'Gross within <strong>±$100M</strong> shows arrow' },
      { title: 'Menu, Filters & Google AI Clues', body: 'Open the top-left menu (☰) to switch between Movies, TV Series & Anime, or ask Google AI inside Hints.', leftIcon: '💡', leftText: 'Ask <strong>Google Search AI</strong> inside Hints', rightIcon: '🔊', rightText: 'Unlock <strong>12s OST</strong> motif on Guess 5' }
    ];

    const state = {
      category: 'movies',
      playMode: 'endless',
      region: 'All',
      animeFormat: 'All',
      target: null,
      guesses: [],
      revealedHints: [],
      lastHintGuessCount: -1,
      ostUnlocked: false,
      gameOver: false,
      won: false,
      tipIndex: 0,
      timerSecondsLeft: 90,
      timerInterval: null,
      searchResults: [],
      highlightedIndex: -1,
      stats: { played: 0, won: 0, streak: 0, maxStreak: 0 }
    };

    function normalizeStr(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
    function indexSafeId(id) { return String(id || '').replace(/[^a-zA-Z0-9_]/g, '_'); }
    function getMonogram(title) {
      const words = String(title || '?').trim().split(/\s+/);
      return words.length === 1 ? words[0].slice(0, 2).toUpperCase() : (words[0][0] + words[1][0]).toUpperCase();
    }
    function namesMatch(a, b) {
      const na = normalizeStr(a), nb = normalizeStr(b);
      return Boolean(na && nb && (na === nb || na.includes(nb) || nb.includes(na)));
    }
    function formatGross(grossM) {
      if (grossM === null || grossM === undefined || Number.isNaN(Number(grossM))) return 'Checking...';
      const val = Number(grossM);
      return val >= 1000 ? `$${(val / 1000).toFixed(2)}B` : `$${Math.round(val)}M`;
    }
    function compareGross(g, t) {
      if (g === null || g === undefined || t === null || t === undefined) return { cls: 'miss', arrow: '' };
      const diff = Math.abs(g - t);
      if (diff <= Math.max(12, t * 0.08)) return { cls: 'exact', arrow: '' };
      return { cls: diff <= Math.max(100, t * 0.35) ? 'close' : 'miss', arrow: g < t ? ' ↑' : ' ↓' };
    }
    function compareNum(g, t, windowVal, decimals = 0) {
      if (g === null || g === undefined || t === null || t === undefined) return { cls: 'miss', arrow: '' };
      const diff = Number((g - t).toFixed(decimals));
      if (Math.abs(diff) <= (decimals > 0 ? 0.1 : 0)) return { cls: 'exact', arrow: '' };
      return { cls: Math.abs(diff) <= windowVal ? 'close' : 'miss', arrow: g < t ? ' ↑' : ' ↓' };
    }

    let toastTimer = null;
    function showToast(msg) {
      const el = document.getElementById('studioToast');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
    }
    function openModal(id) { document.getElementById(id)?.classList.add('open'); }
    function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

    const GoogleSearchVerifier = (() => {
      const inFlight = new Map();

      async function callGeminiWithSearch(userQuery, maxRetries = 3) {
        const apiKey = Prefs.geminiKeyOverride || '';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: userQuery }] }], tools: [{ google_search: {} }] };

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
          try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (response.status === 429 || response.status >= 500) {
              if (attempt < maxRetries) { await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000)); continue; }
              return null;
            }
            if (!response.ok) return null;
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
            return { text };
          } catch (_) {
            if (attempt < maxRetries) { await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000)); continue; }
            return null;
          }
        }
        return null;
      }

      async function verifyTitleRatings(item, cat) {
        if (!item) return null;
        const cacheKey = `${cat}_${item.id}`;
        if (MediaCache.ratings[cacheKey]?.verified) return MediaCache.ratings[cacheKey];
        if (inFlight.has(cacheKey)) return await inFlight.get(cacheKey);

        const task = (async () => {
          let prompt = '';
          if (cat === 'movies') {
            prompt = `Use Google Search to verify the current IMDb rating (out of 10), Letterboxd rating (out of 5), worldwide box office gross in millions USD, and MPAA/CBFC age rating for the movie "${item.title}" (${item.year || ''}).
Reply strictly in this exact 5-line format:
IMDB: <number or N/A>
LETTERBOXD: <number or N/A>
GROSS_M: <number in millions or N/A>
RATED: <certification or N/A>
NOTE: <one concise verified sentence>`;
          } else if (cat === 'tv') {
            prompt = `Use Google Search to verify the current IMDb rating (out of 10) and Letterboxd rating (out of 5, or N/A) for the TV series "${item.title}" (${item.year || ''}).
Reply strictly in this exact 3-line format:
IMDB: <number or N/A>
LETTERBOXD: <number or N/A>
NOTE: <one concise verified sentence>`;
          } else {
            prompt = `Use Google Search to verify the current MyAnimeList (MAL) score (out of 10) and Crunchyroll star rating (out of 5) for the anime "${item.title}" (${item.year || ''}).
Reply strictly in this exact 3-line format:
MAL: <number or N/A>
CRUNCHYROLL: <number or N/A>
NOTE: <one concise verified sentence>`;
          }

          const res = await callGeminiWithSearch(prompt, 3);
          const parsed = {
            verified: false,
            imdb: typeof item.imdb === 'number' ? item.imdb : null,
            letterboxd: typeof item.letterboxd === 'number' ? item.letterboxd : null,
            mal: typeof item.mal === 'number' ? item.mal : null,
            crunchyroll: typeof item.crunchyroll === 'number' ? item.crunchyroll : null,
            grossM: typeof item.grossM === 'number' ? item.grossM : null,
            rated: item.rated || null,
            note: 'Cross-checked with Google Search.'
          };

          if (res?.text) {
            parsed.verified = true;
            const imdbM = res.text.match(/IMDB:\s*([0-9]+(?:\.[0-9]+)?)/i);
            const lbM = res.text.match(/LETTERBOXD:\s*([0-9]+(?:\.[0-9]+)?)/i);
            const malM = res.text.match(/MAL:\s*([0-9]+(?:\.[0-9]+)?)/i);
            const crM = res.text.match(/CRUNCHYROLL:\s*([0-9]+(?:\.[0-9]+)?)/i);
            const grossM = res.text.match(/GROSS_M:\s*([0-9]+(?:\.[0-9]+)?)/i);
            const ratedM = res.text.match(/RATED:\s*([A-Z0-9\-+]+)/i);
            const noteM = res.text.match(/NOTE:\s*(.+)/i);

            if (imdbM) { const v = parseFloat(imdbM[1]); if (v > 0 && v <= 10) parsed.imdb = Number(v.toFixed(1)); }
            if (lbM) { const v = parseFloat(lbM[1]); if (v > 0 && v <= 5) parsed.letterboxd = Number(v.toFixed(1)); }
            if (malM) { const v = parseFloat(malM[1]); if (v > 0 && v <= 10) parsed.mal = Number(v.toFixed(2)); }
            if (crM) { const v = parseFloat(crM[1]); if (v > 0 && v <= 5) parsed.crunchyroll = Number(v.toFixed(1)); }
            if (grossM) { const v = parseFloat(grossM[1]); if (v > 0) parsed.grossM = Math.round(v); }
            if (ratedM && ratedM[1].toUpperCase() !== 'N/A') parsed.rated = ratedM[1].trim().toUpperCase();
            if (noteM) parsed.note = noteM[1].trim();
          }

          if (parsed.imdb !== null) item.imdb = parsed.imdb;
          if (parsed.letterboxd !== null) item.letterboxd = parsed.letterboxd;
          if (parsed.mal !== null) item.mal = parsed.mal;
          if (parsed.crunchyroll !== null) item.crunchyroll = parsed.crunchyroll;
          if (parsed.grossM !== null && (!item.grossM || item.grossM === 0)) item.grossM = parsed.grossM;
          if (parsed.rated) item.rated = parsed.rated;

          MediaCache.ratings[cacheKey] = parsed;
          inFlight.delete(cacheKey);
          return parsed;
        })();

        inFlight.set(cacheKey, task);
        return await task;
      }

      async function generateGroundedClue(target, cat) {
        if (!target) return null;
        const prompt = `You are a trivia host for a guessing game. The secret ${cat} answer is "${target.title}" (${target.year || ''}). Use Google Search to find one interesting, accurate, spoiler-free trivia clue. CRITICAL: Do NOT include the title "${target.title}" or any direct words from the title in your clue. Keep it under 24 words.`;
        const res = await callGeminiWithSearch(prompt, 2);
        return res?.text ? res.text.trim() : (target.riddle || null);
      }

      return { verifyTitleRatings, generateGroundedClue };
    })();

    const LANG_TO_REGION = { en: 'Hollywood', hi: 'Bollywood', kn: 'Kannada', ta: 'Tamil', te: 'Telugu', ml: 'Malayalam' };
    function getActiveTmdbKey() { return Prefs.tmdbKeyOverride || DEFAULT_TMDB_KEY; }

    async function fetchPosterForSeedItem(item, cat) {
      const cacheKey = `${cat}_${item.id}`;
      if (MediaCache.posters[cacheKey]) return MediaCache.posters[cacheKey];
      try {
        if (item.tmdbId) {
          const isTv = cat === 'tv' || (cat === 'anime' && item.format === 'TV Series');
          const endpoint = isTv ? 'tv' : 'movie';
          const res = await fetch(`https://api.themoviedb.org/3/${endpoint}/${item.tmdbId}?api_key=${getActiveTmdbKey()}`);
          if (res.ok) {
            const data = await res.json();
            if (data.poster_path) {
              const url = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
              MediaCache.posters[cacheKey] = url;
              return url;
            }
          }
        }
      } catch (_) {}
      return null;
    }

    async function searchLiveCatalog(queryStr, cat) {
      const q = queryStr.trim();
      if (q.length < 2) return [];
      const key = getActiveTmdbKey();
      try {
        if (cat === 'movies') {
          const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(q)}&include_adult=false`);
          if (!res.ok) return [];
          const data = await res.json();
          return (data.results || []).slice(0, 6).map(m => ({
            isRemote: true, cat: 'movies', tmdbId: m.id, id: `tmdb_m_${m.id}`, title: m.title,
            year: m.release_date ? Number(m.release_date.slice(0, 4)) : 2020,
            sub: `${m.release_date ? m.release_date.slice(0, 4) : 'Movie'} • ${LANG_TO_REGION[m.original_language] || 'Cinema'}`
          }));
        }
        if (cat === 'tv') {
          const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${encodeURIComponent(q)}&include_adult=false`);
          if (!res.ok) return [];
          const data = await res.json();
          return (data.results || []).slice(0, 6).map(t => ({
            isRemote: true, cat: 'tv', tmdbId: t.id, id: `tmdb_tv_${t.id}`, title: t.name,
            year: t.first_air_date ? Number(t.first_air_date.slice(0, 4)) : 2020,
            sub: `${t.first_air_date ? t.first_air_date.slice(0, 4) : 'Series'} • TV Series`
          }));
        }
        if (cat === 'anime') {
          const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${encodeURIComponent(q)}&include_adult=false`);
          if (!res.ok) return [];
          const data = await res.json();
          return (data.results || [])
            .filter(x => (x.media_type === 'tv' || x.media_type === 'movie') && (x.original_language === 'ja' || (x.genre_ids || []).includes(16)))
            .slice(0, 6)
            .map(a => {
              const isMovie = a.media_type === 'movie';
              const yr = (isMovie ? a.release_date : a.first_air_date || '').slice(0, 4);
              return {
                isRemote: true, cat: 'anime', mediaType: a.media_type, tmdbId: a.id,
                id: `tmdb_an_${a.media_type}_${a.id}`, title: isMovie ? a.title : a.name,
                year: yr ? Number(yr) : 2018,
                sub: `${yr || 'Anime'} • ${isMovie ? 'Anime Movie' : 'TV Series'}`
              };
            });
        }
      } catch (_) {}
      return [];
    }

    async function resolveSelectedEntity(candidate) {
      if (!candidate.isRemote) return candidate;
      if (MediaCache.entities[candidate.id]) return MediaCache.entities[candidate.id];

      const key = getActiveTmdbKey();
      if (candidate.cat === 'movies') {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${candidate.tmdbId}?api_key=${key}&append_to_response=credits,release_dates`);
        if (!res.ok) return null;
        const data = await res.json();
        const year = data.release_date ? Number(data.release_date.slice(0, 4)) : 2020;
        const genres = (data.genres || []).map(g => g.name).slice(0, 3);
        const crew = data.credits?.crew || [];
        const castArr = data.credits?.cast || [];
        const dirObj = crew.find(c => c.job === 'Director');
        const compObj = crew.find(c => c.job === 'Original Music Composer' || c.job === 'Music');
        const studio = data.production_companies?.[0]?.name || 'Independent Studio';
        let rated = 'UA';
        const relResults = data.release_dates?.results || [];
        const usRel = relResults.find(r => r.iso_3166_1 === 'US') || relResults.find(r => r.iso_3166_1 === 'IN');
        const cert = usRel?.release_dates?.find(d => d.certification)?.certification;
        if (cert) rated = cert;
        const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w342${data.poster_path}` : null;
        if (posterUrl) MediaCache.posters[`movies_${candidate.id}`] = posterUrl;
        const tmdbAvg = data.vote_average ? Number(data.vote_average.toFixed(1)) : 7.5;
        const revMillions = data.revenue && data.revenue > 0 ? Math.max(1, Math.round(data.revenue / 1000000)) : null;

        const entity = {
          id: candidate.id, tmdbId: Number(candidate.tmdbId), title: data.title, year,
          region: LANG_TO_REGION[data.original_language] || 'Other International',
          genres: genres.length ? genres : ['Drama'], grossM: revMillions, imdb: tmdbAvg,
          letterboxd: Number((tmdbAvg / 2).toFixed(1)), rated, studio,
          director: dirObj ? dirObj.name : 'Director', composer: compObj ? compObj.name : 'Original Score',
          cast: castArr.length ? castArr.slice(0, 5).map(c => c.name) : ['Lead Cast'],
          riddle: data.overview ? data.overview.slice(0, 120) + '...' : 'A notable feature film.',
          taglineWords: genres.length ? genres : ['Cinema', 'Feature'],
          notes: [293.66, 349.23, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63]
        };
        MediaCache.entities[candidate.id] = entity;
        return entity;
      }

      if (candidate.cat === 'tv') {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${candidate.tmdbId}?api_key=${key}&append_to_response=credits,content_ratings`);
        if (!res.ok) return null;
        const data = await res.json();
        const year = data.first_air_date ? Number(data.first_air_date.slice(0, 4)) : 2020;
        const genres = (data.genres || []).map(g => g.name).slice(0, 3);
        const castArr = data.credits?.cast || [];
        const creator = data.created_by?.[0]?.name || 'Showrunner';
        const network = data.networks?.[0]?.name || 'Streaming';
        const ratingObj = (data.content_ratings?.results || []).find(r => r.iso_3166_1 === 'US');
        const rated = ratingObj?.rating || 'TV-14';
        const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w342${data.poster_path}` : null;
        if (posterUrl) MediaCache.posters[`tv_${candidate.id}`] = posterUrl;
        const tmdbAvg = data.vote_average ? Number(data.vote_average.toFixed(1)) : 8.0;

        const entity = {
          id: candidate.id, tmdbId: Number(candidate.tmdbId), title: data.name, year,
          seasons: data.number_of_seasons || 1, genres: genres.length ? genres : ['Drama'],
          imdb: tmdbAvg, letterboxd: Number((tmdbAvg / 2).toFixed(1)), rated, network, creator,
          composer: 'Series Score', cast: castArr.length ? castArr.slice(0, 5).map(c => c.name) : ['Lead Cast'],
          riddle: data.overview ? data.overview.slice(0, 120) + '...' : 'An acclaimed television series.',
          taglineWords: genres.length ? genres : ['Series', 'Drama'],
          notes: [261.63, 311.13, 392.00, 349.23, 311.13, 293.66, 261.63, 246.94]
        };
        MediaCache.entities[candidate.id] = entity;
        return entity;
      }

      if (candidate.cat === 'anime') {
        const isMovie = candidate.mediaType === 'movie';
        const endpoint = isMovie ? 'movie' : 'tv';
        const res = await fetch(`https://api.themoviedb.org/3/${endpoint}/${candidate.tmdbId}?api_key=${key}&append_to_response=credits`);
        if (!res.ok) return null;
        const data = await res.json();
        const title = isMovie ? data.title : data.name;
        const rawDate = isMovie ? data.release_date : data.first_air_date;
        const year = rawDate ? Number(rawDate.slice(0, 4)) : 2018;
        const genres = (data.genres || []).map(g => g.name).slice(0, 3);
        const crew = data.credits?.crew || [];
        const castArr = data.credits?.cast || [];
        const dirObj = crew.find(c => c.job === 'Director');
        const compObj = crew.find(c => c.job === 'Original Music Composer' || c.job === 'Music');
        const studio = data.production_companies?.[0]?.name || 'Anime Studio';
        const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w342${data.poster_path}` : null;
        if (posterUrl) MediaCache.posters[`anime_${candidate.id}`] = posterUrl;
        const tmdbAvg = data.vote_average ? Number(data.vote_average.toFixed(1)) : 8.2;

        const entity = {
          id: candidate.id, tmdbId: Number(candidate.tmdbId), title, year,
          format: isMovie ? 'Anime Movie' : 'TV Series',
          episodes: isMovie ? null : (data.number_of_episodes || 24),
          genres: genres.length ? genres : ['Animation'], mal: tmdbAvg,
          crunchyroll: Number(Math.min(5, Math.max(3.8, tmdbAvg / 2 + 0.5)).toFixed(1)),
          rated: isMovie ? 'PG-13' : 'TV-14', studio,
          director: dirObj ? dirObj.name : 'Anime Director', composer: compObj ? compObj.name : 'Anime Score',
          leadCast: castArr.slice(0, 2).map(c => c.name), supportCast: castArr.slice(2, 4).map(c => c.name),
          riddle: data.overview ? data.overview.slice(0, 120) + '...' : 'A renowned anime title.',
          taglineWords: genres.length ? genres : ['Anime', 'Animation'],
          notes: [392.00, 440.00, 493.88, 587.33, 493.88, 440.00, 392.00, 329.63]
        };
        MediaCache.entities[candidate.id] = entity;
        return entity;
      }
      return null;
    }

    const OstAudio = (() => {
      let ctx = null, timerIds = [];
      function stop() {
        timerIds.forEach(id => clearTimeout(id));
        timerIds = [];
        document.getElementById('ostEqBars')?.classList.remove('playing');
        const lbl = document.getElementById('ostStatusLabel');
        if (lbl) lbl.textContent = '12s Mystery Theme Synth Ready';
      }
      function play(notes) {
        stop();
        const seq = Array.isArray(notes) && notes.length ? notes : [261.63, 329.63, 392.00, 523.25];
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (!ctx) ctx = new AudioCtx();
          if (ctx.state === 'suspended') ctx.resume();
          document.getElementById('ostEqBars')?.classList.add('playing');
          const lbl = document.getElementById('ostStatusLabel');
          if (lbl) lbl.textContent = 'Playing 12s Melodic Theme...';
          const stepSec = 0.72, totalSteps = 16;
          for (let i = 0; i < totalSteps; i++) {
            const freq = seq[i % seq.length];
            const startTime = ctx.currentTime + i * stepSec;
            const osc = ctx.createOscillator(), gain = ctx.createGain();
            osc.type = i % 2 === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + stepSec * 0.92);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(startTime); osc.stop(startTime + stepSec);
          }
          timerIds.push(setTimeout(stop, totalSteps * stepSec * 1000 + 150));
        } catch (_) { showToast('Audio playback blocked by browser.'); }
      }
      return { play, stop };
    })();

    function getFilteredPool(cat = state.category) {
      const list = DB[cat] || [];
      if (cat === 'movies' && state.region !== 'All') {
        const f = list.filter(m => m.region === state.region);
        return f.length ? f : list;
      }
      if (cat === 'anime' && state.animeFormat !== 'All') {
        const f = list.filter(a => a.format === state.animeFormat);
        return f.length ? f : list;
      }
      return list;
    }

    function stopTimer() { if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; } }
    function updateTimerUi() {
      const el = document.getElementById('timerDisplay');
      if (!el) return;
      const mins = Math.floor(Math.max(0, state.timerSecondsLeft) / 60);
      const secs = Math.max(0, state.timerSecondsLeft) % 60;
      el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      el.classList.toggle('urgent', state.timerSecondsLeft <= 15);
    }
    function startTimer() {
      stopTimer();
      const inputVal = Number(document.getElementById('customSecondsInput')?.value || 90);
      state.timerSecondsLeft = Math.max(15, Math.min(900, inputVal || 90));
      updateTimerUi();
      state.timerInterval = setInterval(() => {
        if (state.gameOver || state.playMode !== 'timelimit') { stopTimer(); return; }
        state.timerSecondsLeft--;
        updateTimerUi();
        if (state.timerSecondsLeft <= 0) { stopTimer(); finishRound(false, '⏱️ Time expired!'); }
      }, 1000);
    }

    function canTriggerHint() {
      if (state.gameOver || state.guesses.length < 2 || state.revealedHints.length >= MAX_HINTS) return false;
      return state.lastHintGuessCount !== state.guesses.length;
    }
    function canTriggerOst() { return !state.gameOver && state.guesses.length >= (OST_UNLOCK_AT - 1); }

    function buildClueOptions(target, cat) {
      if (!target) return [];
      const opts = [
        { id: 'clue_riddle', title: '🎭 Spoiler-Free Plot Riddle', desc: 'Reveals an abstract thematic clue without naming the title', value: target.riddle || 'A memorable entry in its genre.' },
        { id: 'clue_tags', title: '🏷️ Thematic Keywords', desc: 'Reveals 3–4 defining motifs associated with the target', value: (target.taglineWords || target.genres || []).join(' • ') }
      ];
      if (cat === 'movies') opts.push({ id: 'clue_crew', title: '🎬 Region & Composer', desc: 'Reveals the cinema industry region and music composer', value: `${target.region} Cinema • Score by ${target.composer}` });
      else if (cat === 'tv') opts.push({ id: 'clue_crew', title: '📺 Network & Composer', desc: 'Reveals the broadcast/streaming network and composer', value: `${target.network} • Music by ${target.composer}` });
      else opts.push({ id: 'clue_crew', title: '⛩️ Animation Studio & Composer', desc: 'Reveals the production studio and soundtrack composer', value: `${target.studio} • Score by ${target.composer}` });
      return opts;
    }

    function startNewRound(forcedTarget = null) {
      OstAudio.stop(); stopTimer();
      const pool = getFilteredPool(state.category);
      let nextTarget = forcedTarget;
      if (!nextTarget) {
        const candidates = pool.filter(x => !state.target || x.id !== state.target.id);
        const pickFrom = candidates.length ? candidates : pool;
        nextTarget = pickFrom[Math.floor(Math.random() * pickFrom.length)];
      }
      state.target = nextTarget;
      state.guesses = [];
      state.revealedHints = [];
      state.lastHintGuessCount = -1;
      state.ostUnlocked = false;
      state.gameOver = false;
      state.won = false;
      state.searchResults = [];
      state.highlightedIndex = -1;
      if (state.playMode === 'timelimit') startTimer();
      GoogleSearchVerifier.verifyTitleRatings(state.target, state.category);
      renderAll();
    }

    function submitGuess(item) {
      if (!item || state.gameOver) return;
      if (state.guesses.some(g => g.id === item.id || normalizeStr(g.title) === normalizeStr(item.title))) {
        showToast('Already guessed this title!'); return;
      }
      state.guesses.push(item);
      if (state.guesses.length >= (OST_UNLOCK_AT - 1)) state.ostUnlocked = true;
      const isWin = item.id === state.target.id || normalizeStr(item.title) === normalizeStr(state.target.title);
      if (isWin) finishRound(true);
      else if (state.guesses.length >= MAX_GUESSES) finishRound(false);
      else renderAll();
    }

    function finishRound(won, customReason = null) {
      state.gameOver = true; state.won = won; stopTimer();
      state.stats.played++;
      if (won) { state.stats.won++; state.stats.streak++; state.stats.maxStreak = Math.max(state.stats.maxStreak, state.stats.streak); }
      else state.stats.streak = 0;
      renderAll();
      openSummaryModal(customReason);
    }

    function formatShortPersonName(fullName) {
      const clean = String(fullName || '—').trim();
      const parts = clean.split(/\s+/);
      return parts.length <= 1 ? clean : `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
    }

    function renderCastStrip(groups) {
      return `<div class="card-credits-footer">${groups.map((grp, gIdx) => `
        ${gIdx > 0 ? '<div class="credit-divider-v"></div>' : ''}
        <div class="credit-group ${grp.grow ? 'grow' : ''}">
          <div class="credit-group-title">${grp.heading}</div>
          <div class="credit-avatars-row">
            ${grp.people.map(p => `<div class="person-node ${p.cls}"><div class="person-avatar-circle">${getMonogram(p.name)}</div><div class="person-short-name">${formatShortPersonName(p.name)}</div></div>`).join('')}
          </div>
        </div>
      `).join('')}</div>`;
    }

    function renderGuessCard(item, index) {
      const target = state.target, cat = state.category;
      const isExactWin = normalizeStr(item.title) === normalizeStr(target.title) && item.id === target.id;
      const cardUid = `${index}_${indexSafeId(item.id)}`;
      const posterDomId = `g_poster_${cardUid}`, ratingsTileId = `g_ratings_${cardUid}`, grossTileId = `g_gross_${cardUid}`, ratedTileId = `g_rated_${cardUid}`;

      const card = document.createElement('article');
      card.className = `spotle-card${isExactWin ? ' exact-win' : ''}`;
      const targetGenresNorm = (target.genres || []).map(normalizeStr);
      const genrePillsHtml = (item.genres || []).map(g => `<span class="genre-chip ${targetGenresNorm.includes(normalizeStr(g)) ? 'exact' : ''}">${g}</span>`).join('');

      let tilesHtml = '', peopleHtml = '';
      if (cat === 'movies') {
        const yCmp = compareNum(item.year, target.year, 4);
        const gCmp = compareGross(item.grossM, target.grossM);
        const imdbCmp = compareNum(item.imdb, target.imdb, 0.5, 1);
        const lbCmp = compareNum(item.letterboxd, target.letterboxd, 0.3, 1);
        const ratingCls = (imdbCmp.cls === 'exact' || lbCmp.cls === 'exact') ? 'exact' : (imdbCmp.cls === 'close' || lbCmp.cls === 'close') ? 'close' : '';
        const ratedExact = normalizeStr(item.rated) === normalizeStr(target.rated);
        const studioExact = namesMatch(item.studio, target.studio);

        tilesHtml = `<div class="reference-tiles-grid">
          <div class="s-tile ${yCmp.cls}"><div class="s-tile-lbl">Year</div><div class="s-tile-val">${item.year}${yCmp.arrow}</div></div>
          <div class="s-tile ${gCmp.cls}" id="${grossTileId}"><div class="s-tile-lbl">Box Office</div><div class="s-tile-val">${formatGross(item.grossM)}${item.grossM ? gCmp.arrow : ''}</div></div>
          <div class="s-tile span-2-rows ${studioExact ? 'exact' : ''}"><div class="s-tile-lbl">Studio</div><div class="studio-emblem-badge">${getMonogram(item.studio)}</div><div class="s-tile-val" style="font-size: 0.74rem;">${item.studio}</div></div>
          <div class="s-tile ${ratedExact ? 'exact' : ''}" id="${ratedTileId}"><div class="s-tile-lbl">Rated</div><div class="s-tile-val">${item.rated || 'UA'}</div></div>
          <div class="s-tile ${ratingCls}" id="${ratingsTileId}"><div class="s-tile-lbl">Ratings</div><div class="dual-rating-stack"><span>IMDb ★ ${item.imdb || '—'}${imdbCmp.arrow}</span><span>LB ● ${item.letterboxd || '—'}${lbCmp.arrow}</span></div></div>
        </div>`;

        const castArr = item.cast || [];
        peopleHtml = renderCastStrip([
          { heading: 'Director', people: [{ name: item.director, cls: namesMatch(item.director, target.director) ? 'exact' : '' }] },
          { heading: 'Lead Actor', people: [{ name: castArr[0] || '—', cls: (target.cast || []).some(tc => namesMatch(castArr[0], tc)) ? 'exact' : '' }] },
          { heading: 'Supporting Cast', grow: true, people: castArr.slice(1, 5).map(c => ({ name: c, cls: (target.cast || []).some(tc => namesMatch(c, tc)) ? 'exact' : '' })) }
        ]);
      } else if (cat === 'tv') {
        const yCmp = compareNum(item.year, target.year, 3);
        const snCmp = compareNum(item.seasons, target.seasons, 1);
        const ratedExact = normalizeStr(item.rated) === normalizeStr(target.rated);
        const imdbCmp = compareNum(item.imdb, target.imdb, 0.5, 1);
        const lbCmp = compareNum(item.letterboxd, target.letterboxd, 0.3, 1);
        const ratingCls = (imdbCmp.cls === 'exact' || lbCmp.cls === 'exact') ? 'exact' : (imdbCmp.cls === 'close' || lbCmp.cls === 'close') ? 'close' : '';
        const netExact = namesMatch(item.network, target.network);

        tilesHtml = `<div class="reference-tiles-grid">
          <div class="s-tile ${yCmp.cls}"><div class="s-tile-lbl">Year</div><div class="s-tile-val">${item.year}${yCmp.arrow}</div></div>
          <div class="s-tile ${snCmp.cls}"><div class="s-tile-lbl">Seasons</div><div class="s-tile-val">${item.seasons} Szn${snCmp.arrow}</div></div>
          <div class="s-tile span-2-rows ${netExact ? 'exact' : ''}"><div class="s-tile-lbl">Network</div><div class="studio-emblem-badge">${getMonogram(item.network)}</div><div class="s-tile-val" style="font-size: 0.74rem;">${item.network}</div></div>
          <div class="s-tile ${ratedExact ? 'exact' : ''}"><div class="s-tile-lbl">Rated</div><div class="s-tile-val">${item.rated || 'TV-14'}</div></div>
          <div class="s-tile ${ratingCls}" id="${ratingsTileId}"><div class="s-tile-lbl">Ratings</div><div class="dual-rating-stack"><span>IMDb ★ ${item.imdb || '—'}${imdbCmp.arrow}</span><span>LB ● ${item.letterboxd || 'N/A'}${item.letterboxd ? lbCmp.arrow : ''}</span></div></div>
        </div>`;

        const castArr = item.cast || [];
        peopleHtml = renderCastStrip([
          { heading: 'Creator', people: [{ name: item.creator, cls: namesMatch(item.creator, target.creator) ? 'exact' : '' }] },
          { heading: 'Lead Cast', people: [{ name: castArr[0] || '—', cls: (target.cast || []).some(tc => namesMatch(castArr[0], tc)) ? 'exact' : '' }] },
          { heading: 'Supporting Cast', grow: true, people: castArr.slice(1, 5).map(c => ({ name: c, cls: (target.cast || []).some(tc => namesMatch(c, tc)) ? 'exact' : '' })) }
        ]);
      } else {
        const fmtExact = item.format === target.format;
        const yCmp = compareNum(item.year, target.year, 3);
        const ratedExact = normalizeStr(item.rated) === normalizeStr(target.rated);
        const malCmp = compareNum(item.mal, target.mal, 0.4, 2);
        const crCmp = compareNum(item.crunchyroll, target.crunchyroll, 0.3, 1);
        const ratingCls = (malCmp.cls === 'exact' || crCmp.cls === 'exact') ? 'exact' : (malCmp.cls === 'close' || crCmp.cls === 'close') ? 'close' : '';
        const studioExact = normalizeStr(item.studio) === normalizeStr(target.studio);
        const studioClose = !studioExact && namesMatch(item.studio, target.studio);

        let lenVal = item.format === 'Anime Movie' ? 'Movie' : `${item.episodes} Eps`;
        let lenCls = fmtExact ? 'exact' : '';
        if (item.format === 'TV Series' && target.format === 'TV Series') {
          const c = compareNum(item.episodes, target.episodes, 12);
          lenCls = c.cls; lenVal = `${item.episodes} Eps${c.arrow}`;
        }

        tilesHtml = `<div class="reference-tiles-grid">
          <div class="s-tile ${yCmp.cls}"><div class="s-tile-lbl">Year</div><div class="s-tile-val">${item.year}${yCmp.arrow}</div></div>
          <div class="s-tile ${lenCls}"><div class="s-tile-lbl">Format</div><div class="s-tile-val">${lenVal}</div></div>
          <div class="s-tile span-2-rows ${studioExact ? 'exact' : studioClose ? 'close' : ''}"><div class="s-tile-lbl">Studio</div><div class="studio-emblem-badge">${getMonogram(item.studio)}</div><div class="s-tile-val" style="font-size: 0.74rem;">${item.studio}</div></div>
          <div class="s-tile ${ratedExact ? 'exact' : ''}"><div class="s-tile-lbl">Rated</div><div class="s-tile-val">${item.rated || 'PG-13'}</div></div>
          <div class="s-tile ${ratingCls}" id="${ratingsTileId}"><div class="s-tile-lbl">Anime Scores</div><div class="dual-rating-stack"><span>MAL ★ ${item.mal || '—'}${malCmp.arrow}</span><span>CR 🟠 ${item.crunchyroll || '—'}${crCmp.arrow}</span></div></div>
        </div>`;

        const targetLeads = target.leadCast || [], targetSup = target.supportCast || [];
        peopleHtml = renderCastStrip([
          { heading: 'Director', people: [{ name: item.director, cls: namesMatch(item.director, target.director) ? 'exact' : '' }] },
          { heading: 'Composer', people: [{ name: item.composer, cls: namesMatch(item.composer, target.composer) ? 'exact' : '' }] },
          { heading: 'Voice Cast', grow: true, people: [
            ...(item.leadCast || []).slice(0, 2).map(v => ({ name: v, cls: targetLeads.some(x => namesMatch(v, x)) ? 'exact' : '' })),
            ...(item.supportCast || []).slice(0, 2).map(v => ({ name: v, cls: targetSup.some(x => namesMatch(v, x)) ? 'exact' : '' }))
          ] }
        ]);
      }

      card.innerHTML = `<div class="card-upper-split">
        <div class="media-poster-box" id="${posterDomId}">${getMonogram(item.title)}</div>
        <div class="card-right-main">
          <div><div class="card-entity-title">${item.title}</div><div class="genre-pills-row">${genrePillsHtml}</div></div>
          ${tilesHtml}
        </div>
      </div>${peopleHtml}`;

      fetchPosterForSeedItem(item, cat).then(url => {
        const box = card.querySelector(`#${posterDomId}`);
        if (!box || !url) return;
        const img = document.createElement('img'); img.src = url; img.alt = item.title;
        img.onerror = () => { box.textContent = getMonogram(item.title); };
        box.innerHTML = ''; box.appendChild(img);
      });

      GoogleSearchVerifier.verifyTitleRatings(item, cat).then(info => {
        if (!info) return;
        const ratingBox = card.querySelector(`#${ratingsTileId}`);
        if ((cat === 'movies' || cat === 'tv') && ratingBox) {
          const imdbCmp = compareNum(info.imdb, target.imdb, 0.5, 1);
          const lbCmp = compareNum(info.letterboxd, target.letterboxd, 0.3, 1);
          const ratingCls = (imdbCmp.cls === 'exact' || lbCmp.cls === 'exact') ? 'exact' : (imdbCmp.cls === 'close' || lbCmp.cls === 'close') ? 'close' : '';
          ratingBox.className = `s-tile ${ratingCls}`;
          ratingBox.innerHTML = `<div class="s-tile-lbl">Ratings</div><div class="dual-rating-stack"><span>IMDb ★ ${info.imdb || 'N/A'}${info.imdb ? imdbCmp.arrow : ''}</span><span>LB ● ${info.letterboxd || 'N/A'}${info.letterboxd ? lbCmp.arrow : ''}</span></div>`;
        } else if (cat === 'anime' && ratingBox) {
          const malCmp = compareNum(info.mal, target.mal, 0.4, 2);
          const crCmp = compareNum(info.crunchyroll, target.crunchyroll, 0.3, 1);
          const ratingCls = (malCmp.cls === 'exact' || crCmp.cls === 'exact') ? 'exact' : (malCmp.cls === 'close' || crCmp.cls === 'close') ? 'close' : '';
          ratingBox.className = `s-tile ${ratingCls}`;
          ratingBox.innerHTML = `<div class="s-tile-lbl">Anime Scores</div><div class="dual-rating-stack"><span>MAL ★ ${info.mal || 'N/A'}${info.mal ? malCmp.arrow : ''}</span><span>CR 🟠 ${info.crunchyroll || 'N/A'}${info.crunchyroll ? crCmp.arrow : ''}</span></div>`;
        }
        const grossBox = card.querySelector(`#${grossTileId}`);
        if (grossBox && cat === 'movies') {
          const gCmp = compareGross(item.grossM, target.grossM);
          grossBox.className = `s-tile ${gCmp.cls}`;
          grossBox.innerHTML = `<div class="s-tile-lbl">Box Office</div><div class="s-tile-val">${formatGross(item.grossM)}${item.grossM ? gCmp.arrow : ''}</div>`;
        }
        const ratedBox = card.querySelector(`#${ratedTileId}`);
        if (ratedBox && cat === 'movies' && item.rated) {
          ratedBox.className = `s-tile ${normalizeStr(item.rated) === normalizeStr(target.rated) ? 'exact' : ''}`;
          ratedBox.innerHTML = `<div class="s-tile-lbl">Rated</div><div class="s-tile-val">${item.rated}</div>`;
        }
      });

      return card;
    }

    function renderFilterPoolSlots() {
      const filterSec = document.getElementById('filterMenuSection');
      const slot01Label = document.getElementById('slot01Label');
      const slot01Status = document.getElementById('slot01Status');
      const slot01Pills = document.getElementById('slot01Pills');

      if (state.category === 'movies') {
        filterSec.style.display = 'flex';
        slot01Label.textContent = 'Cinema Region';
        slot01Status.textContent = state.region;
        slot01Pills.innerHTML = REGIONS_LIST.map(r => `<button class="mini-filter-pill ${state.region === r ? 'active' : ''}" data-region-pill="${r}">${r}</button>`).join('');
        slot01Pills.querySelectorAll('[data-region-pill]').forEach(btn => {
          btn.addEventListener('click', () => {
            state.region = btn.getAttribute('data-region-pill');
            Prefs.region = state.region;
            startNewRound();
            showToast(`🎬 Region Pool: ${state.region}`);
          });
        });
      } else if (state.category === 'anime') {
        filterSec.style.display = 'flex';
        slot01Label.textContent = 'Anime Format';
        slot01Status.textContent = state.animeFormat;
        slot01Pills.innerHTML = ANIME_FORMATS_LIST.map(f => `<button class="mini-filter-pill ${state.animeFormat === f ? 'active' : ''}" data-format-pill="${f}">${f}</button>`).join('');
        slot01Pills.querySelectorAll('[data-format-pill]').forEach(btn => {
          btn.addEventListener('click', () => {
            state.animeFormat = btn.getAttribute('data-format-pill');
            Prefs.animeFormat = state.animeFormat;
            startNewRound();
            showToast(`⛩️ Anime Format: ${state.animeFormat}`);
          });
        });
      } else {
        filterSec.style.display = 'none';
      }
    }

    function renderTipCarousel() {
      const tip = ROTATING_TIPS[state.tipIndex % ROTATING_TIPS.length];
      document.getElementById('tipHeadingText').textContent = tip.title;
      document.getElementById('tipBodyText').textContent = tip.body;
      document.getElementById('tipLegendGrid').innerHTML = `
        <div class="tip-legend-item"><span>${tip.leftIcon}</span><span>${tip.leftText}</span></div>
        <div class="tip-legend-item"><span>${tip.rightIcon}</span><span>${tip.rightText}</span></div>
      `;
    }

    function renderAll() {
      document.getElementById('categorySelect').value = state.category;
      document.getElementById('playModeSelect').value = state.playMode;

      const placeholders = { movies: 'Search for a movie...', tv: 'Search for a TV series...', anime: 'Search for an anime...' };
      const searchInput = document.getElementById('mainSearchInput');
      searchInput.placeholder = placeholders[state.category] || 'Search...';
      searchInput.disabled = state.gameOver;

      let activeFilterCount = 0;
      if (state.category === 'movies' && state.region !== 'All') activeFilterCount++;
      if (state.category === 'anime' && state.animeFormat !== 'All') activeFilterCount++;
      const filterChip = document.getElementById('filterActiveChip');
      filterChip.style.display = activeFilterCount > 0 ? 'inline-flex' : 'none';
      filterChip.textContent = activeFilterCount;

      const filterTag = document.getElementById('filterMenuSummaryTag');
      if (filterTag) filterTag.textContent = state.category === 'movies' ? state.region : state.animeFormat;

      document.getElementById('timerBarPanel').classList.toggle('active', state.playMode === 'timelimit');
      document.getElementById('btnViewRoundSummary').style.display = state.gameOver ? 'inline-flex' : 'none';

      const currentGuessNum = state.gameOver ? state.guesses.length : Math.min(MAX_GUESSES, state.guesses.length + 1);
      const headerEl = document.getElementById('spotleGuessHeader');
      headerEl.innerHTML = state.won ? `Solved in <span class="accent-num">${state.guesses.length}</span> of 10` : state.gameOver ? `Round Over (<span class="accent-num">${state.guesses.length}</span> of 10)` : `Guess <span class="accent-num">${currentGuessNum}</span> of 10`;

      document.getElementById('btnHintTrigger').disabled = state.gameOver;
      document.getElementById('hintBtnLabel').textContent = `Hints (${state.revealedHints.length}/${MAX_HINTS})`;
      document.getElementById('ostPlayerPanel').classList.toggle('active', state.ostUnlocked);
      document.getElementById('btnGiveUp').disabled = state.gameOver;

      renderFilterPoolSlots();

      const cluesBanner = document.getElementById('revealedCluesBanner');
      if (state.revealedHints.length > 0) {
        cluesBanner.classList.add('active');
        cluesBanner.innerHTML = state.revealedHints.map(h => `<div class="clue-item-line"><span class="clue-item-tag">${h.title}</span><span>${h.value}</span></div>`).join('');
      } else {
        cluesBanner.classList.remove('active');
        cluesBanner.innerHTML = '';
      }

      const stack = document.getElementById('guessStack');
      stack.innerHTML = '';
      for (let i = state.guesses.length - 1; i >= 0; i--) stack.appendChild(renderGuessCard(state.guesses[i], i));

      document.getElementById('guessSegmentsBar').innerHTML = Array.from({ length: MAX_GUESSES }, (_, idx) => {
        let cls = 'guess-seg';
        if (idx < state.guesses.length) {
          const g = state.guesses[idx];
          cls += (g.id === state.target.id || normalizeStr(g.title) === normalizeStr(state.target.title)) ? ' won' : ' done';
        } else if (idx === state.guesses.length && !state.gameOver) cls += ' active';
        return `<span class="${cls}"></span>`;
      }).join('');

      renderTipCarousel();
    }

    let searchDebounce = null;
    function renderAutocompleteDropdown() {
      const dd = document.getElementById('searchDropdown');
      if (!state.searchResults.length) { dd.classList.remove('open'); dd.innerHTML = ''; return; }
      dd.innerHTML = state.searchResults.map((item, idx) => {
        const subText = item.sub || (state.category === 'movies' ? `${item.year} • ${item.region} • ${item.director}` : state.category === 'tv' ? `${item.year} • ${item.network} • ${item.seasons} Szn` : `${item.year} • ${item.format} • ${item.studio}`);
        return `<div class="ac-row ${idx === state.highlightedIndex ? 'highlighted' : ''}" data-ac-idx="${idx}">
          <div><div class="ac-row-title">${item.title}</div><div class="ac-row-sub">${subText}</div></div>
          <span class="ac-row-badge">${item.isRemote ? 'TMDB Live' : 'Featured'}</span>
        </div>`;
      }).join('');
      dd.classList.add('open');
      dd.querySelectorAll('.ac-row').forEach(row => {
        row.addEventListener('click', async () => {
          const picked = state.searchResults[Number(row.getAttribute('data-ac-idx'))];
          if (!picked) return;
          dd.classList.remove('open');
          document.getElementById('mainSearchInput').value = '';
          const resolved = await resolveSelectedEntity(picked);
          if (resolved) submitGuess(resolved);
        });
      });
    }

    function handleSearchInput(val) {
      const q = val.trim();
      if (!q) { state.searchResults = []; state.highlightedIndex = -1; renderAutocompleteDropdown(); return; }
      const nq = normalizeStr(q);
      state.searchResults = (DB[state.category] || []).filter(item => normalizeStr(item.title).includes(nq)).slice(0, 8);
      state.highlightedIndex = state.searchResults.length ? 0 : -1;
      renderAutocompleteDropdown();

      clearTimeout(searchDebounce);
      if (q.length >= 2) {
        searchDebounce = setTimeout(async () => {
          const remote = await searchLiveCatalog(q, state.category);
          const seen = new Set(state.searchResults.map(x => normalizeStr(x.title)));
          const merged = [...state.searchResults];
          for (const r of remote) { if (!seen.has(normalizeStr(r.title))) { seen.add(normalizeStr(r.title)); merged.push(r); } }
          state.searchResults = merged.slice(0, 8);
          renderAutocompleteDropdown();
        }, 260);
      }
    }

    function openSummaryModal(customReason = null) {
      const t = state.target;
      document.getElementById('summaryHeadline').textContent = state.won ? `🎉 Solved in ${state.guesses.length} of ${MAX_GUESSES}!` : (customReason || `🎬 Mystery Revealed (${state.guesses.length}/${MAX_GUESSES})`);
      const detailLine = state.category === 'movies'
        ? `${t.year} • ${t.region} • Rated ${t.rated} • Box Office: ${formatGross(t.grossM)} • IMDb ★ ${t.imdb}/10 • Letterboxd ● ${t.letterboxd}/5`
        : state.category === 'tv'
        ? `${t.year} • ${t.network} • ${t.seasons} Seasons • IMDb ★ ${t.imdb}/10 • Letterboxd ● ${t.letterboxd || 'N/A'}/5`
        : `${t.year} • ${t.format} • ${t.studio} • MyAnimeList ★ ${t.mal}/10 • Crunchyroll 🟠 ${t.crunchyroll}/5`;
      document.getElementById('summaryRevealCard').innerHTML = `<div style="font-size: 0.7rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px;">SECRET MYSTERY TARGET</div><div style="font-size: 1.35rem; font-weight: 800; margin-bottom: 6px;">${t.title}</div><div style="font-size: 0.82rem; color: var(--text-secondary);">${detailLine}</div>`;
      openModal('modalSummary');
    }

    function openChallengeBuilder() {
      const sel = document.getElementById('challengeTargetSelect');
      sel.innerHTML = (DB[state.category] || []).map(item => `<option value="${item.id}">${item.title} (${item.year})</option>`).join('');
      const updateLink = () => {
        const payload = btoa(unescape(encodeURIComponent(JSON.stringify({ c: state.category, id: sel.value }))));
        document.getElementById('challengeUrlOutput').value = `${window.location.href.split('#')[0]}#challenge=${payload}`;
      };
      sel.onchange = updateLink;
      updateLink();
      openModal('modalChallenge');
    }

    function renderGuideAndStats() {
      const winPct = state.stats.played ? Math.round((state.stats.won / state.stats.played) * 100) : 0;
      document.getElementById('statsSummaryGrid').innerHTML = `
        <div class="stat-box"><div class="stat-num">${state.stats.played}</div><div class="stat-lbl">Played</div></div>
        <div class="stat-box"><div class="stat-num">${winPct}%</div><div class="stat-lbl">Win %</div></div>
        <div class="stat-box"><div class="stat-num">${state.stats.streak}</div><div class="stat-lbl">Streak</div></div>
        <div class="stat-box"><div class="stat-num">${state.stats.maxStreak}</div><div class="stat-lbl">Max</div></div>
      `;
    }

    function applyThemePrefs() {
      document.body.setAttribute('data-palette', Prefs.palette);
      document.body.setAttribute('data-accent', Prefs.accent);
      document.body.setAttribute('data-font', Prefs.font);
      document.body.classList.toggle('cinema-glow', Boolean(Prefs.cinemaGlow));
      document.querySelectorAll('[data-palette-opt]').forEach(el => el.classList.toggle('active', el.getAttribute('data-palette-opt') === Prefs.palette));
      document.querySelectorAll('[data-accent-opt]').forEach(el => el.classList.toggle('active', el.getAttribute('data-accent-opt') === Prefs.accent));
      document.querySelectorAll('[data-font-opt]').forEach(el => el.classList.toggle('active', el.getAttribute('data-font-opt') === Prefs.font));
    }

    function bindEvents() {
      document.getElementById('btnOpenLeftMenu').addEventListener('click', () => document.getElementById('leftDrawerBackdrop').classList.add('open'));
      document.getElementById('btnCloseLeftMenu').addEventListener('click', () => document.getElementById('leftDrawerBackdrop').classList.remove('open'));
      document.getElementById('leftDrawerBackdrop').addEventListener('click', e => { if (e.target.id === 'leftDrawerBackdrop') e.target.classList.remove('open'); });

      document.getElementById('categorySelect').addEventListener('change', e => {
        state.category = e.target.value;
        document.getElementById('mainSearchInput').value = '';
        document.getElementById('searchDropdown').classList.remove('open');
        startNewRound();
      });

      document.getElementById('playModeSelect').addEventListener('change', e => {
        state.playMode = e.target.value;
        if (state.playMode === 'challenge') { document.getElementById('leftDrawerBackdrop').classList.remove('open'); openChallengeBuilder(); }
        startNewRound();
      });

      document.getElementById('btnToggleFilterStudio').addEventListener('click', () => {
        const card = document.getElementById('filterStudioCard');
        card.style.display = card.style.display === 'none' ? 'flex' : 'none';
      });

      document.getElementById('btnResetPoolFilters').addEventListener('click', () => {
        state.region = 'All'; state.animeFormat = 'All';
        startNewRound(); showToast('✦ Filter Pool reset to All');
      });

      document.getElementById('btnNewRandomRound').addEventListener('click', () => {
        document.getElementById('leftDrawerBackdrop').classList.remove('open');
        startNewRound(); showToast('🎲 New random target loaded!');
      });

      const searchInput = document.getElementById('mainSearchInput');
      searchInput.addEventListener('input', e => handleSearchInput(e.target.value));
      searchInput.addEventListener('keydown', async e => {
        if (!state.searchResults.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); state.highlightedIndex = (state.highlightedIndex + 1) % state.searchResults.length; renderAutocompleteDropdown(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); state.highlightedIndex = (state.highlightedIndex - 1 + state.searchResults.length) % state.searchResults.length; renderAutocompleteDropdown(); }
        else if (e.key === 'Enter') {
          e.preventDefault();
          const picked = state.searchResults[state.highlightedIndex >= 0 ? state.highlightedIndex : 0];
          if (picked) { document.getElementById('searchDropdown').classList.remove('open'); searchInput.value = ''; const resolved = await resolveSelectedEntity(picked); if (resolved) submitGuess(resolved); }
        }
      });

      document.addEventListener('click', e => { if (!e.target.closest('.search-input-shell')) document.getElementById('searchDropdown').classList.remove('open'); });

      document.getElementById('btnHintTrigger').addEventListener('click', () => {
        if (state.gameOver) return;
        const subtleAllowed = canTriggerHint(), ostReady = canTriggerOst();
        const opts = buildClueOptions(state.target, state.category);
        const usedIds = new Set(state.revealedHints.map(h => h.id));
        const listEl = document.getElementById('hintsOptionList');

        listEl.innerHTML = `
          <div class="hint-choice-row" id="hintModalAiBtn" style="border-color: var(--accent-border); background: var(--accent-soft);">
            <div><div style="font-weight: 800; font-size: 0.92rem; color: var(--accent);">✨ Ask Google Search AI Clue</div><div style="font-size: 0.77rem; color: var(--text-secondary);">Generates a live, spoiler-free trivia clue grounded in Google Search</div></div>
            <span class="ac-row-badge" id="hintModalAiBadge">Ask AI</span>
          </div>
          <div class="hint-choice-row ${!ostReady && !state.ostUnlocked ? 'used' : ''}" id="hintModalOstBtn">
            <div><div style="font-weight: 800; font-size: 0.92rem;">🔊 12s Mystery OST Synth Clip</div><div style="font-size: 0.77rem; color: var(--text-secondary);">Unlocks on Guess 5 to hear a 12-second melodic motif</div></div>
            <span class="ac-row-badge">${state.ostUnlocked ? 'Active' : ostReady ? 'Play OST' : `Guess ${OST_UNLOCK_AT}`}</span>
          </div>
          ${opts.map(o => {
            const used = usedIds.has(o.id), locked = !used && !subtleAllowed;
            const badgeTxt = used ? 'Used' : locked ? (state.guesses.length < 2 ? 'Guess 3+' : '1/Guess') : 'Reveal';
            return `<div class="hint-choice-row ${used || locked ? 'used' : ''}" data-cid="${o.id}">
              <div><div style="font-weight: 800; font-size: 0.9rem;">${o.title}</div><div style="font-size: 0.77rem; color: var(--text-secondary);">${o.desc}</div></div>
              <span class="ac-row-badge">${badgeTxt}</span>
            </div>`;
          }).join('')}
        `;

        document.getElementById('hintModalAiBtn')?.addEventListener('click', async () => {
          const btn = document.getElementById('hintModalAiBtn');
          if (btn.dataset.loading === '1') return;
          btn.dataset.loading = '1';
          document.getElementById('hintModalAiBadge').textContent = 'Searching...';
          const aiClue = await GoogleSearchVerifier.generateGroundedClue(state.target, state.category);
          btn.dataset.loading = '0';
          document.getElementById('hintModalAiBadge').textContent = 'Ask AI';
          if (aiClue) {
            state.revealedHints.push({ id: `ai_${Date.now()}`, title: '✨ Google Search AI Clue', value: aiClue });
            closeModal('modalHints'); renderAll(); showToast('✨ Grounded Google AI clue revealed!');
          } else showToast('Could not fetch AI clue right now.');
        });

        const ostTrigger = document.getElementById('hintModalOstBtn');
        if (ostTrigger && (ostReady || state.ostUnlocked)) {
          ostTrigger.addEventListener('click', () => { state.ostUnlocked = true; closeModal('modalHints'); renderAll(); OstAudio.play(state.target.notes); });
        }

        listEl.querySelectorAll('.hint-choice-row[data-cid]:not(.used)').forEach(row => {
          row.addEventListener('click', () => {
            if (!canTriggerHint()) return;
            const picked = opts.find(x => x.id === row.getAttribute('data-cid'));
            if (!picked) return;
            state.revealedHints.push(picked);
            state.lastHintGuessCount = state.guesses.length;
            closeModal('modalHints'); renderAll(); showToast('💡 Clue unlocked!');
          });
        });

        openModal('modalHints');
      });

      document.getElementById('btnOstPlay').addEventListener('click', () => OstAudio.play(state.target.notes));
      document.getElementById('btnOstStop').addEventListener('click', () => OstAudio.stop());
      document.getElementById('btnGiveUp').addEventListener('click', () => { if (!state.gameOver) finishRound(false, '🏳️ Round Conceded'); });

      document.querySelectorAll('.preset-sec-btn').forEach(btn => btn.addEventListener('click', () => { document.getElementById('customSecondsInput').value = btn.getAttribute('data-sec'); startNewRound(); }));
      document.getElementById('btnStartTimerRound').addEventListener('click', () => startNewRound());

      document.getElementById('btnPrevTip').addEventListener('click', () => { state.tipIndex = (state.tipIndex - 1 + ROTATING_TIPS.length) % ROTATING_TIPS.length; renderTipCarousel(); });
      document.getElementById('btnNextTip').addEventListener('click', () => { state.tipIndex = (state.tipIndex + 1) % ROTATING_TIPS.length; renderTipCarousel(); });
      document.getElementById('btnBottomHowTo').addEventListener('click', () => { renderGuideAndStats(); document.getElementById('drawerBackdrop').classList.add('open'); });
      document.getElementById('btnOpenGuideDrawer').addEventListener('click', () => { renderGuideAndStats(); document.getElementById('drawerBackdrop').classList.add('open'); });
      document.getElementById('btnCloseGuideDrawer').addEventListener('click', () => document.getElementById('drawerBackdrop').classList.remove('open'));
      document.getElementById('drawerBackdrop').addEventListener('click', e => { if (e.target.id === 'drawerBackdrop') e.target.classList.remove('open'); });

      document.getElementById('btnOpenSettings').addEventListener('click', () => openModal('modalSettings'));
      document.getElementById('btnViewRoundSummary').addEventListener('click', () => openSummaryModal());

      document.querySelectorAll('[data-palette-opt]').forEach(btn => btn.addEventListener('click', () => { Prefs.palette = btn.getAttribute('data-palette-opt'); applyThemePrefs(); }));
      document.querySelectorAll('[data-accent-opt]').forEach(btn => btn.addEventListener('click', () => { Prefs.accent = btn.getAttribute('data-accent-opt'); applyThemePrefs(); }));
      document.querySelectorAll('[data-font-opt]').forEach(btn => btn.addEventListener('click', () => { Prefs.font = btn.getAttribute('data-font-opt'); applyThemePrefs(); }));
      document.getElementById('chkCinemaGlow').addEventListener('change', e => { Prefs.cinemaGlow = e.target.checked; applyThemePrefs(); });

      document.getElementById('btnSaveTmdbOverride').addEventListener('click', () => {
        const val = document.getElementById('inputTmdbKeyOverride').value.trim();
        if (val) { Prefs.tmdbKeyOverride = val; document.getElementById('tmdbKeyStatusBadge').textContent = 'Custom TMDB Override Active'; showToast('Custom TMDB key saved.'); }
      });
      document.getElementById('btnResetTmdbOverride').addEventListener('click', () => {
        Prefs.tmdbKeyOverride = ''; document.getElementById('inputTmdbKeyOverride').value = '';
        document.getElementById('tmdbKeyStatusBadge').textContent = 'Built-in Cinema Database Key Active (Hidden)'; showToast('Restored built-in TMDB key.');
      });
      document.getElementById('btnSaveGeminiOverride').addEventListener('click', () => {
        const val = document.getElementById('inputGeminiKeyOverride').value.trim();
        if (val) { Prefs.geminiKeyOverride = val; document.getElementById('geminiKeyStatusBadge').textContent = 'Custom Gemini Key Active'; showToast('Custom Gemini key saved.'); }
      });
      document.getElementById('btnResetGeminiOverride').addEventListener('click', () => {
        Prefs.geminiKeyOverride = ''; document.getElementById('inputGeminiKeyOverride').value = '';
        document.getElementById('geminiKeyStatusBadge').textContent = 'Built-in Workspace AI Active'; showToast('Restored built-in Workspace AI.');
      });

      document.getElementById('btnSummaryNextRound').addEventListener('click', () => { closeModal('modalSummary'); startNewRound(); });
      document.getElementById('btnShareResultGrid').addEventListener('click', () => {
        const rows = state.guesses.map(g => (g.id === state.target.id || normalizeStr(g.title) === normalizeStr(state.target.title)) ? '🟩🟩🟩🟩🟩' : '🟨⬛🟩⬛🟨').join('\n');
        const ta = document.createElement('textarea');
        ta.value = `CineSpotle (${state.category.toUpperCase()}) — ${state.won ? `${state.guesses.length}/10` : 'X/10'}\n${rows}`;
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        showToast('📋 Result grid copied!');
      });
      document.getElementById('btnCopyChallengeLink').addEventListener('click', () => {
        const inp = document.getElementById('challengeUrlOutput'); inp.select(); document.execCommand('copy'); showToast('📋 Challenge link copied!');
      });

      document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => closeModal(btn.getAttribute('data-close'))));
      document.querySelectorAll('.modal-overlay').forEach(ov => ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); }));
    }

    window.addEventListener('DOMContentLoaded', () => {
      applyThemePrefs();
      bindEvents();
      try {
        const hash = window.location.hash || '';
        if (hash.startsWith('#challenge=')) {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(hash.slice('#challenge='.length)))));
          if (decoded?.c && DB[decoded.c]) {
            state.category = decoded.c; state.playMode = 'challenge';
            const found = DB[decoded.c].find(x => x.id === decoded.id);
            if (found) { startNewRound(found); showToast('⚔️ Challenge round loaded!'); return; }
          }
        }
      } catch (_) {}
      startNewRound();
    });