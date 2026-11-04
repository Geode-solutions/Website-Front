<template>
  <main class="ln">
    <div class="ln-frame">
      <!-- Header bar, as on the brand book inner pages -->
      <header class="ln-bar">
        <p class="ln-crumbs">
          Information <span class="ln-muted">Legal notice</span>
        </p>
        <NuxtLink to="/" class="ln-logo" aria-label="Geode Solutions, home">
          <img
            src="/logo/geode-solutions-anthracite.svg"
            alt="Geode Solutions"
            width="1286"
            height="310"
          />
        </NuxtLink>
        <NuxtLink to="/" class="ln-back">
          <span class="ln-dot" aria-hidden="true" />
          Back to home
        </NuxtLink>
      </header>

      <div class="ln-body">
        <aside class="ln-side">
          <div class="ln-side-inner">
            <p class="ln-kicker">Legal information</p>
            <h1 class="ln-title">Legal notice</h1>
            <p class="ln-updated">Last updated: November 2026</p>

            <nav class="ln-toc" aria-label="Contents">
              <a
                v-for="(section, index) in sections"
                :key="section.id"
                :href="`#${section.id}`"
              >
                <span class="ln-toc-num">{{ number(index) }}</span>
                {{ section.title }}
              </a>
            </nav>
          </div>
        </aside>

        <article class="ln-content">
          <section :id="sections[0].id" class="ln-section">
            <p class="ln-num">{{ number(0) }}</p>
            <h2>{{ sections[0].title }}</h2>
            <p>
              In accordance with articles 6-III and 19 of French law no.
              2004-575 of 21 June 2004 on confidence in the digital economy
              (LCEN), users of geode-solutions.com are informed of the identity
              of its publisher.
            </p>
            <dl class="ln-facts">
              <div v-for="fact in publisher" :key="fact.label">
                <dt>{{ fact.label }}</dt>
                <dd>
                  <a v-if="fact.href" :href="fact.href">{{ fact.value }}</a>
                  <template v-else>{{ fact.value }}</template>
                </dd>
              </div>
            </dl>
          </section>

          <section :id="sections[1].id" class="ln-section">
            <p class="ln-num">{{ number(1) }}</p>
            <h2>{{ sections[1].title }}</h2>
            <dl class="ln-facts">
              <div v-for="fact in host" :key="fact.label">
                <dt>{{ fact.label }}</dt>
                <dd>
                  <a
                    v-if="fact.href"
                    :href="fact.href"
                    target="_blank"
                    rel="noopener"
                    >{{ fact.value }}</a
                  >
                  <template v-else>{{ fact.value }}</template>
                </dd>
              </div>
            </dl>
          </section>

          <section :id="sections[2].id" class="ln-section">
            <p class="ln-num">{{ number(2) }}</p>
            <h2>{{ sections[2].title }}</h2>
            <p>
              The purpose of geode-solutions.com is to present all of
              Geode-solutions' activities.
            </p>
            <p>
              Geode-solutions strives to provide information on this website
              that is as accurate as possible. However, it cannot be held
              responsible for omissions, inaccuracies or failures to update this
              information, whether caused by itself or by the third-party
              partners who provide it.
            </p>
            <p>
              The information on this website is provided for guidance only, is
              not exhaustive and may change. It is subject to any changes made
              since it was published.
            </p>
          </section>

          <section :id="sections[3].id" class="ln-section">
            <p class="ln-num">{{ number(3) }}</p>
            <h2>{{ sections[3].title }}</h2>
            <p>
              Geode-solutions owns the intellectual property rights to, or holds
              the rights to use, all the elements available on this website,
              including texts, images, graphics, logos, icons, sounds and
              software.
            </p>
            <p>
              Any reproduction, representation, modification, publication or
              adaptation of all or part of these elements, by any means or
              process, is prohibited without the prior written permission of
              Geode-solutions, which can be requested at
              <a :href="`mailto:${email}`">{{ email }}</a
              >.
            </p>
            <p>
              Any unauthorised use of the website or of any of the elements it
              contains will be considered an infringement and prosecuted in
              accordance with articles L.335-2 et seq. of the French
              Intellectual Property Code.
            </p>
            <p>
              Databases are protected by the French law of 1 July 1998
              transposing Directive 96/9/EC of 11 March 1996 on the legal
              protection of databases.
            </p>
          </section>

          <section :id="sections[4].id" class="ln-section">
            <p class="ln-num">{{ number(4) }}</p>
            <h2>{{ sections[4].title }}</h2>
            <p>
              This website contains hyperlinks to other websites (partners,
              information, etc.), set up with the permission of Geode-solutions.
              As Geode-solutions cannot check the content of the websites
              visited, it declines all responsibility for any risk of unlawful
              content.
            </p>
          </section>

          <section :id="sections[5].id" class="ln-section">
            <p class="ln-num">{{ number(5) }}</p>
            <h2>{{ sections[5].title }}</h2>
            <p>
              When you browse this website, cookies may be stored on your
              device. A cookie is a small file that does not identify the user,
              but records information about their browsing on a website. The
              data obtained is used to make subsequent browsing easier and to
              measure audience.
            </p>
            <p>
              You can set up your browser to inform you when cookies are present
              and, if you wish, to refuse them, as described on the website of
              the
              <a href="https://www.cnil.fr/en" target="_blank" rel="noopener"
                >CNIL</a
              >, the French data protection authority. Refusing cookies may
              prevent access to some services.
            </p>
          </section>

          <section :id="sections[6].id" class="ln-section">
            <p class="ln-num">{{ number(6) }}</p>
            <h2>{{ sections[6].title }}</h2>
            <p>
              Geode-solutions only collects personal data about you for the
              needs of some services offered by the website, for instance when
              you contact us. You provide this information knowingly, in
              particular when you enter it yourself; you are then told whether
              each piece of information is mandatory or optional.
            </p>
            <p>
              No personal information is published without your knowledge,
              exchanged, transferred, assigned or sold to third parties, on any
              medium. Only the acquisition of Geode-solutions and its rights
              would allow this information to be passed on to the potential
              buyer, who would in turn be bound by the same obligations
              regarding the storage and modification of the data.
            </p>
            <p>
              In accordance with the General Data Protection Regulation (EU)
              2016/679 (GDPR) and the amended French law no. 78-17 of 6 January
              1978 on information technology, data files and civil liberties,
              you have the right to access, rectify, erase, restrict, port and
              object to the processing of your data. To exercise these rights,
              write to <a :href="`mailto:${email}`">{{ email }}</a
              >. You can also lodge a complaint with the
              <a href="https://www.cnil.fr/en" target="_blank" rel="noopener"
                >CNIL</a
              >.
            </p>
          </section>
        </article>
      </div>

      <footer class="ln-bar ln-foot">
        <p>&copy; 2019&ndash;{{ year }} Geode Solutions SAS</p>
        <NuxtLink to="/">Home</NuxtLink>
      </footer>
    </div>
  </main>
</template>

<script setup>
  definePageMeta({ layout: "construction" })

  useHead({
    title: "Legal notice — Geode Solutions",
    htmlAttrs: { style: "background-color: #eeebe7" },
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: "Legal notice of the geode-solutions.com website.",
      },
      { name: "theme-color", content: "#EEEBE7" },
      { property: "og:title", content: "Legal notice — Geode Solutions" },
      {
        property: "og:url",
        content: "https://geode-solutions.com/legalNotice",
      },
    ],
  })

  const email = "contact@geode-solutions.com"
  const year = new Date().getFullYear()

  const sections = [
    { id: "publisher", title: "Publisher" },
    { id: "hosting", title: "Hosting" },
    { id: "purpose", title: "Purpose of the website" },
    { id: "intellectual-property", title: "Intellectual property" },
    { id: "hyperlinks", title: "Hyperlinks" },
    { id: "cookies", title: "Cookies" },
    { id: "personal-data", title: "Personal data" },
  ]

  const publisher = [
    { label: "Company name", value: "Geode-solutions" },
    { label: "Legal form", value: "Simplified joint-stock company (SAS)" },
    { label: "Share capital", value: "€10,600" },
    {
      label: "Registered office",
      value:
        "Technopole Hélioparc, 2 avenue Pierre Angot, 64053 Pau Cedex 9, France",
    },
    { label: "SIRET", value: "852 994 789 00018" },
    { label: "Trade and Companies Register (RCS)", value: "852 994 789" },
    { label: "EU VAT number", value: "FR25 852 994 789" },
    { label: "Contact", value: email, href: `mailto:${email}` },
  ]

  const host = [
    { label: "Host", value: "Netlify, Inc." },
    {
      label: "Address",
      value: "101 2nd Street, San Francisco, CA 94105, United States",
    },
    {
      label: "Website",
      value: "netlify.com",
      href: "https://www.netlify.com",
    },
  ]

  function number(index) {
    return String(index + 1).padStart(2, "0")
  }
</script>

<style scoped>
  /* Brand book inner-page layout: beige page, hairline frame, title column
     on the left and content on the right. */
  .ln {
    --beige: #eeebe7;
    --ink: #1e1e1e;
    --muted: rgba(30, 30, 30, 0.66);
    --line: rgba(30, 30, 30, 0.14);
    --platine: #3e6965;
    --vert-noir: #0c2825;
    --orange: #f48830;

    --gutter: clamp(12px, 2.4vw, 32px);
    --pad: clamp(20px, 3vw, 48px);

    min-height: 100vh;
    min-height: 100svh;
    padding: var(--gutter);
    box-sizing: border-box;
    background: var(--beige);
    color: var(--ink);
    font-family: "Onest", system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  .ln *,
  .ln *::before,
  .ln *::after {
    box-sizing: border-box;
  }

  .ln p,
  .ln h1,
  .ln h2,
  .ln dl,
  .ln dd {
    margin: 0;
  }

  .ln a {
    color: var(--platine);
    text-decoration: underline;
    text-decoration-color: rgba(62, 105, 101, 0.4);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease;
  }

  .ln a:hover {
    text-decoration-color: currentColor;
  }

  .ln a:focus-visible {
    outline: 2px solid var(--orange);
    outline-offset: 3px;
  }

  .ln-frame {
    min-height: calc(100svh - 2 * var(--gutter));
    display: flex;
    flex-direction: column;
    border: 1px solid var(--line);
  }

  /* Top and bottom bars */
  .ln-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 18px var(--pad);
    border-bottom: 1px solid var(--line);
  }

  /* Section labels left, logo centered, marker right */
  header.ln-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }

  .ln-crumbs,
  .ln .ln-back {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .ln-crumbs {
    display: flex;
    gap: 10px;
  }

  .ln-muted {
    color: var(--muted);
    font-weight: 400;
  }

  .ln .ln-logo {
    display: block;
    text-decoration: none;
  }

  .ln-logo img {
    display: block;
    width: auto;
    height: 30px;
  }

  .ln .ln-back {
    justify-self: end;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--ink);
    text-decoration: none;
  }

  .ln-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--orange);
  }

  .ln .ln-back:hover {
    color: var(--platine);
  }

  .ln-foot {
    margin-top: auto;
    border-top: 1px solid var(--line);
    border-bottom: 0;
    font-size: 13px;
    color: var(--muted);
  }

  .ln .ln-foot a {
    color: inherit;
  }

  /* Body: title column + content */
  .ln-body {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(260px, 30%) 1fr;
  }

  .ln-side {
    border-right: 1px solid var(--line);
  }

  .ln-side-inner {
    position: sticky;
    top: 0;
    padding: clamp(32px, 5vh, 64px) var(--pad);
  }

  .ln-kicker {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--platine);
  }

  .ln-title {
    margin-top: 16px !important;
    font-family: "Urbanist", "Onest", sans-serif;
    font-weight: 600;
    font-size: clamp(40px, 4.4vw, 64px);
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--ink);
  }

  .ln-updated {
    margin-top: 16px !important;
    font-size: 14px;
    color: var(--muted);
  }

  .ln-toc {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    border-top: 1px solid var(--line);
  }

  .ln .ln-toc a {
    display: flex;
    gap: 14px;
    padding: 11px 0;
    border-bottom: 1px solid var(--line);
    color: var(--ink);
    font-size: 15px;
    line-height: 1.4;
    text-decoration: none;
  }

  .ln .ln-toc a:hover {
    color: var(--platine);
  }

  .ln-toc-num {
    min-width: 22px;
    font-variant-numeric: tabular-nums;
    color: var(--platine);
    font-weight: 500;
  }

  .ln-content {
    padding: clamp(32px, 5vh, 64px) var(--pad) clamp(48px, 8vh, 96px);
  }

  .ln-section {
    max-width: 720px;
    scroll-margin-top: 24px;
  }

  .ln-section + .ln-section {
    margin-top: 56px;
    padding-top: 56px;
    border-top: 1px solid var(--line);
  }

  .ln-num {
    font-family: "Urbanist", "Onest", sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--platine);
  }

  .ln-section h2 {
    margin: 4px 0 20px;
    font-family: "Urbanist", "Onest", sans-serif;
    font-weight: 600;
    font-size: clamp(26px, 2.6vw, 34px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .ln-section p + p,
  .ln-section p + .ln-facts {
    margin-top: 16px;
  }

  .ln-section p {
    color: rgba(30, 30, 30, 0.84);
    text-wrap: pretty;
  }

  /* Key facts (publisher, host) */
  .ln-facts {
    border-top: 1px solid var(--line);
  }

  .ln-facts > div {
    display: grid;
    grid-template-columns: minmax(150px, 34%) 1fr;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
  }

  .ln-facts > div:last-child {
    border-bottom: 0;
  }

  .ln-facts dt {
    color: var(--muted);
    font-size: 14px;
    line-height: 1.65;
  }

  .ln-facts dd {
    font-weight: 500;
  }

  @media (max-width: 860px) {
    .ln-body {
      grid-template-columns: 1fr;
    }

    .ln-side {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }

    .ln-side-inner {
      position: static;
    }

    .ln-facts > div {
      grid-template-columns: 1fr;
      gap: 0;
    }

    header.ln-bar {
      grid-template-columns: auto 1fr;
    }

    .ln-crumbs {
      display: none;
    }

    .ln-logo img {
      height: 26px;
    }
  }

  /* Motion, same vocabulary as the home page: layers settle into place */
  .ln-bar {
    animation: ln-fade 0.8s ease both;
  }

  .ln-side-inner > *,
  .ln-section:first-child {
    animation: ln-settle 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .ln-side-inner > :nth-child(2) {
    animation-delay: 0.08s;
  }
  .ln-side-inner > :nth-child(3) {
    animation-delay: 0.16s;
  }
  .ln-side-inner > :nth-child(4),
  .ln-section:first-child {
    animation-delay: 0.24s;
  }

  /* Following sections settle as they scroll into view (where supported) */
  @supports (animation-timeline: view()) {
    .ln-section + .ln-section {
      animation: ln-settle linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 45%;
    }
  }

  @keyframes ln-fade {
    from {
      opacity: 0;
    }
  }

  @keyframes ln-settle {
    from {
      opacity: 0;
      transform: translateY(-14px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ln *,
    .ln-bar {
      animation: none !important;
    }
  }
</style>
