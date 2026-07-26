import Link from 'next/link'
import styles from './page.module.css'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ArrowRight, Sparkles, Check, MoreVertical, Globe, Briefcase, Mail, PhoneCall, Music, Camera, Video, Play, Hexagon, LayoutTemplate, Zap, LayoutDashboard, Paintbrush, LineChart, Lock, Users, Star } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className={styles.container}>
      {/* NAVBAR */}
      <nav className={styles.navbarWrapper}>
        <div className={styles.navbar}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>M</span>
            </div>
            <span className={styles.logoText}>MyWall</span>
          </div>
          
          <div className={styles.navLinks}>
            <Link href="#features" className={styles.navLink}>Features</Link>
            <Link href="#templates" className={styles.navLink}>Templates</Link>
            <Link href="#pricing" className={styles.navLink}>Pricing</Link>
            <Link href="#examples" className={styles.navLink}>Examples</Link>
            <div className={styles.navDropdown}>
              Resources <span className={styles.chevronDown}></span>
            </div>
          </div>
          
          <div className={styles.navAuth}>
            <Link href="/login" className={styles.loginLink}>Log in</Link>
            <Link href="/login" className={styles.btnPrimaryBlack}>
              Get started for free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        
        {/* LEFT COMPONENT - CSS MOCKUPS */}
        <div className={styles.heroVisuals}>
          
          {/* Decorative Scribbles */}
          <div className={styles.scribble1}></div>
          <div className={styles.scribble2}></div>
          <div className={styles.scribble3}></div>
          
          {/* Neon Green Brush Stroke Behind Phones */}
          <div className={styles.brushStroke}></div>
          
          {/* Dark Phone */}
          <div className={styles.phoneDark}>
            <div className={styles.phoneHeader}>
              <div className={styles.phoneIconLeft}></div>
              <div className={styles.phoneIconRight}>
                <Hexagon size={14} color="#a3a3a3" />
              </div>
            </div>
            <div className={styles.phoneImage}></div>
            <div className={styles.phoneContent}>
              <h3 className={styles.darkPhoneTitle}>Explore<br/>New Adventures</h3>
              <button className={styles.darkPhoneBtn}>View Gallery</button>
            </div>
          </div>
          
          {/* Light Phone (Main Avatar Card) */}
          <div className={styles.phoneLight}>
            <div className={styles.lightPhoneHeader}>
              <div className={styles.moreIcon}><MoreVertical size={16} color="#a3a3a3" /></div>
            </div>
            
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarImage}></div>
            </div>
            
            <h2 className={styles.profileName}>
              Arjun Dev <span className={styles.verifiedBadge}>✓</span>
            </h2>
            <p className={styles.profileRole}>Product Designer</p>
            <p className={styles.profileBio}>Designing digital experiences<br/>that people love.</p>
            
            <div className={styles.socialIconsRow}>
              <div className={styles.socialCircle}></div>
              <div className={styles.socialCircle}></div>
              <div className={styles.socialCircle}></div>
              <div className={styles.socialCircle}></div>
              <div className={styles.socialCircle}></div>
            </div>
            
            <div className={styles.linksList}>
              <div className={styles.linkItemDark}>
                <Globe size={16} /> My Portfolio <ArrowRight size={16} className={styles.linkArrow} />
              </div>
              <div className={styles.linkItemLight}>
                <Briefcase size={16} color="#6366f1" /> Case Studies <ArrowRight size={16} className={styles.linkArrow} />
              </div>
              <div className={styles.linkItemLight}>
                <Mail size={16} color="#6366f1" /> My Newsletter <ArrowRight size={16} className={styles.linkArrow} />
              </div>
              <div className={styles.linkItemLight}>
                <PhoneCall size={16} color="#10b981" /> Book a Call <ArrowRight size={16} className={styles.linkArrow} />
              </div>
            </div>
            
            <div className={styles.watermark}>
              Made with <span style={{ color: '#ef4444' }}>♥</span> MyWall
            </div>
          </div>
          
          {/* Floating Social Icons Right */}
          <div className={styles.floatingIcons}>
            <div className={`${styles.floatIcon} ${styles.iconInstagram}`}><Camera size={20} /></div>
            <div className={`${styles.floatIcon} ${styles.iconTiktok}`}><Video size={20} /></div>
            <div className={`${styles.floatIcon} ${styles.iconYoutube}`}><Play size={20} /></div>
            <div className={`${styles.floatIcon} ${styles.iconPinterest}`}><span style={{fontWeight: 'bold'}}>P</span></div>
          </div>
          
        </div>

        {/* RIGHT COMPONENT - HERO TEXT */}
        <div className={styles.heroTextContent}>
          <div className={styles.pillBadge}>
            <Sparkles size={14} /> The all-in-one link in bio tool
          </div>
          
          <h1 className={styles.heroTitle}>
            Create and customize<br/>your <span className={styles.highlightText}>MyWall</span> in<br/>minutes
          </h1>
          
          <p className={styles.heroDesc}>
            Connect everything you are. Share your links, content, videos, social media, store and more in one beautiful page that represents you.
          </p>
          
          <Link href="/login" className={styles.btnPrimaryNeon}>
            Get started for free <ArrowRight size={18} />
          </Link>
          
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.checkCircle}><Check size={12} /></div>
              No credit card<br/>required
            </div>
            <div className={styles.featureItem}>
              <div className={styles.checkCircle}><Check size={12} /></div>
              Easy to set up<br/>in minutes
            </div>
            <div className={styles.featureItem}>
              <div className={styles.checkCircle}><Check size={12} /></div>
              Powerful<br/>customization
            </div>
          </div>
        </div>

      </main>



      {/* FEATURES SECTION */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Everything you need to <span className={styles.highlightText}>stand out</span></h2>
          <p className={styles.sectionSubtitle}>Powerful features packed into a simple, beautiful interface.</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><LayoutDashboard size={24} /></div>
            <h3>Drag & Drop Builder</h3>
            <p>Customize your page layout visually in seconds. No coding required.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Paintbrush size={24} /></div>
            <h3>Infinite Themes</h3>
            <p>From minimal professional to vibrant social, craft your unique look.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><LineChart size={24} /></div>
            <h3>Deep Analytics</h3>
            <p>Understand your audience with real-time insights and visitor stats.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Lock size={24} /></div>
            <h3>Custom Domains</h3>
            <p>Connect your own domain to build ultimate brand authority.</p>
          </div>
        </div>
      </section>

      {/* TEMPLATES SECTION */}
      <section id="templates" className={styles.templatesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Start with a <span className={styles.highlightText}>stunning</span> layout</h2>
          <p className={styles.sectionSubtitle}>Choose a theme that fits your vibe and customize it to perfection.</p>
        </div>
        <div className={styles.templatesGrid}>
          <div className={styles.templateCard}>
            <div className={styles.templatePreviewLight}>
              <div className={styles.templateHeader}></div>
              <div className={styles.templateAvatar}></div>
              <div className={styles.templateLine}></div>
              <div className={styles.templateLineShort}></div>
            </div>
            <h4>Professional</h4>
            <p>Clean, minimal, perfect for founders and creators.</p>
          </div>
          <div className={styles.templateCard}>
            <div className={styles.templatePreviewDark}>
              <div className={styles.templateHeader}></div>
              <div className={styles.templateAvatar}></div>
              <div className={styles.templateLine}></div>
              <div className={styles.templateLineShort}></div>
            </div>
            <h4>Social</h4>
            <p>Dark mode optimized for your social links.</p>
          </div>
          <div className={styles.templateCard}>
            <div className={styles.templatePreviewFun}>
              <div className={styles.templateHeader}></div>
              <div className={styles.templateAvatar}></div>
              <div className={styles.templateLine}></div>
              <div className={styles.templateLineShort}></div>
            </div>
            <h4>Fun</h4>
            <p>Interactive glassmorphism with ambient audio.</p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Simple, <span className={styles.highlightText}>transparent</span> pricing</h2>
          <p className={styles.sectionSubtitle}>Start for free, upgrade when you need more power.</p>
        </div>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3>Free</h3>
              <div className={styles.price}>$0<span>/mo</span></div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li><Check size={16} color="#a3e635" /> Unlimited Links</li>
              <li><Check size={16} color="#a3e635" /> Standard Themes</li>
              <li><Check size={16} color="#a3e635" /> Basic Analytics</li>
              <li><Check size={16} color="#a3e635" /> MyWall Branding</li>
            </ul>
            <Link href="/login" className={styles.btnSecondary}>Get Started</Link>
          </div>
          <div className={`${styles.pricingCard} ${styles.pricingCardPro}`}>
            <div className={styles.proBadge}>Most Popular</div>
            <div className={styles.pricingHeader}>
              <h3>Pro</h3>
              <div className={styles.price}>$9<span>/mo</span></div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li><Check size={16} color="#a3e635" /> Everything in Free</li>
              <li><Check size={16} color="#a3e635" /> Custom Domains</li>
              <li><Check size={16} color="#a3e635" /> Advanced Analytics</li>
              <li><Check size={16} color="#a3e635" /> Remove Branding</li>
              <li><Check size={16} color="#a3e635" /> Premium Themes</li>
            </ul>
            <div className={styles.btnPrimaryNeon} style={{ opacity: 0.7, cursor: 'not-allowed', justifyContent: 'center' }}>Coming Soon</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logoArea}>
              <div className={styles.logoIcon}>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>M</span>
              </div>
              <span className={styles.logoText} style={{ color: 'white' }}>MyWall</span>
            </div>
            <p>One link to rule them all.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4>Product</h4>
              <Link href="#features">Features</Link>
              <Link href="#templates">Templates</Link>
              <Link href="#pricing">Pricing</Link>
            </div>
            <div className={styles.linkColumn}>
              <h4>Company</h4>
              <Link href="#">About</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Contact</Link>
            </div>
            <div className={styles.linkColumn}>
              <h4>Legal</h4>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} MyWall Inc. All rights reserved.</p>
        </div>
      </footer>
      
    </div>
  )
}
