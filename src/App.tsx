import { useMemo, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import './App.css'

type Spark = {
  id: number
  x: number
  y: number
  size: number
  drift: number
  delay: number
}

type Reason = {
  title: string
  text: string
  accent: string
}

type Letter = {
  title: string
  text: string
}

type Memory = {
  time: string
  title: string
  text: string
}

type Photo = {
  src: string
  caption: string
  tone: string
}

const photos: Photo[] = [
  {
    src: '/fotos/foto-01.jpeg',
    caption: 'Nosso jeito de deixar tudo mais leve',
    tone: '#ffd166',
  },
  {
    src: '/fotos/foto-02.jpeg',
    caption: 'Uma lembranca com cara de sorriso',
    tone: '#69e5c8',
  },
  {
    src: '/fotos/foto-03.jpeg',
    caption: 'Voce bonita ate quando o mundo distrai',
    tone: '#ff6b8f',
  },
  {
    src: '/fotos/foto-04.jpeg',
    caption: 'Meu detalhe favorito da foto',
    tone: '#75d7ff',
  },
  {
    src: '/fotos/foto-05.jpeg',
    caption: 'Aquele tipo de momento que eu guardo',
    tone: '#f7a9ff',
  },
  {
    src: '/fotos/foto-06.jpeg',
    caption: 'Ela, sendo ela, e eu completamente bobo',
    tone: '#9be36a',
  },
  {
    src: '/fotos/foto-07.jpeg',
    caption: 'O amor aparecendo sem pedir licenca',
    tone: '#ff9f6e',
  },
  {
    src: '/fotos/foto-08.jpeg',
    caption: 'Uma das minhas vistas preferidas',
    tone: '#ffd166',
  },
  {
    src: '/fotos/foto-09.jpeg',
    caption: 'Pequeno momento, memoria gigante',
    tone: '#6ee7d8',
  },
  {
    src: '/fotos/foto-10.jpeg',
    caption: 'Pra lembrar que eu escolheria voce de novo',
    tone: '#ff6b8f',
  },
]

const reasons: Reason[] = [
  {
    title: 'Seu jeito',
    text: 'Voce transforma qualquer dia normal em um lugar que eu quero ficar.',
    accent: '#ff6b8f',
  },
  {
    title: 'Sua risada',
    text: 'Ela tem esse poder injusto de consertar meu humor em segundos.',
    accent: '#ffd166',
  },
  {
    title: 'Seu olhar',
    text: 'Parece que o mundo fica mais simples quando voce olha pra mim.',
    accent: '#6ee7d8',
  },
  {
    title: 'Sua parceria',
    text: 'Com voce, ate plano b vira historia boa pra contar depois.',
    accent: '#9bde7e',
  },
  {
    title: 'Seu carinho',
    text: 'Voce me lembra que amor tambem mora nos detalhes pequenos.',
    accent: '#f7a9ff',
  },
  {
    title: 'Nosso futuro',
    text: 'Eu penso nele e sempre tem voce aparecendo na melhor parte.',
    accent: '#ff9f6e',
  },
]

const letters: Letter[] = [
  {
    title: 'Quando bate saudade',
    text: 'Eu guardo um pensamento seu comigo e o dia fica menos longe.',
  },
  {
    title: 'Quando voce sorri',
    text: 'Meu coracao entende rapidinho que esta exatamente onde queria estar.',
  },
  {
    title: 'Quando penso em nos',
    text: 'Eu vejo cuidado, bagunca boa, planos, abracos e uma vontade enorme de continuar.',
  },
]

const memories: Memory[] = [
  {
    time: 'Capitulo 01',
    title: 'O comeco',
    text: 'Aquele ponto em que uma conversa vira vontade de falar de novo no dia seguinte.',
  },
  {
    time: 'Capitulo 02',
    title: 'A certeza',
    text: 'Quando ficar perto deixou de ser acaso e virou uma das melhores partes da rotina.',
  },
  {
    time: 'Capitulo 03',
    title: 'A aventura',
    text: 'A gente criando memoria ate nas coisas simples, do nosso jeito, sem roteiro pronto.',
  },
  {
    time: 'Capitulo 04',
    title: 'O depois',
    text: 'Mais planos, mais risadas, mais cuidado e muitos dias com cara de lar.',
  },
]

const quizOptions = [
  'Ganhar um abraco demorado',
  'Ouvir eu dizendo que te amo',
  'Escolher nosso proximo date',
]

const loveNotes = [
  'Hoje o universo esta com inveja.',
  'Seu sorriso ganhou status de patrimonio do meu mundo.',
  'Eu repetiria a nossa historia so pra te encontrar de novo.',
  'Voce e meu detalhe favorito em qualquer plano.',
]

function App() {
  const [activeReason, setActiveReason] = useState(0)
  const [openLetter, setOpenLetter] = useState(1)
  const [activeMemory, setActiveMemory] = useState(0)
  const [activePhoto, setActivePhoto] = useState(0)
  const [loveLevel, setLoveLevel] = useState(87)
  const [danceMode, setDanceMode] = useState(false)
  const [finalOpen, setFinalOpen] = useState(false)
  const [quizChoice, setQuizChoice] = useState(quizOptions[0])
  const [noteIndex, setNoteIndex] = useState(0)
  const [sparks, setSparks] = useState<Spark[]>([])

  const stars = useMemo(
    () =>
      Array.from({ length: 52 }, (_, index) => ({
        x: (index * 37 + 11) % 100,
        y: (index * 61 + 7) % 100,
        size: 1 + (index % 4),
        delay: (index % 13) * 0.28,
      })),
    [],
  )

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: (index * 19 + 4) % 100,
        delay: (index % 9) * 0.55,
        duration: 8 + (index % 5),
        scale: 0.6 + (index % 5) * 0.12,
      })),
    [],
  )

  const fallingHearts = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        left: (index * 29 + 8) % 100,
        delay: (index % 12) * 0.8,
        duration: 12 + (index % 7) * 1.2,
        drift: (index % 2 === 0 ? 1 : -1) * (18 + (index % 5) * 10),
        size: 9 + (index % 5) * 3,
      })),
    [],
  )

  const selectedPhoto = photos[activePhoto]

  const createBurst = (clientX: number, clientY: number) => {
    const nextSparks = Array.from({ length: 16 }, (_, index) => ({
      id: Date.now() + index,
      x: clientX,
      y: clientY,
      size: 7 + (index % 5) * 3,
      drift: (index - 8) * 10,
      delay: index * 0.015,
    }))

    setSparks((current) => [...current, ...nextSparks])
    window.setTimeout(() => {
      setSparks((current) =>
        current.filter((spark) => !nextSparks.some((next) => next.id === spark.id)),
      )
    }, 950)
  }

  const scrollToSection = (sectionId: string) => {
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 130)
  }

  const openSurprise = (sectionId = 'photo-gallery') => {
    setFinalOpen(true)
    setLoveLevel(100)
    scrollToSection(sectionId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    event.currentTarget.style.setProperty('--pointer-x', `${x}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`)
  }

  const popAtPointer = (event: PointerEvent<HTMLElement>) => {
    createBurst(event.clientX, event.clientY)
  }

  const nextPhoto = () => {
    setActivePhoto((current) => (current + 1) % photos.length)
  }

  const rotateNote = () => {
    setNoteIndex((current) => (current + 1) % loveNotes.length)
  }

  return (
    <main
      className={`love-site ${danceMode ? 'is-dancing' : ''} ${
        finalOpen ? 'finale-open' : ''
      }`}
      onPointerMove={handlePointerMove}
    >
      <div className="ambient-layers" aria-hidden="true">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="light-beam" />
      </div>

      <div className="star-field" aria-hidden="true">
        {stars.map((star, index) => (
          <span
            className="star"
            key={index}
            style={
              {
                '--x': `${star.x}%`,
                '--y': `${star.y}%`,
                '--size': `${star.size}px`,
                '--delay': `${star.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="heart-rain" aria-hidden="true">
        {floatingHearts.map((heart, index) => (
          <span
            className="tiny-heart"
            key={index}
            style={
              {
                '--left': `${heart.left}%`,
                '--delay': `${heart.delay}s`,
                '--duration': `${heart.duration}s`,
                '--scale': heart.scale,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="falling-hearts" aria-hidden="true">
        {fallingHearts.map((heart, index) => (
          <span
            className="falling-heart"
            key={index}
            style={
              {
                '--left': `${heart.left}%`,
                '--delay': `${heart.delay}s`,
                '--duration': `${heart.duration}s`,
                '--drift': `${heart.drift}px`,
                '--heart-size': `${heart.size}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="spark-layer" aria-hidden="true">
        {sparks.map((spark) => (
          <span
            className="spark"
            key={spark.id}
            style={
              {
                '--x': `${spark.x}px`,
                '--y': `${spark.y}px`,
                '--size': `${spark.size}px`,
                '--drift': `${spark.drift}px`,
                '--delay': `${spark.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Feito so pra voce</p>
          <h1>Luisa, você é meu lugar favorito.</h1>
          <p className="hero-text">
            Você é meu porto seguro e sempre vai ser, independente das dificuldades que a gente possa enfrentar. Eu te amo de um jeito que não cabe em palavras, mas espero que esse site consiga mostrar um pouquinho do quanto você é importante pra mim.
          </p>

          <div className="hero-actions">
            <button
              className="primary-action"
              onPointerDown={popAtPointer}
              onClick={() => openSurprise('photo-gallery')}
            >
              Abrir surpresa
            </button>
            <button
              className="ghost-action"
              onPointerDown={popAtPointer}
              onClick={() => setDanceMode((current) => !current)}
            >
              {danceMode ? 'Ceu calmo' : 'Modo brilho'}
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="Coracao brilhante com fotos orbitando">
          <div className="hero-photo-stack" aria-hidden="true">
            <img className="hero-photo hero-photo-one" src={photos[7].src} alt="" />
            <img className="hero-photo hero-photo-two" src={photos[2].src} alt="" />
            <img className="hero-photo hero-photo-three" src={photos[0].src} alt="" />
          </div>
          <div className="orbit orbit-one">
            <span>carinho</span>
          </div>
          <div className="orbit orbit-two">
            <span>risadas</span>
          </div>
          <div className="orbit orbit-three">
            <span>planos</span>
          </div>
          <div className="glass-heart">
            <div className="heart-core" />
            <div className="pulse-ring" />
          </div>
          <div className="constellation-line line-one" />
          <div className="constellation-line line-two" />
          <div className="constellation-dot dot-one" />
          <div className="constellation-dot dot-two" />
          <div className="constellation-dot dot-three" />
        </div>
      </section>

      <section className="photo-section" id="photo-gallery" aria-label="Galeria de fotos">
        <div className="section-heading">
          <p className="eyebrow">Nossa galeria</p>
          <h2>Cada foto ganhou um cantinho com brilho proprio.</h2>
          <p>
            Algumas lembrancas ficam enormes por um motivo simples: elas merecem
            mais espaco no mundo.
          </p>
        </div>

        <div className="photo-showcase">
          <button
            className="featured-photo"
            onPointerDown={popAtPointer}
            onClick={nextPhoto}
            style={{ '--photo-tone': selectedPhoto.tone } as CSSProperties}
          >
            <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
            <span>{selectedPhoto.caption}</span>
          </button>

          <div className="photo-thumbs" aria-label="Escolher foto">
            {photos.map((photo, index) => (
              <button
                className={activePhoto === index ? 'is-active' : ''}
                key={photo.src}
                onPointerDown={popAtPointer}
                onClick={() => setActivePhoto(index)}
                style={{ '--photo-tone': photo.tone } as CSSProperties}
                aria-label={`Ver foto ${index + 1}`}
              >
                <img src={photo.src} alt="" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="love-dashboard" aria-label="Painel de amor">
        <div className="dashboard-copy">
          <p className="eyebrow">Nivel de carinho</p>
          <h2>O coracao acompanha a intensidade.</h2>
          <p>
            O minimo ja vem alto, porque eu nao consegui programar uma versao em que
            eu gosto pouco de voce.
          </p>
        </div>

        <div className="love-meter">
          <div className="meter-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div
            className="meter-heart"
            style={{ '--love-level': `${loveLevel}%` } as CSSProperties}
          >
            <div className="meter-fill" />
          </div>
          <label className="range-label" htmlFor="love-range">
            Intensidade: {loveLevel}%
          </label>
          <input
            id="love-range"
            type="range"
            min="70"
            max="100"
            value={loveLevel}
            onChange={(event) => setLoveLevel(Number(event.target.value))}
          />
        </div>
      </section>

      <section className="reason-section" aria-label="Motivos">
        <div className="section-heading">
          <p className="eyebrow">Seis motivos rapidos</p>
          <h2>Cada luz guarda um motivo pra voce se sentir absurda.</h2>
        </div>

        <div className="reason-grid">
          {reasons.map((reason, index) => (
            <button
              className={`reason-card ${activeReason === index ? 'is-active' : ''}`}
              key={reason.title}
              onPointerDown={popAtPointer}
              onClick={() => setActiveReason(index)}
              style={{ '--accent': reason.accent } as CSSProperties}
            >
              <span className="reason-number">{String(index + 1).padStart(2, '0')}</span>
              <strong>{reason.title}</strong>
              <span>{reason.text}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="memory-section" aria-label="Linha do tempo">
        <div className="memory-visual" aria-hidden="true">
          <div className="polaroid polaroid-one">
            <img src={photos[0].src} alt="" />
            <span>nosso caos bonito</span>
          </div>
          <div className="polaroid polaroid-two">
            <img src={photos[8].src} alt="" />
            <span>date imaginario</span>
          </div>
          <div className="film-strip">
            {photos.slice(3, 7).map((photo) => (
              <img key={photo.src} src={photo.src} alt="" />
            ))}
          </div>
        </div>

        <div className="memory-copy">
          <p className="eyebrow">Linha do tempo</p>
          <h2>Nossa historia em capitulos que ainda estao sendo escritos.</h2>

          <div className="timeline-tabs">
            {memories.map((memory, index) => (
              <button
                className={activeMemory === index ? 'is-active' : ''}
                key={memory.time}
                onPointerDown={popAtPointer}
                onClick={() => setActiveMemory(index)}
              >
                {memory.time}
              </button>
            ))}
          </div>

          <article className="memory-card">
            <span>{memories[activeMemory].time}</span>
            <h3>{memories[activeMemory].title}</h3>
            <p>{memories[activeMemory].text}</p>
          </article>
        </div>
      </section>

      <section className="letter-section" aria-label="Cartas secretas">
        <div className="section-heading">
          <p className="eyebrow">Cartas secretas</p>
          <h2>Tres recados com clima de abraco demorado.</h2>
        </div>

        <div className="letter-grid">
          {letters.map((letter, index) => (
            <button
              className={`letter ${openLetter === index ? 'is-open' : ''}`}
              key={letter.title}
              onPointerDown={popAtPointer}
              onClick={() => setOpenLetter(index)}
            >
              <span className="envelope-flap" />
              <span className="letter-title">{letter.title}</span>
              <span className="letter-text">{letter.text}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="play-section" aria-label="Brincadeiras">
        <div className="quiz-panel">
          <p className="eyebrow">Mini escolha</p>
          <h2>Vale presente instantaneo</h2>
          <div className="quiz-options">
            {quizOptions.map((option) => (
              <button
                className={quizChoice === option ? 'is-active' : ''}
                key={option}
                onPointerDown={popAtPointer}
                onClick={() => setQuizChoice(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="quiz-result">
            Escolha confirmada: <strong>{quizChoice}</strong>.
          </p>
        </div>

        <div className="note-machine">
          <p className="eyebrow">Gerador de mimo</p>
          <blockquote>{loveNotes[noteIndex]}</blockquote>
          <button onPointerDown={popAtPointer} onClick={rotateNote}>
            Nova frase
          </button>
        </div>
      </section>

      <section className="final-section" id="surpresa-final" aria-label="Final">
        <div className="final-copy">
          <p className="eyebrow">Ultima surpresa</p>
          <h2>
            {finalOpen
              ? 'Pronto: o site inteiro ficou mais apaixonado.'
              : 'Tem um final guardado.'}
          </h2>
          <p>
            Ana Luisa, eu te amo no detalhe, na pressa, na calma, no plano e no
            improviso. Obrigado por ser voce.
          </p>
          <button
            className="primary-action"
            onPointerDown={popAtPointer}
            onClick={() => openSurprise('surpresa-final')}
          >
            {finalOpen ? 'Explodir amor de novo' : 'Abrir final'}
          </button>
        </div>
        <div className="final-stage" aria-hidden="true">
          <img className="final-photo final-photo-one" src={photos[4].src} alt="" />
          <img className="final-photo final-photo-two" src={photos[9].src} alt="" />
          <div className="big-heart" />
          <div className="final-message">eu te amo</div>
        </div>
      </section>
    </main>
  )
}

export default App
