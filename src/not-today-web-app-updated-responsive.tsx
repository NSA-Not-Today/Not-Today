import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Instagram, Twitter, Youtube, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import camisetaNasa from '/camiseta_nasa.png'
import tazaNasa from '/taza_nasa.png'
import stickersNasa from '/stickers_nasa.png'
import vortex from '/icono_vortex.jpeg'
import planet from '/icono_planeta.jpeg'
import satelite from '/icono_satelite.jpeg'

interface Product {
  id: number
  name: string
  price: number
  points: number
  image: string
}

const products: Product[] = [
  { id: 1, name: "Space Shuttle T-Shirt", price: 25, points: 50, image: camisetaNasa },
  { id: 2, name: "Asteroid Mug", price: 15, points: 30, image: tazaNasa },
  { id: 3, name: "Planet Sticker Set", price: 10, points: 20, image: stickersNasa },
]

interface RankingUser {
  name: string
  points: number
  avatar: string
}

const rankingUsers: RankingUser[] = [
  { name: "AstroNinja", points: 1250, avatar: "https://avatar.iran.liara.run/public/1" },
  { name: "CosmicQueen", points: 980, avatar: "https://avatar.iran.liara.run/public/2" },
  { name: "StarGazer42", points: 875, avatar: "https://avatar.iran.liara.run/public/3" },
  { name: "NebulaNomad", points: 720, avatar: "https://avatar.iran.liara.run/public/4" },
  { name: "GalacticPioneer", points: 650, avatar: "https://avatar.iran.liara.run/public/5" },
]

interface SpaceGame {
  id: number
  name: string
  description: string
  image: string
  preview: string
}

const spaceGames: SpaceGame[] = [
  {
    id: 1,
    name: "Explora Marte",
    description: "Explora la superficie de Marte y descubre sus secretos.",
    image: vortex,
    preview: vortex
  },
  {
    id: 2,
    name: "Identifica los Planetas",
    description: "Pon a prueba tus conocimientos sobre los planetas del sistema solar.",
    image: planet,
    preview: planet
  },
  {
    id: 3,
    name: "Construye tu Estación Espacial",
    description: "Diseña y construye tu propia estación espacial.",
    image: satelite,
    preview: satelite
  },
]

export default function ComponentResponsive() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const [email, setEmail] = useState("")
  const [selectedGame, setSelectedGame] = useState<SpaceGame>(spaceGames[0])
  const [viewerCount, setViewerCount] = useState(1234)
  const [comment, setComment] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    const viewerTimer = setInterval(() => {
      setViewerCount(prevCount => prevCount + Math.floor(Math.random() * 10) - 5)
    }, 5000)

    return () => {
      clearInterval(viewerTimer)
    }
  }, [])

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const handleAnswerSubmit = (answer: string) => {
    setSelectedAnswer(answer)
    setIsAnswered(true)
    if (answer === "Redirect its trajectory") {
      setScore(prevScore => prevScore + 1)
    }
  }

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product])
  }

  //   const removeFromCart = (productId: number) => {
  //     setCart(prevCart => prevCart.filter(item => item.id !== productId))
  //   }

  const buyWithMoney = (product: Product) => {
    addToCart(product)
    alert(`You've added ${product.name} to your cart for $${product.price}`)
  }

  const buyWithPoints = (product: Product) => {
    if (score >= product.points) {
      setScore(prevScore => prevScore - product.points)
      addToCart(product)
      alert(`You've purchased ${product.name} with ${product.points} points!`)
    } else {
      alert("You don't have enough points for this item.")
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for subscribing with email: ${email}`)
    setEmail("")
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for your comment: ${comment}`)
    setComment("")
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white bg-cover bg-center bg-fixed">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-90 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NOT%20TODAY-GnE0Qj8TwSANCBMN8NLteJ3F1vtWDs.png" alt="NOT TODAY logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-lg font-bold">NOT TODAY</h1>
          </div>
          <span className="text-sm text-blue-400 font-medium" aria-live="polite">
            {formatDateTime(currentTime)}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-4 lg:mx-24 p-4">
        {/* Daily Update and Fun Fact */}
        <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg mb-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Daily Update</h2>
            <p className="text-green-400 font-bold text-sm mb-2">No world-ending meteors today! 🎉</p>
            <h3 className="text-base font-semibold mb-1">Fun Fact</h3>
            <p className="text-xs">The asteroid belt between Mars and Jupiter contains millions of asteroids, but they're so spread out that spacecraft can usually pass through safely!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Solar System Orrery */}
          <div className="lg:col-span-2 bg-gray-800 bg-opacity-90 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Solar System Orrery</h2>
            <div className="aspect-[3/2] bg-gray-900 rounded-lg overflow-hidden">
              <iframe src="https://nsa-not-today.github.io/Not-Today-orrery/" className="w-full h-full" aria-label="Detailed solar system orrery"></iframe>
            </div>
            <p className="text-xs mt-2 text-gray-400">Note: In the future, you'll be able to select asteroids here to view details in the Nearby Objects section.</p>
          </div>

          {/* Scrollable Column */}
          <div className="flex flex-col space-y-4 overflow-y-auto">
            {/* Nearby Objects */}
            <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Nearby Space Objects</h2>
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    name: "Asteroid 2023 XY",
                    distance: "1.2km",
                    content: "This asteroid is about the size of 3 Empire State Buildings stacked on top of each other. Its mass is equivalent to approximately 7,000 blue whales!"
                  },
                  {
                    name: "Comet Swift-Tuttle",
                    distance: "26km",
                    content: "This comet is as wide as the island of Manhattan. Its mass is comparable to about 500 million Statues of Liberty!"
                  },
                  {
                    name: "NEO 2021 PDC",
                    distance: "0.8km",
                    content: "This Near Earth Object is about twice the size of the Eiffel Tower. Its weight is equivalent to approximately 34,000 Opel Corsa cars!"
                  },
                ].map(item => {
                  return (
                    <AccordionItem value={item.name} key={item.name}>
                      <AccordionTrigger className="bg-gray-700 p-2 rounded-t text-left">
                        <div className="flex justify-between items-center w-full">
                          <span>{item.name}</span>
                          <Badge variant="secondary">{item.distance}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gray-600 p-2 rounded-b text-sm">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>

            <div className="bg-gray-800 flex-1 flex flex-col justify-between bg-opacity-90 p-4 rounded-lg">
              {/* Daily Quiz */}
              <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Daily Quiz</h3>
                <p className="text-sm mb-3">How do you think would be the best way to deal with an asteroid that's going to destroy Earth?</p>
                <div className="space-y-2">
                  {["Nuke it", "Redirect its trajectory", "Build a giant shield"].map((answer) => (
                    <Button
                      key={answer}
                      onClick={() => handleAnswerSubmit(answer)}
                      disabled={isAnswered}
                      className={`w-full justify-start ${isAnswered && answer === "Redirect its trajectory"
                        ? "bg-green-500 hover:bg-green-600"
                        : isAnswered && answer === selectedAnswer
                          ? "bg-red-500 hover:bg-red-600"
                          : ""
                        }`}
                    >
                      {answer}
                    </Button>
                  ))}
                </div>
                {isAnswered && (
                  <p className="mt-3 text-sm">
                    {selectedAnswer === "Redirect its trajectory"
                      ? "Correct! Redirecting the asteroid's trajectory is generally considered the safest and most effective method."
                      : "Not quite. Redirecting the asteroid's trajectory is generally considered the safest and most effective method."}
                  </p>
                )}
                <p className="mt-3 text-sm font-semibold">Your score: {score}</p>

                {/* Top Defenders Ranking */}
                <div className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="top-defenders">
                      <AccordionTrigger className="bg-gray-700 p-2 rounded-t text-left">
                        <div className="flex justify-between items-center w-full">
                          <span>Top Defenders Ranking</span>
                          <Badge variant="secondary">{rankingUsers.length}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gray-600 p-2 rounded-b">
                        {rankingUsers.map((user, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-500 last:border-b-0">
                            <div className="flex items-center">
                              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                              <span className="text-sm font-medium">{user.name}</span>
                            </div>
                            <span className="text-sm font-bold" style={{ color: `hsl(${user.points / 10}, 70%, 60%)` }}>
                              {user.points} pts
                            </span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Quiz and Space Merch Shop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            {/* Asteroid Approach Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                <span>Asteroid Approach</span>
                <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded">LIVE</span>
              </h2>
              <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/0FBiyFpV__g"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-sm">
                  {viewerCount.toLocaleString()} viewers
                </div>
              </div>
              <p className="text-xs mb-2 text-gray-400">Live view of Earth from the International Space Station</p>
            </div>

            <form onSubmit={handleCommentSubmit} className="mt-2">
              <Textarea
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full mb-4 text-black"
                rows={2}
              />
              <Button type="submit" className="w-full flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" />
                Send Comment
              </Button>
            </form>
          </div>
          {/* Space Merch Shop */}
          <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Space Merch Shop</h3>
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-700 p-2 rounded-lg flex items-center">
                  <img src={`${product.image}`} alt={product.name} className="w-16 h-16 object-cover rounded-md mr-3" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-semibold">{product.name}</h4>
                    <p className="text-xs text-gray-400">${product.price} or {product.points} points</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <Button size="sm" className="max-w-4 px-6" onClick={() => buyWithMoney(product)}>
                      Buy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => buyWithPoints(product)} className="text-black bg-white hover:bg-gray-200 hover:text-black">
                      Use Points
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Space Games and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Space Games Selector */}
          <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Space Games</h3>
            <div className="grid grid-cols-1 gap-4">
              {spaceGames.map((game) => (
                <div
                  key={game.id}
                  className={`bg-gray-700 p-2 rounded-lg flex items-center cursor-pointer ${selectedGame?.id === game.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedGame(game)}
                >
                  <img src={`${game.image}`} alt={game.name} className="w-16 h-16 object-cover rounded-md mr-3" />
                  <div>
                    <h4 className="text-sm font-semibold">{game.name}</h4>
                    <p className="text-xs text-gray-400">{game.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Preview */}
          <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Game Preview</h3>
            {selectedGame && (
              <div>
                <img src={`${selectedGame.preview}`} alt={`${selectedGame.name} preview`} className="w-full h-64 object-contain rounded-lg mb-2" />
                <h4 className="text-md font-semibold">{selectedGame.name}</h4>
                <p className="text-sm text-gray-400">{selectedGame.description}</p>
                <Button className="mt-2">Play Now</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Stay Updated and Footer */}
      <div className="bg-gray-900 bg-opacity-90 mt-8 p-4">
        <div className="mx-4 lg:mx-24">
          {/* Stay Updated */}
          <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <form onSubmit={handleEmailSubmit} className="mb-4">
              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow text-black"
                  required
                />
                <Button type="submit" className="w-full lg:w-auto">Subscribe</Button>
              </div>
            </form>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-gray-300 text-xs">
            <div className="mb-2">
              <p>© 2024 NOT TODAY App. All rights reserved.</p>
              <p>A project sponsored by NASA</p>
            </div>
            <nav className="flex space-x-2">
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Contact Us</a>
            </nav>
          </footer>
        </div>
      </div>

      {/* Shopping Cart */}
      <div className="fixed bottom-0 right-0 bg-gray-900 bg-opacity-90 p-2 m-4 rounded-lg border border-gray-700 flex items-center">
        <span className="text-sm font-semibold mr-2">Cart: {cart.length} items</span>
        <Button size="sm" className="flex items-center">
          <ShoppingCart className="mr-2 h-4 w-4" /> View Cart
        </Button>
      </div>
    </div>
  )
}