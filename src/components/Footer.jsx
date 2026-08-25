const LINK_GROUPS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Awards', href: '#awards' },
      { label: 'Why Blockexa', href: '#why-us' },
      { label: 'Team', href: '#team' },
    ],
  },
  {
    heading: 'Investor',
    links: [
      { label: 'Crypto Investment', href: '#crypto-investment' },
      { label: 'Investment Plans', href: '#plans' },
      { label: 'ROI Calculator', href: '#roi-calculator' },
      { label: 'Escrow Service', href: '#escrow-service' },
    ],
  },
  {
    heading: 'Legitimacy',
    links: [
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Payment Policy', href: '#payment-policy' },
      { label: 'Withdrawal Policy', href: '#withdrawal-policy' },
      { label: 'Anti-Money Laundering (AML)', href: '#aml' },
      { label: 'Know Your Customer (KYC)', href: '#kyc' },
      { label: 'Terms and Conditions', href: '#terms' },
      { label: 'White Paper', href: '#white-paper' },
    ],
  },
];

const SOCIALS = [
  { id: 'x-icon', label: 'X', href: '#' },
  { id: 'discord-icon', label: 'Discord', href: '#' },
  { id: 'bluesky-icon', label: 'Bluesky', href: '#' },
  { id: 'github-icon', label: 'GitHub', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-panel border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-8">
          <div>
            <a href="#home" className="flex items-center">
              <img src="/logoexaa.jpg" alt="Blockexa" className="h-9 w-auto select-none" />
            </a>
            <p className="mt-5 text-sm text-moss leading-relaxed max-w-xs">
              Blockexa gives everyday investors a transparent way into crypto — daily settlement, an open trade history, and withdrawals on your terms.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-signal-dim hover:bg-panel-raised transition-colors"
                >
                  <svg className="w-4 h-4 fill-ivory/80" viewBox="0 0 20 20">
                    <use href={`/icons.svg#${s.id}`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-signal-dim">{group.heading}</h4>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-moss hover:text-ivory transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-xs text-moss">© {new Date().getFullYear()} Blockexa. All rights reserved.</p>
          <p className="text-xs text-moss max-w-xl leading-relaxed">
            Crypto investments carry risk, including loss of principal. Past returns don't guarantee future performance — invest only what you can afford to lose.
          </p>
        </div>
      </div>
    </footer>
  );
}
